import { Types } from 'mongoose';

export interface ICommentModel {
    author: string;
    text: string;
    taskId: Types.ObjectId;
    parentId: Types.ObjectId;
    replyCount: number;
}

export interface ICommentCreateQueryData {
    author: string;
    text: string;
    taskId: string;
    parentId?: string;
}

export type ISubCommentGetQueryData = {
    id: string;
};

export interface ICommentCreate {
    author?: string;
    text: string;
    taskId: Types.ObjectId;
    parentId?: Types.ObjectId;
}

export interface ICommentEditQueryData {
    author: string;
    text: string;
    taskId: string;
    id: string;
}

export interface ICommentEdit {
    author?: string;
    text?: string;
    taskId?: Types.ObjectId;
    id: Types.ObjectId;
    replyCount?: number;
}

export interface ICommentDelete {
    id: Types.ObjectId;
}

export interface ICommentResponse extends ICommentModel {
    id: string | Types.ObjectId;
    _id: string | Types.ObjectId;
}

export interface ICommentRepository {
    create(commentData: ICommentCreate): Promise<ICommentResponse>;
    getSubComments(id: string): Promise<any>;
    update(commentData: ICommentEdit): Promise<ICommentResponse | null>;
    delete(commentData: ICommentDelete): Promise<ICommentResponse | null>;
}

export interface ICommentService {
    createComment(commentData: ICommentCreate): Promise<ICommentResponse>;
    getSubComments(id: string): Promise<any>;
    update(commentData: ICommentEdit): Promise<ICommentResponse | null>;
    deleteComment(
        commentData: ICommentDelete,
    ): Promise<ICommentResponse | null>;
}
