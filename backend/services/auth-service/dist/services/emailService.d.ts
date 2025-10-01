export interface EmailConfig {
    host: string;
    port: number;
    secure: boolean;
    auth: {
        user: string;
        pass: string;
    };
}
export interface EmailOptions {
    to: string;
    subject: string;
    html: string;
    text?: string;
}
declare class EmailService {
    private transporter;
    private isConfigured;
    constructor();
    private initialize;
    sendEmail(options: EmailOptions): Promise<boolean>;
    sendPasswordResetEmail(email: string, resetToken: string, resetUrl: string): Promise<boolean>;
    isEnabled(): boolean;
}
export declare const emailService: EmailService;
export {};
