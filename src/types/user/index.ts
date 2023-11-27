import { FilterQuery, RootQuerySelector, Types, UpdateQuery } from 'mongoose';

interface IUserModel {
    name: string;
    email: string;
    password: string;
    verifiedEmail: Date;
}

export interface IUserCreate {
    name: string;
    email: string;
    password: string;
}

export type IEmailVerifyTokenQueryData = {
    token: string;
};

// export interface ITokenPayload {
//     sub: string;
//     expiry: string;
// }

export interface IUserResponse extends IUserModel {
    id: string;
    _id: Types.ObjectId;
}

// export interface IUserResponseWithPassword extends IUserCreate {
//     id: string;
//     _id: Types.ObjectId;
// }

export interface IUserService {
    createUser(board: IUserCreate): Promise<IUserResponse>;
    isEmailExists(email: string): Promise<boolean>;
    verifyEmail(id: string): Promise<IUserResponse | null>;
    findByEmail(email: string): Promise<IUserResponse | null>;
    findById(id: string): Promise<IUserResponse | null>;
    encryptPassword(password: string): Promise<string>;
    verifyPassword(password: string, hashedPassword: string): Promise<boolean>;
    updatePassword(id: string, password: string): Promise<IUserResponse | null>;
    // updateBoardById(id: string, name: string): Promise<IBoardResponse | null>;
    // deleteBoardById(id: string): Promise<IBoardResponse>;
}

export interface IUserRepository {
    create(userData: RootQuerySelector<IUserModel>): Promise<IUserResponse>;
    find(
        userData: RootQuerySelector<IUserModel>,
    ): Promise<IUserResponse | null>;
    findOne(
        userData: RootQuerySelector<IUserModel>,
    ): Promise<IUserResponse | null>;
    updateOne(
        filter: FilterQuery<IUserModel>,
        userData: UpdateQuery<IUserModel>,
    ): Promise<IUserResponse | null>;
    // findOne(
    //     userData: RootQuerySelector<IUserModel>,
    // ): Promise<IUserResponse | null>;
    // updateById(id: string, name: string): Promise<IBoardResponse | null>;
    // deleteById(id: string): Promise<IBoardResponse>;
}

export default IUserModel;
