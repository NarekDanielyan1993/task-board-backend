import { CorsOptions } from 'cors';

export const allowedOrigins = [
    'http://localhost:9000',
    'http://localhost:5000',
    'http://localhost:3000',
    'https://task-board-frontend-one.vercel.app',
];

export const corsOptions: CorsOptions = {
    origin: allowedOrigins,
    credentials: true,
    optionsSuccessStatus: 200,
    preflightContinue: true,
    // methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH', 'OPTIONS'],
    // allowedHeaders: [
    //     'Content-Type',
    //     'Origin',
    //     'X-Requested-With',
    //     'Accept',
    //     'Authorization',
    // ],
};
