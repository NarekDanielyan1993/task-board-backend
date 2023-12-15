/* eslint-disable @typescript-eslint/no-var-requires */
import mongoose from 'mongoose';
import { IVerificationTokenModel } from 'types/verificationToken';

const verificationSchema = new mongoose.Schema<IVerificationTokenModel>(
    {
        identifier: {
            type: String,
            required: true,
            trim: true,
            unique: true,
        },
        token: {
            type: String,
            trim: true,
            required: true,
        },
        expires: {
            type: Date,
        },
    },
    {
        timestamps: true,
    },
);

const VerificationModel =
    mongoose.models.VerificationModel ||
    mongoose.model('VerificationToken', verificationSchema);

export default VerificationModel;
