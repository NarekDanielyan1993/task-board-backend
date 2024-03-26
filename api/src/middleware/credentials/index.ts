import { NextFunction, Request, Response } from 'express';

export const credentials = (
    req: Request,
    res: Response,
    next: NextFunction,
) => {
    // const origin = req.headers.origin;

    // if (isExist(origin) && allowedOrigins.includes(origin)) {
    res.header('Access-Control-Allow-Credentials', 'true');
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader(
        'Access-Control-Allow-Methods',
        'OPTIONS, GET, POST, PUT, PATCH, DELETE',
    );
    res.setHeader(
        'Access-Control-Allow-Headers',
        'Content-Type, Authorization',
    );
    // }
    next();
};
