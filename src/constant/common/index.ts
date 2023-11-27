import Config from 'utils/config';
import { generateEmailVerificationSubject } from 'utils/emailTemplate';

export const DEFAULT_STAGES = [
    {
        name: 'Development',
        position: 1,
    },
    {
        name: 'In-Progress',
        position: 2,
    },
    {
        name: 'Done',
        position: 3,
    },
];

export const DEFAULT_PRIORITIES = [
    {
        name: 'Low',
    },
    {
        name: 'Medium',
    },
    {
        name: 'High',
    },
];

export const EMAIL_VERIFICATION_TEMPLATE_PARAMETERS = {
    THEME: 'default',
    BUTTON: {
        color: '#1a73e8',
        text: 'Verify your account',
    },
    PRODUCT_PARAMETERS: {
        name: 'Board company',
        link: Config.getEnv('SERVER_BASE_URL'),
    },
    HEADER: generateEmailVerificationSubject(),
};

export const RESET_PASSWORD_TEMPLATE_PARAMETERS = {
    THEME: 'default',
    BUTTON: {
        color: '#1a73e8',
        text: 'RESET',
    },
    PRODUCT_PARAMETERS: {
        name: 'Board company',
        link: Config.getEnv('SERVER_BASE_URL'),
    },
};
