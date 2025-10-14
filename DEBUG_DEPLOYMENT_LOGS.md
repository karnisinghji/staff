# 🔍 Debug Deployment - Find the Root Cause

## What I Added

### 1. Comprehensive Logging
Added detailed logging to both endpoints to see exactly what data is being returned:

**getReceivedTeamRequests**:
```typescript
logger.info(`Raw query returned ${result.rows.length} requests for user ${req.user.id}`);
logger.info(`Request details:`, JSON.stringify({
    request_id: r.id,
    sender: r.sender_id,
    receiver: r.receiver_id,
    sender_name: r.sender_name,
    are_equal: r.sender_id === r.receiver_id,  // Are sender and receiver the same?
    sender_equals_user: r.sender_id === req.user?.id,  // Is sender YOU?
    receiver_equals_user: r.receiver_id === req.user?.id  // Is receiver YOU?
}));
```

**getMyTeam**:
```typescript
logger.info(`Raw query returned ${result.rows.length} team members for user ${req.user.id}`);
logger.info(`Team member details:`, JSON.stringify({
    record_id: r.team_member_record_id,
    user_id: r.user_id,
    team_member_id: r.team_member_id,
    name: r.name,
    is_self: r.team_member_id === req.user?.id,  // Is this YOU?
    user_equals_member: r.user_id === r.team_member_id  // Self-reference?
}));
```

### 2. Triple-Layer Filtering

**SQL Layer**:
```sql
WHERE tr.receiver_id = $1 
AND tr.sender_id != $1
AND tr.sender_id IS NOT NULL
AND tr.receiver_id IS NOT NULL
```

**Application Layer**:
```typescript
const filteredRows = result.rows.filter(r => 
    r.sender_id !== currentUserId && 
    r.sender_id !== r.receiver_id  // No self-requests
);
```

**Frontend Layer** (already in place):
```typescript
const filteredRequests = requestsResult.data.requests.filter(
    (request: TeamRequest) => request.sender_id !== user?.id
);
```

### 3. Added NULL Checks
- `AND tr.sender_id IS NOT NULL`
- `AND tr.receiver_id IS NOT NULL`
- `AND tm.team_member_id IS NOT NULL`

## How to Debug

### Step 1: Test the Application
1. Go to https://comeondost.web.app
2. **Clear cache** (Cmd+Shift+R or Ctrl+Shift+R)
3. Login with your account
4. Go to Dashboard
5. Check both:
   - "Pending Team Requests" section
   - "My Team" section
6. Note if you still see yourself

### Step 2: Check Railway Logs
```bash
cd /Users/shouryaveersingh/Desktop/old\ data/staff/backend/services/matching-service
railway logs --limit 50
```

Look for these log entries after you load the Dashboard:

**For Pending Requests**:
```
Fetching received team requests for user: YOUR_USER_ID
Raw query returned X requests for user YOUR_USER_ID
Request details: [
  {
    "request_id": "abc-123",
    "sender": "SENDER_ID",
    "receiver": "YOUR_ID",
    "sender_name": "John Doe",
    "are_equal": false,  ← Should be false
    "sender_equals_user": false,  ← Should be false
    "receiver_equals_user": true  ← Should be true
  }
]
After filtering: Y requests remain
```

**For My Team**:
```
Fetching team members for user: YOUR_USER_ID
Raw query returned X team members for user YOUR_USER_ID
Team member details: [
  {
    "record_id": 123,
    "user_id": "YOUR_ID",
    "team_member_id": "MEMBER_ID",
    "name": "Jane Smith",
    "is_self": false,  ← Should be false
    "user_equals_member": false  ← Should be false
  }
]
After filtering: Y team members remain
```

### Step 3: Analyze the Data

**If `sender_equals_user: true`** in logs:
- You have a **self-request** in the database
- Database has: `sender_id = receiver_id = YOUR_ID`
- Need to delete bad data

**If `is_self: true`** in logs:
- You have a **self-team-member** record
- Database has: `team_member_id = YOUR_ID`
- Need to delete bad data

**If logs show 0 after filtering but UI still shows data**:
- Frontend is not updating properly
- Clear browser cache more aggressively
- Check if using old cached bundle

## Possible Scenarios

### Scenario A: Self-Requests in Database
```sql
-- Find self-requests
SELECT id, sender_id, receiver_id, message, created_at
FROM team_requests
WHERE sender_id = receiver_id;

-- Delete them (if found)
DELETE FROM team_requests
WHERE sender_id = receiver_id;
```

### Scenario B: Self-Team-Members
```sql
-- Find self-team-members
SELECT id, user_id, team_member_id, created_at
FROM team_members
WHERE user_id = team_member_id;

-- Delete them (if found)
DELETE FROM team_members
WHERE user_id = team_member_id;
```

### Scenario C: NULL User IDs
```sql
-- Find NULL IDs
SELECT * FROM team_requests
WHERE sender_id IS NULL OR receiver_id IS NULL;

SELECT * FROM team_members
WHERE team_member_id IS NULL;

-- Clean up
DELETE FROM team_requests WHERE sender_id IS NULL OR receiver_id IS NULL;
DELETE FROM team_members WHERE team_member_id IS NULL;
```

### Scenario D: Wrong User ID in Token
- Your JWT token has wrong user ID
- Check: Open DevTools Console
  ```javascript
  const token = localStorage.getItem('token');
  const payload = JSON.parse(atob(token.split('.')[1]));
  console.log('Token user ID:', payload.id);
  console.log('Token user name:', payload.name);
  ```

## What to Report Back

After testing, please share:

1. **Do you still see yourself?** (Yes/No for each: Pending Requests, My Team)

2. **Railway logs output** (copy the JSON from logs showing sender/receiver IDs)

3. **Your user ID from token** (run the DevTools command above)

4. **Name showing in UI** when you see yourself (is it your actual name?)

This will help me understand if:
- The database has bad data
- The filtering isn't working
- There's a user ID mismatch
- Frontend is caching old data

## Deployment Status

✅ **Built**: TypeScript compiled successfully  
✅ **Deployed**: Railway deployment initiated  
🔄 **Wait**: 2-3 minutes for service restart  
📊 **Logs**: Will show detailed debugging info  

## Next Steps

Based on what the logs show, we'll either:
1. **Clean up bad database data** (SQL DELETE commands)
2. **Fix a logic bug** (if filtering isn't working)
3. **Fix frontend caching** (if backend returns empty but UI shows data)
4. **Investigate user ID mismatch** (if token has wrong ID)

---

**Please wait 3 minutes, then test and share the Railway logs!** 🔍
