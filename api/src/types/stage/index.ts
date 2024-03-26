import { QueryOptions, RootQuerySelector, Types, UpdateQuery } from 'mongoose';
import { UpdateOperation } from '..';

export interface IStageModel extends Document {
    name: string;
    boardId: Types.ObjectId;
    listPosition: number;
    color: string;
}

export interface IStageUpdatePositions {
    id: string;
    position: number;
}

export interface IStageCreateBody {
    name: string;
    color: string;
    boardId: string;
    listPosition: number;
    updatedStagePositions: IStageUpdatePositions[];
}

export interface IStageCreate {
    name: string;
    color: string;
    boardId: string;
    listPosition: number;
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
        id: string,
        data: UpdateQuery<IStageModel>,
        options?: QueryOptions,
    ): Promise<IStageResponse | null>;
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
        id: string,
        data: UpdateQuery<IStageModel>,
        options?: QueryOptions,
    ): Promise<IStageResponse | null>;
    updateMultiple(data: UpdateOperation[]): Promise<any[]>;
}
