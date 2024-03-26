import { InternalServerError } from 'lib/error';
import {
    FilterQuery,
    Model,
    QueryOptions,
    QuerySelector,
    Types,
    UpdateQuery,
} from 'mongoose';
import {
    ITaskCreate,
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

    async findAll(): Promise<ITaskResponse[]> {
        try {
            const tasks = await this.model
                .aggregate([
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
                            as: 'subTasks',
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
                ])
                .sort({ position: 1 });
            return tasks;
        } catch (error) {
            console.log(error);
            throw new InternalServerError('Failed to retrieve tasks.');
        }
    }

    async create(taskData: ITaskCreate): Promise<ITaskResponse> {
        try {
            const lastInsertedTask = await this.model
                .findOne()
                .sort({ taskNumber: -1 })
                .limit(1);
            const stageTasksCount = await this.model
                .find({
                    stageId: taskData.stageId,
                })
                .count();
            const createdTask = await this.model.create({
                ...taskData,
                taskNumber: lastInsertedTask
                    ? (lastInsertedTask?.taskNumber as number) + 1
                    : 1,
                position: stageTasksCount ? stageTasksCount + 1 : 1,
            });
            return createdTask;
        } catch (error) {
            console.log('Error accrued while creating task: ', error);
            throw new InternalServerError('Failed to create task');
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
            ]);
            console.log(tasks);
            return tasks;
        } catch (error) {
            console.log('Error accrued while creating task: ', error);
            throw new InternalServerError('Failed to create task');
        }
    }

    async updateById(
        taskId: Types.ObjectId,
        taskData: ITaskUpdate,
        options: QueryOptions,
    ): Promise<ITaskResponse | null> {
        try {
            return await this.model.findByIdAndUpdate(taskId, taskData, {
                new: true,
                ...options,
            });
        } catch (error) {
            console.log('task update failed', error);
            throw new InternalServerError('Failed to update task');
        }
    }

    async update(
        filter: FilterQuery<ITaskModel>,
        taskData: UpdateQuery<ITaskModel>,
        options: QueryOptions,
    ): Promise<ITaskModel | null> {
        try {
            return await this.model.findOneAndUpdate(filter, taskData, options);
        } catch (error) {
            console.log('task update failed', error);
            throw new InternalServerError('Failed to update task');
        }
    }

    async delete(taskId: string): Promise<any> {
        try {
            const deletedTask = await this.model.findByIdAndDelete(taskId);
            console.log(deletedTask);
            return deletedTask;
        } catch (error) {
            throw new InternalServerError('Failed to delete task');
        }
    }

    async deleteMany(data: QuerySelector<ITaskModel>): Promise<any> {
        try {
            const deletedTasks = await this.model.find(data);
            await this.model.deleteMany(data);
            return deletedTasks;
        } catch (error) {
            throw new InternalServerError('Failed to delete tasks');
        }
    }
}

export default TaskRepository;
