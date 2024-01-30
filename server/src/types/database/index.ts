import { Mongoose, Types } from 'mongoose';

export type EnvVariableTypes =
    | 'DATABASE_URL'
    | 'SERVER_PORT'
    | 'DATABASE_PASSWORD'
    | 'DATABASE_USERNAME'
    | 'DATABASE_DATABASE_NAME'
    | 'SERVER_BASE_API'
    | 'CLIENT_BASE_URL'
    | 'SERVER_BASE_URL'
    | 'PRODUCTION'
    | 'NODE_ENV';

export interface IDatabase {
    connect(): Promise<void>;
    getConnection(): Mongoose | null;
}

export type UpdateManyOperationType = {
    updateMany: {
        filter: { _id: Types.ObjectId };
        update: { [key: string]: any };
    };
};

export type UpdateOneOperationType = {
    updateOne: {
        filter: { _id: Types.ObjectId };
        update: { [key: string]: any };
    };
};

export type UpdateOperation = UpdateManyOperationType | UpdateOneOperationType;
