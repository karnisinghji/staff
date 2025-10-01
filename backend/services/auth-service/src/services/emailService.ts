import nodemailer from 'nodemailer';
import { createTransport } from 'nodemailer';

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

class EmailService {
    private transporter: nodemailer.Transporter | null = null;
    private isConfigured: boolean = false;

    constructor() {
        this.initialize();
    }

    private initialize() {
        const host = process.env.SMTP_HOST;
        const port = process.env.SMTP_PORT;
        const user = process.env.SMTP_USER;
        const pass = process.env.SMTP_PASS;

        if (!host || !port || !user || !pass) {
            console.warn('[EmailService] SMTP configuration missing. Email sending disabled.');
            console.warn('[EmailService] Set SMTP_HOST, SMTP_PORT, SMTP_USER, SMTP_PASS in .env');
            this.isConfigured = false;
            return;
        }

        try {
            this.transporter = createTransport({
                host,
                port: parseInt(port),
                secure: parseInt(port) === 465, // true for 465, false for other ports
                auth: {
                    user,
                    pass
                }
            });

            this.isConfigured = true;
            console.log('[EmailService] ✅ Email service configured successfully');
        } catch (error) {
            console.error('[EmailService] Failed to initialize:', error);
            this.isConfigured = false;
        }
    }

    async sendEmail(options: EmailOptions): Promise<boolean> {
        if (!this.isConfigured || !this.transporter) {
            console.warn('[EmailService] Cannot send email - service not configured');
            return false;
        }

        try {
            const info = await this.transporter.sendMail({
                from: `"${process.env.EMAIL_FROM_NAME || 'Contractor Worker Platform'}" <${process.env.SMTP_USER}>`,
                to: options.to,
                subject: options.subject,
                text: options.text || '',
                html: options.html
            });

            console.log('[EmailService] ✅ Email sent successfully:', info.messageId);
            return true;
        } catch (error) {
            console.error('[EmailService] ❌ Failed to send email:', error);
            return false;
        }
    }

    async sendPasswordResetEmail(email: string, resetToken: string, resetUrl: string): Promise<boolean> {
        const subject = 'Password Reset Request';

        const html = `
<!DOCTYPE html>
<html>
<head>
    <style>
        body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
        .container { max-width: 600px; margin: 0 auto; padding: 20px; }
        .header { background: linear-gradient(135deg, #43a047 0%, #a7c957 100%); color: white; padding: 30px; text-align: center; border-radius: 8px 8px 0 0; }
        .content { background: #f9f9f9; padding: 30px; border: 1px solid #ddd; }
        .button { display: inline-block; padding: 12px 30px; background: #43a047; color: white; text-decoration: none; border-radius: 5px; margin: 20px 0; }
        .footer { text-align: center; padding: 20px; font-size: 12px; color: #666; }
        .warning { background: #fff3cd; border-left: 4px solid #ffc107; padding: 15px; margin: 20px 0; }
    </style>
</head>
<body>
    <div class="container">
        <div class="header">
            <h1>🔐 Password Reset Request</h1>
        </div>
        <div class="content">
            <p>Hello,</p>
            
            <p>We received a request to reset your password for your <strong>Contractor Worker Platform</strong> account.</p>
            
            <p>Click the button below to reset your password:</p>
            
            <div style="text-align: center;">
                <a href="${resetUrl}" class="button">Reset Password</a>
            </div>
            
            <p>Or copy and paste this link into your browser:</p>
            <p style="word-break: break-all; background: #fff; padding: 10px; border: 1px solid #ddd; border-radius: 4px;">
                ${resetUrl}
            </p>
            
            <div class="warning">
                <strong>⚠️ Security Notice:</strong>
                <ul>
                    <li>This link will expire in <strong>1 hour</strong></li>
                    <li>If you didn't request this, please ignore this email</li>
                    <li>Your password won't change until you access the link above</li>
                </ul>
            </div>
            
            <p>If you have any questions or concerns, please contact our support team.</p>
            
            <p>Best regards,<br>
            <strong>Contractor Worker Platform Team</strong></p>
        </div>
        <div class="footer">
            <p>This is an automated email. Please do not reply to this message.</p>
            <p>&copy; ${new Date().getFullYear()} Contractor Worker Platform. All rights reserved.</p>
        </div>
    </div>
</body>
</html>
        `;

        const text = `
Password Reset Request

Hello,

We received a request to reset your password for your Contractor Worker Platform account.

Reset your password by visiting this link:
${resetUrl}

⚠️ Security Notice:
- This link will expire in 1 hour
- If you didn't request this, please ignore this email
- Your password won't change until you access the link above

Best regards,
Contractor Worker Platform Team
        `;

        return await this.sendEmail({ to: email, subject, html, text });
    }

    isEnabled(): boolean {
        return this.isConfigured;
    }
}

// Export singleton instance
export const emailService = new EmailService();
