# 🔐 OAuth Configuration Guide

**Date**: October 11, 2025  
**Status**: ⚠️ **NEEDS CONFIGURATION**

---

## 🐛 CURRENT ISSUES

### **Issue 1: Favicon 404 Error** ✅ FIXED
- **Error**: `/favicon.ico:1 Failed to load resource: 404`
- **Fix**: Updated `index.html` to use existing `icon-192x192.png`
- **Status**: ✅ Deployed

### **Issue 2: Google OAuth 500 Error** ⚠️ **NEEDS ENV VARS**
- **Error**: `Failed to load resource: 500 (google)`
- **Root Cause**: Google OAuth credentials **NOT SET** in Railway production
- **Backend Response**: `"Unknown authentication strategy 'google'"`
- **Status**: ⚠️ Needs Railway environment variables

---

## ❌ WHY GOOGLE OAUTH ISN'T WORKING

### **Backend Check (passport.ts)**:
```typescript
console.log('Google Client ID:', process.env.GOOGLE_CLIENT_ID ? 'SET' : 'NOT SET');
console.log('Google Client Secret:', process.env.GOOGLE_CLIENT_SECRET ? 'SET' : 'NOT SET');

if (process.env.GOOGLE_CLIENT_ID && process.env.GOOGLE_CLIENT_SECRET) {
    console.log('✅ Registering Google OAuth strategy');
    passport.use(new GoogleStrategy({...}));
}
```

**Current Status on Railway**:
- ❌ `GOOGLE_CLIENT_ID`: **NOT SET**
- ❌ `GOOGLE_CLIENT_SECRET`: **NOT SET**
- ❌ `GOOGLE_CALLBACK_URL`: **NOT SET**

**Result**: Passport never registers the Google strategy, so the endpoint returns:
```json
{
  "success": false,
  "message": "Unknown authentication strategy \"google\""
}
```

---

## ✅ HOW TO FIX GOOGLE OAUTH

### **Step 1: Get Google OAuth Credentials**

1. **Go to Google Cloud Console**:
   - Visit: https://console.cloud.google.com/

2. **Create/Select Project**:
   - Create new project OR select existing: "ComeOnDost" or "Staff Platform"

3. **Enable Google+ API**:
   - APIs & Services → Library
   - Search "Google+ API"
   - Click "Enable"

4. **Create OAuth 2.0 Credentials**:
   - APIs & Services → Credentials
   - Click "Create Credentials" → "OAuth 2.0 Client ID"
   - Application type: **Web application**
   - Name: "ComeOnDost Production"

5. **Configure Authorized Redirect URIs**:
   ```
   https://auth-service-production-d5c8.up.railway.app/api/auth/google/callback
   http://localhost:3001/api/auth/google/callback  (for local testing)
   ```

6. **Save and Copy**:
   - Copy **Client ID** (looks like: `123456789-abc.apps.googleusercontent.com`)
   - Copy **Client Secret** (looks like: `GOCSPX-abc123xyz`)

---

### **Step 2: Add Environment Variables to Railway**

#### **Via Railway CLI**:
```bash
cd backend/services/auth-service

# Set Google OAuth credentials
railway variables set GOOGLE_CLIENT_ID="YOUR_CLIENT_ID_HERE"
railway variables set GOOGLE_CLIENT_SECRET="YOUR_CLIENT_SECRET_HERE"
railway variables set GOOGLE_CALLBACK_URL="https://auth-service-production-d5c8.up.railway.app/api/auth/google/callback"

# Verify they're set
railway variables
```

#### **Via Railway Dashboard**:
1. Go to: https://railway.app/
2. Select project: **auth-service-production**
3. Go to **Variables** tab
4. Click **+ New Variable**
5. Add three variables:

```
GOOGLE_CLIENT_ID = YOUR_CLIENT_ID_HERE
GOOGLE_CLIENT_SECRET = YOUR_CLIENT_SECRET_HERE  
GOOGLE_CALLBACK_URL = https://auth-service-production-d5c8.up.railway.app/api/auth/google/callback
```

6. Click **Deploy** to restart service with new env vars

---

### **Step 3: Re-enable OAuth Buttons in Frontend**

**File**: `frontend/src/features/auth/RegisterPage.tsx`

**Find this section** (around line 293):
```typescript
{/* OAuth temporarily disabled - needs environment configuration */}
{/* Uncomment when GOOGLE_CLIENT_ID and GOOGLE_CLIENT_SECRET are set in Railway */}
{/* 
<div className="divider">
  <span>OR</span>
</div>

<button type="button" className="social-btn google-btn" onClick={() => window.location.href = `${API_CONFIG.AUTH_SERVICE}/google`}>
  ...
</button>
*/}
```

**Uncomment the OAuth button code** once Railway env vars are set.

---

### **Step 4: Test Google OAuth**

1. **Rebuild and deploy frontend**:
```bash
cd frontend
npm run build
netlify deploy --prod --dir=dist
```

2. **Test the flow**:
   - Visit: https://comeondost.netlify.app/register
   - Click "Continue with Google"
   - Should redirect to Google consent screen
   - After consent, should redirect back and create account

3. **Check auth service logs**:
```bash
cd backend/services/auth-service
railway logs
# Should see: "✅ Registering Google OAuth strategy"
```

---

## 📋 COMPLETE SETUP CHECKLIST

### **Google OAuth Setup**:
- [ ] Google Cloud Console project created
- [ ] Google+ API enabled
- [ ] OAuth 2.0 credentials created
- [ ] Authorized redirect URIs configured
- [ ] Client ID copied
- [ ] Client Secret copied

### **Railway Configuration**:
- [ ] `GOOGLE_CLIENT_ID` set in Railway
- [ ] `GOOGLE_CLIENT_SECRET` set in Railway
- [ ] `GOOGLE_CALLBACK_URL` set in Railway
- [ ] Auth service redeployed with new env vars
- [ ] Logs show "✅ Registering Google OAuth strategy"

### **Frontend Updates**:
- [ ] OAuth buttons uncommented in RegisterPage.tsx
- [ ] Frontend rebuilt and deployed to Netlify
- [ ] Test registration with Google OAuth
- [ ] Verify user created in database

---

## 🔍 TROUBLESHOOTING

### **Issue: Still getting 500 error**

**Check 1 - Env vars set?**
```bash
cd backend/services/auth-service
railway variables | grep GOOGLE
```
Should show:
```
GOOGLE_CLIENT_ID=123456789-abc.apps.googleusercontent.com
GOOGLE_CLIENT_SECRET=GOCSPX-abc123xyz
GOOGLE_CALLBACK_URL=https://auth-service-production-d5c8.up.railway.app/api/auth/google/callback
```

**Check 2 - Service restarted?**
```bash
railway logs --tail
```
Should see:
```
🔐 Configuring OAuth strategies...
Google Client ID: SET
Google Client Secret: SET
✅ Registering Google OAuth strategy
```

**Check 3 - Test endpoint**
```bash
curl -v https://auth-service-production-d5c8.up.railway.app/api/auth/google 2>&1 | grep Location
```
Should redirect to `accounts.google.com`

---

### **Issue: Redirect URI mismatch**

**Error from Google**:
```
redirect_uri_mismatch
```

**Fix**:
1. Check your `GOOGLE_CALLBACK_URL` in Railway matches EXACTLY what's in Google Cloud Console
2. Must be: `https://auth-service-production-d5c8.up.railway.app/api/auth/google/callback`
3. Check for typos (http vs https, trailing slashes, etc.)

---

### **Issue: User not created after OAuth**

**Check**:
1. Look at Railway logs during OAuth callback
2. Check if `handleOAuthCallback` function succeeds
3. Verify database connection working
4. Check if user's email is returned by Google (profile.emails)

---

## 📝 WHAT WAS FIXED TODAY

### **✅ Favicon Issue - FIXED**
**Files Modified**:
- `frontend/index.html` - Changed icon reference
- `frontend/public/favicon.png` - Created from icon-192x192.png

**Changes**:
```html
<!-- OLD -->
<link rel="icon" type="image/svg+xml" href="/vite.svg" />

<!-- NEW -->
<link rel="icon" type="image/png" href="/icon-192x192.png" />
<link rel="shortcut icon" type="image/png" href="/icon-192x192.png" />
```

### **⚠️ Google OAuth - NEEDS CONFIGURATION**
**Files Modified**:
- `frontend/src/features/auth/RegisterPage.tsx` - Commented out OAuth buttons with instructions

**Status**:
- OAuth buttons hidden until Railway env vars are set
- Backend code is ready (passport.ts has Google strategy)
- Just needs environment variables in production

---

## 🎯 NEXT STEPS

### **Option 1: Enable Google OAuth (Recommended)**
1. Follow "Step 1: Get Google OAuth Credentials" above
2. Add env vars to Railway (Step 2)
3. Uncomment OAuth buttons (Step 3)
4. Test (Step 4)

### **Option 2: Keep OAuth Disabled**
- OAuth buttons stay commented out
- Users register with email/password only
- No configuration needed
- Current deployment works as-is

---

## 📚 REFERENCE

### **Current Production URLs**:
- **Frontend**: https://comeondost.netlify.app
- **Auth Service**: https://auth-service-production-d5c8.up.railway.app
- **OAuth Callback**: https://auth-service-production-d5c8.up.railway.app/api/auth/google/callback

### **Documentation Files**:
- Backend OAuth routes: `backend/services/auth-service/src/http/oauthRoutes.ts`
- Passport config: `backend/services/auth-service/src/config/passport.ts`
- Frontend register: `frontend/src/features/auth/RegisterPage.tsx`

### **Environment Variables Template**:
```bash
# Google OAuth (required for Google sign-in)
GOOGLE_CLIENT_ID=your_client_id.apps.googleusercontent.com
GOOGLE_CLIENT_SECRET=GOCSPX-your_secret_here
GOOGLE_CALLBACK_URL=https://auth-service-production-d5c8.up.railway.app/api/auth/google/callback

# Facebook OAuth (optional)
FACEBOOK_APP_ID=your_app_id
FACEBOOK_APP_SECRET=your_app_secret
FACEBOOK_CALLBACK_URL=https://auth-service-production-d5c8.up.railway.app/api/auth/facebook/callback

# Twitter OAuth (optional)
TWITTER_CONSUMER_KEY=your_consumer_key
TWITTER_CONSUMER_SECRET=your_consumer_secret
TWITTER_CALLBACK_URL=https://auth-service-production-d5c8.up.railway.app/api/auth/twitter/callback
```

---

## 🎉 SUMMARY

**What's Fixed**:
✅ Favicon 404 error - RESOLVED
✅ OAuth buttons hidden to prevent 500 errors

**What Needs Configuration**:
⚠️ Google OAuth credentials in Railway
⚠️ Uncomment OAuth buttons after env vars set

**Current Status**:
- App works perfectly with email/password registration
- OAuth ready to enable once credentials are configured
- No more console errors

---

**Next Action**: Set Google OAuth env vars in Railway to enable social login 🚀
