import 'dotenv/config';
import http from 'http';
import open from 'open';
import { google } from 'googleapis';

const { GMAIL_CLIENT_ID, GMAIL_CLIENT_SECRET } = process.env;
if (!GMAIL_CLIENT_ID || !GMAIL_CLIENT_SECRET) {
    throw new Error('Set GMAIL_CLIENT_ID and GMAIL_CLIENT_SECRET in .env');
}

const PORT = 53682;
const REDIRECT_URI = `http://localhost:${PORT}/oauth2callback`;
const oauth2 = new google.auth.OAuth2(
    GMAIL_CLIENT_ID,
    GMAIL_CLIENT_SECRET,
    REDIRECT_URI
);

const SCOPES = ['https://mail.google.com/'];

const authUrl = oauth2.generateAuthUrl({
    access_type: 'offline',
    prompt: 'consent',
    scope: SCOPES,
});

const server = http.createServer(async (req, res) => {
    if (!req.url?.startsWith('/oauth2callback')) {
        res.writeHead(200);
        res.end('Waiting for Google OAuth...');
        return;
    }

    const url = new URL(req.url, `http://localhost:${PORT}`);
    const code = url.searchParams.get('code');

    if (!code) {
        res.writeHead(400);
        res.end('No authorization code found.');
        return;
    }

    try {
        const { tokens } = await oauth2.getToken(code);
        console.log('\n✅ OAuth Tokens received:');
        console.log('ACCESS TOKEN:', tokens.access_token);
        console.log('REFRESH TOKEN:', tokens.refresh_token, '\n');

        res.writeHead(200, { 'Content-Type': 'text/plain' });
        res.end(
            '✅ Success! Check your terminal for the refresh token. You can close this tab.'
        );
    } catch (error) {
        console.error('Error exchanging code for tokens:', error);
        res.writeHead(500);
        res.end('❌ Token exchange failed. See console.');
    } finally {
        server.close();
    }
});

server.listen(PORT, async () => {
    console.log('\n🌐 Open this URL to authorize your Gmail account:\n');
    console.log(authUrl);
    console.log('\nListening on', REDIRECT_URI, '...');
    await open(authUrl);
});
