# Push Notification Testing & Deployment Guide

## ✅ What's Implemented

### Backend (Notification Service)
- ✅ FCM device registration endpoint (`POST /api/notifications/register-device`)
- ✅ Device token storage in PostgreSQL
- ✅ FCM push channel using Firebase Admin SDK
- ✅ Send push notification endpoint (`POST /api/notifications/send-push`)
- ✅ Automatic device lookup and multi-device support

### Frontend (Android App)
- ✅ Push notification initialization on login/auto-login
- ✅ FCM token registration with backend
- ✅ Foreground notification handling
- ✅ Background notification support (via native platform)

## 🧪 Testing Flow

### Step 1: Get Firebase Credentials

You need a Firebase service account JSON:

1. Go to [Firebase Console](https://console.firebase.google.com/)
2. Select your project (or create one)
3. Go to **Project Settings** → **Service Accounts**
4. Click "Generate New Private Key"
5. Save the JSON file securely

### Step 2: Set Up Local Environment

```bash
# In backend/services/notification-service directory

# Create .env file with:
DATABASE_URL=postgres:///contractor_worker_platform
FIREBASE_SERVICE_ACCOUNT_JSON='{"type":"service_account","project_id":"your-project","private_key_id":"...","private_key":"...","client_email":"...","client_id":"...","auth_uri":"...","token_uri":"...","auth_provider_x509_cert_url":"...","client_x509_cert_url":"..."}'
PORT=3005
NODE_ENV=development
```

### Step 3: Start Notification Service Locally

```bash
cd backend/services/notification-service
npm run dev
```

Expected output:
```
🔔 Notification Service running on port 3005
🏥 Health check available at http://0.0.0.0:3005/health
📱 FCM Push Notifications enabled
```

If you see "FCM Push Notifications disabled", check your FIREBASE_SERVICE_ACCOUNT_JSON env var.

### Step 4: Register Device (from Android App)

The Android app automatically registers on login. To verify:

```bash
# Check registered devices for a user (dev only)
curl http://localhost:3005/api/notifications/devices/YOUR_USER_UUID
```

Expected response:
```json
{
  "success": true,
  "data": [
    {
      "user_id": "...",
      "platform": "android",
      "token_prefix": "abc123...",
      "device_info": {...},
      "updated_at": "2025-11-11T..."
    }
  ]
}
```

### Step 5: Send Test Push Notification

```bash
curl -X POST http://localhost:3005/api/notifications/send-push \
  -H 'Content-Type: application/json' \
  -d '{
    "userId": "YOUR_USER_UUID",
    "title": "Test Notification",
    "body": "This is a test push notification from the backend!",
    "data": {
      "type": "test",
      "action": "open_app"
    }
  }'
```

Expected response:
```json
{
  "success": true,
  "message": "Push notification sent",
  "data": {
    "notificationId": "...",
    "userId": "...",
    "sentAt": "2025-11-11T..."
  }
}
```

### Step 6: Verify on Android Device

**App in Background:**
- Notification should appear in system tray
- User taps → app opens
- Custom data available in notification handler

**App in Foreground:**
- In-app notification shown via `MobileNotificationService`
- Custom action handlers triggered

## 🚀 Production Deployment

### Azure Container App Environment Variables

Add these to your notification-service Azure Container App:

```bash
DATABASE_URL=postgresql://user:pass@host/db?sslmode=require
FIREBASE_SERVICE_ACCOUNT_JSON='{"type":"service_account",...}'
NODE_ENV=production
PORT=3000
JWT_SECRET=your-jwt-secret-256bit
ALLOWED_ORIGINS=https://comeondost.web.app,https://comeondost.firebaseapp.com,capacitor://localhost
```

**⚠️ CRITICAL**: The `FIREBASE_SERVICE_ACCOUNT_JSON` must be a single-line JSON string (no newlines). Use this format:

```bash
export FIREBASE_SERVICE_ACCOUNT_JSON='{"type":"service_account","project_id":"...","private_key_id":"...","private_key":"-----BEGIN PRIVATE KEY-----\\nMII...\\n-----END PRIVATE KEY-----\\n","client_email":"...","client_id":"...","auth_uri":"https://accounts.google.com/o/oauth2/auth","token_uri":"https://oauth2.googleapis.com/token","auth_provider_x509_cert_url":"https://www.googleapis.com/oauth2/v1/certs","client_x509_cert_url":"..."}'
```

### Set Environment Variables in Azure

```bash
# Using Azure CLI
az containerapp update \
  --name notification-service \
  --resource-group staff-sea-rg \
  --set-env-vars \
    "FIREBASE_SERVICE_ACCOUNT_JSON=<JSON_STRING>" \
    "DATABASE_URL=<CONNECTION_STRING>"

# Or via Azure Portal:
# Container Apps → notification-service → Settings → Environment variables
```

### Deploy Updated Service

```bash
# Trigger GitHub Actions deployment
git add .
git commit -m "feat: Add FCM push notification support"
git push origin main

# Or manual Azure deployment
az containerapp update \
  --name notification-service \
  --resource-group staff-sea-rg \
  --image <your-registry>/notification-service:latest
```

## 📱 Frontend Integration

The frontend already has push notifications integrated. Ensure:

1. **Firebase Config**: Check `frontend/src/firebase.config.ts` has correct credentials
2. **FCM Web Push**: For web app (not Android), configure FCM web push certificate
3. **Service Worker**: Ensure service worker is registered for background notifications

## 🔍 Troubleshooting

### Problem: "No device tokens found for user"

**Solution**: User hasn't logged in on Android app yet, or registration failed.
- Check `/api/notifications/devices/:userId` endpoint
- Verify `device_tokens` table has entries
- Check Android logs for registration errors

### Problem: "FCM not initialized"

**Solution**: Missing or invalid Firebase credentials.
- Verify `FIREBASE_SERVICE_ACCOUNT_JSON` is set correctly
- Check private key has escaped newlines: `\\n`
- Validate JSON syntax

### Problem: Notification sent but not received on device

**Possible causes**:
1. **Invalid FCM token**: Token expired or device uninstalled app
   - Frontend should re-register on permission grant
2. **Network issues**: Device not connected to internet
3. **Battery optimization**: Android killing background processes
   - Exempt app from battery optimization
4. **Notification permissions**: User denied notification permission
   - Check app settings → notifications

### Problem: Build errors with firebase-admin

**Solution**: Ensure Node.js version compatibility
```bash
node --version  # Should be >= 14
npm install firebase-admin@latest
```

## 📊 Monitoring

### Check Notification Service Health

```bash
curl https://notification-service.delightfulflower-04821c4b.southeastasia.azurecontainerapps.io/health
```

### View Service Logs

```bash
az containerapp logs show \
  --name notification-service \
  --resource-group staff-sea-rg \
  --type console \
  --tail 50
```

Look for:
- `[FCM] Firebase Admin SDK initialized successfully`
- `[FCM] Device registered (persisted) user=...`
- `[FCM Channel] Sending to X device(s)`
- `[FCM] Push notification sent successfully`

## 🎯 Next Steps

1. **Test locally** with your Firebase credentials
2. **Send test notification** using curl commands above
3. **Verify on Android device** (app background + foreground)
4. **Deploy to Azure** with environment variables
5. **Test production** notification delivery
6. **Integrate into features** (messages, team requests, job updates)

## 🔐 Security Notes

- **Never commit** Firebase service account JSON to git
- Use Azure Key Vault for production secrets
- Implement rate limiting on send endpoints (already have express-rate-limit)
- Add JWT authentication to `/api/notifications/send-push` (currently open for testing)
- Validate user permissions before sending notifications

## 📞 API Reference

### Register Device
```
POST /api/notifications/register-device
Content-Type: application/json

{
  "userId": "uuid",
  "fcmToken": "string",
  "platform": "android" | "ios",
  "deviceInfo": {
    "model": "string",
    "os": "string"
  }
}
```

### Send Push Notification
```
POST /api/notifications/send-push
Content-Type: application/json

{
  "userId": "uuid",
  "title": "string",
  "body": "string",
  "data": {
    "key": "value"
  },
  "imageUrl": "https://..." (optional)
}
```

### List User Devices (Dev Only)
```
GET /api/notifications/devices/:userId
```
