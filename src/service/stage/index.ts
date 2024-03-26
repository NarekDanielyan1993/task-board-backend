import mongoose, {
    QueryOptions,
    RootQuerySelector,
    Types,
    UpdateQuery,
} from 'mongoose';
import { UpdateOperation } from 'types/database';
import {
    IStageCreate,
    IStageCreateResponse,
    IStageModel,
    IStageRepository,
    IStageResponse,
    IStageService,
} from 'types/stage';

class StageService implements IStageService {
    private repository: IStageRepository;

    constructor(repository: IStageRepository) {
        this.repository = repository;
    }

    async createStage(stages: IStageCreate[]): Promise<IStageCreateResponse[]> {
        return await this.repository.create(stages);
    }

    async getStagesByBoard(boardId: string): Promise<IStageResponse[]> {
        return await this.repository.getAll(boardId);
    }

    async deleteStages(data: RootQuerySelector<IStageModel>): Promise<any> {
        return await this.repository.deleteMany(data);
    }

    async deleteStage(data: RootQuerySelector<IStageModel>): Promise<any> {
        return await this.repository.deleteOne({
            _id: new mongoose.Types.ObjectId(data.id),
        });
    }

    async deleteByIds(ids: Types.ObjectId[]): Promise<IStageResponse[]> {
        return await this.repository.deleteByIds(ids);
    }

    async updateById(
        id: string,
        data: UpdateQuery<IStageModel>,
        options?: QueryOptions,
    ): Promise<IStageResponse | null> {
        return await this.repository.updateById(id, data, options);
    }

    async updateMultiple(data: UpdateOperation[]): Promise<any> {
        return await this.repository.updateMultiple(data);
    }
}

export default StageService;
