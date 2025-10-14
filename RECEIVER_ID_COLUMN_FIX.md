# Database Column Name Mismatch - FIXED ✅

## Issue
**500 Internal Server Error** when contacting contractors:
```
POST https://matching-service-production.up.railway.app/api/matching/contact-contractor 500
```

## Root Cause

**Database schema mismatch**: 
- **Code was using**: `recipient_id` 
- **Database actually has**: `receiver_id`

### Error from Railway Logs:
```
Error sending contact request: column "recipient_id" of relation "team_requests" does not exist
```

## The Problem

The `team_requests` table in the **production database** uses `receiver_id`, but:
1. The schema file (`database-schema.sql`) shows `recipient_id`
2. New code was written using `recipient_id` from the schema
3. Existing queries in the codebase use `receiver_id`

**This created an inconsistency!**

## Solution

Fixed **two methods** in `MatchingController.ts` to use the correct column name:

### 1. contactContractor Method
**Before**:
```typescript
INSERT INTO team_requests (sender_id, recipient_id, message, status, created_at)
VALUES ($1, $2, $3, 'pending', NOW())
RETURNING id, sender_id, recipient_id, message, status, created_at
```

**After**:
```typescript
INSERT INTO team_requests (sender_id, receiver_id, message, status, created_at)
VALUES ($1, $2, $3, 'pending', NOW())
RETURNING id, sender_id, receiver_id, message, status, created_at
```

### 2. sendTeamRequest Method
**Before**:
```typescript
INSERT INTO team_requests (sender_id, recipient_id, message, match_context, status)
VALUES ($1, $2, $3, $4, 'pending')
ON CONFLICT (sender_id, recipient_id) 
DO UPDATE SET ...
```

**After**:
```typescript
INSERT INTO team_requests (sender_id, receiver_id, message, match_context, status)
VALUES ($1, $2, $3, $4, 'pending')
ON CONFLICT (sender_id, receiver_id) 
DO UPDATE SET ...
```

## Files Changed

✅ **File**: `backend/services/matching-service/src/controllers/MatchingController.ts`
- Line ~453: `sendTeamRequest` INSERT query
- Line ~985: `contactContractor` INSERT query
- Changed: `recipient_id` → `receiver_id` (2 places in each query)

## Deployment

```bash
cd backend/services/matching-service
npm run build       # ✅ Compiled successfully
railway up --detach # ✅ Deployed successfully
```

### Service Status
- **Health**: ✅ HEALTHY
- **Uptime**: Just restarted (7 seconds)
- **URL**: https://matching-service-production.up.railway.app
- **Timestamp**: 2025-10-14T01:18:34.183Z

## Verification

### Other queries in the codebase already use `receiver_id`:
```typescript
// Line 512: Get received requests
WHERE tr.receiver_id = $1 

// Line 546: Select receiver_id
tr.receiver_id,

// Line 561: Join on receiver
JOIN users u ON tr.receiver_id = u.id

// Line 596: Select from team_requests
SELECT sender_id, receiver_id, status...

// Line 608: Check receiver permission
if (request.receiver_id !== req.user.id)

// Line 633: Get receiver role
SELECT role FROM users WHERE id = $1', [request.receiver_id]
```

**14 existing references** to `receiver_id` confirmed the correct column name!

## Why This Happened

1. **Schema file** (`database-schema.sql`) was updated to use `recipient_id` at some point
2. **Production database** was never migrated to match
3. **New code** was written based on schema file
4. **Old code** still uses `receiver_id` and works fine

## Next Steps

**Option 1**: Keep using `receiver_id` (current fix) ✅
- **Pros**: No database migration needed, matches production
- **Cons**: Schema file is inaccurate

**Option 2**: Rename column in production to `recipient_id`
- **Pros**: Matches schema file
- **Cons**: Requires migration, downtime, risk

**Recommendation**: **Keep using `receiver_id`** (Option 1) 
- Update schema file to match production later if needed
- All code now uses consistent column name

## Testing

Try the contact feature again:
1. Go to https://comeondost.web.app
2. Login as worker
3. View contractor requirements
4. Click "Contact" button
5. Should now see: **"✅ Message sent successfully!"** ✅

## Status: ✅ FIXED & DEPLOYED

- [x] Identified column name mismatch
- [x] Fixed contactContractor method
- [x] Fixed sendTeamRequest method  
- [x] Rebuilt service
- [x] Deployed to Railway
- [x] Service healthy and running
- [x] Ready for testing

---

**Fixed**: October 14, 2025 01:18 UTC  
**Service**: matching-service  
**Issue**: Database column mismatch (`recipient_id` vs `receiver_id`)  
**Resolution**: Use `receiver_id` to match production database ✅
