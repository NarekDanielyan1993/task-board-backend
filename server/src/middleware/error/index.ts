import { NextFunction, Request, Response } from 'express';
import AppError from 'lib/error';

function errorMiddleware(err: AppError, req: Request, res: Response, next: NextFunction) {
    const statusCode = err.statusCode || 500;
    const message = err.message || 'Something went wrong';

    console.error('Unexpected error:', err.stack);
    // if (err.isOperational) {
    //     return res.status(statusCode).json({
    //         status: 'error',
    //         statusCode,
    //         message,
    //     });
    // }

    // res.status(500).json({
    //     statusCode: 500,
    //     message: 'Internal Server Error',
    // });

    res.status(statusCode).json({
            status: 'error',
            statusCode,
            message,
        });
}

export default errorMiddleware;
