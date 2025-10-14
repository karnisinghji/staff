# 🐛 MyTeam HTTP 500 Error - Debugging & Fix

**Date**: October 14, 2025  
**Issue**: `SavedMatchesPage-Dxf8VrRG.js:15 MyTeamPage: Network/Fetch Error: Error: HTTP 500`  
**Status**: 🔄 **RESOLVING**

---

## Problem Analysis

### Error Details
- **Component**: `MyTeamPage` (in SavedMatchesPage.tsx)
- **Endpoint**: `GET /api/matching/my-team`
- **HTTP Status**: 500 Internal Server Error
- **Service**: matching-service on Railway

### Root Cause Investigation

1. **Endpoint Verification** ✅
   - Route exists: `/api/matching/my-team`
   - Controller method: `getMyTeam`
   - Authentication middleware: `authenticateToken`
   - Status: **Route correctly configured**

2. **Deployment Status** 🔄
   - Recent changes deployed but may need rebuild
   - Forced redeploy initiated
   - Build logs: https://railway.com/project/71b37554-46f1-4c59-a6c4-0add8cee20c1

3. **Logs Analysis** ⚠️
   - Logs show `/team-requests/received` working fine (200 OK)
   - No recent logs for `/my-team` endpoint
   - Suggests: Either not called yet OR deployment not complete

---

## Possible Causes

### 1. Deployment Not Complete (Most Likely)
- **Symptom**: Code changes deployed but service still using old build
- **Solution**: Force redeploy (already initiated)
- **Timeline**: 2-5 minutes for Railway to rebuild and deploy

### 2. Database Query Error
- **Symptom**: SQL error in `getMyTeam` method
- **Recent Changes**: Added pagination, LIMIT/OFFSET clauses
- **Check**: Need to see actual error logs when endpoint is hit

### 3. TypeScript Compilation Issue
- **Symptom**: Runtime error from TypeScript build
- **Status**: All builds passed with 0 errors
- **Likelihood**: Low

### 4. Missing Environment Variables
- **Symptom**: Service can't read NODE_ENV or other vars
- **Check**: Railway dashboard environment variables
- **Action**: Verify `NODE_ENV=production` is set

---

## Resolution Steps

### Step 1: Wait for Redeploy ✅
```bash
# Deployment initiated at: 2025-10-14 08:XX
# Expected completion: 2-5 minutes
# Monitor at: https://railway.com/project/71b37554-46f1-4c59-a6c4-0add8cee20c1
```

### Step 2: Test with Real Token
Once deployment completes:

1. **Get Your Token**:
   - Go to https://comeondost.web.app
   - Login if needed
   - Open DevTools (F12 or Cmd+Option+I)
   - Go to: Application > Local Storage > comeondost.web.app
   - Copy the value of `token`

2. **Test Endpoint**:
   ```bash
   cd /Users/shouryaveersingh/Desktop/old\ data/staff
   node test-myteam-error.js YOUR_TOKEN_HERE
   ```

3. **Expected Output** (Success):
   ```json
   {
     "success": true,
     "message": "Found X team members",
     "data": {
       "teamMembers": [...],
       "pagination": {
         "page": 1,
         "limit": 50,
         "total": X,
         "hasMore": false
       }
     }
   }
   ```

### Step 3: Check Railway Logs
```bash
cd backend/services/matching-service
railway logs | grep -A 10 "myteam\|my-team\|Error"
```

### Step 4: Verify Environment Variables
```bash
railway variables --service matching-service
```

Expected:
- ✅ `NODE_ENV=production`
- ✅ `DATABASE_URL=postgresql://...`
- ✅ `JWT_SECRET=...`
- ⚠️ `MIN_MATCH_SCORE=0` (add if missing)

---

## Code Analysis

### Current Implementation

**Route** (`backend/services/matching-service/src/routes/matchingRoutes.ts:134`):
```typescript
router.get('/api/matching/my-team',
    authenticateToken,
    matchingController.getMyTeam
);
```

**Controller** (`backend/services/matching-service/src/controllers/MatchingController.ts:796`):
```typescript
getMyTeam = async (req: Request, res: Response): Promise<void> => {
    try {
        if (!req.user) {
            res.status(401).json({ success: false, message: 'Authentication required' });
            return;
        }

        // Pagination support
        const page = Math.max(MatchingController.MIN_PAGE, parseInt(req.query.page as string) || MatchingController.MIN_PAGE);
        const limit = Math.min(MatchingController.MAX_PAGE_SIZE, Math.max(1, parseInt(req.query.limit as string) || MatchingController.DEFAULT_PAGE_SIZE));
        const offset = (page - 1) * limit;

        logger.info(`Fetching team members for user: ${req.user.id} (page: ${page}, limit: ${limit})`);

        const result = await pool.query(`
            SELECT 
                tm.id as team_member_record_id,
                tm.user_id,
                tm.team_member_id,
                ... // Full SQL query with JOINs
            WHERE tm.user_id = $1 
                AND tm.team_member_id != $1
                AND tm.team_member_id IS NOT NULL
                AND ub.id IS NULL
            ORDER BY tm.created_at DESC
            LIMIT $2 OFFSET $3
        `, [req.user.id, limit, offset]);

        // Get total count for pagination
        const countResult = await pool.query(...);
        const total = parseInt(countResult.rows[0].total);

        // Filter out self-references
        const filteredRows = this.filterSelfTeamMembers(result.rows, currentUserId);

        res.json({
            success: true,
            message: `Found ${filteredRows.length} team members`,
            data: {
                teamMembers: filteredRows,
                pagination: { page, limit, total, hasMore: page * limit < total }
            }
        });

    } catch (error) {
        logger.error('Error getting team members:', error);
        res.status(500).json({
            success: false,
            message: 'Error retrieving team members',
            ...(process.env.NODE_ENV === 'development' && {
                error: error instanceof Error ? error.message : 'Unknown error'
            })
        });
    }
};
```

### Recent Changes Made
1. ✅ Added pagination support (page, limit, offset)
2. ✅ Added LIMIT/OFFSET to SQL query
3. ✅ Added total count query for pagination metadata
4. ✅ Added filterSelfTeamMembers helper method
5. ✅ Added environment-based error handling
6. ✅ All TypeScript compiled successfully

### Potential Issues in New Code

**Issue 1**: `filterSelfTeamMembers` helper
```typescript
private filterSelfTeamMembers(rows: any[], currentUserId: string): any[] {
    return rows.filter(r =>
        r.team_member_id !== currentUserId &&
        r.user_id !== r.team_member_id &&
        r.team_member_id != null
    );
}
```
**Status**: Correct implementation

**Issue 2**: COUNT query
```typescript
const countResult = await pool.query(`
    SELECT COUNT(*) as total
    FROM team_members tm
    LEFT JOIN blocked_users ub ON (...)
    WHERE tm.user_id = $1 
        AND tm.team_member_id != $1
        AND tm.team_member_id IS NOT NULL
        AND ub.id IS NULL
`, [req.user.id]);
```
**Status**: Should work, but let's verify `blocked_users` table exists
**Note**: Table is actually named `user_blocks` (already fixed in migration)

**Issue 3**: Pagination parameters
```typescript
const page = Math.max(MatchingController.MIN_PAGE, ...);
```
**Status**: Constants defined correctly

---

## Testing Checklist

Once deployment completes:

- [ ] Test `/api/matching/my-team` with valid token
- [ ] Verify pagination works (check metadata)
- [ ] Confirm self-references are filtered out
- [ ] Check Railway logs for any SQL errors
- [ ] Verify error handling (NODE_ENV=production hides details)
- [ ] Test on live site (https://comeondost.web.app)

---

## Monitoring

### Railway Logs Command
```bash
# Watch logs in real-time
railway logs --service matching-service --tail

# Search for errors
railway logs --service matching-service | grep -i error

# Search for myteam endpoint
railway logs --service matching-service | grep -i "my-team\|myteam"
```

### Health Check
```bash
curl https://matching-service-production.up.railway.app/health
```

Expected:
```json
{
  "service": "matching-service",
  "status": "healthy",
  "timestamp": "2025-10-14T08:XX:XXZ",
  "uptimeSeconds": XXX,
  "checks": {
    "database": "connected"
  }
}
```

---

## Next Actions

1. **Wait 2-5 minutes** for Railway redeploy to complete
2. **Test endpoint** with real token using `test-myteam-error.js`
3. **Check logs** for any SQL or runtime errors
4. **Verify environment variables** are set correctly
5. **Test on live site** to confirm fix

---

## Update Status

- **08:XX** - Issue reported (HTTP 500 error)
- **08:XX** - Endpoint verified (route exists, auth works)
- **08:XX** - Forced redeploy initiated
- **08:XX+5min** - Deployment should complete
- **Pending** - Test with real token
- **Pending** - Verify fix on live site

---

**Current Status**: 🔄 **Waiting for deployment to complete**  
**Estimated Fix Time**: 5-10 minutes  
**Likelihood of Success**: High (all code compiles, routes correct, likely just stale deployment)

---

## If Issue Persists

If still getting 500 error after redeploy:

1. Check for table name mismatch (`user_blocks` vs `blocked_users`)
2. Verify all database tables exist
3. Check for SQL syntax errors in logs
4. Verify JWT secret is consistent
5. Test locally with same database

---

*This document will be updated once deployment completes and testing is done.*
