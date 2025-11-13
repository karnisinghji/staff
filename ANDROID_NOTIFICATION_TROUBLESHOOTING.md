# Android Push Notification Troubleshooting Guide

## ✅ Latest Updates Applied

1. **POST_NOTIFICATIONS permission** added for Android 13+
2. **Enhanced console logging** with colors and detailed status
3. **Better error messages** showing exact failure points
4. **Notification channels** created in MainActivity.java
5. **FCM properly configured** with google-services.json

## 📱 Install Latest APK

**Location**: `frontend/android/app/build/outputs/apk/debug/app-debug.apk`

**Install via USB**:
```bash
adb install -r /Users/shouryaveersingh/Desktop/old\ data/staff/frontend/android/app/build/outputs/apk/debug/app-debug.apk
```

**Check if connected**:
```bash
adb devices
```

## 🔍 Debugging Steps (MUST FOLLOW IN ORDER)

### Step 1: Enable Chrome Remote Debugging

1. Connect device via USB
2. Enable USB Debugging on device (Settings → Developer Options)
3. Open Chrome on computer: `chrome://inspect`
4. Open the app on device
5. Click "inspect" under the device name

### Step 2: Check Console Logs

After opening the app and logging in as khushabhu@gmail.com, you should see **colored logs**:

#### ✅ Expected Success Flow:
```
[AuthContext] Push notifications initialized (GREEN)
[Push Notifications] Starting initialization for user: 62943651... (GREEN)
[Push Notifications] Current permission status: {receive: "granted"} (BLUE)
[Push Notifications] Requesting permissions... (ORANGE)
[Push Notifications] Permission result: {receive: "granted"} (BLUE)
[Push Notifications] Permission granted (GREEN)
[Push Notifications] Registering for push notifications... (GREEN)
[Push Notifications] Registration call completed, waiting for token... (GREEN)
[Push Notifications] ✅ FCM Token received: eZo2... (BLUE) <- MOST IMPORTANT
[Push Notifications] Sending token to backend... (ORANGE)
[Push Notifications] ✅ Token successfully registered with backend (GREEN)
[Push Notifications] 📱 Device is ready to receive notifications! (GREEN)
```

#### ❌ Common Error Patterns:

**Problem 1: Permission Denied**
```
[Push Notifications] Permission denied: {receive: "denied"} (RED)
[Push Notifications] To enable: Go to Settings → Apps → ComeOnDost → Notifications (RED)
```
**Solution**: 
- Go to Android Settings → Apps → ComeOnDost → Notifications
- Enable "All ComeOnDost notifications"
- Uninstall and reinstall app to trigger permission prompt again

**Problem 2: Registration Error**
```
[Push Notifications] ❌ Registration error: ... (RED)
[Push Notifications] Check: 1) google-services.json exists, 2) Permissions granted, 3) Network connection (RED)
```
**Solution**:
- Check network connection
- Verify google-services.json exists in `frontend/android/app/`
- Try restarting the device

**Problem 3: No FCM Token**
```
[Push Notifications] Registration call completed, waiting for token... (GREEN)
(NO TOKEN APPEARS AFTER THIS)
```
**Solution**:
- Check if Google Play Services is updated on device
- Verify device has internet connection
- Try clearing app data and reinstalling

### Step 3: Verify FCM Token in Backend

Once you see the FCM token in console, verify it's saved in backend:

```bash
# Get your auth token from console
# In Chrome DevTools console: localStorage.getItem("token")

# Run diagnostic script
node test-push-notification-flow.js YOUR_TOKEN
```

**Expected output**:
```
🔍 Step 1: Checking FCM token for user: 62943651...
Status: 200
✅ FCM Token found: eZo2...
```

**If token NOT found**:
```
❌ No FCM token found - push notifications will not work!
```
This means the app didn't successfully send the token to backend. Check console for errors in:
```
[Push Notifications] Sending token to backend...
[Push Notifications] ✅ Token successfully registered with backend
```

### Step 4: Send Test Message

After verifying FCM token exists, send a test message:

```bash
node test-push-notification-flow.js YOUR_TOKEN
```

This will:
1. Check if FCM token is registered
2. Send test message from Ram → Karni
3. Trigger push notification on Karni's device

**Expected**: Notification appears on device with:
- Title: "Ram Prasad"
- Body: "Test notification from diagnostic script"

### Step 5: Android System Checks

If token is registered but notifications don't appear:

#### Check Notification Settings:
1. Settings → Apps → ComeOnDost → Notifications
2. Verify "All ComeOnDost notifications" is ON
3. Check "Messages" channel is enabled and set to "Alerting"

#### Check Battery Optimization:
1. Settings → Battery → Battery Optimization
2. Find ComeOnDost → Select "Don't optimize"

#### Check Do Not Disturb:
1. Swipe down from top
2. Verify Do Not Disturb is OFF

## 🐛 Backend Verification

Check if notification was sent from backend:

```bash
# Check communication service logs
az containerapp logs show --name communication-service --resource-group staff-sea-rg --type console --tail 50 | grep -E "\[SendMessage\]|senderName"
```

Expected output:
```
[SendMessage] Sender name from command: Ram Prasad
[SendMessage] Successfully sent message...
```

```bash
# Check notification service logs
az containerapp logs show --name notification-service --resource-group staff-sea-rg --type console --tail 50 | grep -E "\[FCM\]|notification"
```

Expected output:
```
[FCM] Push notification sent successfully, messageId=...
[FCM Channel] Sent successfully to 1/1 devices
```

## 📋 Quick Checklist

- [ ] Latest APK installed (with POST_NOTIFICATIONS permission)
- [ ] Chrome DevTools connected and showing console logs
- [ ] User logged in as khushabhu@gmail.com
- [ ] Console shows FCM token (starting with eZo2... or similar)
- [ ] Console shows "Token successfully registered with backend" (GREEN)
- [ ] Diagnostic script confirms token exists in backend
- [ ] Android notification settings enabled for app
- [ ] Battery optimization disabled for app
- [ ] Do Not Disturb is OFF
- [ ] Google Play Services is up to date

## 🔧 Emergency Reset

If nothing works, try complete reset:

```bash
# Uninstall app from device
adb uninstall com.comeondost.app

# Clear all data
adb shell pm clear com.comeondost.app 2>/dev/null || true

# Reinstall
adb install -r /Users/shouryaveersingh/Desktop/old\ data/staff/frontend/android/app/build/outputs/apk/debug/app-debug.apk

# Clear backend token (optional - forces re-registration)
# Login to app again and check console logs
```

## 📞 Support Info

**APK Location**: `frontend/android/app/build/outputs/apk/debug/app-debug.apk`

**Test Script**: `test-push-notification-flow.js`

**User IDs**:
- Karni (khushabhu@gmail.com): `62943651-719e-4b59-a935-960e15905d28`
- Ram (ramp@info.com): `7e089ff8-49e1-4fa9-8c00-8ef6eef50c81`

**Backend Services**:
- Auth: https://auth-service.delightfulflower-04821c4b.southeastasia.azurecontainerapps.io
- Notification: https://notification-service.delightfulflower-04821c4b.southeastasia.azurecontainerapps.io
- Communication: https://communication-service.delightfulflower-04821c4b.southeastasia.azurecontainerapps.io
