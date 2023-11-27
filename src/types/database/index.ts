import { Mongoose, Types } from 'mongoose';

export type EnvVariableTypes =
    | 'DATABASE_URL'
    | 'DATABASE_PORT'
    | 'S3_ACCESS_KEY'
    | 'S3_BUCKET'
    | 'S3_BUCKET_IMAGES'
    | 'S3_REGION'
    | 'S3_SECRET_KEY'
    | 'DATABASE_PASSWORD'
    | 'DATABASE_USERNAME'
    | 'DATABASE_DATABASE_NAME'
    | 'DATABASE_IMAGE_URL'
    | 'NODEMAILER_EMAIL'
    | 'NODEMAILER_PASSWORD'
    | 'NODEMAILER_PROVIDER'
    | 'ACCESS_TOKEN_KEY'
    | 'REFRESH_TOKEN_KEY'
    | 'AUTH_EXPIRATION_TIME'
    | 'SERVER_BASE_API'
    | 'CLIENT_BASE_URL'
    | 'SERVER_BASE_URL'
    | 'PRODUCTION'
    | 'HASH_SAULT'
    | 'NODE_ENV'
    | 'GOOGLE_CLIENT_ID'
    | 'GOOGLE_CLIENT_SECRET';

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
