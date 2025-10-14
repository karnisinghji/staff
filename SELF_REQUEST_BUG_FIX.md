# Fix: Prevent Users From Seeing Their Own Sent Team Requests

## Problem Report
User reported seeing their own sent team request ("Smith Family Projects" with message "need some work") appearing in the "Pending Team Requests" section of their Dashboard.

**Expected Behavior**: Only see requests **sent TO you** by others  
**Actual Behavior**: Seeing requests **you sent** to others

## Root Cause Analysis

The backend SQL query was correctly filtering by `WHERE tr.receiver_id = $1`, which should only return requests where the current user is the receiver. However, there may be edge cases where:

1. **Data corruption**: Team requests with sender_id = receiver_id (self-requests)
2. **Race conditions**: Multiple simultaneous requests causing incorrect data
3. **Migration issues**: Old data before constraints were added

## Solution Implemented

### 1. Backend: Enhanced Logging (Debugging)
Added detailed logging to track what data is being returned:

**File**: `backend/services/matching-service/src/controllers/MatchingController.ts`

```typescript
getReceivedTeamRequests = async (req: Request, res: Response): Promise<void> => {
    try {
        if (!req.user) {
            res.status(401).json({ success: false, message: 'Authentication required' });
            return;
        }

        logger.info(`Fetching received team requests for user: ${req.user.id}`);

        const result = await pool.query(`
            SELECT 
                tr.id,
                tr.sender_id,
                tr.receiver_id,    -- Added for debugging
                tr.message,
                // ... rest of query
            FROM team_requests tr
            WHERE tr.receiver_id = $1      -- Only requests TO you
            AND tr.status = 'pending'
            AND tr.expires_at > CURRENT_TIMESTAMP
            AND ub.id IS NULL              -- Not blocked
            ORDER BY tr.created_at DESC
        `, [req.user.id]);

        // Log detailed info to identify the issue
        logger.info(`Found ${result.rows.length} requests. Details:`, 
            result.rows.map(r => ({ 
                id: r.id, 
                sender: r.sender_id, 
                receiver: r.receiver_id,
                sender_name: r.sender_name,
                current_user: req.user?.id 
            }))
        );

        res.json({
            success: true,
            message: `Found ${result.rows.length} pending team requests`,
            data: { requests: result.rows }
        });
    } catch (error) {
        logger.error('Error getting received team requests:', error);
        res.status(500).json({
            success: false,
            message: 'Error retrieving team requests',
            error: error instanceof Error ? error.message : 'Unknown error'
        });
    }
};
```

**Why this helps**: Now we can check Railway logs to see if backend is incorrectly returning data where `sender_id === current_user.id`.

### 2. Frontend: Client-Side Safety Filter
Added a filter to exclude any requests where sender matches current user (defense in depth):

**File**: `frontend/src/features/dashboard/EnhancedDashboardPage.tsx`

```typescript
// Get current user from auth context
const { token, user } = useAuth();

// Filter received requests
if (requestsResponse.ok) {
    const requestsResult = await requestsResponse.json();
    if (requestsResult.success && requestsResult.data && requestsResult.data.requests) {
        // Filter out any requests where the current user is the sender (safety check)
        const filteredRequests = requestsResult.data.requests.filter(
            (request: TeamRequest) => request.sender_id !== user?.id
        );
        setPendingRequests(filteredRequests);
    } else {
        setPendingRequests([]);
    }
}
```

**Why this helps**: Even if backend somehow returns bad data, frontend will filter it out before display.

### 3. TypeScript Interface Update
Updated `TeamRequest` interface to include `matchScore`:

```typescript
interface TeamRequest {
  id: number;
  sender_id: string;
  sender_name: string;
  sender_company?: string;
  message: string;
  created_at: string;
  match_context?: {
    skill?: string;
    distance?: number;
    score?: number;
    matchScore?: number;  // Added
  };
}
```

## Testing & Verification

### 1. Check Railway Logs
After deploying, check the matching-service logs on Railway:

```bash
railway logs -s matching-service
```

Look for log entries like:
```
Found 2 requests. Details: [
  { id: 123, sender: 'abc-123', receiver: 'def-456', sender_name: 'John', current_user: 'def-456' },
  { id: 124, sender: 'ghi-789', receiver: 'def-456', sender_name: 'Jane', current_user: 'def-456' }
]
```

**What to check**:
- Is `sender` ever equal to `current_user`? → **Backend bug**
- Is `receiver` always equal to `current_user`? → **Backend correct**

### 2. Test User Flow

**Scenario A: Normal case (should work)**
1. Login as **User A** (Worker)
2. Send team request to **User B** (Contractor)
3. Logout, login as **User B**
4. Check Dashboard → Should see request from User A ✅
5. Should NOT see any requests you sent ✅

**Scenario B: Edge case (self-request)**
1. Login as **User A**
2. Try to send team request to yourself (should be blocked by UI)
3. If somehow created in DB, frontend filter will hide it ✅

### 3. Database Audit Query

Run this query to check for self-requests in the database:

```sql
SELECT 
    id, 
    sender_id, 
    receiver_id, 
    message,
    status,
    created_at
FROM team_requests
WHERE sender_id = receiver_id
AND status = 'pending';
```

If any rows are returned → **Database has self-requests** → Need to add constraint:

```sql
ALTER TABLE team_requests
ADD CONSTRAINT no_self_requests CHECK (sender_id != receiver_id);
```

## Deployment Status

- ✅ **Backend**: Built and deployed to Railway
  - Service: matching-service
  - Build: TypeScript compiled successfully
  - Deploy: `railway up --detach` completed
  - Logs: Available at Railway dashboard

- ✅ **Frontend**: Built and deployed to Firebase
  - Build time: 4.29s
  - Bundle size: 292.06 kB (87.47 kB gzipped)
  - URL: https://comeondost.web.app
  - Deploy: Successful (28 files)

## What Changed

### Backend Files
- `backend/services/matching-service/src/controllers/MatchingController.ts`
  - Added debug logging to `getReceivedTeamRequests`
  - Added `receiver_id` to SELECT query for debugging
  - Log sender/receiver comparison for each request

### Frontend Files
- `frontend/src/features/dashboard/EnhancedDashboardPage.tsx`
  - Import `user` from `useAuth()` hook
  - Filter requests where `sender_id !== user?.id`
  - Updated `TeamRequest` interface to include `matchScore`

## Next Steps

1. **Monitor logs** - Check Railway for any cases where sender equals current user
2. **Run database audit** - Check for self-requests with SQL query above
3. **Add constraint** - If self-requests exist, add DB constraint to prevent them
4. **Test thoroughly** - Have multiple users test sending/receiving requests

## Expected Results After Fix

### Before Fix
```
Pending Team Requests (2)
- Smith Family Projects (You sent this)  ❌
- John Doe wants to work with you        ✅
```

### After Fix
```
Pending Team Requests (1)
- John Doe wants to work with you        ✅
```

## Technical Details

### Authentication Flow
```
User logs in → JWT token stored → token.payload.id = user.id
Dashboard loads → GET /api/matching/team-requests/received with Bearer token
Backend decodes JWT → req.user.id extracted
SQL: WHERE receiver_id = req.user.id → Only requests TO this user
Frontend: filter(r => r.sender_id !== user.id) → Extra safety
```

### Defense in Depth Layers
1. **Backend SQL**: `WHERE receiver_id = $1` (only requests TO you)
2. **Backend logging**: Track sender/receiver for debugging
3. **Frontend filter**: Exclude sender_id === user.id
4. **Database constraint** (recommended): `CHECK (sender_id != receiver_id)`

## Troubleshooting

### If still seeing own requests after deployment:

1. **Clear browser cache** - Hard refresh (Cmd+Shift+R on Mac)
2. **Check user ID** - Verify `user.id` in localStorage matches JWT token payload
3. **Check backend logs** - See if sender_id === receiver_id in query results
4. **Run DB audit** - Look for self-requests in database
5. **Check sender ID in UI** - Temporarily display sender_id to verify it's your ID

### How to check user ID in browser:
```javascript
// Open DevTools Console
const token = localStorage.getItem('token');
const payload = JSON.parse(atob(token.split('.')[1]));
console.log('Token user ID:', payload.id);

const user = JSON.parse(localStorage.getItem('user'));
console.log('Stored user ID:', user.id);

// They should match
```

## Contact & Support

If the issue persists after these fixes:
1. Check Railway logs for detailed request data
2. Verify no self-requests exist in database
3. Ensure frontend is using latest deployment (check bundle hash in HTML)
4. Test with different user accounts to isolate the issue
