# Google OAuth Configuration for Azure Container Apps

**Date:** November 8, 2025  
**Status:** Environment variables configured, Google Console update needed

---

## ✅ What's Been Done

### 1. Azure Environment Variables Configured
Added to auth-service in Azure Container Apps:
- ✅ `GOOGLE_CLIENT_ID` = 346188939499-68nadmhoo0v5d51g3l8dop77nkdm4vuu.apps.googleusercontent.com
- ✅ `GOOGLE_CLIENT_SECRET` = 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
- ✅ `GOOGLE_CALLBACK_URL` = https://auth-service.delightfulflower-04821c4b.southeastasia.azurecontainerapps.io/api/auth/google/callback
- ✅ `FRONTEND_URL` = https://comeondost.web.app

### 2. Auth Service Status
- Endpoint responding: ✅ (HTTP 302 redirect)
- OAuth strategy registered: ✅

---

## 🚨 REQUIRED: Update Google Cloud Console

You need to add the Azure URLs to your Google OAuth app:

### Step 1: Go to Google Cloud Console
**URL:** https://console.cloud.google.com/apis/credentials/oauthclient/346188939499-68nadmhoo0v5d51g3l8dop77nkdm4vuu.apps.googleusercontent.com

### Step 2: Add Authorized JavaScript Origins
Add these domains:
```
https://comeondost.web.app
https://auth-service.delightfulflower-04821c4b.southeastasia.azurecontainerapps.io
```

### Step 3: Add Authorized Redirect URIs
Add this callback URL:
```
https://auth-service.delightfulflower-04821c4b.southeastasia.azurecontainerapps.io/api/auth/google/callback
```

### Step 4: Save Changes
Click "Save" in Google Cloud Console

---

## 📋 Current OAuth Configuration

### Authorized JavaScript Origins (should include):
- https://comeondost.web.app
- https://auth-service.delightfulflower-04821c4b.southeastasia.azurecontainerapps.io
- http://localhost:5173 (for local development)

### Authorized Redirect URIs (should include):
- https://auth-service.delightfulflower-04821c4b.southeastasia.azurecontainerapps.io/api/auth/google/callback
- https://comeondost.web.app/oauth/callback
- http://localhost:5173/oauth/callback (for local development)

---

## 🧪 Testing After Update

### Test 1: Direct OAuth URL
Visit this URL in your browser:
```
https://auth-service.delightfulflower-04821c4b.southeastasia.azurecontainerapps.io/api/auth/google
```
**Expected:** Should redirect to Google login page

### Test 2: Frontend Login
1. Go to: https://comeondost.web.app
2. Clear browser cache (Ctrl+Shift+R / Cmd+Shift+R)
3. Click "Continue with Google"
4. **Expected:** Should redirect to Google, then back to your app with login success

### Test 3: Manual cURL Test
```bash
# Check if endpoint is responding
curl -I "https://auth-service.delightfulflower-04821c4b.southeastasia.azurecontainerapps.io/api/auth/google"
# Expected: HTTP 302 with Location header to accounts.google.com
```

---

## 🔧 Quick Update Script

If you have `gcloud` CLI installed, you can update directly:

```bash
# 1. Get current OAuth client configuration
gcloud auth application-default print-access-token

# 2. Or update via Google Cloud Console (recommended)
open "https://console.cloud.google.com/apis/credentials/oauthclient/346188939499-68nadmhoo0v5d51g3l8dop77nkdm4vuu.apps.googleusercontent.com"
```

---

## 📝 Complete URL List

### Frontend URLs
- Production: https://comeondost.web.app
- Local: http://localhost:5173

### Backend URLs (Azure Container Apps)
- Auth Service: https://auth-service.delightfulflower-04821c4b.southeastasia.azurecontainerapps.io
- User Service: https://user-service.delightfulflower-04821c4b.southeastasia.azurecontainerapps.io
- Matching Service: https://matching-service.delightfulflower-04821c4b.southeastasia.azurecontainerapps.io
- Communication Service: https://communication-service.delightfulflower-04821c4b.southeastasia.azurecontainerapps.io
- Notification Service: https://notification-service.delightfulflower-04821c4b.southeastasia.azurecontainerapps.io

### OAuth Callback URLs (Add all to Google Console)
- Production: https://auth-service.delightfulflower-04821c4b.southeastasia.azurecontainerapps.io/api/auth/google/callback
- Local: http://localhost:3001/api/auth/google/callback

---

## ⚠️ Important Notes

1. **Google OAuth Update Required**: Until you add the Azure URLs to Google Cloud Console, OAuth will fail with "redirect_uri_mismatch" error

2. **Browser Cache**: After updating Google Console, clear browser cache to see changes

3. **Propagation Time**: Google OAuth changes take effect immediately (no wait time)

4. **Mobile Apps**: If you have mobile apps, also add their custom URL schemes to Google Console

---

## 🎯 Current Status

- ✅ Azure auth-service has Google OAuth credentials
- ✅ OAuth endpoint responding (HTTP 302)
- ⏳ **Waiting for Google Cloud Console update** (you need to do this)
- ⏳ Then test with frontend

---

## 🔗 Quick Links

- **Google Cloud Console:** https://console.cloud.google.com/apis/credentials
- **OAuth Client ID:** 346188939499-68nadmhoo0v5d51g3l8dop77nkdm4vuu.apps.googleusercontent.com
- **Frontend:** https://comeondost.web.app
- **Auth Service:** https://auth-service.delightfulflower-04821c4b.southeastasia.azurecontainerapps.io/api/auth/google

---

**Next Step:** Update Google Cloud Console with the URLs above, then test the "Continue with Google" button! 🚀
