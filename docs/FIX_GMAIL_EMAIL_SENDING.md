# Fix Gmail Email Sending - Password Reset Not Working

**Issue**: Users not receiving password reset emails  
**Root Cause**: Gmail OAuth refresh token is returning 401 Unauthorized - "deleted_client"

## Problem

The Gmail API credentials are configured but the refresh token is invalid:
- Error: `401 Unauthorized`
- Cause: `deleted_client`
- This means either:
  1. The OAuth client was deleted in Google Cloud Console
  2. The refresh token has expired or been revoked
  3. The client credentials don't match the refresh token

## Solution: Regenerate Gmail OAuth Credentials

### Step 1: Google Cloud Console Setup

1. Go to [Google Cloud Console](https://console.cloud.google.com)
2. Select your project (or create a new one)
3. Enable Gmail API:
   - Navigate to **APIs & Services** → **Library**
   - Search for "Gmail API"
   - Click **Enable**

### Step 2: Create OAuth 2.0 Credentials

1. Go to **APIs & Services** → **Credentials**
2. Click **+ CREATE CREDENTIALS** → **OAuth client ID**
3. Application type: **Web application**
4. Name: `ComeOnDost Email Service`
5. Authorized redirect URIs:
   - Add: `http://localhost`
   - Add: `https://developers.google.com/oauthplayground`
6. Click **CREATE**
7. **Save the Client ID and Client Secret**

### Step 3: Get Refresh Token

#### Option A: Using OAuth Playground (Recommended)

1. Go to [OAuth 2.0 Playground](https://developers.google.com/oauthplayground/)
2. Click the **Settings** gear icon (top right)
3. Check "Use your own OAuth credentials"
4. Enter your **Client ID** and **Client Secret**
5. In the left panel, scroll to **Gmail API v1**
6. Select: `https://www.googleapis.com/auth/gmail.send`
7. Click **Authorize APIs**
8. Sign in with the Gmail account you want to send emails from (khushabhu@gmail.com)
9. Click **Allow**
10. Click **Exchange authorization code for tokens**
11. **Copy the Refresh token** - You'll need this!

#### Option B: Using Node.js Script

```javascript
// get-gmail-token.js
const { google } = require('googleapis');
const readline = require('readline');

const oauth2Client = new google.auth.OAuth2(
  'YOUR_CLIENT_ID',
  'YOUR_CLIENT_SECRET',
  'http://localhost'
);

const SCOPES = ['https://www.googleapis.com/auth/gmail.send'];

const authUrl = oauth2Client.generateAuthUrl({
  access_type: 'offline',
  scope: SCOPES,
});

console.log('Authorize this app by visiting:', authUrl);

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

rl.question('Enter the code from that page here: ', async (code) => {
  rl.close();
  const { tokens } = await oauth2Client.getToken(code);
  console.log('Refresh Token:', tokens.refresh_token);
});
```

Run with:
```bash
npm install googleapis
node get-gmail-token.js
```

### Step 4: Update Environment Variables

Once you have the new credentials, update Azure Container Apps:

```bash
az containerapp update \
  --name auth-service \
  --resource-group staff-sea-rg \
  --set-env-vars \
    "GMAIL_USER=khushabhu@gmail.com" \
    "GMAIL_CLIENT_ID=YOUR_NEW_CLIENT_ID" \
    "GMAIL_CLIENT_SECRET=YOUR_NEW_CLIENT_SECRET" \
    "GMAIL_REFRESH_TOKEN=YOUR_NEW_REFRESH_TOKEN"
```

Also update your local `.env` file:
```bash
GMAIL_USER=khushabhu@gmail.com
GMAIL_CLIENT_ID=YOUR_NEW_CLIENT_ID
GMAIL_CLIENT_SECRET=YOUR_NEW_CLIENT_SECRET
GMAIL_REFRESH_TOKEN=YOUR_NEW_REFRESH_TOKEN
```

### Step 5: Verify Email Sending

Test the forgot password endpoint:

```bash
curl -X POST https://auth-service.delightfulflower-04821c4b.southeastasia.azurecontainerapps.io/api/auth/forgot-password \
  -H "Content-Type: application/json" \
  -d '{"email":"hanny@info.com"}' \
  -s
```

Check logs for success:
```bash
az containerapp logs show --name auth-service --resource-group staff-sea-rg --type console --tail 20
```

You should see: `[EmailService] ✅ Email sent via Gmail REST API`

---

## Alternative: Use Nodemailer with App Password (Simpler)

If OAuth is too complex, you can use Gmail App Passwords:

### 1. Enable 2-Factor Authentication
- Go to Google Account → Security
- Enable 2-Step Verification

### 2. Generate App Password
- Google Account → Security → 2-Step Verification
- Scroll to "App passwords"
- Generate password for "Mail" app
- Copy the 16-character password

### 3. Update Code to Use Nodemailer

Edit `backend/services/auth-service/src/services/emailService.ts`:

```typescript
import nodemailer from 'nodemailer';

class EmailService {
  private transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: process.env.GMAIL_USER,
      pass: process.env.GMAIL_APP_PASSWORD, // 16-char app password
    },
  });

  async sendEmail(options: EmailOptions): Promise<boolean> {
    try {
      await this.transporter.sendMail({
        from: this.gmailUser,
        to: options.to,
        subject: options.subject,
        html: options.html,
      });
      console.log('[EmailService] ✅ Email sent via Nodemailer');
      return true;
    } catch (error) {
      console.error('[EmailService] ❌ Failed to send email:', error);
      return false;
    }
  }
}
```

Install nodemailer:
```bash
cd backend/services/auth-service
npm install nodemailer
npm install -D @types/nodemailer
```

Update environment variables:
```bash
az containerapp update \
  --name auth-service \
  --resource-group staff-sea-rg \
  --set-env-vars \
    "GMAIL_USER=khushabhu@gmail.com" \
    "GMAIL_APP_PASSWORD=your-16-char-app-password"
```

This is much simpler and more reliable than OAuth!

---

## Current Status

✅ Gmail credentials are configured in Azure  
❌ Refresh token is invalid (401 - deleted_client)  
⚠️ Users will NOT receive password reset emails until this is fixed

## Next Steps

1. Choose OAuth (more secure) or App Password (simpler)
2. Follow the steps above to get new credentials
3. Update environment variables in Azure
4. Test forgot password functionality
5. Verify emails are being received

---

**Recommended**: Use App Password method - it's simpler and more reliable for production use.
