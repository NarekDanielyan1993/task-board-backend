/* eslint-disable @typescript-eslint/no-var-requires */
import { Schema, model, models } from 'mongoose';
import IUserModel from 'types/user';

const userSchema = new Schema<IUserModel>(
    {
        name: {
            type: String,
            required: true,
            trim: true,
        },
        email: {
            type: String,
            unique: true,
        },
        verifiedEmail: {
            type: Date,
            default: null,
        },
        password: {
            type: String,
        },
    },
    {
        timestamps: true,
    },
);

const UserModel = models.User || model('User', userSchema);

export default UserModel;
