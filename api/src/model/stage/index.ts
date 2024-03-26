import mongoose, { Schema } from 'mongoose';
import { IStageModel } from 'types/stage';

const stageSchema = new mongoose.Schema<IStageModel>(
    {
        name: {
            type: String,
            trim: true,
            required: true,
        },
        color: {
            type: String,
            trim: true,
            required: true,
        },
        listPosition: {
            type: Number,
            min: 1,
            required: true,
        },
        boardId: {
            type: Schema.Types.ObjectId,
            ref: 'Board',
            required: true,
        },
    },
    {
        timestamps: true,
    },
);

const StageModel =
    mongoose.models.Stage || mongoose.model('Stage', stageSchema);

export default StageModel;
