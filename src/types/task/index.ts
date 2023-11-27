import { QueryOptions, RootQuerySelector, Types } from 'mongoose';
import { IAttachment } from '..';

export interface ITaskModel {
    summary: string;
    due_date: Date;
    description: string;
    taskNumber?: number;
    priorityId?: Types.ObjectId;
    stageId: Types.ObjectId;
    parentId?: Types.ObjectId;
    comments?: Types.ObjectId[];
}

export interface ITaskCreateQueryData {
    summary: string;
    due_date: Date;
    description: string;
    priorityId: string;
    stageId: string;
    attachments: IAttachment[];
}

export interface ISubTaskCreateQueryData {
    summary: string;
    stageId: string;
    parentId: string;
}

export interface ITaskUpdateQueryData extends Partial<ITaskCreateQueryData> {
    removedAttachments: IAttachment[];
}

export interface ITaskCreate {
    summary: string;
    stageId: string;
    due_date?: Date;
    description?: string;
    priorityId?: string;
    parentId?: Types.ObjectId;
}

export interface ITaskUpdate extends Partial<ITaskCreate> {}

export type ITaskSearchQueryData = {
    search: string;
};

export interface ITaskSearch {
    summary: string;
}

export interface ITaskResponse extends ITaskModel {
    id?: Types.ObjectId;
    _id?: Types.ObjectId;
    attachments?: IAttachment[];
    _doc?: Document;
    createdAt?: Date;
}

export interface ITaskCreateResponse extends ITaskModel {
    _id: Types.ObjectId;
}

export interface ITaskDeleteResponse extends ITaskModel {
    _id: Types.ObjectId;
}

export interface ITaskRepository {
    create(taskData: ITaskCreate): Promise<ITaskCreateResponse>;
    searchBySummary(searchData: ITaskSearch): Promise<any>;
    updateById(
        taskId: Types.ObjectId,
        taskData: ITaskUpdate,
        options?: QueryOptions,
    ): Promise<ITaskResponse | null>;
    delete(taskId: string): Promise<ITaskDeleteResponse>;
    deleteMany(data: RootQuerySelector<ITaskModel>): Promise<any>;
}

export interface ITaskService {
    createTask(taskData: ITaskCreate): Promise<ITaskCreateResponse>;
    searchBySummary(searchData: ITaskSearch): Promise<any>;
    updateById(
        taskId: Types.ObjectId,
        taskData: ITaskUpdate,
        options?: QueryOptions,
    ): Promise<ITaskResponse | null>;
    deleteTask(taskId: string): Promise<ITaskDeleteResponse>;
    deleteTasks(data: RootQuerySelector<ITaskModel>): Promise<any>;
}
