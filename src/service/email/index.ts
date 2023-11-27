import { EMAIL_VERIFICATION_TEMPLATE_PARAMETERS } from 'constant';
import Mailgen from 'mailgen';
import nodemailer from 'nodemailer';
import { IEmailService } from 'types/email';
import Config from 'utils/config';
import {
    generateEmailOutroText,
    generateEmailVerificationBody,
    generateResetPasswordBody,
    generateResetPasswordLink,
    generateResetPasswordSubject,
    generateVerificationEmailLink,
} from 'utils/emailTemplate';

class EmailService implements IEmailService {
    private createTransport = () => {
        const transporter = nodemailer.createTransport({
            service: Config.getEnv('NODEMAILER_PROVIDER'),
            secure: true,
            auth: {
                user: Config.getEnv('NODEMAILER_EMAIL'),
                pass: Config.getEnv('NODEMAILER_PASSWORD'),
            },
        });
        return transporter;
    };

    public sendEmail = async (
        recipient: string,
        text: string,
        subject?: string,
    ) => {
        const transporter = this.createTransport();
        try {
            await transporter.sendMail({
                from: process.env.NODEMAILER_EMAIL,
                to: recipient,
                subject,
                html: text,
            });
        } catch (error) {
            throw new Error('Internal server error');
        }
    };

    private getEmailVerificationTemplate = (token: string) => {
        const emailGenerator = new Mailgen({
            theme: 'default',
            product: {
                name: EMAIL_VERIFICATION_TEMPLATE_PARAMETERS.PRODUCT_PARAMETERS
                    .name,
                link: EMAIL_VERIFICATION_TEMPLATE_PARAMETERS.PRODUCT_PARAMETERS
                    .link,
            },
        });
        const email = {
            body: {
                name: EMAIL_VERIFICATION_TEMPLATE_PARAMETERS.HEADER,
                action: {
                    instructions: generateEmailVerificationBody(),
                    button: {
                        color: EMAIL_VERIFICATION_TEMPLATE_PARAMETERS.BUTTON
                            .color,
                        text: EMAIL_VERIFICATION_TEMPLATE_PARAMETERS.BUTTON
                            .text,
                        link: generateVerificationEmailLink(token),
                    },
                },
                outro: generateEmailOutroText(),
            },
        };
        const emailBody = emailGenerator.generate(email);
        return emailBody;
    };

    private getResetPasswordTemplate = (token: string) => {
        const emailGenerator = new Mailgen({
            theme: 'default',
            product: {
                name: EMAIL_VERIFICATION_TEMPLATE_PARAMETERS.PRODUCT_PARAMETERS
                    .name,
                link: EMAIL_VERIFICATION_TEMPLATE_PARAMETERS.PRODUCT_PARAMETERS
                    .link,
            },
        });
        const email = {
            body: {
                name: generateResetPasswordSubject(),
                action: {
                    instructions: generateResetPasswordBody(),
                    button: {
                        color: EMAIL_VERIFICATION_TEMPLATE_PARAMETERS.BUTTON
                            .color,
                        text: EMAIL_VERIFICATION_TEMPLATE_PARAMETERS.BUTTON
                            .text,
                        link: generateResetPasswordLink(token),
                    },
                },
                // outro: generateEmailOutroText(),
            },
        };
        const emailBody = emailGenerator.generate(email);
        return emailBody;
    };

    sendEmailVerificationRequest = async (
        email: string,
        emailToken: string,
    ): Promise<void> => {
        const emailBody = this.getEmailVerificationTemplate(emailToken);
        try {
            await this.sendEmail(email, emailBody);
            console.log(`Email sent to ${email}`);
        } catch (error) {
            throw new Error('Internal server error');
        }
    };

    public sendResetPasswordRequest = async (
        email: string,
        emailToken: string,
    ): Promise<void> => {
        const resetPasswordBody = this.getResetPasswordTemplate(emailToken);
        try {
            await this.sendEmail(email, resetPasswordBody);
            console.log(`Email sent to ${email}`);
        } catch (error) {
            throw new Error('Internal server error');
        }
    };
}

export default EmailService;
