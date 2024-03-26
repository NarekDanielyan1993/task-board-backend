import mongoose, { Schema } from 'mongoose';
import { IPriorityModel } from 'types/priority';

const prioritySchema = new mongoose.Schema<IPriorityModel>(
    {
        name: String,
        boardId: { type: Schema.Types.ObjectId, ref: 'Board' },
    },
    {
        timestamps: true,
    },
);
const PriorityModel =
    mongoose.models.Priority || mongoose.model('Priority', prioritySchema);

export default PriorityModel;
