# Team Request Reply Button Feature

## Feature Added

Added a **"💬 Reply"** button to team requests that allows users to navigate to the Messages page to respond to the sender's message.

## How It Works

### 1. Team Request Flow

```
Contractor sends team request with message
           ↓
Worker receives request on Dashboard
           ↓
Worker sees: 💬 "need some work"
           ↓
Worker clicks "💬 Reply" button
           ↓
Navigates to /messages page with sender info
           ↓
Worker can chat with Contractor
```

### 2. Button Visibility

The **"💬 Reply"** button only shows when:
- ✅ The team request has a message (`request.message` exists)
- ✅ The message is not empty or just whitespace
- ✅ The request is still pending (not yet accepted/rejected)

If there's no message, only Accept/Decline buttons show.

## UI/UX

### Dashboard Pending Requests Section

**Before**:
```
┌─────────────────────────────────┐
│ Smith Family Projects           │
│ 💬 need some work               │
│ Skill: electrician • 0.19km     │
├─────────────────────────────────┤
│ [Accept] [Decline]              │
└─────────────────────────────────┘
```

**After** (with Reply button):
```
┌─────────────────────────────────┐
│ Smith Family Projects           │
│ 💬 need some work               │
│ Skill: electrician • 0.19km     │
├─────────────────────────────────┤
│ [Accept] [Decline] [💬 Reply]   │
└─────────────────────────────────┘
```

### Button Styling

- **Color**: Primary blue (#1976d2)
- **Background**: White with hover effect (light blue)
- **Border**: 1px solid with primary color
- **Icon**: 💬 emoji for visual clarity
- **Responsive**: Wraps on mobile devices

## Navigation

When user clicks **"💬 Reply"**:

**URL**: `/messages?userId={sender_id}&userName={sender_name}`

**Example**: 
```
/messages?userId=550e8400-e29b-41d4-a716-446655440003&userName=Smith%20Family%20Projects
```

The Messages page can use these query parameters to:
1. Pre-select the conversation with this sender
2. Display the sender's name in the chat header
3. Load previous messages with this user

## Code Changes

### File: `frontend/src/features/dashboard/EnhancedDashboardPage.tsx`

#### 1. Added Import
```typescript
import { useNavigate } from 'react-router-dom';
```

#### 2. Added Navigate Hook
```typescript
const navigate = useNavigate();
```

#### 3. Updated Interface
```typescript
interface TeamRequest {
  id: number;
  sender_id: string;  // ← Added
  sender_name: string;
  sender_company?: string;
  message: string;
  created_at: string;
  match_context?: { ... };
}
```

#### 4. Added Reply Button (Lines 690-720)
```typescript
{request.message && request.message.trim() && (
  <button
    onClick={() => navigate(`/messages?userId=${request.sender_id}&userName=${encodeURIComponent(request.sender_name)}`)}
    style={{
      padding: `${theme.spacing.sm} ${theme.spacing.md}`,
      border: `1px solid ${theme.colors.primary[300]}`,
      borderRadius: theme.borderRadius.md,
      backgroundColor: 'white',
      color: theme.colors.primary[600],
      fontSize: theme.typography.fontSize.sm,
      fontWeight: theme.typography.fontWeight.medium,
      cursor: 'pointer',
      transition: 'all 0.2s',
      display: 'flex',
      alignItems: 'center',
      gap: theme.spacing.xs,
    }}
    onMouseEnter={(e) => {
      e.currentTarget.style.backgroundColor = theme.colors.primary[50];
      e.currentTarget.style.borderColor = theme.colors.primary[500];
    }}
    onMouseLeave={(e) => {
      e.currentTarget.style.backgroundColor = 'white';
      e.currentTarget.style.borderColor = theme.colors.primary[300];
    }}
  >
    💬 Reply
  </button>
)}
```

#### 5. Updated Button Container
```typescript
<div style={{
  display: 'flex',
  gap: theme.spacing.sm,
  flexWrap: 'wrap',  // ← Added for responsive layout
}}>
```

## User Experience Flow

### Scenario 1: Contractor Sends Request with Message

1. **Contractor**: Searches for workers
2. **Contractor**: Sends team request with message: "need some work"
3. **Worker**: Logs in and goes to Dashboard
4. **Worker**: Sees pending request with message displayed
5. **Worker**: Clicks **"💬 Reply"** button
6. **System**: Navigates to `/messages?userId=550e8400...&userName=Smith%20Family%20Projects`
7. **Worker**: Can now chat with contractor before accepting/rejecting

### Scenario 2: Request Without Message

1. **Contractor**: Sends team request WITHOUT message (message is null/empty)
2. **Worker**: Sees pending request on Dashboard
3. **Worker**: Only sees **[Accept]** and **[Decline]** buttons
4. **No Reply button** shows (since there's no message to reply to)

## Mobile Responsiveness

On mobile devices:
- Buttons wrap to multiple lines (`flexWrap: 'wrap'`)
- Reply button remains full-width readable
- Touch-friendly size maintained
- Hover effects work on touch devices

## Future Enhancements

### Possible Improvements:

1. **Message Preview in Chat**:
   - Load the initial team request message as the first message in the conversation
   - Show context: "Team Request Message from Smith Family Projects"

2. **Message Count Badge**:
   - Show unread message count on Reply button
   - Example: "💬 Reply (2)" if there are 2 new messages

3. **Quick Reply**:
   - Add inline text input to reply directly from Dashboard
   - Saves a navigation step

4. **Message History**:
   - Show if there are previous messages with this sender
   - Indicate: "Continue conversation →"

## Testing

### Test Reply Button Shows:
1. Login as worker
2. Have a contractor send you a team request **with** a message
3. Go to Dashboard
4. Should see **"💬 Reply"** button next to Accept/Decline
5. Message should display: `💬 need some work`

### Test Reply Button Hides:
1. Have a contractor send you a team request **without** a message
2. Go to Dashboard
3. Should **NOT** see Reply button
4. Only Accept/Decline buttons show

### Test Navigation:
1. Click **"💬 Reply"** button
2. Should navigate to: `/messages?userId={sender_id}&userName={sender_name}`
3. URL should be properly formatted
4. Messages page should load successfully

### Test Hover Effect:
1. Hover over Reply button
2. Background should change to light blue
3. Border should darken
4. Cursor should be pointer

## API Requirements

### Current Team Request API Response:
```json
{
    "success": true,
    "message": "Found 1 pending team requests",
    "data": {
        "requests": [{
            "id": "38b828ee-4215-464a-86e9-ccc536a2029c",
            "sender_id": "550e8400-e29b-41d4-a716-446655440003",  ← Required
            "sender_name": "Smith Family Projects",                ← Required
            "message": "need some work",                           ← Used for button visibility
            "status": "pending",
            ...
        }]
    }
}
```

**Required Fields**:
- `sender_id`: UUID of the sender (for navigation)
- `sender_name`: Name to display in Messages page
- `message`: The request message (optional, controls button visibility)

## Deployment

- **Status**: ✅ Deployed to Firebase
- **URL**: https://comeondost.web.app
- **Date**: October 14, 2025

---

## Summary

✅ **Reply button added** to team requests with messages  
✅ **Navigates to Messages page** with sender information  
✅ **Only shows when message exists** (smart conditional rendering)  
✅ **Responsive design** with mobile support  
✅ **Smooth hover effects** for better UX

Users can now **read and reply to team request messages directly**! 💬
