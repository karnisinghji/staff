# 🔐 How to Get Google OAuth Credentials

## Quick Steps

### 1. Go to Google Cloud Console
Visit: https://console.cloud.google.com/

### 2. Create or Select Project
- Click **Select a project** (top bar)
- Click **NEW PROJECT**
- Name it: "ComeOnDost Platform"
- Click **CREATE**

### 3. Enable Google+ API
- Go to **APIs & Services** → **Library**
- Search for "Google+ API"
- Click it and press **ENABLE**

### 4. Create OAuth Credentials
- Go to **APIs & Services** → **Credentials**
- Click **+ CREATE CREDENTIALS**
- Select **OAuth client ID**

### 5. Configure OAuth Consent Screen (if prompted)
- User Type: **External** (for testing with any Google account)
- App name: `ComeOnDost`
- User support email: Your email
- Developer contact: Your email
- Scopes: Add `email` and `profile`
- Test users: Add your email and any test accounts
- Click **SAVE AND CONTINUE** through the wizard

### 6. Create OAuth Client ID
- Application type: **Web application**
- Name: `ComeOnDost Auth Service`

**Authorized JavaScript origins**:
```
https://comeondost.web.app
https://auth-service-production-d5c8.up.railway.app
http://localhost:5173
```

**Authorized redirect URIs**:
```
https://auth-service-production-d5c8.up.railway.app/api/auth/google/callback
http://localhost:3001/api/auth/google/callback
```

### 7. Copy Your Credentials
After clicking **CREATE**, you'll see a popup with:
- ✅ **Client ID** - Looks like: `123456789-abcdef.apps.googleusercontent.com`
- ✅ **Client Secret** - Looks like: `GOCSPX-abc123xyz`

**Save these!** You'll need them for Railway.

---

## Add to Railway (Auth Service)

1. Go to https://railway.app/dashboard
2. Find **auth-service-production-d5c8**
3. Click **Variables** tab
4. Add these variables:

```bash
GOOGLE_CLIENT_ID=<paste-your-client-id>
GOOGLE_CLIENT_SECRET=<paste-your-secret>
GOOGLE_CALLBACK_URL=https://auth-service-production-d5c8.up.railway.app/api/auth/google/callback
SESSION_SECRET=<generate-random-32-chars>
FRONTEND_URL=https://comeondost.web.app
```

To generate SESSION_SECRET:
```bash
openssl rand -base64 32
```

5. Railway will **auto-redeploy** with new variables
6. Wait ~2 minutes for deployment to complete

---

## Test OAuth Flow

1. Go to https://comeondost.web.app/register
2. Click "Sign in with Google" button
3. Should redirect to Google login
4. After authorizing, should return to your app logged in
5. Check Railway logs - should see: `✅ Registering Google OAuth strategy`

---

## Troubleshooting

### Error: "redirect_uri_mismatch"
❌ Problem: Redirect URI not added to Google Console
✅ Fix: Add exact URL to "Authorized redirect URIs":
```
https://auth-service-production-d5c8.up.railway.app/api/auth/google/callback
```

### Error: "Access blocked: This app's request is invalid"
❌ Problem: OAuth consent screen not configured
✅ Fix: Complete OAuth consent screen setup in Google Console

### Error: "Unknown authentication strategy 'google'"
❌ Problem: Environment variables not set in Railway
✅ Fix: Add GOOGLE_CLIENT_ID and GOOGLE_CLIENT_SECRET to Railway variables

### OAuth Works Locally but Not in Production
❌ Problem: Railway variables not set
✅ Fix: 
1. Check Railway Variables tab
2. Verify GOOGLE_CLIENT_ID is set
3. Check Railway logs for "Google Client ID: SET"

---

## Why Users Don't Need Passwords with OAuth

When a user registers with Google:
1. ✅ Google authenticates them (we trust Google)
2. ✅ We create a user record with `oauth_provider='google'`
3. ✅ Password field is **NULL** (intentional, not a bug!)
4. ✅ On return visits, they click "Sign in with Google" again
5. ✅ System finds existing user by oauth_provider + oauth_id
6. ✅ User is logged in (no password needed!)

**This is the correct OAuth flow.** The password field should stay NULL for OAuth users.

---

## Current User Example

Your test user "Chanchal Palawat" is correctly configured:
```sql
email: 2024mcaaimlchanchal20239@poornima.edu.in
password_hash: NULL ✅ (correct for OAuth)
oauth_provider: google ✅
oauth_id: 106830281257062534298 ✅
```

This user should login by clicking "Sign in with Google" - NOT by entering email/password.

If they try email/password login, they'll see:
> "This account was created with Google. Please use the social login buttons below."

---

## Next Steps

1. ✅ Get Google OAuth credentials from console.cloud.google.com
2. ✅ Add credentials to Railway auth-service variables
3. ✅ Wait for Railway to redeploy
4. ✅ Test OAuth registration at comeondost.web.app
5. ✅ Test OAuth login (return visit)
6. ✅ Verify "Chanchal Palawat" can login with Google button
