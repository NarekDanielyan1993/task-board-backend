import { Model } from 'mongoose';
import {
    IAccountCreate,
    IAccountModel,
    IAccountRepository,
    IAccountResponse,
} from 'types/account';

class AccountRepository implements IAccountRepository {
    private model: Model<IAccountModel>;

    constructor(model: Model<IAccountModel>) {
        this.model = model;
    }

    async findOne(id: string): Promise<IAccountResponse | null> {
        try {
            return await this.model.findOne({ _id: id });
        } catch (error) {
            throw new Error('An error occurred while finding the User.');
        }
    }

    async create(accountData: IAccountCreate): Promise<IAccountResponse> {
        try {
            return await this.model.create(accountData);
        } catch (error) {
            throw new Error('An error occurred while creating the User.');
        }
    }

    async findOrCreate(
        profileId: string,
        accountData: IAccountCreate,
    ): Promise<IAccountResponse> {
        try {
            return await this.model.findOneAndUpdate(
                { providerId: profileId },
                accountData,
                {
                    new: true,
                    upsert: true,
                },
            );
        } catch (error) {
            console.log(error);
            throw new Error('An error occurred while creating the User.');
        }
    }

    // async deleteById(id: string): Promise<IBoardResponse> {
    //     try {
    //         const deletedBoard = (await this.model.findByIdAndRemove(
    //             id,
    //         )) as IBoardResponse;
    //         if (!deletedBoard) {
    //             throw new Error('Board not found.');
    //         }
    //         return deletedBoard;
    //     } catch (error) {
    //         throw new Error('An error occurred while deleting the board.');
    //     }
    // }
}

export default AccountRepository;
