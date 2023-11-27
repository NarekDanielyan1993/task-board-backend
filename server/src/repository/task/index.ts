import { Model, QueryOptions, QuerySelector, Types } from 'mongoose';
import {
    ITaskCreate,
    ITaskCreateResponse,
    ITaskDeleteResponse,
    ITaskModel,
    ITaskRepository,
    ITaskResponse,
    ITaskSearch,
    ITaskUpdate,
} from 'types/task/index.js';

class TaskRepository implements ITaskRepository {
    private model: Model<ITaskModel>;

    constructor(model: Model<ITaskModel>) {
        this.model = model;
    }

    async create(taskData: ITaskCreate): Promise<ITaskCreateResponse> {
        try {
            const lastInsertedTask = await this.model
                .findOne({})
                .sort({ taskNumber: -1 })
                .limit(1);
            const createdTask = await this.model.create({
                ...taskData,
                taskNumber: lastInsertedTask
                    ? (lastInsertedTask?.taskNumber as number) + 1
                    : 1,
            });
            return createdTask;
        } catch (error) {
            console.log('Error accrued while creating task: ', error);
            throw new Error('Failed to create task');
        }
    }

    async searchBySummary(searchData: ITaskSearch): Promise<any> {
        try {
            const tasks = await this.model.aggregate([
                {
                    $match: {
                        summary: { $regex: searchData.summary, $options: 'i' },
                    },
                },
                {
                    $lookup: {
                        from: 'comments',
                        localField: '_id',
                        foreignField: 'taskId',
                        as: 'comments',
                        pipeline: [
                            {
                                $match: {
                                    parentId: null,
                                },
                            },
                        ],
                    },
                },
                {
                    $lookup: {
                        from: 'tasks',
                        localField: '_id',
                        foreignField: 'parentId',
                        as: 'tasks.subTasks',
                    },
                },
                {
                    $lookup: {
                        from: 'attachments',
                        localField: '_id',
                        foreignField: 'taskId',
                        as: 'attachments',
                    },
                },
                {
                    $group: {
                        _id: '$stageId',
                        tasks: { $push: '$$ROOT' },
                    },
                },
                {
                    $project: {
                        stageId: '$_id',
                        _id: 0,
                        tasks: {
                            $cond: {
                                if: { $ne: [{ $size: '$tasks' }, 0] },
                                then: {
                                    $map: {
                                        input: '$tasks',
                                        as: 'task',
                                        in: {
                                            id: '$$task._id',
                                            summary: '$$task.summary',
                                            due_date: '$$task.due_date',
                                            description: '$$task.description',
                                            taskNumber: '$$task.taskNumber',
                                            priorityId: '$$task.priorityId',
                                            stageId: '$$task.stageId',
                                            createdAt: '$$task.createdAt',
                                            updatedAt: '$$task.updatedAt',
                                            attachments: {
                                                $map: {
                                                    input: '$$task.attachments',
                                                    as: 'attachment',
                                                    in: {
                                                        id: '$$attachment._id',
                                                        name: '$$attachment.name',
                                                        url: '$$attachment.url',
                                                        isUploaded:
                                                            '$$attachment.isUploaded',
                                                    },
                                                },
                                            },
                                            subTasks: {
                                                $map: {
                                                    input: '$$task.subTasks',
                                                    as: 'task',
                                                    in: {
                                                        id: '$$task._id',
                                                        summary:
                                                            '$$task.summary',
                                                        stageId:
                                                            '$$task.stageId',
                                                        parentId:
                                                            '$$task.parentId',
                                                    },
                                                },
                                            },
                                            comments: {
                                                $map: {
                                                    input: '$$task.comments',
                                                    as: 'comment',
                                                    in: {
                                                        id: '$$comment._id',
                                                        createdAt:
                                                            '$$comment.createdAt',
                                                        text: '$$comment.text',
                                                        replyCount:
                                                            '$$comment.replyCount',
                                                        parentId:
                                                            '$$comment.parentId',
                                                        taskId: '$$comment.taskId',
                                                    },
                                                },
                                            },
                                        },
                                    },
                                },
                                else: [],
                            },
                        },
                    },
                },
            ]);
            console.log(tasks);
            return tasks;
        } catch (error) {
            console.log('Error accrued while creating task: ', error);
            throw new Error('Failed to create task');
        }
    }

    // async findAll() {
    //     try {
    //         return await TaskModel.find();
    //     } catch (error) {
    //         throw new Error('Failed to retrieve tasks');
    //     }
    // }

    // async findById(taskId) {
    //     try {
    //         return await TaskModel.findById(taskId);
    //     } catch (error) {
    //         throw new Error('Failed to find task by ID');
    //     }
    // }

    async updateById(
        taskId: Types.ObjectId,
        taskData: ITaskUpdate,
        options: QueryOptions,
    ): Promise<ITaskResponse | null> {
        try {
            console.log(taskData);
            return await this.model.findByIdAndUpdate(taskId, taskData, {
                new: true,
                ...options,
            });
        } catch (error) {
            console.log('task update failed', error);
            throw new Error('Failed to update task');
        }
    }

    async delete(taskId: string): Promise<ITaskDeleteResponse> {
        console.log('taskIdRepo', taskId);
        try {
            return (await this.model.findByIdAndDelete(
                taskId,
            )) as ITaskDeleteResponse;
        } catch (error) {
            throw new Error('Failed to delete task');
        }
    }

    async deleteMany(data: QuerySelector<ITaskModel>): Promise<any> {
        console.log('taskIdRepo', data);
        try {
            const deletedTasks = await this.model.find(data);
            await this.model.deleteMany(data);
            return deletedTasks;
        } catch (error) {
            throw new Error('Failed to delete tasks');
        }
    }
}

export default TaskRepository;
