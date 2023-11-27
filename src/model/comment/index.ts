import mongoose, { Schema } from 'mongoose';
import { ICommentModel } from 'types/comment';

const commentSchema = new mongoose.Schema<ICommentModel>(
    {
        author: {
            type: String,
            trim: true,
            // required: true,
        },
        replyCount: {
            type: Number,
            default: 0,
            min: 0,
        },
        text: {
            type: String,
            trim: true,
            required: true,
        },
        taskId: {
            type: Schema.Types.ObjectId,
            ref: 'Task',
            // required: true,
        },
        parentId: {
            type: Schema.Types.ObjectId,
            ref: 'Comment',
            default: null,
        },
    },
    {
        timestamps: true,
    },
);

const CommentModel =
    mongoose.models.Comment ?? mongoose.model('Comment', commentSchema);

export default CommentModel;
