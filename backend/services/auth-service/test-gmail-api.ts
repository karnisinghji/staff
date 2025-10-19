import 'dotenv/config';
import { emailService } from './src/services/emailService';

(async () => {
    const result = await emailService.sendEmail({
        to: process.env.GMAIL_USER || '',
        subject: 'Test Gmail API OAuth2',
        html: '<b>This is a test email sent via Gmail API OAuth2 from local CLI</b>',
        text: 'This is a test email sent via Gmail API OAuth2 from local CLI'
    });
    console.log('Email sent:', result);
})();
