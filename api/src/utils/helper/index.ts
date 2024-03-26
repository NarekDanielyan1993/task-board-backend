import bcrypt from 'bcryptjs';
import { EXPIRES_IN_1_DAY, JWT_EXPIRES_IN_10_MINUTES } from 'constant/auth';
import Cookies, { Cookie } from 'cookies';
import { Request, Response } from 'express';
import jwt, { JwtPayload } from 'jsonwebtoken';
import Config from 'utils/config';

export const isExist = (item: unknown): item is boolean =>
    item !== undefined && item !== null;

export const generateJwtToken = ({
    id,
    expiresIn = JWT_EXPIRES_IN_10_MINUTES,
    secretKey = Config.getEnv('ACCESS_TOKEN_KEY'),
}: {
    id: string;
    expiresIn?: string;
    secretKey?: string;
}): string => {
    try {
        const token = jwt.sign({ id }, secretKey, {
            expiresIn,
        });
        return token;
    } catch (error) {
        console.log(error);
        throw error;
    }
};

export const verifyJwtToken = (
    token: string,
    secretKey: string = Config.getEnv('ACCESS_TOKEN_KEY'),
): JwtPayload => {
    try {
        const decoded = jwt.verify(token, secretKey);
        return decoded as JwtPayload;
    } catch (error) {
        console.log(error);
        throw new Error('UnAuthorized');
    }
};

export async function generateBcryptToken(payload: string, saltRounds = 10) {
    const salt = await bcrypt.genSalt(saltRounds);
    const hash = await bcrypt.hash(payload, salt);

    return hash;
}

export function setCookie(
    req: Request,
    res: Response,
    name: string,
    value: string,
    options?: Partial<Cookie>,
) {
    const defaultCookieOptions: Partial<Cookie> = {
        httpOnly: true,
        secure: false,
        maxAge: EXPIRES_IN_1_DAY,
        sameSite: false,
    };
    const cookies = new Cookies(req, res);
    cookies.set(name, value, { ...defaultCookieOptions, ...options });
}
