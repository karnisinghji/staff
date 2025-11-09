# Fix: 404 Error on /api/messages/recent Endpoint

## Issue
The mobile app was making requests to a non-existent endpoint:
```
GET /api/messages/recent?since=1762672746559
Response: 404 Not Found
```

## Root Cause
The `MobileNotificationService` in `frontend/src/services/mobileNotifications.ts` was polling for new messages using an endpoint that doesn't exist on the communication-service backend.

**Backend Communication Service Endpoints:**
- ✅ `POST /messages` - Send a message
- ✅ `GET /messages?userId={id}&peerId={id}` - List messages
- ✅ `POST /messages/:id/read` - Mark message as read
- ✅ `DELETE /messages/:id` - Soft delete message
- ❌ `GET /api/messages/recent?since={timestamp}` - **Does NOT exist**

## Solution
Disabled the mobile notification polling in `mobileNotifications.ts` because:

1. **Redundant**: `MessageContext` already polls for messages every 30 seconds via the correct `/messages` endpoint
2. **Non-existent API**: The `/api/messages/recent` endpoint is not implemented in communication-service
3. **Better Architecture**: Centralized message fetching in MessageContext avoids duplicate API calls

## Changes Made

### File: `frontend/src/services/mobileNotifications.ts`

**Modified Method**: `checkForNewMessages()`

**Before:**
```typescript
private static async checkForNewMessages(token: string) {
    const response = await fetch(
        `${API_CONFIG.COMMUNICATION_SERVICE}/api/messages/recent?since=${this.lastMessageTimestamp}`,
        { headers: { 'Authorization': `Bearer ${token}` } }
    );
    // ... process messages
}
```

**After:**
```typescript
private static async checkForNewMessages(_token: string) {
    // NOTE: This endpoint doesn't exist yet on communication-service
    // The MessageContext already handles message polling via /messages endpoint
    // TODO: Implement /api/messages/recent endpoint or integrate with MessageContext
    console.log('Mobile notification polling disabled - using MessageContext for message updates');
    return;
    
    /* DISABLED UNTIL ENDPOINT IS IMPLEMENTED
    // ... original code commented out
    */
}
```

## Current Message Polling Architecture

**Active System** (working correctly):
- `MessageContext` (`frontend/src/features/messaging/MessageContext.tsx`)
- Polls every 30 seconds (with exponential backoff on rate limits)
- Fetches from:
  - `GET /api/matching/team-requests/received` (team requests)
  - `GET /api/matching/team-requests/sent` (sent team requests)
  - `GET /messages?userId={id}` (chat messages)
- Combines all messages and displays in UI

**Disabled System** (was causing 404s):
- `MobileNotificationService` - now disabled
- Was attempting to poll `/api/messages/recent` (doesn't exist)
- Redundant with MessageContext functionality

## Future Enhancement Options

If native push notifications are needed in the future, consider:

### Option 1: Implement `/api/messages/recent` endpoint
Add to communication-service:
```typescript
app.get('/api/messages/recent', async (req, res) => {
    const { since } = req.query;
    const userId = req.user.id; // from auth middleware
    // Query messages WHERE created_at > since AND (from_user_id = userId OR to_user_id = userId)
    // Return new messages
});
```

### Option 2: Use WebSocket for Real-time Updates
- Implement WebSocket server in communication-service
- Push new messages to connected clients
- No polling needed

### Option 3: Firebase Cloud Messaging (FCM)
- Backend sends push notifications via FCM
- App receives notifications even when closed
- Best for production mobile apps

## Testing Results

✅ **404 Error Fixed**: No more requests to `/api/messages/recent`
✅ **Messages Still Work**: MessageContext continues to poll and fetch messages correctly
✅ **Bottom Nav Working**: App navigation functional with new bottom bar
✅ **No Console Errors**: Clean console output, no API errors

## Files Modified
- ✅ `frontend/src/services/mobileNotifications.ts` - Disabled polling, added TODO comments

## Status
🎉 **Issue Resolved** - App running cleanly without 404 errors!
