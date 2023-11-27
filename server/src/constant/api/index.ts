import Config from 'utils/config';

//CLIENT API

export const SIGN_UP_COMPLETION_ROUTE = '/auth/completion';
export const GOOGLE_FAILURE_REDIRECT_ROUTE = '/auth/login';
export const RESET_PASSWORD_REDIRECT_ROUTE = '/auth/resetPassword';

export const RESET_PASSWORD_URL = `${Config.getEnv(
    'CLIENT_BASE_URL',
)}${RESET_PASSWORD_REDIRECT_ROUTE}`;

// SERVER API

export const USER_API = {
    SIGN_UP: '/auth/signup',
    LOGIN: '/auth/login',
    LOG_OUT: '/auth/logout',
    LOGIN_GOOGLE: '/auth/google',
    RESET_PASSWORD: '/auth/reset_password',
    UPDATE_PASSWORD: '/auth/update_password',
    LOGIN_GOOGLE_REDIRECT: '/auth/google/callback',
    UPDATE_ACCESS_TOKEN: '/auth/token',
    EMAIL_VERIFICATION: '/auth/email_verification',
};

export const BASE_API = '/api';

export const EMAIL_VERIFICATION_API = `${Config.getEnv(
    'SERVER_BASE_URL',
)}${BASE_API}${USER_API.EMAIL_VERIFICATION}`;

export const BOARD_API = {
    GET_ALL: '/boards',
    GET_SINGLE: '/board',
    CREATE: '/board',
    DELETE: '/board',
};

export const PRIORITY_API = {
    GET_ALL: '/priorities',
    CREATE: '/priority',
};

export const STAGE_API = {
    GET_ALL: '/stages',
    CREATE: '/stage',
    DELETE: '/stage',
};

export const ENV_VARIABLES = {
    DATABASE_URL: Config.getEnv('DATABASE_URL'),
    DATABASE_PORT: Number(Config.getEnv('DATABASE_PORT')),
};
