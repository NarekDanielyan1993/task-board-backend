import { CorsOptions } from 'cors';

export const allowedOrigins = [
    'http://localhost:9000',
    'http://localhost:5000',
    'http://localhost:3000',
    'https://task-board-frontend-one.vercel.app',
    'https://task-board-frontend.onrender.com',
];

export const corsOptions: CorsOptions = {
    origin: '*',
    methods: '*',
    credentials: true,
    optionsSuccessStatus: 200,
    preflightContinue: true,
    allowedHeaders: [
        'Origin',
        'X-CSRF-Token',
        'X-Requested-With',
        'Accept',
        'Accept-Version',
        'Content-Length',
        'Content-MD5',
        'Content-Type',
        'Date',
        'X-Api-Version',
        'Authorization',
    ],
};
