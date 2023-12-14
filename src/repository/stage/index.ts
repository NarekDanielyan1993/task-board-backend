import { InternalServerError } from 'lib/error';
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
        try {
            const newStage = (await this.model.create(
                stages,
            )) as IStageCreateResponse[];
            return newStage;
        } catch (error) {
            console.log(error);
            throw new InternalServerError(
                'An error occurred while creating the stage.',
            );
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
            throw new InternalServerError('Failed to retrieve stages');
        }
    }

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
            throw new InternalServerError(
                'An error occurred while creating the state.',
            );
        }
    }

    async deleteMany(data: RootQuerySelector<IStageModel>): Promise<any> {
        try {
            const deletedStages = await this.model.find(data);
            await this.model.deleteMany(data);
            return deletedStages;
        } catch (error) {
            throw new InternalServerError(
                'An error occurred while creating the state.',
            );
        }
    }

    async deleteOne(data: RootQuerySelector<IStageModel>): Promise<any> {
        try {
            const deletedStage = await this.model.findOneAndDelete(data);
            return deletedStage;
        } catch (error) {
            throw new InternalServerError(
                'An error occurred while creating the state.',
            );
        }
    }

    async updateMultiple(data: UpdateOperation[]): Promise<any[]> {
        try {
            const bulkWriteResult = await Promise.all(
                data.map((op) => this.model.bulkWrite([op])),
            );
            return bulkWriteResult;
        } catch (error) {
            throw new InternalServerError(
                'An error occurred while creating the state.',
            );
        }
    }

    async deleteByIds(ids: Types.ObjectId[]): Promise<any> {
        try {
            const deletedStages = await this.model.deleteMany({
                _id: { $in: ids },
            });
            return deletedStages;
        } catch (error) {
            throw new InternalServerError(
                'An error occurred while creating the state.',
            );
        }
    }
}

export default StageRepository;
