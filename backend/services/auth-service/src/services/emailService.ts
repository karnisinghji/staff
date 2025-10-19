import { google } from 'googleapis';
import 'dotenv/config';

export interface EmailOptions {
    to: string;
    subject: string;
    html: string;
    text?: string;
}

class EmailService {
    private gmailUser = process.env.GMAIL_USER;
    private gmailClientId = process.env.GMAIL_CLIENT_ID;
    private gmailClientSecret = process.env.GMAIL_CLIENT_SECRET;
    private gmailRefreshToken = process.env.GMAIL_REFRESH_TOKEN;

    private oauth2 = new google.auth.OAuth2(
        this.gmailClientId,
        this.gmailClientSecret,
        'http://localhost'
    );

    constructor() {
        // Debug logging to see what's loaded
        console.log('[EmailService] Initializing with credentials:');
        console.log(`  GMAIL_USER: ${this.gmailUser ? 'SET' : 'MISSING'}`);
        console.log(`  GMAIL_CLIENT_ID: ${this.gmailClientId ? 'SET' : 'MISSING'}`);
        console.log(`  GMAIL_CLIENT_SECRET: ${this.gmailClientSecret ? 'SET' : 'MISSING'}`);
        console.log(`  GMAIL_REFRESH_TOKEN: ${this.gmailRefreshToken ? 'SET' : 'MISSING'}`);

        if (this.gmailRefreshToken) {
            this.oauth2.setCredentials({ refresh_token: this.gmailRefreshToken });
        }
    }

    private b64url(s: string) {
        return Buffer.from(s).toString('base64').replace(/\+/g, '-').replace(/\//g, '_').replace(/=+$/, '');
    }

    async sendEmail(options: EmailOptions): Promise<boolean> {
        if (!this.gmailUser || !this.gmailClientId || !this.gmailClientSecret || !this.gmailRefreshToken) {
            console.warn('[EmailService] Gmail API credentials missing. Email sending disabled.');
            return false;
        }
        try {
            const gmail = google.gmail({ version: 'v1', auth: this.oauth2 });
            const raw = [
                `From: ${this.gmailUser}`,
                `To: ${options.to}`,
                `Subject: ${options.subject}`,
                'MIME-Version: 1.0',
                'Content-Type: text/html; charset=UTF-8',
                '',
                options.html,
            ].join('\r\n');
            await gmail.users.messages.send({
                userId: 'me',
                requestBody: { raw: this.b64url(raw) },
            });
            console.log('[EmailService] ✅ Email sent via Gmail REST API');
            return true;
        } catch (error) {
            console.error('[EmailService] ❌ Failed to send email via Gmail REST API:', error);
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
        return await this.sendEmail({ to: email, subject, html });
    }

    isEnabled(): boolean {
        return !!(this.gmailUser && this.gmailClientId && this.gmailClientSecret && this.gmailRefreshToken);
    }
}

export const emailService = new EmailService();
