import { Model, RootQuerySelector } from 'mongoose';
import {
    IVerificationTokenModel,
    IVerificationTokenRepository,
    IVerificationTokenResponse,
} from 'types/verificationToken';

class VerificationTokenRepository implements IVerificationTokenRepository {
    private model: Model<IVerificationTokenModel>;

    constructor(model: Model<IVerificationTokenModel>) {
        this.model = model;
    }

    public createOrUpdate = async (
        tokenData: IVerificationTokenModel,
    ): Promise<IVerificationTokenResponse> => {
        const createdToken = await this.model.findOneAndUpdate(
            { identifier: tokenData.identifier },
            { ...tokenData },
            { upsert: true, new: true },
        );
        return createdToken;
    };

    public findOne = async (
        tokenData: RootQuerySelector<IVerificationTokenModel>,
    ): Promise<IVerificationTokenResponse | null> => {
        const data = await this.model.findOne(tokenData);
        return data;
    };

    // public updateBoardById = async (
    //     id: string,
    //     name: string,
    // ): Promise<IBoardResponse | null> =>
    //     await this.repository.updateById(id, name);

    public deleteOne = async (
        tokenData: RootQuerySelector<IVerificationTokenModel>,
    ): Promise<IVerificationTokenResponse | null> =>
        await this.model.findOneAndDelete(tokenData);
}

export default VerificationTokenRepository;
