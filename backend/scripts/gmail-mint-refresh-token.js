// Gmail OAuth2 refresh token minting script
// Usage: node gmail-mint-refresh-token.js

const { google } = require('googleapis');
const readline = require('readline');

const CLIENT_ID = process.env.GMAIL_CLIENT_ID || '';
const CLIENT_SECRET = process.env.GMAIL_CLIENT_SECRET || '';
const REDIRECT_URI = 'urn:ietf:wg:oauth:2.0:oob';
const SCOPES = ['https://www.googleapis.com/auth/gmail.send'];

if (!CLIENT_ID || !CLIENT_SECRET) {
  console.error('Set GMAIL_CLIENT_ID and GMAIL_CLIENT_SECRET in your environment.');
  process.exit(1);
}

const oAuth2Client = new google.auth.OAuth2(
  CLIENT_ID,
  CLIENT_SECRET,
  REDIRECT_URI
);

const authUrl = oAuth2Client.generateAuthUrl({
  access_type: 'offline',
  scope: SCOPES,
});

console.log('Authorize this app by visiting this url:');
console.log(authUrl);

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

rl.question('Enter the code from that page here: ', async (code) => {
  rl.close();
  try {
    const { tokens } = await oAuth2Client.getToken(code);
    console.log('\nYour refresh token:');
    console.log(tokens.refresh_token);
    console.log('\nAdd this to your Railway environment as GMAIL_REFRESH_TOKEN');
  } catch (err) {
    console.error('Error retrieving access token', err);
  }
});
