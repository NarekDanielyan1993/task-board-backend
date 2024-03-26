export interface IEmailService {
    sendEmailVerificationRequest: (
        email: string,
        emailToken: string,
    ) => Promise<void>;
    sendEmail: (
        subject: string,
        text: string,
        recipient: string,
    ) => Promise<void>;
    sendResetPasswordRequest: (
        email: string,
        emailToken: string,
    ) => Promise<void>;
}

export interface IMailGenOptions {
    theme?: string;
    bodyName?: string;
    productOptions?: IProductOptions;
    actionInstructions?: string;
    buttonOptions: IMailGenButtonOptions;
    outro?: string;
}

export interface IProductOptions {
    productName: string;
    productLink: string;
}

export interface IMailGenButtonOptions {
    color?: string;
    text?: string;
    link: string;
}
