import { RootQuerySelector, Types } from 'mongoose';

export interface IVerificationTokenModel {
    identifier: string;
    token: string;
    expires: Date;
}

export interface IVerificationTokenCreate {
    identifier: string;
    token: string;
    expires: Date;
}

export interface IVerificationTokenResponse extends IVerificationTokenModel {
    _id?: Types.ObjectId;
    id?: string;
}

export interface IVerificationTokenService {
    createToken(
        tokenData: IVerificationTokenCreate,
    ): Promise<IVerificationTokenResponse>;
    isTokenValid(userToken: string, verificationToken: string): boolean;
    isTokenExpired(
        userTokenExpiration: number,
        verificationTokenExpiration: Date,
    ): boolean;
    deleteVerificationToken(
        id: string,
    ): Promise<IVerificationTokenResponse | null>;
    deleteVerificationTokenByIdentifier(
        token: string,
    ): Promise<IVerificationTokenResponse | null>;
}

export interface IVerificationTokenRepository {
    createOrUpdate(tokenData: IVerificationTokenModel): Promise<any>;
    findOne(
        userData: RootQuerySelector<IVerificationTokenModel>,
    ): Promise<IVerificationTokenResponse | null>;
    deleteOne(
        tokenData: RootQuerySelector<IVerificationTokenModel>,
    ): Promise<IVerificationTokenResponse | null>;
    // updateById(id: string, name: string): Promise<IBoardResponse | null>;
}
