# Mobile App Features - Push Notifications & Background Running

## 🎯 Overview

The mobile APK now supports:
1. **Auto-Login** - Automatically logs in users when app opens
2. **Push Notifications** - Receive message notifications even when app is closed
3. **Background GPS Tracking** - Continues tracking for 24 hours
4. **Message Notifications** - Get notified when someone sends a message

## ✅ What's Already Implemented

### 1. Auto-Login
- **Status**: ✅ WORKING
- **How**: Uses Capacitor Preferences to store auth token
- **Details**: 
  - Token saved on login (localStorage + Capacitor Preferences)
  - Auto-loads on app start
  - No need to login again unless token expires or user logs out

### 2. Push Notification Service
- **Status**: ✅ IMPLEMENTED (needs testing)
- **Location**: `frontend/src/services/pushNotificationService.ts`
- **Features**:
  - FCM token registration
  - Foreground notifications (shows in-app)
  - Background notifications (system notifications)
  - Click handling (navigates to messages/team)
  - Auto-initialization on login

### 3. Background GPS Tracking
- **Status**: ✅ WORKING
- **How**: 24-hour persistent tracking
- **Details**:
  - Survives app restarts
  - Survives page refreshes
  - Auto-resumes if <24 hours elapsed

### 4. Backend FCM Endpoint
- **Status**: ✅ IMPLEMENTED
- **Endpoint**: `POST /api/notifications/register-device`
- **Service**: notification-service (port 3005)

## 🔧 Setup Required

### Step 1: Firebase Cloud Messaging Setup

1. **Go to Firebase Console**: https://console.firebase.google.com/
2. **Select Project**: `comeondost`
3. **Project Settings** → **Cloud Messaging**
4. **Get Server Key**: Copy the "Server Key" (legacy)

### Step 2: Add google-services.json

The file `google-services.json` is needed for FCM to work:

**Location**: `frontend/android/app/google-services.json`

**How to get it**:
1. Firebase Console → Project Settings
2. Your apps → Android app
3. Download `google-services.json`
4. Place in `frontend/android/app/`

### Step 3: Update Backend to Send Push Notifications

Add FCM sending capability to backend. Example using `node-fcm`:

```bash
cd backend/services/notification-service
npm install fcm-node
```

**Add FCM sender** (`backend/services/notification-service/src/fcm/sender.ts`):

```typescript
import FCM from 'fcm-node';

const serverKey = process.env.FCM_SERVER_KEY!;
const fcm = new FCM(serverKey);

export async function sendPushNotification(
  fcmToken: string,
  title: string,
  body: string,
  data?: any
) {
  const message = {
    to: fcmToken,
    notification: {
      title,
      body,
      sound: 'default',
      priority: 'high'
    },
    data: data || {}
  };

  return new Promise((resolve, reject) => {
    fcm.send(message, (err, response) => {
      if (err) {
        console.error('[FCM] Send error:', err);
        reject(err);
      } else {
        console.log('[FCM] Sent successfully:', response);
        resolve(response);
      }
    });
  });
}
```

### Step 4: Trigger Notifications on New Messages

In `communication-service`, when a message is saved:

```typescript
// After saving message to database
const recipientId = message.receiver_id;

// Get recipient's FCM token from database
const deviceToken = await db.query(
  'SELECT fcm_token FROM device_tokens WHERE user_id = $1 AND platform = $2',
  [recipientId, 'android']
);

if (deviceToken.rows[0]?.fcm_token) {
  await sendPushNotification(
    deviceToken.rows[0].fcm_token,
    `New message from ${senderName}`,
    message.content,
    {
      type: 'message',
      conversationId: message.conversation_id,
      senderId: message.sender_id
    }
  );
}
```

## 📱 How It Works (User Flow)

### First Time:
1. User downloads APK
2. User logs in
3. App requests notification permission
4. User grants permission
5. FCM token generated & sent to backend
6. User can now receive notifications

### Subsequent Opens:
1. User opens app
2. **Auto-login** - No need to login again
3. GPS tracking **auto-resumes** (if <24h)
4. Push notifications **already enabled**

### When Message Arrives:
1. Friend sends message to user
2. Backend detects new message
3. Backend looks up user's FCM token
4. Backend sends push notification via FCM
5. **App closed**: System notification appears
6. **App open**: In-app notification shows
7. User taps notification → Opens messages tab

## 🔍 Testing Push Notifications

### Test 1: Check FCM Token Registration

```bash
# Check browser console after login
# Should see: [Push Notifications] FCM Token: xxxxx
# Should see: [Push Notifications] Token registered with backend
```

### Test 2: Manual FCM Test

Use Firebase Console:
1. Go to Cloud Messaging
2. Click "Send test message"
3. Enter FCM token from console
4. Send notification
5. Should appear on device

### Test 3: Real Message Notification

1. Login as User A on mobile
2. Login as User B on web
3. User B sends message to User A
4. Close mobile app completely
5. Notification should appear on device
6. Tap notification → App opens to messages

## 📊 Database Schema for FCM Tokens

You'll need to create a table to store FCM tokens:

```sql
CREATE TABLE device_tokens (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  fcm_token TEXT NOT NULL,
  platform VARCHAR(20) NOT NULL CHECK (platform IN ('android', 'ios')),
  device_info JSONB,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW(),
  last_used_at TIMESTAMPTZ DEFAULT NOW(),
  UNIQUE(user_id, platform)
);

CREATE INDEX idx_device_tokens_user ON device_tokens(user_id);
CREATE INDEX idx_device_tokens_fcm_token ON device_tokens(fcm_token);
```

## 🚨 Important Notes

### Battery Optimization
Android may kill background processes. To prevent this:
- Users should disable battery optimization for the app
- Settings → Apps → ComeOnDost → Battery → Unrestricted

### Notification Permissions
- Android 13+ requires explicit notification permission
- The app requests this automatically on first login
- Users can revoke in Settings → Apps → ComeOnDost → Notifications

### FCM Token Refresh
- FCM tokens can expire or change
- The app handles this automatically
- New token sent to backend on each registration

### Background Limits
- Android limits background activity
- GPS tracking uses foreground service (persistent notification)
- Push notifications work even when app is completely closed

## 📝 Environment Variables

Add to Railway/production:

```bash
# Notification Service
FCM_SERVER_KEY=your-firebase-server-key-here
```

## 🎓 Summary

✅ **Auto-Login**: Already working via Capacitor Preferences
✅ **Push Notifications**: Code ready, needs Firebase setup
✅ **Background GPS**: Working (24-hour persistence)
✅ **Message Notifications**: Needs FCM backend integration

**Next Steps**:
1. Add `google-services.json` to Android project
2. Set `FCM_SERVER_KEY` in environment
3. Implement FCM sender in notification-service
4. Trigger notifications on new messages
5. Test on real device
