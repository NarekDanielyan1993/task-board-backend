import { QueryOptions, RootQuerySelector, Types } from 'mongoose';
import { UpdateOperation } from '..';

export interface IStageModel extends Document {
    name: string;
    boardId: Types.ObjectId;
    listPosition: number;
    color: string;
}

export interface IStageCreate {
    name: string;
    boardId: string;
}

export interface IStageUpdate {
    name?: string;
    $pull?: { taskIds: Types.ObjectId };
    $push?: { taskIds: Types.ObjectId };
}

export interface IStageCreateResponse extends IStageModel {
    id: Types.ObjectId;
}

export interface IStageResponse extends IStageModel {
    id?: Types.ObjectId;
    _id: Types.ObjectId;
}

// SERVICE

export interface IStageService {
    createStage(stages: IStageCreate[]): Promise<IStageCreateResponse[]>;
    getStagesByBoard(boardId: string): Promise<IStageResponse[]>;
    deleteByIds(ids: Types.ObjectId[]): Promise<IStageResponse[] | null>;
    deleteStages(data: RootQuerySelector<IStageModel>): Promise<any>;
    deleteStage(data: RootQuerySelector<IStageModel>): Promise<any>;
    updateById(
        id: Types.ObjectId,
        data: IStageUpdate,
        options?: QueryOptions,
    ): Promise<IStageResponse>;
    updateMultiple(data: UpdateOperation[]): Promise<any[]>;
}

// REPOSITORY

export interface IStageRepository {
    create(stages: IStageCreate[]): Promise<IStageCreateResponse[]>;
    getAll(boardId: string): Promise<IStageResponse[]>;
    deleteByIds(ids: Types.ObjectId[]): Promise<IStageResponse[]>;
    deleteMany(data: RootQuerySelector<IStageModel>): Promise<any>;
    deleteOne(data: RootQuerySelector<IStageModel>): Promise<any>;
    updateById(
        id: Types.ObjectId,
        data: IStageUpdate,
        options?: QueryOptions,
    ): Promise<IStageResponse>;
    updateMultiple(data: UpdateOperation[]): Promise<any[]>;
}
