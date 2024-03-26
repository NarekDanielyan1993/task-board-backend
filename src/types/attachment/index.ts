import { RootQuerySelector, Types } from 'mongoose';

export interface IAttachmentModel {
    name: string;
    url: string;
    publicId: string;
    isUploaded?: boolean;
    taskId: Types.ObjectId;
}

export interface IAttachment {
    name: string;
    url: string;
    publicId: string;
}

export interface IUploadFilesResponse {
    key: string;
    name: string;
}

export interface IAttachmentCreate extends IAttachmentModel {}

export interface IAttachmentResponse extends IAttachmentModel {
    id: string;
}

// SERVICE

export interface IAttachmentService {
    create(attachments: IAttachmentCreate[]): Promise<IAttachmentResponse[]>;
    getBy(
        data: RootQuerySelector<IAttachmentModel>,
    ): Promise<IAttachmentResponse[]>;
    // getByBoard(boardId: string): Promise<IStageResponse[]>;
    deleteMany(
        data: RootQuerySelector<IAttachmentModel>,
    ): Promise<IAttachmentResponse[]>;
}

// REPOSITORIES
export interface IAttachmentRepository {
    create(attachments: IAttachmentCreate[]): Promise<IAttachmentResponse[]>;
    getBy(
        data: RootQuerySelector<IAttachmentModel>,
    ): Promise<IAttachmentResponse[]>;
    deleteMany(
        data: RootQuerySelector<IAttachmentModel>,
    ): Promise<IAttachmentResponse[]>;
}
