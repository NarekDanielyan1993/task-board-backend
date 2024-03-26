import mongoose, { Schema } from 'mongoose';
import { IAccountModel } from 'types/account';

const accountSchema = new Schema<IAccountModel>(
    {
        // userId: { type: Schema.Types.ObjectId, ref: 'User' },
        // type: {
        //     type: String,
        //     trim: true,
        //     required: true,
        // },
        provider: {
            type: String,
            trim: true,
            required: true,
        },
        providerId: {
            type: String,
            trim: true,
            required: true,
        },
    },
    {
        timestamps: true,
    },
);

const AccountModel =
    mongoose.models.Account || mongoose.model('Account', accountSchema);

export default AccountModel;
