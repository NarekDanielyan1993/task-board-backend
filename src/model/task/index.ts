/* eslint-disable @typescript-eslint/no-var-requires */
import mongoose, { Schema } from 'mongoose';
import { ITaskModel } from 'types/task';

const taskSchema = new mongoose.Schema<ITaskModel>(
    {
        summary: {
            type: String,
            required: true,
            trim: true,
        },
        due_date: Date,
        description: {
            type: String,
            trim: true,
        },
        taskNumber: {
            type: Number,
            unique: true,
        },
        priorityId: { type: Schema.Types.ObjectId, ref: 'Priority' },
        stageId: { type: Schema.Types.ObjectId, ref: 'Stage' },
        parentId: {
            type: Schema.Types.ObjectId,
            ref: 'Task',
            default: null,
        },
    },
    {
        timestamps: true,
    },
);

const TaskModel = mongoose.models.Task || mongoose.model('Task', taskSchema);

export default TaskModel;
