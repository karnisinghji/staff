# 🚀 Quick Start: Adding OAuth Credentials

## Where to Get Credentials

### 🔵 Google OAuth
1. **Console**: https://console.cloud.google.com/
2. **What you need**: 
   - Client ID (format: `123456-abc.apps.googleusercontent.com`)
   - Client Secret (format: `GOCSPX-xxxxx`)
3. **Callback URL**: `http://localhost:3001/api/auth/google/callback`

### 🔷 Facebook OAuth
1. **Console**: https://developers.facebook.com/
2. **What you need**:
   - App ID (numeric, e.g., `123456789012345`)
   - App Secret (32-character string)
3. **Callback URL**: `http://localhost:3001/api/auth/facebook/callback`

### ⚫ Twitter (X) OAuth
1. **Console**: https://developer.twitter.com/
2. **What you need**:
   - Consumer Key / API Key (25 characters)
   - Consumer Secret / API Secret (50 characters)
3. **Callback URL**: `http://localhost:3001/api/auth/twitter/callback`

---

## 3 Ways to Add Credentials

### Option 1: Interactive Script (Easiest) ⭐
```bash
cd backend/services/auth-service
bash setup-oauth-credentials.sh
```
This will prompt you for each credential and automatically update your `.env` file.

### Option 2: Manual Edit
```bash
cd backend/services/auth-service
nano .env  # or use any text editor
```

Replace these lines:
```env
# Replace these:
GOOGLE_CLIENT_ID=your-google-client-id
GOOGLE_CLIENT_SECRET=your-google-client-secret

FACEBOOK_APP_ID=your-facebook-app-id
FACEBOOK_APP_SECRET=your-facebook-app-secret

TWITTER_CONSUMER_KEY=your-twitter-consumer-key
TWITTER_CONSUMER_SECRET=your-twitter-consumer-secret

SESSION_SECRET=your-session-secret-change-in-production
```

With your actual credentials:
```env
# With actual values:
GOOGLE_CLIENT_ID=123456-abc.apps.googleusercontent.com
GOOGLE_CLIENT_SECRET=GOCSPX-abc123def456

FACEBOOK_APP_ID=123456789012345
FACEBOOK_APP_SECRET=a1b2c3d4e5f6g7h8i9j0k1l2m3n4o5p6

TWITTER_CONSUMER_KEY=abcdefghijklmnopqrstuvwxy
TWITTER_CONSUMER_SECRET=1234567890abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOP

SESSION_SECRET=some-random-string-for-sessions
```

### Option 3: Environment Variables (Terminal)
```bash
export GOOGLE_CLIENT_ID="your-actual-client-id"
export GOOGLE_CLIENT_SECRET="your-actual-secret"
export FACEBOOK_APP_ID="your-actual-app-id"
export FACEBOOK_APP_SECRET="your-actual-secret"
export TWITTER_CONSUMER_KEY="your-actual-key"
export TWITTER_CONSUMER_SECRET="your-actual-secret"
export SESSION_SECRET="your-random-session-secret"
```

---

## Validate Your Setup

```bash
cd backend/services/auth-service
node validate-oauth-credentials.js
```

You should see:
```
✅ All credentials configured!
All 3 OAuth providers are ready.
```

---

## Test OAuth Login

1. **Restart auth service**:
   ```bash
   cd backend
   npm run dev
   ```

2. **Open frontend**:
   ```
   http://localhost:5173/register
   ```

3. **Click a social login button**:
   - "Continue with Google"
   - "Continue with Facebook"  
   - "Continue with X"

4. **You should be**:
   - Redirected to provider's login page
   - Asked to authorize your app
   - Redirected back and automatically logged in

---

## Troubleshooting

### ❌ "redirect_uri_mismatch"
- **Problem**: Callback URL doesn't match
- **Fix**: In provider console, add exact URL: `http://localhost:3001/api/auth/{provider}/callback`

### ❌ "invalid_client"
- **Problem**: Wrong Client ID or Secret
- **Fix**: Double-check credentials, regenerate if needed

### ❌ "Cannot read properties of undefined"
- **Problem**: Environment variables not loaded
- **Fix**: Restart auth service after updating .env

### ❌ No redirect after authorization
- **Problem**: Frontend URL misconfigured
- **Fix**: Check `FRONTEND_URL=http://localhost:5173` in .env

---

## Production Notes

Before deploying to production:

1. **Create new OAuth apps** for production domain
2. **Update callback URLs** to use your production domain:
   - `https://yourdomain.com/api/auth/google/callback`
3. **Use HTTPS** (required by OAuth providers)
4. **Store secrets securely** (environment variables, secret management tools)
5. **Generate strong SESSION_SECRET**: `openssl rand -base64 32`

---

## Need Help?

- 📖 **Detailed Setup Guide**: `backend/docs/OAUTH-CREDENTIALS-SETUP.md`
- 🔍 **OAuth Implementation**: `backend/docs/OAUTH-SETUP.md`
- 💬 **Provider Documentation**:
  - [Google OAuth Docs](https://developers.google.com/identity/protocols/oauth2)
  - [Facebook Login Docs](https://developers.facebook.com/docs/facebook-login)
  - [Twitter OAuth Docs](https://developer.twitter.com/en/docs/authentication/oauth-1-0a)

---

## Quick Commands Reference

```bash
# Navigate to auth service
cd backend/services/auth-service

# Interactive setup
bash setup-oauth-credentials.sh

# Validate credentials
node validate-oauth-credentials.js

# Restart service
cd ../.. && npm run dev

# Test frontend
open http://localhost:5173/register
```

That's it! 🎉
