# OAuth Configuration for Railway - Auth Service

## 🔴 CRITICAL ISSUE FOUND

**Error**: `Unknown authentication strategy "google"`

**Root Cause**: Railway auth-service is missing OAuth environment variables.

## Required Environment Variables in Railway

You need to add these variables to your **auth-service** in Railway:

### Google OAuth (Required)
```bash
GOOGLE_CLIENT_ID=your-google-client-id
GOOGLE_CLIENT_SECRET=your-google-client-secret
GOOGLE_CALLBACK_URL=https://auth-service-production-d5c8.up.railway.app/api/auth/google/callback
```

### Facebook OAuth (Optional)
```bash
FACEBOOK_APP_ID=your-facebook-app-id
FACEBOOK_APP_SECRET=your-facebook-app-secret
FACEBOOK_CALLBACK_URL=https://auth-service-production-d5c8.up.railway.app/api/auth/facebook/callback
```

### Twitter OAuth (Optional)
```bash
TWITTER_CONSUMER_KEY=your-twitter-consumer-key
TWITTER_CONSUMER_SECRET=your-twitter-consumer-secret
TWITTER_CALLBACK_URL=https://auth-service-production-d5c8.up.railway.app/api/auth/twitter/callback
```

### Session Secret (Required)
```bash
SESSION_SECRET=generate-a-random-32-character-string
```

### Frontend URL (Required)
```bash
FRONTEND_URL=https://comeondost.web.app
```

## How to Set Variables in Railway

### Option 1: Railway Dashboard (Recommended)
1. Go to https://railway.app/dashboard
2. Select your **auth-service** project
3. Click **Variables** tab
4. Add each variable above
5. Click **Deploy** to restart with new variables

### Option 2: Railway CLI
```bash
cd "/Users/shouryaveersingh/Desktop/old data/staff/backend/services/auth-service"

railway variables set GOOGLE_CLIENT_ID="your-client-id"
railway variables set GOOGLE_CLIENT_SECRET="your-secret"
railway variables set GOOGLE_CALLBACK_URL="https://auth-service-production-d5c8.up.railway.app/api/auth/google/callback"
railway variables set SESSION_SECRET="$(openssl rand -base64 32)"
railway variables set FRONTEND_URL="https://comeondost.web.app"
```

## How to Get Google OAuth Credentials

1. Go to https://console.cloud.google.com/
2. Create a new project or select existing
3. Navigate to **APIs & Services** → **Credentials**
4. Click **Create Credentials** → **OAuth 2.0 Client ID**
5. Choose **Web application**
6. Add **Authorized redirect URIs**:
   - `https://auth-service-production-d5c8.up.railway.app/api/auth/google/callback`
   - `http://localhost:3001/api/auth/google/callback` (for testing)
7. Copy the **Client ID** and **Client Secret**

## Current Issue Details

From Railway logs:
```
Error: Unknown authentication strategy "google"
```

This happens because in `src/config/passport.ts`:
```typescript
if (process.env.GOOGLE_CLIENT_ID && process.env.GOOGLE_CLIENT_SECRET) {
    console.log('✅ Registering Google OAuth strategy');
    passport.use(new GoogleStrategy({...}));
}
```

Since the variables are NOT SET, the strategy never gets registered, causing the error when the route tries to use it.

## Verification

After setting variables, check Railway logs for:
```
🔐 Configuring OAuth strategies...
Google Client ID: SET
Google Client Secret: SET
✅ Registering Google OAuth strategy
```

If you see:
```
Google Client ID: NOT SET
Google Client Secret: NOT SET
```

Then the variables weren't applied correctly.

## Workaround Until OAuth is Configured

If you want to disable OAuth temporarily:

1. Comment out the OAuth routes in `src/app.ts`:
```typescript
// app.use('/api/auth', createOAuthRoutes());
```

2. Rebuild and redeploy:
```bash
npm run build
railway up
```

3. Users registered via OAuth will need to use "Forgot Password" to set a password and login normally.

## Priority

**HIGH** - This blocks all OAuth registrations. Users who registered via Google/Facebook/Twitter cannot login until:
1. OAuth variables are set in Railway, OR
2. They use "Forgot Password" to set a password

## Next Steps

1. ✅ **Set OAuth environment variables in Railway** (Google at minimum)
2. Wait for Railway to redeploy (automatic)
3. Test: `curl -I https://auth-service-production-d5c8.up.railway.app/api/auth/google`
4. Should redirect to Google login instead of 500 error
5. Complete OAuth flow and verify login works
