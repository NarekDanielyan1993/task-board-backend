import { CorsOptions } from 'cors';

export const allowedOrigins = [
    'http://localhost:9000',
    'http://localhost:5000',
    'http://localhost:3000',
    'http://localhost:4000',
    'https://task-board-frontend.onrender.com',
    'https://frontend.tasktrecker.site',
];

export const corsOptions: CorsOptions = {
    origin: allowedOrigins,
    methods: ['POST', 'PUT', 'GET', 'DELETE', 'OPTIONS'],
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
