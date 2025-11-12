# 📱 Real User Messaging Test Instructions

## Current Setup ✅
- **Ram Singh (ramp@info.com)** - Logged in on Android Emulator - Device Registered ✅
- **Karni Singh (khushabhu@gmail.com)** - Logged in on Safari

## Test Steps:

### Option 1: Send Message from Safari (Karni → Ram)

1. **In Safari (as Karni Singh - khushabhu@gmail.com)**:
   - Go to the Messages/Chat page
   - Find or start a conversation with Ram Singh (ramp@info.com)
   - Send a message like: "Hi Ram! Are you available for a project?"

2. **Expected Result**:
   - Message should be saved to database
   - Push notification should be sent to Ram's Android device
   - Notification should appear on the emulator

3. **Verification**:
   - Check Android emulator for notification popup
   - Run: `adb logcat -d | grep -i "pushNotification" | tail -20`
   - Should see: "pushNotificationReceived" event

### Option 2: Test via API (Automated)

Wait 1 minute (to avoid rate limit), then run:

```bash
node test-real-users-messaging.js
```

This will:
1. Ensure Ram's device is registered
2. Send a message from Karni to Ram
3. Trigger push notification
4. Show verification steps

## What to Watch For:

### On Android Emulator:
- Notification banner at top of screen
- Sound/vibration (if enabled)
- Notification in notification tray

### In Safari (Karni's view):
- Message should appear in conversation
- Message status should show as sent

### In Logs:
```bash
# Communication Service logs (shows notification trigger)
az containerapp logs show --name communication-service --resource-group staff-sea-rg --type console --tail 50 | grep SendMessage

# Notification Service logs (shows FCM send)
az containerapp logs show --name notification-service --resource-group staff-sea-rg --type console --tail 50 | grep -i "notification\|fcm"

# Android logcat
adb logcat -d | grep -i "pushNotification" | tail -20
```

## User IDs (for reference):
- Karni Singh (Worker): `62943651-719e-4b59-a935-960e15905d28`
- Ram Singh (Contractor): `a254804f-ab75-475b-bcfd-20da0f80655e`

## Troubleshooting:

### If notification doesn't appear:
1. Check if Ram's device is still registered:
   ```bash
   cd backend && node -e "const {Pool}=require('pg');require('dotenv').config();(async()=>{const p=new Pool({connectionString:process.env.DATABASE_URL});const r=await p.query('SELECT COUNT(*) FROM device_tokens WHERE user_id=\$1',['a254804f-ab75-475b-bcfd-20da0f80655e']);console.log('Devices:',r.rows[0].count);await p.end();})();"
   ```

2. Check if app is in foreground on emulator (should still show notification)

3. Verify communication service is running:
   ```bash
   curl https://communication-service.delightfulflower-04821c4b.southeastasia.azurecontainerapps.io/health
   ```

4. Check for rate limiting (wait 1-2 minutes between sends)

## Expected Flow:
```
Safari (Karni) → Send Message
    ↓
Communication Service → Save to DB
    ↓
Communication Service → Call Notification Service
    ↓
Notification Service → Query Ram's device token
    ↓
Notification Service → Send to FCM
    ↓
FCM → Deliver to Android Device
    ↓
Android Emulator (Ram) → Show Notification! 🎉
```

---

**Ready to test!** Send a message from Safari and watch for the notification on the emulator! 🚀
