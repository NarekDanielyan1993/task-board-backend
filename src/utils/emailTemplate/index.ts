import { EMAIL_VERIFICATION_API, RESET_PASSWORD_URL } from 'constant';

// EMAIL VERIFICATION

export const generateVerificationEmailLink = (token: string) =>
    `${EMAIL_VERIFICATION_API}?token=${token}`;

export const generateEmailVerificationSubject = () =>
    `Email Verification - Activate Your Account`;

export const generateEmailVerificationBody = () =>
    `Thank you for registering with our platform! We're excited to have you on board.
     Before you can start using your account, please verify your email address by clicking the link below:
     If you did not sign up for an account or received this email in error, you can safely ignore it.
    `;

export const generateEmailOutroText = () =>
    'Welcome aboard and happy exploring!';

// RESET PASSWORD

export const generateResetPasswordSubject = () => `Password Reset`;

export const generateResetPasswordBody = () =>
    `Please go through this link to rest password.`;

export const generateResetPasswordLink = (token: string) =>
    `${RESET_PASSWORD_URL}?token=${token}&type=update`;
