import { Schema, Types } from 'mongoose';
import { ParsedUrlQuery } from 'querystring';

export interface IPriorityModel {
    name: string;
    boardId: Types.ObjectId;
}

export interface ICreatePriority {
    name: string;
    boardId: string;
}

export interface IGetPriorityQueryParams extends ParsedUrlQuery {
    boardId: string;
}

export interface IPriorityResponse {
    name: string;
    id: Schema.Types.ObjectId;
}

export interface IPriorityRepository {
    create(priority: ICreatePriority): Promise<IPriorityResponse>;
    createMultiple(priorities: ICreatePriority[]): Promise<IPriorityResponse[]>;
    getPrioritiesForSelect(
        data: IGetPriorityQueryParams,
    ): Promise<IPriorityResponse[]>;
    // deleteByIds(ids: Schema.Types.ObjectId[]): Promise<any>;
}

export interface IPriorityService {
    createPriority(priority: ICreatePriority): Promise<IPriorityResponse>;
    createPriorities(
        priorities: ICreatePriority[],
    ): Promise<IPriorityResponse[]>;
    getPrioritiesForSelect(
        data: IGetPriorityQueryParams,
    ): Promise<IPriorityResponse[]>;
    // deleteByIds(ids: Schema.Types.ObjectId[]): Promise<IPriorityResponse[] | null>;
}
