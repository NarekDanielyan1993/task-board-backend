export const EMAIL_VERIFICATION_TOKEN_EXPIRATION_DATE = new Date(
    Date.now() + 6 * 60 * 60 * 1000,
);

export const EXPIRES_IN_1_DAY = 24 * 60 * 60 * 1000;
export const EXPIRES_IN_5_MINUTES = 5 * 60 * 1000;
export const EXPIRES_IN_1_MINUTES = 60 * 1000;
export const EXPIRES_IN_30_SECONDS = 30 * 1000;

export const JWT_EXPIRES_IN_10_MINUTES = '10m';
export const JWT_EXPIRES_IN_MINUTE = '1m';
export const JWT_EXPIRES_IN_5_MINUTES = '5m';
export const JWT_EXPIRES_IN_1_DAY = '1d';

export const SESSION_PROVIDERS = {
    GOOGLE: 'google',
};
