import { NextFunction, Request, Response } from 'express';
import AwsS3Service from 'lib/fileUpload';
import { Types } from 'mongoose';
import { IAttachmentCreate, IAttachmentService } from 'types/attachment';
import {
    ISubTaskCreateQueryData,
    ITaskCreate,
    ITaskCreateQueryData,
    ITaskResponse,
    ITaskSearchQueryData,
    ITaskService,
    ITaskUpdateQueryData,
} from 'types/task/index.js';
import { isExist } from 'utils/helper';

class TaskController {
    private taskService: ITaskService;
    private attachmentService: IAttachmentService;

    constructor(
        taskService: ITaskService,
        attachmentService: IAttachmentService,
    ) {
        this.taskService = taskService;
        this.attachmentService = attachmentService;
    }

    public searchTasks = async (
        req: Request,
        res: Response,
        next: NextFunction,
    ) => {
        const { search } = req.query as ITaskSearchQueryData;
        try {
            const tasks = await this.taskService.searchBySummary({
                summary: search,
            });
            res.status(200).json(tasks);
        } catch (error) {
            console.log(error);
            next(error);
        }
    };

    public getTasks = async (
        req: Request,
        res: Response,
        next: NextFunction,
    ) => {
        try {
            const tasks = await this.taskService.getTasks();
            res.status(200).json(tasks);
        } catch (error) {
            console.log(error);
            next(error);
        }
    };

    createTask = async (req: Request, res: Response, next: NextFunction) => {
        try {
            const taskData: ITaskCreateQueryData = req.body;
            const newTaskData: ITaskCreate = {
                priorityId: taskData.priorityId,
                stageId: taskData.stageId,
                due_date: taskData.due_date,
                description: taskData.description,
                summary: taskData.summary,
            };
            const createdTask: ITaskResponse =
                await this.taskService.createTask(newTaskData);
            if (!isExist(createdTask)) {
                throw new Error('Failed to create task');
            }
            let storedAttachments: IAttachmentCreate[] = [];
            if (
                Array.isArray(taskData.attachments) &&
                taskData.attachments.length > 0
            ) {
                const awsS3Service = new AwsS3Service();
                const uploadedAttachments =
                    await awsS3Service.uploadMultipleFiles(
                        taskData.attachments,
                    );
                const prepareAttachmentsToStore = uploadedAttachments.map(
                    (attachment): IAttachmentCreate => ({
                        url: attachment.key,
                        name: attachment.name,
                        isUploaded: true,
                        taskId: createdTask._id as Types.ObjectId,
                    }),
                );

                storedAttachments = await this.attachmentService.create(
                    prepareAttachmentsToStore,
                );
            }
            const resData = {
                ...createdTask._doc,
                id: createdTask._id,
                attachments: storedAttachments,
            };
            res.status(201).json(resData);
        } catch (error) {
            next(error);
        }
    };

    createSubTask = async (req: Request, res: Response, next: NextFunction) => {
        try {
            const subTaskData: ISubTaskCreateQueryData = req.body;
            const newTaskData: ITaskCreate = {
                summary: subTaskData.summary,
                stageId: subTaskData.stageId,
            };
            const createdTask: ITaskResponse =
                await this.taskService.createTask({
                    ...newTaskData,
                    parentId: new Types.ObjectId(subTaskData.parentId),
                });
            if (!isExist(createdTask)) {
                throw new Error('Failed to create task');
            }
            res.status(201).json(createdTask);
        } catch (error) {
            next(error);
        }
    };

    public updateTask = async (
        req: Request,
        res: Response,
        next: NextFunction,
    ) => {
        const taskId = req.query.taskId as string;
        const taskData: ITaskUpdateQueryData = req.body;
        try {
            if (
                isExist(taskData.attachments) &&
                Array.isArray(taskData.removedAttachments) &&
                taskData.removedAttachments.length > 0
            ) {
                const awsS3Service = new AwsS3Service();
                await awsS3Service.deleteFiles(
                    taskData.removedAttachments.map((att) => att.url),
                );
                await this.attachmentService.deleteMany({
                    url: {
                        $in: taskData.removedAttachments.map((att) => att.url),
                    },
                });
            }
            if (
                Array.isArray(taskData.attachments) &&
                taskData.attachments.length > 0
            ) {
                const awsS3Service = new AwsS3Service();
                const newAttachments = await awsS3Service.uploadMultipleFiles(
                    taskData.attachments.map((att) => att),
                );
                const prepareAttachmentsToStore = newAttachments.map((att) => ({
                    name: att.name,
                    url: att.key,
                    isUploaded: true,
                    taskId: new Types.ObjectId(taskId),
                }));
                await this.attachmentService.create(prepareAttachmentsToStore);
            }
            const updatedTask: ITaskResponse | null =
                await this.taskService.updateById(
                    new Types.ObjectId(taskId),
                    taskData,
                );
            if (!isExist(updatedTask)) {
                throw new Error('Task not found.');
            }
            const attachments = await this.attachmentService.getBy({ taskId });
            const resData = {
                createdAt: updatedTask.createdAt,
                description: updatedTask.description,
                due_date: updatedTask.due_date,
                parentId: updatedTask.parentId,
                priorityId: updatedTask.priorityId,
                stageId: updatedTask.stageId,
                summary: updatedTask.summary,
                taskNumber: updatedTask.taskNumber,
                id: updatedTask._id,
                attachments,
            };
            res.status(200).json(resData);
        } catch (error) {
            next(error);
        }
    };

    public deleteTask = async (
        req: Request,
        res: Response,
        next: NextFunction,
    ) => {
        const taskId = req.body.taskId;
        try {
            const deletedTask = await this.taskService.deleteTask(taskId);
            if (!isExist(deletedTask)) {
                throw new Error('Task not found.');
            }
            const deletedAttachments = await this.attachmentService.deleteMany({
                taskId: { $in: deletedTask._id },
            });
            if (!isExist(deletedAttachments)) {
                throw new Error('Attachments not found.');
            }
            const prepareFilesToDelete = deletedAttachments?.map(
                (att) => att.url,
            );
            const awsS3Service = new AwsS3Service();
            await awsS3Service.deleteFiles(prepareFilesToDelete);
            res.status(204).json({ msg: 'success.' });
        } catch (error) {
            next(error);
        }
    };
}

export default TaskController;
