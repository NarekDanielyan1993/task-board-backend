import { Model, Types } from 'mongoose';
import {
    ICommentCreate,
    ICommentDelete,
    ICommentEdit,
    ICommentModel,
    ICommentRepository,
    ICommentResponse,
} from 'types/comment';

class CommentRepository implements ICommentRepository {
    private model: Model<ICommentModel>;

    constructor(model: Model<ICommentModel>) {
        this.model = model;
    }

    async create(commentData: ICommentCreate): Promise<ICommentResponse> {
        try {
            if (commentData.parentId) {
                (await this.model.findOneAndUpdate(
                    {
                        _id: commentData.parentId,
                    },
                    {
                        $inc: { replyCount: 1 },
                    },
                )) as ICommentResponse;
            }
            const createdComment = (await this.model.create({
                ...commentData,
            })) as ICommentResponse;
            return createdComment;
        } catch (error) {
            console.log('Error accrued while creating task: ', error);
            throw new Error('Failed to create task');
        }
    }

    async update(commentData: ICommentEdit): Promise<ICommentResponse> {
        try {
            const updatedComment = (await this.model.findOneAndUpdate(
                { _id: commentData.id },
                {
                    text: commentData.text,
                    ...(commentData.replyCount && {
                        $inc: { replyCount: commentData.replyCount },
                    }),
                },
                {
                    new: true,
                },
            )) as ICommentResponse;
            console.log(updatedComment);
            return updatedComment;
        } catch (error) {
            console.log('Error accrued while creating task: ', error);
            throw new Error('Failed to create task');
        }
    }

    async getSubComments(id: string): Promise<any> {
        const childCommentsWithReplyCount = await this.model.find({
            parentId: new Types.ObjectId(id),
        });
        console.log(childCommentsWithReplyCount);
        return childCommentsWithReplyCount;
    }

    async delete(commentData: ICommentDelete): Promise<any> {
        try {
            return await this.model.findOneAndDelete({
                _id: commentData.id,
            });
        } catch (error) {
            throw new Error('Failed to delete task');
        }
    }
}

export default CommentRepository;
