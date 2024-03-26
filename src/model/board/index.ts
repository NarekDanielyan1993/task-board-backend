import mongoose, { Schema } from 'mongoose';
import { IBoardModel } from 'types/board';

const boardSchema = new Schema<IBoardModel>(
    {
        name: String,
    },
    {
        timestamps: true,
    },
);

const BoardModel =
    mongoose.models.Board || mongoose.model('Board', boardSchema);
export default BoardModel;
