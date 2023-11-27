import { Types } from 'mongoose';

export interface IAccountModel {
    provider: string;
    providerId: string;
    // type: string;
    // userId: Types.ObjectId;
}

export interface IAccountCreate {
    provider: string;
    providerId: string;
}

export interface IAccountResponse extends IAccountModel {
    id?: string;
    _id: Types.ObjectId;
}

export interface IAccountRepository {
    create(taskData: IAccountCreate): Promise<IAccountResponse>;
    findOrCreate(
        profileId: string,
        accountData: IAccountCreate,
    ): Promise<IAccountResponse>;
    // delete(taskId: string): Promise<ITaskDeleteResponse>;
    // deleteMany(data: RootQuerySelector<ITaskModel>): Promise<any>;
}

export interface IAccountService {
    createAccount(accountData: IAccountCreate): Promise<IAccountResponse>;
    findAccountOrCreate(
        profileId: string,
        accountData: IAccountCreate,
    ): Promise<IAccountResponse>;
    // deleteTask(taskId: string): Promise<ITaskDeleteResponse>;
    // deleteTasks(data: RootQuerySelector<ITaskModel>): Promise<any>;
}
