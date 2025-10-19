import 'dotenv/config';
import { google } from 'googleapis';

const { GMAIL_CLIENT_ID, GMAIL_CLIENT_SECRET, GMAIL_REFRESH_TOKEN, GMAIL_USER } = process.env;

const oauth2 = new google.auth.OAuth2(GMAIL_CLIENT_ID, GMAIL_CLIENT_SECRET, 'http://localhost');
oauth2.setCredentials({ refresh_token: GMAIL_REFRESH_TOKEN });

function b64url(s: string) {
    return Buffer.from(s).toString('base64').replace(/\+/g, '-').replace(/\//g, '_').replace(/=+$/, '');
}

(async () => {
    const gmail = google.gmail({ version: 'v1', auth: oauth2 });

    const raw = [
        `From: ${GMAIL_USER}`,
        `To: ${GMAIL_USER}`,
        'Subject: REST test',
        'MIME-Version: 1.0',
        'Content-Type: text/html; charset=UTF-8',
        '',
        '<b>Hello from Gmail REST API</b>',
    ].join('\r\n');

    const res = await gmail.users.messages.send({
        userId: 'me',
        requestBody: { raw: b64url(raw) },
    });

    console.log('REST send OK. Message ID:', res.data.id);
})();
