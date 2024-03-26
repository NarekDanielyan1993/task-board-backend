import mongoose, { Schema } from 'mongoose';
import { IAttachmentModel } from 'types/attachment';

const attachmentSchema = new mongoose.Schema<IAttachmentModel>(
    {
        taskId: { type: Schema.Types.ObjectId, ref: 'Task' },
        name: { type: String },
        url: { type: String },
        publicId: { type: String },
        isUploaded: { type: Boolean, default: false },
    },
    {
        timestamps: true,
    },
);

const AttachmentModel =
    mongoose.models.Attachment ??
    mongoose.model('Attachment', attachmentSchema);

export default AttachmentModel;
