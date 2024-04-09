/* eslint-disable max-lines */
import { SIGN_UP_COMPLETION_ROUTE } from 'constant/api';
import {
    EMAIL_VERIFICATION_TOKEN_EXPIRATION_DATE,
    EXPIRES_IN_1_DAY,
    JWT_EXPIRES_IN_1_DAY,
    JWT_EXPIRES_IN_5_MINUTES,
} from 'constant/auth';
import { NextFunction, Request, Response } from 'express';
import jwt, { JwtPayload } from 'jsonwebtoken';
import { InternalServerError } from 'lib/error';
import VerificationModel from 'model/verificationToken';
import VerificationTokenRepository from 'repository/verificationToken';
import EmailService from 'service/email';
import VerificationService from 'service/verificationToken';
import { IAccountResponse } from 'types/account';
import {
    IEmailVerifyTokenQueryData,
    IUserCreate,
    IUserResponse,
    IUserService,
} from 'types/user';
import { IVerificationTokenResponse } from 'types/verificationToken';
import Config from 'utils/config';
import {
    generateJwtToken,
    isExist,
    setCookie,
    verifyJwtToken,
} from 'utils/helper';

export default class UserController {
    private userService: IUserService;

    constructor(userService: IUserService) {
        this.userService = userService;
    }

    public createUser = async (
        req: Request,
        res: Response,
        next: NextFunction,
    ) => {
        try {
            const userData: IUserCreate = req.body;

            const isUserWithEmailExists = await this.userService.isEmailExists(
                userData.email,
            );

            if (isUserWithEmailExists) {
                throw new Error('User with this email already exists');
            }
            const hashedPassword = await this.userService.encryptPassword(
                userData.password,
            );

            const savedUser: IUserResponse = await this.userService.createUser({
                ...userData,
                password: hashedPassword,
            });

            const newToken = await generateJwtToken({
                id: savedUser._id.toString(),
            });

            if (!newToken) {
                throw new InternalServerError('Internal server error');
            }

            const verificationTokenService = new VerificationService(
                new VerificationTokenRepository(VerificationModel),
            );

            const generatedToken = await verificationTokenService.createToken({
                token: newToken,
                identifier: savedUser._id.toString(),
                expires: EMAIL_VERIFICATION_TOKEN_EXPIRATION_DATE,
            });

            const emailService = new EmailService();
            await emailService.sendEmailVerificationRequest(
                savedUser.email,
                generatedToken.token,
            );

            res.status(200).json({ msg: 'success' });
        } catch (error) {
            next(error);
        }
    };

    public verifyEmail = async (
        req: Request,
        res: Response,
        next: NextFunction,
    ) => {
        try {
            const { token } = req.query as IEmailVerifyTokenQueryData;

            const decodedToken = jwt.verify(
                token,
                Config.getEnv('ACCESS_TOKEN_KEY'),
            );

            if (!isExist(decodedToken)) {
                throw new Error('Internal server error.');
            }

            const verificationTokenService = new VerificationService(
                new VerificationTokenRepository(VerificationModel),
            );

            const verificationTokenData: IVerificationTokenResponse | null =
                await verificationTokenService.getByIdentifier(decodedToken.id);
            if (!verificationTokenData) {
                throw new Error('Internal server error.');
            }

            const isValid = verificationTokenService.isTokenValid(
                token,
                verificationTokenData.token,
            );

            if (!isValid) {
                throw new Error('Internal server error.');
            }

            const isExpired = verificationTokenService.isTokenExpired(
                decodedToken.exp as number,
                verificationTokenData.expires,
            );

            if (isExpired) {
                throw new Error('Internal server error.');
            }

            const updatedUser = await this.userService.verifyEmail(
                decodedToken.id,
            );

            if (!updatedUser) {
                //TODO  Redirect to email expired page
                throw new Error('Internal server error.');
            }

            await verificationTokenService.deleteVerificationToken(
                verificationTokenData._id?.toString() as string,
            );

            return res.redirect(
                `${Config.getEnv(
                    'CLIENT_BASE_URL',
                )}${SIGN_UP_COMPLETION_ROUTE}`,
            );
        } catch (error) {
            next(error);
        }
    };

    public login = async (req: Request, res: Response, next: NextFunction) => {
        try {
            const { email, password } = req.body;
            const user = await this.userService.findByEmail(email);

            if (!isExist(user)) {
                throw new Error('User not found');
            }

            const isPasswordValid = await this.userService.verifyPassword(
                password,
                user.password,
            );

            if (!isPasswordValid) {
                throw new Error('Password is incorrect');
            }

            const accessToken = generateJwtToken({
                id: user._id.toString(),
                expiresIn: JWT_EXPIRES_IN_5_MINUTES,
                secretKey: Config.getEnv('ACCESS_TOKEN_KEY'),
            });

            const refreshToken = generateJwtToken({
                id: user._id.toString(),
                expiresIn: JWT_EXPIRES_IN_1_DAY,
                secretKey: Config.getEnv('REFRESH_TOKEN_KEY'),
            });

            const verificationTokenService = new VerificationService(
                new VerificationTokenRepository(VerificationModel),
            );

            await verificationTokenService.createToken({
                token: refreshToken,
                expires: new Date(EXPIRES_IN_1_DAY),
                identifier: user._id.toString(),
            });

            setCookie(req, res, 'refreshToken', refreshToken, {
                httpOnly: true,
            });

            setCookie(req, res, 'isLoggedIn', 'true');

            res.status(200).json({ accessToken });
        } catch (error) {
            next(error);
        }
    };

    public authenticateWithGoogle = async (
        req: Request,
        res: Response,
        next: NextFunction,
    ) => {
        const user = req.user as IAccountResponse;
        try {
            const refreshToken = generateJwtToken({
                id: user._id.toString(),
                expiresIn: JWT_EXPIRES_IN_1_DAY,
                secretKey: Config.getEnv('REFRESH_TOKEN_KEY'),
            });

            const verificationTokenService = new VerificationService(
                new VerificationTokenRepository(VerificationModel),
            );

            await verificationTokenService.createToken({
                token: refreshToken,
                expires: new Date(EXPIRES_IN_1_DAY),
                identifier: user._id.toString(),
            });

            setCookie(req, res, 'refreshToken', refreshToken);

            setCookie(req, res, 'isLoggedIn', 'true');

            res.redirect(`${Config.getEnv('CLIENT_BASE_URL')}/boards`);
        } catch (error) {
            res.redirect(`${Config.getEnv('CLIENT_BASE_URL')}/auth/login`);
            next(error);
        }
    };

    public updateAccessToken = async (
        req: Request,
        res: Response,
        next: NextFunction,
    ) => {
        try {
            const cookies = req.cookies;
            if (!cookies.refreshToken) {
                throw new Error('UnAuthorized');
            }

            const refreshToken = cookies.refreshToken;

            const decodedToken: JwtPayload = verifyJwtToken(
                refreshToken,
                Config.getEnv('REFRESH_TOKEN_KEY'),
            );

            const verificationTokenService = new VerificationService(
                new VerificationTokenRepository(VerificationModel),
            );

            const userTokenData =
                await verificationTokenService.getByIdentifier(decodedToken.id);

            if (
                !isExist(userTokenData) ||
                decodedToken.id !==
                    (userTokenData.identifier?.toString() as string)
            ) {
                throw new Error('UnAuthorized');
            }

            const accessToken = generateJwtToken({
                id: decodedToken.id,
                expiresIn: JWT_EXPIRES_IN_5_MINUTES,
                secretKey: Config.getEnv('ACCESS_TOKEN_KEY'),
            });

            setCookie(req, res, 'isLoggedIn', 'true', {
                maxAge: EXPIRES_IN_1_DAY,
            });

            res.status(200).json({ accessToken });
        } catch (error) {
            res.clearCookie('isLoggedIn');
            res.clearCookie('refreshToken');
            next(error);
        }
    };

    public resetPassword = async (
        req: Request,
        res: Response,
        next: NextFunction,
    ) => {
        try {
            const { email } = req.body;
            const user = await this.userService.findByEmail(email);
            if (!isExist(user)) {
                throw new Error('User not found');
            }
            const newToken = await generateJwtToken({
                id: user._id.toString(),
            });

            if (!newToken) {
                throw new Error('Internal server error');
            }

            const verificationTokenService = new VerificationService(
                new VerificationTokenRepository(VerificationModel),
            );

            const generatedToken = await verificationTokenService.createToken({
                token: newToken,
                identifier: user._id.toString(),
                expires: EMAIL_VERIFICATION_TOKEN_EXPIRATION_DATE,
            });

            const emailService = new EmailService();
            await emailService.sendResetPasswordRequest(
                user.email,
                generatedToken.token,
            );
            res.status(200).json({ msg: 'success' });
        } catch (error) {
            next(error);
        }
    };

    public updatePassword = async (
        req: Request,
        res: Response,
        next: NextFunction,
    ) => {
        try {
            const { token, password } = req.body;

            const decodedToken = jwt.verify(
                token,
                Config.getEnv('ACCESS_TOKEN_KEY'),
            );

            if (!isExist(decodedToken)) {
                throw new Error('Internal server error.');
            }

            const verificationTokenService = new VerificationService(
                new VerificationTokenRepository(VerificationModel),
            );

            const verificationTokenData: IVerificationTokenResponse | null =
                await verificationTokenService.getByIdentifier(decodedToken.id);

            if (!verificationTokenData) {
                throw new Error('Internal server error.');
            }

            const isValid = verificationTokenService.isTokenValid(
                token,
                verificationTokenData.token,
            );

            if (!isValid) {
                throw new Error('Internal server error.');
            }

            const isExpired = verificationTokenService.isTokenExpired(
                decodedToken.exp as number,
                verificationTokenData.expires,
            );

            if (isExpired) {
                throw new Error('Internal server error.');
            }

            const hashedPassword =
                await this.userService.encryptPassword(password);
            const updatedUser = await this.userService.updatePassword(
                decodedToken.id,
                hashedPassword,
            );

            if (!updatedUser) {
                //TODO  Redirect to email expired page
                throw new Error('Internal server error.');
            }

            await verificationTokenService.deleteVerificationToken(
                verificationTokenData._id?.toString() as string,
            );

            return res.status(200).json({ msg: 'success' });
        } catch (error) {
            next(error);
        }
    };

    public logout = async (req: Request, res: Response, next: NextFunction) => {
        try {
            // clearCookie(req, res);
            res.clearCookie('isLoggedIn', {
                domain: '.tacktrecker.site',
                secure: true,
            });
            res.clearCookie('refreshToken', {
                httpOnly: true,
                domain: '.tacktrecker.site',
                secure: true,
            });
            const decodedToken = verifyJwtToken(
                req.cookies.refreshToken,
                Config.getEnv('REFRESH_TOKEN_KEY'),
            );
            const verificationTokenService = new VerificationService(
                new VerificationTokenRepository(VerificationModel),
            );
            await verificationTokenService.deleteVerificationTokenByIdentifier(
                decodedToken.id,
            );
            res.status(200).json({ msg: 'success' });
        } catch (error) {
            next(error);
        }
    };
}
