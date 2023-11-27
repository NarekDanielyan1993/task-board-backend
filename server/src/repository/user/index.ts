import { FilterQuery, Model, RootQuerySelector, UpdateQuery } from 'mongoose';
import IUserModel, { IUserRepository, IUserResponse } from 'types/user';

class UserRepository implements IUserRepository {
    private model: Model<IUserModel>;

    constructor(model: Model<IUserModel>) {
        this.model = model;
    }

    async create(
        queryData: RootQuerySelector<IUserModel>,
    ): Promise<IUserResponse> {
        try {
            return (await this.model.create(queryData)) as IUserResponse;
        } catch (error) {
            throw new Error('An error occurred while creating the User.');
        }
    }

    async find(
        userData: RootQuerySelector<IUserModel>,
    ): Promise<IUserResponse | null> {
        try {
            return (await this.model.findOne(userData)) as IUserResponse;
        } catch (error) {
            throw new Error('An error occurred while finding the User.');
        }
    }

    async findOne(
        userData: RootQuerySelector<IUserModel>,
    ): Promise<IUserResponse | null> {
        try {
            return (await this.model.findOne(userData)) as IUserResponse;
        } catch (error) {
            throw new Error('An error occurred while finding the User.');
        }
    }

    // async findOneOrCreate(
    //     id: string,
    //     userData: UpdateQuery<IUserModel>,
    // ): Promise<IUserResponse | null> {
    //     try {
    //         const updatedUser = (await this.model.findOneAndUpdate(
    //             filter,
    //             userData,
    //             {
    //                 new: true,
    //             },
    //         )) as IUserResponse;

    //         if (!updatedUser) {
    //             throw new Error('User not found.');
    //         }
    //         return updatedUser;
    //     } catch (error) {
    //         throw new Error('An error occurred while updating the board.');
    //     }
    // }

    async updateOne(
        filter: FilterQuery<IUserModel>,
        userData: UpdateQuery<IUserModel>,
    ): Promise<IUserResponse | null> {
        try {
            const updatedUser = (await this.model.findOneAndUpdate(
                filter,
                userData,
                {
                    new: true,
                },
            )) as IUserResponse;

            if (!updatedUser) {
                throw new Error('User not found.');
            }
            return updatedUser;
        } catch (error) {
            throw new Error('An error occurred while updating the board.');
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

export default UserRepository;
