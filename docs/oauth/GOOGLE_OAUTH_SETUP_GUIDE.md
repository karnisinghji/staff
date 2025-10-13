# 🔐 Google OAuth Setup Guide

**Complete guide to enable Google Sign-In for your app**

---

## 📋 Prerequisites

- Google Cloud Console account
- Railway CLI installed: `npm install -g @railway/cli`
- Railway project access

---

## ✅ Step 1: Create Google OAuth Credentials

### 1.1 Go to Google Cloud Console
Visit: https://console.cloud.google.com/

### 1.2 Create or Select a Project
- Click **"Select a project"** dropdown (top left)
- Click **"NEW PROJECT"**
- Name: `ComeOnDost` (or your app name)
- Click **"CREATE"**

### 1.3 Enable Google+ API
- In the project dashboard, click **"APIs & Services"** → **"Library"**
- Search for **"Google+ API"** (or "Google Identity")
- Click on it and press **"ENABLE"**

### 1.4 Configure OAuth Consent Screen
- Go to **"APIs & Services"** → **"OAuth consent screen"**
- Select **"External"** (for public apps)
- Click **"CREATE"**

Fill in the form:
```
App name: ComeOnDost
User support email: your-email@example.com
Developer contact: your-email@example.com
```

- Click **"SAVE AND CONTINUE"**
- Skip "Scopes" (click "SAVE AND CONTINUE")
- Skip "Test users" (click "SAVE AND CONTINUE")
- Click **"BACK TO DASHBOARD"**

### 1.5 Create OAuth 2.0 Credentials
- Go to **"APIs & Services"** → **"Credentials"**
- Click **"+ CREATE CREDENTIALS"** → **"OAuth client ID"**
- Application type: **"Web application"**
- Name: `ComeOnDost Web Client`

**Authorized JavaScript origins:**
```
http://localhost:5173
https://comeondost.netlify.app
https://auth-service-production-d5c8.up.railway.app
```

**Authorized redirect URIs:**
```
http://localhost:3001/api/auth/google/callback
https://auth-service-production-d5c8.up.railway.app/api/auth/google/callback
```

- Click **"CREATE"**
- **COPY** the Client ID and Client Secret (you'll need these!)

---

## ✅ Step 2: Configure Railway Environment Variables

### 2.1 Login to Railway
```bash
cd backend/services/auth-service
railway login
```

### 2.2 Link to Your Project
```bash
railway link
# Select: auth-service-production-d5c8
```

### 2.3 Set Environment Variables
```bash
# Set Google OAuth credentials
railway variables set GOOGLE_CLIENT_ID="YOUR_CLIENT_ID_HERE"
railway variables set GOOGLE_CLIENT_SECRET="YOUR_CLIENT_SECRET_HERE"
railway variables set GOOGLE_CALLBACK_URL="https://auth-service-production-d5c8.up.railway.app/api/auth/google/callback"

# Set frontend URL for OAuth redirect
railway variables set FRONTEND_URL="https://comeondost.netlify.app"
```

**Replace `YOUR_CLIENT_ID_HERE` and `YOUR_CLIENT_SECRET_HERE` with your actual credentials!**

### 2.4 Verify Variables Are Set
```bash
railway variables
```

You should see:
```
✅ GOOGLE_CLIENT_ID=107...apps.googleusercontent.com
✅ GOOGLE_CLIENT_SECRET=GOCSPX-...
✅ GOOGLE_CALLBACK_URL=https://auth-service-production-d5c8.up.railway.app/api/auth/google/callback
✅ FRONTEND_URL=https://comeondost.netlify.app
```

### 2.5 Redeploy Auth Service
```bash
# Railway will auto-redeploy when you set variables
# Or manually trigger:
railway up
```

Wait ~30 seconds for deployment to complete.

---

## ✅ Step 3: Enable OAuth Buttons in Frontend

### 3.1 Uncomment OAuth Buttons

Open: `frontend/src/features/auth/RegisterPage.tsx`

Find lines ~293-320 and **uncomment** the OAuth buttons:

**BEFORE:**
```typescript
{/* OAuth temporarily disabled - needs environment configuration */}
{/* 
<button type="button" className="social-btn google-btn" 
  onClick={() => window.location.href = `${API_CONFIG.AUTH_SERVICE}/api/auth/google`}>
  Continue with Google
</button>
*/}
```

**AFTER:**
```typescript
{/* OAuth buttons */}
<button type="button" className="social-btn google-btn" 
  onClick={() => window.location.href = `${API_CONFIG.AUTH_SERVICE}/api/auth/google`}>
  <svg className="social-icon" viewBox="0 0 24 24">
    <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
    <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
    <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
    <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
  </svg>
  Continue with Google
</button>
```

### 3.2 Create OAuth Callback Handler

Create: `frontend/src/features/auth/OAuthCallback.tsx`

```typescript
import { useEffect } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { useAuth } from './AuthContext';
import { useToast } from '../../contexts/ToastContext';

export const OAuthCallback = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const { login } = useAuth();
  const toast = useToast();

  useEffect(() => {
    const accessToken = searchParams.get('access_token');
    const refreshToken = searchParams.get('refresh_token');
    const userId = searchParams.get('user_id');
    const error = searchParams.get('error');

    if (error) {
      toast.error(`Authentication failed: ${error}`);
      navigate('/login');
      return;
    }

    if (accessToken && userId) {
      // Store tokens
      login(accessToken, { id: userId });
      
      if (refreshToken) {
        localStorage.setItem('refreshToken', refreshToken);
      }

      toast.success('Successfully signed in with Google!');
      navigate('/dashboard');
    } else {
      toast.error('Invalid authentication response');
      navigate('/login');
    }
  }, [searchParams, navigate, login, toast]);

  return (
    <div style={{ 
      display: 'flex', 
      justifyContent: 'center', 
      alignItems: 'center', 
      height: '100vh',
      flexDirection: 'column',
      gap: '1rem'
    }}>
      <div className="spinner" />
      <p>Completing sign in...</p>
    </div>
  );
};
```

### 3.3 Add Route to App.tsx

Open: `frontend/src/App.tsx`

Add the import:
```typescript
import { OAuthCallback } from './features/auth/OAuthCallback';
```

Add the route (before the `*` catch-all):
```typescript
<Route path="/auth/callback" element={<OAuthCallback />} />
```

---

## ✅ Step 4: Build and Deploy Frontend

### 4.1 Build
```bash
cd frontend
npm run build
```

### 4.2 Deploy to Netlify
```bash
netlify deploy --prod --dir=dist
```

---

## ✅ Step 5: Test OAuth Flow

### 5.1 Clear Browser Cache
- Press `Ctrl + Shift + R` (Windows) or `Cmd + Shift + R` (Mac)
- Or use incognito/private window

### 5.2 Test the Flow
1. Visit: https://comeondost.netlify.app
2. Click **"Register"**
3. You should see **"Continue with Google"** button
4. Click the Google button
5. Select your Google account
6. Authorize the app
7. You'll be redirected back and logged in! ✅

---

## 🧪 Verify Setup

### Check Backend Logs
```bash
cd backend/services/auth-service
railway logs --tail
```

You should see:
```
🔐 Configuring OAuth strategies...
Google Client ID: SET
Google Client Secret: SET
✅ Registering Google OAuth strategy
```

### Test OAuth Endpoint
```bash
curl https://auth-service-production-d5c8.up.railway.app/api/auth/google
```

Should redirect (302) to Google login, NOT return 500 error.

---

## 🐛 Troubleshooting

### Error: "redirect_uri_mismatch"
**Fix**: Add the redirect URI to Google Console:
- Go to Google Console → Credentials → Your OAuth Client
- Add: `https://auth-service-production-d5c8.up.railway.app/api/auth/google/callback`

### Error: "Unknown authentication strategy 'google'"
**Fix**: Check Railway variables:
```bash
railway variables | grep GOOGLE
```
If empty, repeat Step 2.

### OAuth button doesn't appear
**Fix**: Clear browser cache or use incognito mode.

### User redirected but not logged in
**Fix**: Check:
1. FRONTEND_URL is set in Railway: `https://comeondost.netlify.app`
2. OAuth callback route exists in App.tsx
3. Browser console for errors

---

## 📊 What Happens During OAuth Flow

```
1. User clicks "Continue with Google"
   ↓
2. Frontend redirects to:
   https://auth-service-production-d5c8.up.railway.app/api/auth/google
   ↓
3. Backend redirects to Google OAuth consent screen
   ↓
4. User selects Google account & authorizes
   ↓
5. Google redirects back to:
   https://auth-service-production-d5c8.up.railway.app/api/auth/google/callback
   ↓
6. Backend:
   - Verifies OAuth response
   - Creates/finds user in database
   - Generates JWT tokens
   ↓
7. Backend redirects to:
   https://comeondost.netlify.app/auth/callback?access_token=...&user_id=...
   ↓
8. Frontend OAuthCallback component:
   - Extracts tokens from URL
   - Stores in localStorage
   - Updates AuthContext
   - Redirects to /dashboard
   ↓
9. User is logged in! ✅
```

---

## 🔒 Security Notes

- Never commit OAuth credentials to Git
- Use environment variables only
- Limit authorized domains in Google Console
- Use HTTPS in production (already done ✅)
- Tokens expire (access: 15min, refresh: 7 days)

---

## 📚 Additional OAuth Providers

Want to add **Facebook** or **Twitter** OAuth?

### Facebook:
```bash
railway variables set FACEBOOK_APP_ID="your_app_id"
railway variables set FACEBOOK_APP_SECRET="your_secret"
railway variables set FACEBOOK_CALLBACK_URL="https://auth-service-production-d5c8.up.railway.app/api/auth/facebook/callback"
```

### Twitter:
```bash
railway variables set TWITTER_CONSUMER_KEY="your_key"
railway variables set TWITTER_CONSUMER_SECRET="your_secret"
railway variables set TWITTER_CALLBACK_URL="https://auth-service-production-d5c8.up.railway.app/api/auth/twitter/callback"
```

Then uncomment the respective buttons in RegisterPage.tsx!

---

## ✅ Checklist

- [ ] Created Google OAuth credentials
- [ ] Added authorized redirect URIs
- [ ] Set Railway environment variables
- [ ] Verified variables with `railway variables`
- [ ] Uncommented OAuth buttons in RegisterPage.tsx
- [ ] Created OAuthCallback.tsx component
- [ ] Added /auth/callback route to App.tsx
- [ ] Built frontend (`npm run build`)
- [ ] Deployed to Netlify
- [ ] Cleared browser cache
- [ ] Tested OAuth flow end-to-end
- [ ] User successfully logged in with Google ✅

---

## 🎉 Success!

Once complete, users can sign in with:
- ✅ Email/Password (already working)
- ✅ Google OAuth (newly enabled)
- 🔜 Facebook OAuth (optional)
- 🔜 Twitter OAuth (optional)

Your app now supports multiple authentication methods! 🚀
