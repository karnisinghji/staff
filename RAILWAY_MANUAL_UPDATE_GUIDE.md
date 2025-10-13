# Railway Manual Update Guide

## ✅ COMPLETED
- **auth-service**: FRONTEND_URL updated to `https://comeondost.web.app`
- **user-service**: CORS_ORIGINS updated to `https://comeondost.web.app,http://localhost:5173`

## 🔄 REMAINING SERVICES TO UPDATE

Update these services via Railway Web Console at: https://railway.app/dashboard

### 1. Matching Service
**Project**: matching-service-production
**Variables to set**:
```
CORS_ORIGINS=https://comeondost.web.app,http://localhost:5173
```

### 2. Communication Service  
**Project**: communication-service-production-c165
**Variables to set**:
```
CORS_ORIGINS=https://comeondost.web.app,http://localhost:5173
```

### 3. Notification Service
**Project**: notification-service-production-8738
**Variables to set**:
```
CORS_ORIGINS=https://comeondost.web.app,http://localhost:5173
```

## 📋 MANUAL STEPS VIA RAILWAY WEB CONSOLE

1. Go to https://railway.app/dashboard
2. Select the workspace: **karnisinghji's Projects**
3. For each service above:
   - Click on the service card
   - Go to **Variables** tab
   - Click **+ New Variable**
   - Add `CORS_ORIGINS` with value `https://comeondost.web.app,http://localhost:5173`
   - Click **Add** and the service will automatically redeploy

## 🔐 GOOGLE OAUTH UPDATE (CRITICAL)

**URL**: https://console.cloud.google.com/apis/credentials

**Client ID**: `346188939499-68nadmhoo0v5d51g3l8dop77nkdm4vuu.apps.googleusercontent.com`

### Steps:
1. Click on the OAuth 2.0 Client ID listed above
2. In **Authorized JavaScript origins**, ADD:
   - `https://comeondost.web.app`
   - `https://comeondost.firebaseapp.com`
   
3. In **Authorized redirect URIs**, ADD:
   - `https://comeondost.web.app/oauth/callback`
   - `https://comeondost.firebaseapp.com/oauth/callback`
   
4. Keep existing Railway backend URLs (don't remove them)
5. Click **Save**

## ✅ VERIFICATION

After completing all updates:

```bash
# Test the live app
open https://comeondost.web.app

# Test API endpoints
curl -I https://user-service-production-f141.up.railway.app/health
curl -I https://matching-service-production.up.railway.app/health
```

### Test Checklist:
- [ ] App loads without CORS errors
- [ ] Registration works
- [ ] Login works  
- [ ] Google OAuth "Continue with Google" works
- [ ] Profile page loads
- [ ] Search page works
- [ ] Location displays as city names

## 📊 CURRENT STATUS

| Service | FRONTEND_URL | CORS_ORIGINS | Status |
|---------|-------------|--------------|--------|
| auth-service | ✅ Updated | N/A | ✅ Complete |
| user-service | N/A | ✅ Updated | ✅ Complete |
| matching-service | N/A | ⚠️ Pending | Manual update needed |
| communication-service | N/A | ⚠️ Pending | Manual update needed |
| notification-service | N/A | ⚠️ Pending | Manual update needed |
| Google OAuth | N/A | ⚠️ Pending | Manual update needed |

---

**Time Required**: ~10 minutes
**Difficulty**: Easy (just copy-paste values)
**Priority**: HIGH - OAuth won't work until Google Console is updated
