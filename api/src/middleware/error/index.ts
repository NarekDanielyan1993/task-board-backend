import { NextFunction, Request, Response } from 'express';
import { AppError } from 'lib/error';

function errorMiddleware(
    err: AppError,
    req: Request,
    res: Response,
    next: NextFunction,
) {
    const statusCode = err.httpCode || 500;
    console.error('Unexpected error:', err.stack);
    if (err.isOperational) {
        return res.status(statusCode).json(err);
    }

    res.status(500).json({
        message: 'Internal Server Error',
    });
}

export default errorMiddleware;
