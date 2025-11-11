# 🔔 Push Notification Testing Guide

## ✅ Setup Complete!

Your push notification system is now fully configured and deployed:

- ✅ Firebase Admin SDK integrated
- ✅ FCM credentials added to Azure
- ✅ DATABASE_URL configured
- ✅ Service deployed and healthy
- ✅ Logs confirm: "🔱 FCM Push Notifications enabled"

**Service URL:** https://notification-service.delightfulflower-04821c4b.southeastasia.azurecontainerapps.io

---

## 📱 Testing Flow

### **Step 1: Device Registration (Android App)**

When a user logs into your Android app, the app should automatically:

1. Get FCM token from Firebase
2. Send registration request to backend:

```javascript
// In your Android app (React Native/Capacitor)
import messaging from '@react-native-firebase/messaging';

async function registerDevice() {
  const fcmToken = await messaging().getToken();
  
  await fetch(`${NOTIFICATION_SERVICE_URL}/api/notifications/register-device`, {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${authToken}`,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      fcmToken: fcmToken,
      platform: 'android',
      deviceInfo: {
        model: 'Pixel 5',
        osVersion: 'Android 13'
      }
    })
  });
}
```

---

### **Step 2: Verify Device Registration**

Check if device is registered:

```bash
# Replace <USER_ID> with actual user ID from database
curl https://notification-service.delightfulflower-04821c4b.southeastasia.azurecontainerapps.io/api/notifications/devices/<USER_ID>
```

Expected response:
```json
{
  "devices": [
    {
      "platform": "android",
      "fcm_token": "dXuF7...",
      "registered_at": "2025-11-11T08:40:00Z"
    }
  ]
}
```

---

### **Step 3: Send Test Push Notification**

**Option A: Using the test script**

```bash
NOTIFICATION_SERVICE_URL=https://notification-service.delightfulflower-04821c4b.southeastasia.azurecontainerapps.io \
node test-push-notifications.js <USER_ID>
```

**Option B: Manual cURL**

```bash
curl -X POST \
  https://notification-service.delightfulflower-04821c4b.southeastasia.azurecontainerapps.io/api/notifications/send-push \
  -H "Content-Type: application/json" \
  -d '{
    "userId": "<USER_ID>",
    "title": "Test Notification",
    "body": "This is a test from the notification service!",
    "data": {
      "type": "test",
      "timestamp": "2025-11-11T08:40:00Z"
    }
  }'
```

Expected response:
```json
{
  "success": true,
  "notificationId": "uuid-here",
  "timestamp": "2025-11-11T08:40:00Z"
}
```

---

### **Step 4: Verify Notification Received**

On your Android device:
1. ✅ Check notification tray - should see the notification
2. ✅ Tap notification - app should open (if configured)
3. ✅ Check app logs for notification data

---

## 🔗 Integration with Messaging

To send push notifications when messages are received:

### **In Communication Service:**

```javascript
// backend/services/communication-service/src/controllers/messageController.ts

import fetch from 'node-fetch';

async function sendMessage(req, res) {
  const { receiverId, content } = req.body;
  const senderId = req.user.id;
  
  // 1. Save message to database
  const message = await db.query(
    'INSERT INTO messages (sender_id, receiver_id, content) VALUES ($1, $2, $3) RETURNING *',
    [senderId, receiverId, content]
  );
  
  // 2. Send push notification to receiver
  try {
    await fetch('https://notification-service.delightfulflower-04821c4b.southeastasia.azurecontainerapps.io/api/notifications/send-push', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        userId: receiverId,
        title: 'New Message',
        body: content.substring(0, 100), // Preview
        data: {
          type: 'message',
          messageId: message.id,
          senderId: senderId
        }
      })
    });
  } catch (error) {
    console.error('Failed to send push notification:', error);
    // Don't fail the message send if notification fails
  }
  
  res.json({ message });
}
```

---

## 🧪 Testing Scenarios

### **Scenario 1: App in Foreground**
- ✅ Notification data delivered to app
- ✅ App can show in-app notification banner
- ✅ No system notification (optional - can be configured)

### **Scenario 2: App in Background**
- ✅ System notification appears in notification tray
- ✅ User taps → app opens to relevant screen
- ✅ Notification data available via `getInitialNotification()`

### **Scenario 3: App Closed**
- ✅ System notification appears
- ✅ User taps → app launches
- ✅ Notification data available via `getInitialNotification()`

---

## 📊 Monitoring

### **Check Service Health**

```bash
curl https://notification-service.delightfulflower-04821c4b.southeastasia.azurecontainerapps.io/health
```

### **View Service Logs**

```bash
az containerapp logs show \
  --name notification-service \
  --resource-group staff-sea-rg \
  --type console \
  --tail 50 \
  --follow
```

### **Check Database for Device Tokens**

```sql
SELECT user_id, platform, device_info, created_at 
FROM device_tokens 
ORDER BY created_at DESC 
LIMIT 10;
```

---

## 🐛 Troubleshooting

### **Issue: No notification received**

**Check 1: Device registered?**
```bash
curl https://notification-service.delightfulflower-04821c4b.southeastasia.azurecontainerapps.io/api/notifications/devices/<USER_ID>
```

**Check 2: FCM enabled in logs?**
```bash
az containerapp logs show --name notification-service --resource-group staff-sea-rg --type console --tail 20 | grep FCM
```
Should see: "🔱 FCM Push Notifications enabled"

**Check 3: Firebase credentials valid?**
- Verify project_id matches: `comeondost`
- Check private_key format (should have newlines `\n`)

**Check 4: FCM token valid?**
- FCM tokens expire after ~2 months
- App should refresh token periodically

---

### **Issue: 500 error when sending**

**Check DATABASE_URL:**
```bash
az containerapp show --name notification-service --resource-group staff-sea-rg --query 'properties.template.containers[0].env[?name==`DATABASE_URL`]'
```

**Check database connection:**
- Service needs access to `device_tokens` table
- Verify table exists and has proper permissions

---

## 🎯 Next Steps

1. **Login to Android app** - Test device registration
2. **Get user ID** - From app logs or database
3. **Send test push** - Use script or cURL
4. **Integrate with messaging** - Add notification calls to message sending
5. **Test background scenarios** - Put app in background and send messages

---

## 📝 API Endpoints

### **Register Device**
```
POST /api/notifications/register-device
Authorization: Bearer <JWT_TOKEN>

Body:
{
  "fcmToken": "string",
  "platform": "android" | "ios",
  "deviceInfo": { ... }
}
```

### **List User Devices**
```
GET /api/notifications/devices/:userId
```

### **Send Push Notification**
```
POST /api/notifications/send-push

Body:
{
  "userId": "string",
  "title": "string",
  "body": "string",
  "data": { ... },
  "imageUrl": "string (optional)"
}
```

### **Unregister Device**
```
DELETE /api/notifications/unregister-device
Authorization: Bearer <JWT_TOKEN>

Body:
{
  "fcmToken": "string"
}
```

---

## 🎉 Success Criteria

- ✅ Device successfully registers on login
- ✅ Push notification delivered to device
- ✅ Notification appears in system tray when app in background
- ✅ Tapping notification opens app
- ✅ Messages trigger push notifications automatically

---

**Need help?** Check the logs or test with the provided script!
