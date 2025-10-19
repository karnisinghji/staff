import 'dotenv/config';
import { google } from 'googleapis';

const { GMAIL_CLIENT_ID, GMAIL_CLIENT_SECRET, GMAIL_REFRESH_TOKEN, GMAIL_USER } = process.env;

const oauth2 = new google.auth.OAuth2(GMAIL_CLIENT_ID, GMAIL_CLIENT_SECRET, 'http://localhost');
oauth2.setCredentials({ refresh_token: GMAIL_REFRESH_TOKEN });

(async () => {
    const { token } = await oauth2.getAccessToken();
    if (!token) throw new Error('Could not obtain access token from refresh token');

    // 1) Check scopes
    const info = await oauth2.getTokenInfo(token);
    console.log('Scopes on token:', info.scopes);

    // 2) Check which mailbox this token actually belongs to
    const gmail = google.gmail({ version: 'v1', auth: oauth2 });
    const profile = await gmail.users.getProfile({ userId: 'me' });
    console.log('Token email:     ', profile.data.emailAddress);
    console.log('Env GMAIL_USER:  ', GMAIL_USER);
})();
