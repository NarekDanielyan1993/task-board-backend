import { Model, QueryOptions, RootQuerySelector, Types } from 'mongoose';
import { UpdateOperation } from 'types/database';
import {
    IStageCreate,
    IStageCreateResponse,
    IStageModel,
    IStageRepository,
    IStageResponse,
    IStageUpdate,
} from 'types/stage';

class StageRepository implements IStageRepository {
    private model: Model<IStageModel>;

    constructor(model: Model<IStageModel>) {
        this.model = model;
    }

    async create(stages: IStageCreate[]): Promise<IStageCreateResponse[]> {
        console.log('stages', stages);
        try {
            const newStage = (await this.model.create(
                stages,
            )) as IStageCreateResponse[];
            return newStage;
        } catch (error) {
            console.log(error);
            throw new Error('An error occurred while creating the stage.');
        }
    }

    public async getAll(boardId: string): Promise<IStageResponse[]> {
        try {
            const stages = await this.model.find({ boardId }).sort({
                listPosition: 1,
            });
            return stages;
        } catch (error) {
            console.log(error);
            throw new Error('Failed to retrieve stages');
        }
    }

    // async getAll(boardId: string): Promise<IStageResponse[]> {
    //     try {
    //         const stages: IStageResponse[] =
    //             await this.model.aggregate<IStageResponse>([
    //                 {
    //                     $match: {
    //                         boardId: new mongoose.Types.ObjectId(boardId),
    //                     },
    //                 },
    //                 {
    //                     $lookup: {
    //                         from: 'tasks',
    //                         localField: '_id',
    //                         foreignField: 'stageId',
    //                         as: 'tasks',
    //                         pipeline: [
    //                             {
    //                                 $unwind: {
    //                                     path: '$tasks',
    //                                     preserveNullAndEmptyArrays: true,
    //                                 },
    //                             },
    //                             {
    //                                 $lookup: {
    //                                     from: 'tasks',
    //                                     localField: '_id',
    //                                     foreignField: 'parentId',
    //                                     as: 'tasks.subTasks',
    //                                 },
    //                             },
    //                             {
    //                                 $lookup: {
    //                                     from: 'comments',
    //                                     localField: '_id',
    //                                     foreignField: 'taskId',
    //                                     as: 'tasks.comments',
    //                                     pipeline: [
    //                                         {
    //                                             $match: {
    //                                                 parentId: null,
    //                                             },
    //                                         },
    //                                     ],
    //                                 },
    //                             },
    //                             {
    //                                 $lookup: {
    //                                     from: 'attachments',
    //                                     localField: '_id',
    //                                     foreignField: 'taskId',
    //                                     as: 'tasks.attachments',
    //                                 },
    //                             },
    //                         ],
    //                     },
    //                 },
    //                 {
    //                     $sort: {
    //                         listPosition: 1,
    //                     },
    //                 },
    //                 {
    //                     $project: {
    //                         _id: 0,
    //                         id: '$_id',
    //                         name: 1,
    //                         color: 1,
    //                         listPosition: 1,
    //                         tasks: {
    //                             $cond: {
    //                                 if: { $ne: [{ $size: '$tasks' }, 0] },
    //                                 then: {
    //                                     $map: {
    //                                         input: '$tasks',
    //                                         as: 'task',
    //                                         in: {
    //                                             id: '$$task._id',
    //                                             summary: '$$task.summary',
    //                                             due_date: '$$task.due_date',
    //                                             description:
    //                                                 '$$task.description',
    //                                             taskNumber: '$$task.taskNumber',
    //                                             priorityId: '$$task.priorityId',
    //                                             stageId: '$$task.stageId',
    //                                             createdAt: '$$task.createdAt',
    //                                             updatedAt: '$$task.updatedAt',
    //                                             attachments: {
    //                                                 $map: {
    //                                                     input: '$$task.tasks.attachments',
    //                                                     as: 'attachment',
    //                                                     in: {
    //                                                         id: '$$attachment._id',
    //                                                         name: '$$attachment.name',
    //                                                         url: '$$attachment.url',
    //                                                         isUploaded:
    //                                                             '$$attachment.isUploaded',
    //                                                     },
    //                                                 },
    //                                             },
    //                                             subTasks: {
    //                                                 $map: {
    //                                                     input: '$$task.tasks.subTasks',
    //                                                     as: 'task',
    //                                                     in: {
    //                                                         id: '$$task._id',
    //                                                         summary:
    //                                                             '$$task.summary',
    //                                                         stageId:
    //                                                             '$$task.stageId',
    //                                                         parentId:
    //                                                             '$$task.parentId',
    //                                                     },
    //                                                 },
    //                                             },
    //                                             comments: {
    //                                                 $map: {
    //                                                     input: '$$task.tasks.comments',
    //                                                     as: 'comment',
    //                                                     in: {
    //                                                         id: '$$comment._id',
    //                                                         createdAt:
    //                                                             '$$comment.createdAt',
    //                                                         text: '$$comment.text',
    //                                                         replyCount:
    //                                                             '$$comment.replyCount',
    //                                                         parentId:
    //                                                             '$$comment.parentId',
    //                                                         taskId: '$$comment.taskId',
    //                                                     },
    //                                                 },
    //                                             },
    //                                         },
    //                                     },
    //                                 },
    //                                 else: [],
    //                             },
    //                         },
    //                     },
    //                 },
    //             ]);
    //         return stages;
    //     } catch (error) {
    //         console.log(error);
    //         throw new Error('An error occurred while retrieving the stages.');
    //     }
    // }

    async updateById(
        id: Types.ObjectId,
        data: IStageUpdate,
        options: QueryOptions,
    ): Promise<any> {
        try {
            const updatedStages = await this.model.findByIdAndUpdate(
                id.toHexString(),
                data,
                {
                    new: true,
                    ...options,
                },
            );
            return updatedStages;
        } catch (error) {
            console.log('updateing stage error', error);
            throw new Error('An error occurred while creating the state.');
        }
    }

    async deleteMany(data: RootQuerySelector<IStageModel>): Promise<any> {
        try {
            const deletedStages = await this.model.find(data);
            await this.model.deleteMany(data);
            return deletedStages;
        } catch (error) {
            throw new Error('An error occurred while creating the state.');
        }
    }

    async deleteOne(data: RootQuerySelector<IStageModel>): Promise<any> {
        try {
            const deletedStage = await this.model.findOneAndDelete(data);
            return deletedStage;
        } catch (error) {
            throw new Error('An error occurred while creating the state.');
        }
    }

    async updateMultiple(data: UpdateOperation[]): Promise<any[]> {
        try {
            const bulkWriteResult = await Promise.all(
                data.map((op) => this.model.bulkWrite([op])),
            );
            return bulkWriteResult;
        } catch (error) {
            throw new Error('An error occurred while creating the state.');
        }
    }

    async deleteByIds(ids: Types.ObjectId[]): Promise<any> {
        try {
            const deletedStages = await this.model.deleteMany({
                _id: { $in: ids },
            });
            return deletedStages;
        } catch (error) {
            throw new Error('An error occurred while creating the state.');
        }
    }
}

export default StageRepository;
