# OAuth Credentials Setup - Step by Step Guide

## 🎯 Overview
This guide walks you through creating OAuth apps for Google, Facebook, and X (Twitter), and obtaining the credentials needed for your platform.

---

## 1️⃣ Google OAuth Setup

### Step 1: Go to Google Cloud Console
Visit: https://console.cloud.google.com/

### Step 2: Create a Project
1. Click "Select a project" dropdown at the top
2. Click "NEW PROJECT"
3. Enter project name: `Contractor Worker Platform` (or your choice)
4. Click "CREATE"
5. Wait for project creation, then select it

### Step 3: Enable Google+ API
1. In the left sidebar, go to "APIs & Services" → "Library"
2. Search for "Google+ API"
3. Click on it and click "ENABLE"

### Step 4: Configure OAuth Consent Screen
1. Go to "APIs & Services" → "OAuth consent screen"
2. Select "External" user type (unless you have Google Workspace)
3. Click "CREATE"
4. Fill in required fields:
   - **App name**: Contractor Worker Platform
   - **User support email**: Your email
   - **Developer contact email**: Your email
5. Click "SAVE AND CONTINUE"
6. Skip "Scopes" section (click "SAVE AND CONTINUE")
7. Add test users if needed (your email)
8. Click "SAVE AND CONTINUE"

### Step 5: Create OAuth Client ID
1. Go to "APIs & Services" → "Credentials"
2. Click "CREATE CREDENTIALS" → "OAuth client ID"
3. Select "Web application"
4. Fill in:
   - **Name**: Contractor Worker Platform Web Client
   - **Authorized JavaScript origins**: `http://localhost:3001`
   - **Authorized redirect URIs**: `http://localhost:3001/api/auth/google/callback`
5. Click "CREATE"
6. **COPY YOUR CREDENTIALS**:
   - Client ID (looks like: `123456789-abcdefg.apps.googleusercontent.com`)
   - Client Secret (looks like: `GOCSPX-abc123def456`)

### ✅ Google Credentials to Add to .env:
```env
GOOGLE_CLIENT_ID=your-client-id-here
GOOGLE_CLIENT_SECRET=your-client-secret-here
GOOGLE_CALLBACK_URL=http://localhost:3001/api/auth/google/callback
```

---

## 2️⃣ Facebook OAuth Setup

### Step 1: Go to Facebook Developers
Visit: https://developers.facebook.com/

### Step 2: Create an App
1. Click "My Apps" (top right)
2. Click "Create App"
3. Select "Consumer" as the app type
4. Click "Next"
5. Fill in:
   - **App name**: Contractor Worker Platform
   - **App contact email**: Your email
6. Click "Create App"
7. Complete security check if prompted

### Step 3: Add Facebook Login Product
1. In your app dashboard, find "Add Products" section
2. Find "Facebook Login" and click "Set Up"
3. Select "Web" platform
4. Enter site URL: `http://localhost:5173` (your frontend)
5. Click "Save" and continue

### Step 4: Configure Facebook Login Settings
1. In left sidebar, go to "Facebook Login" → "Settings"
2. Add these Valid OAuth Redirect URIs:
   ```
   http://localhost:3001/api/auth/facebook/callback
   ```
3. Click "Save Changes"

### Step 5: Get App Credentials
1. Go to "Settings" → "Basic" in left sidebar
2. **COPY YOUR CREDENTIALS**:
   - **App ID** (e.g., `123456789012345`)
   - **App Secret** (click "Show" to reveal it)

### Step 6: Make App Live (Important!)
1. At the top of the page, toggle the switch from "In Development" to "Live"
2. Select a category (e.g., "Business and Pages")
3. Confirm

### ✅ Facebook Credentials to Add to .env:
```env
FACEBOOK_APP_ID=your-app-id-here
FACEBOOK_APP_SECRET=your-app-secret-here
FACEBOOK_CALLBACK_URL=http://localhost:3001/api/auth/facebook/callback
```

---

## 3️⃣ Twitter (X) OAuth Setup

### Step 1: Go to Twitter Developer Portal
Visit: https://developer.twitter.com/

### Step 2: Apply for Developer Account (if needed)
1. Click "Sign up" or "Apply"
2. Complete the application form
3. Wait for approval (usually instant for basic access)

### Step 3: Create a Project and App
1. Go to Developer Portal dashboard
2. Click "Projects & Apps" → "Overview"
3. Click "Create Project"
4. Fill in:
   - **Project name**: Contractor Worker Platform
   - **Use case**: Building tools for yourself or your company
   - **Description**: Platform connecting contractors with workers
5. Click "Next"
6. Create an App:
   - **App name**: contractor-worker-oauth
   - Click "Complete"
7. **COPY YOUR API KEYS** (shown once):
   - API Key (Consumer Key)
   - API Key Secret (Consumer Secret)
   - Bearer Token
   - **Save these immediately!**

### Step 4: Configure App Settings
1. Go to your app's settings (click the gear icon)
2. Click "Set up" under "User authentication settings"
3. Enable "OAuth 1.0a"
4. Fill in:
   - **App permissions**: Read (minimum needed)
   - **Callback URI**: `http://localhost:3001/api/auth/twitter/callback`
   - **Website URL**: `http://localhost:5173`
5. **IMPORTANT**: Check "Request email from users" (if available)
6. Click "Save"

### Step 5: Get Consumer Keys
1. Go to "Keys and tokens" tab
2. Under "Consumer Keys":
   - **API Key** (Consumer Key)
   - **API Key Secret** (Consumer Secret)
3. If you didn't save them earlier, you can regenerate

### ✅ Twitter Credentials to Add to .env:
```env
TWITTER_CONSUMER_KEY=your-consumer-key-here
TWITTER_CONSUMER_SECRET=your-consumer-secret-here
TWITTER_CALLBACK_URL=http://localhost:3001/api/auth/twitter/callback
```

---

## 🔧 Adding Credentials to Your App

### Option A: Update .env File Manually
Open `/backend/services/auth-service/.env` and replace the placeholder values with your real credentials.

### Option B: Use Environment Variable Commands
You can also export them in your terminal session:
```bash
export GOOGLE_CLIENT_ID="your-actual-client-id"
export GOOGLE_CLIENT_SECRET="your-actual-secret"
# ... etc
```

---

## 🧪 Testing Your OAuth Setup

### 1. Restart Auth Service
After adding credentials:
```bash
cd /Users/shouryaveersingh/Desktop/old\ data/staff/backend
npm run dev
```

### 2. Test Each Provider
1. Open frontend: http://localhost:5173/register
2. Click "Continue with Google" (or Facebook/X)
3. You should be redirected to the provider's login page
4. After authorizing, you should be redirected back and logged in

### 3. Verify Database
Check that OAuth users are created:
```sql
SELECT id, username, email, oauth_provider, oauth_id 
FROM users 
WHERE oauth_provider IS NOT NULL;
```

---

## 🔒 Security Notes

### Development vs Production

**Development (Current Setup)**:
- Using `http://localhost` URLs
- Credentials can be in `.env` file
- OAuth apps in "development" or "test" mode

**Production (Future)**:
- Must use `https://` URLs
- Store credentials in secure environment variables (not in code)
- Update callback URLs in each provider's console
- Set OAuth apps to "live" or "production" mode

### Credential Security
- ❌ Never commit `.env` file to git
- ❌ Never share credentials publicly
- ✅ Use different credentials for dev/staging/production
- ✅ Rotate secrets periodically
- ✅ Use environment variable management tools in production

---

## ❓ Troubleshooting

### "redirect_uri_mismatch" Error
- **Cause**: Callback URL in code doesn't match provider settings
- **Fix**: Ensure callback URLs are exactly the same (including http/https, ports, trailing slashes)

### "invalid_client" Error
- **Cause**: Client ID or Secret is incorrect
- **Fix**: Double-check credentials, regenerate if needed

### "access_denied" Error
- **Cause**: User denied permission or app isn't approved
- **Fix**: Check OAuth consent screen settings, ensure app is not restricted

### No Email Returned from Provider
- **Cause**: Insufficient permissions requested
- **Fix**: 
  - Google: Ensure email scope is included
  - Facebook: Request email permission
  - Twitter: Enable "Request email from users"

---

## 📝 Quick Reference

| Provider | Developer Console | Callback URL |
|----------|------------------|--------------|
| Google | https://console.cloud.google.com/ | `http://localhost:3001/api/auth/google/callback` |
| Facebook | https://developers.facebook.com/ | `http://localhost:3001/api/auth/facebook/callback` |
| Twitter | https://developer.twitter.com/ | `http://localhost:3001/api/auth/twitter/callback` |

---

## ✅ Completion Checklist

- [ ] Google OAuth app created
- [ ] Google credentials added to .env
- [ ] Facebook OAuth app created  
- [ ] Facebook credentials added to .env
- [ ] Twitter OAuth app created
- [ ] Twitter credentials added to .env
- [ ] Auth service restarted with new credentials
- [ ] Tested Google login flow
- [ ] Tested Facebook login flow
- [ ] Tested Twitter login flow
- [ ] Verified users created in database

---

Need help with any step? Check the provider's official documentation or feel free to ask!
