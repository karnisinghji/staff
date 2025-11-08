# Location Tracking Debug Fix

## Problem Identified

The GPS location updates from `/api/matching/update-location-live` were not reflecting in `/api/matching/my-team` results.

**Symptoms:**
- Frontend GPS tracking shows: `lat=27.245064, lng=75.657444`
- Backend my-team query returns: `lat=27.24190824, lng=75.64629684`
- Location appears to revert to old values after some time

## Root Cause Analysis

Both endpoints **DO** use the same `users` table:
- `update-location-live` → UPDATES `users.latitude`, `users.longitude`
- `my-team` → READS `users.latitude`, `users.longitude`

The issue is likely one of:
1. **Multiple requests race condition** - GPS tracking updates every 30s, but queries might read stale data
2. **Database connection pooling** - Different connections seeing different states
3. **Application server instances** - Multiple instances with different cached data

## Fix Applied

### Backend Changes (matching-service)

Added detailed logging to track the exact flow:

**File:** `backend/services/matching-service/src/controllers/MatchingController.ts`

#### 1. Enhanced `updateLocationLive` logging (line ~1485):
```typescript
// Before update
logger.info(`[UPDATE-LOCATION] Updating user ${req.user.id} location to: lat=${latitude}, lng=${longitude}, accuracy=${accuracy}m, source=${source}`);

// After update
const updated = result.rows[0];
logger.info(`[UPDATE-LOCATION] ✅ Updated ${updated.name} (${req.user.id}): lat=${updated.latitude}, lng=${updated.longitude}, accuracy=${updated.location_accuracy}m, last_update=${updated.last_location_update}`);
```

#### 2. Enhanced `getMyTeam` logging (line ~1000):
```typescript
// Log each team member's coordinates when fetched
filteredRows.forEach((member: any) => {
    logger.info(`[GET-MY-TEAM] Member: ${member.name} (${member.team_member_id}) - lat=${member.latitude}, lng=${member.longitude}, last_update=${member.last_location_update}, minutes_ago=${member.minutes_since_location_update}`);
});
```

### Frontend Changes

**File:** `frontend/src/features/matching/TeamMapView.tsx`

1. **Auto-refresh interval**: 15 seconds (not too fast, better UX)
2. **Saves GPS location immediately** when map loads
3. **Shows refresh timestamp** so users know it's updating

## How to Deploy

### Backend (Matching Service)

**Option 1: GitHub Actions (Recommended)**
```bash
# 1. Commit and push changes
cd "/Users/shouryaveersingh/Desktop/old data/staff"
git add backend/services/matching-service/src/controllers/MatchingController.ts
git commit -m "fix: Add detailed location update logging for debugging"
git push origin main

# 2. GitHub Actions will automatically:
#    - Build Docker image
#    - Push to container registry
#    - Deploy to Azure Container Apps
```

**Option 2: Manual Docker Build**
```bash
# Build
cd backend/services/matching-service
docker build -t matching-service:debug .

# Tag for registry
docker tag matching-service:debug <your-registry>/matching-service:latest

# Push
docker push <your-registry>/matching-service:latest

# Update Azure Container App
az containerapp update \
  --name matching-service \
  --resource-group staff-rg \
  --image <your-registry>/matching-service:latest
```

### Frontend

Already deployed ✅

## Testing the Fix

### 1. Start GPS Tracking
- User A: Go to "My Team" page
- Click "Start" on GPS tracking
- Watch console logs for: `[GPS Tracking] Location updated: {...}`

### 2. Check Backend Logs (Azure)
```bash
# View real-time logs
az containerapp logs show \
  --name matching-service \
  --resource-group staff-rg \
  --follow

# Look for:
# [UPDATE-LOCATION] Updating user <uuid> location to: lat=X, lng=Y
# [UPDATE-LOCATION] ✅ Updated <name>: lat=X, lng=Y
```

### 3. Verify on Team Map
- User B: Open "Team Map" page
- Watch for auto-refresh every 15 seconds
- Check if User A's marker updates to new location

### 4. Check Backend Logs Again
```bash
# Look for:
# [GET-MY-TEAM] Member: <name> - lat=X, lng=Y, last_update=<timestamp>
```

## Expected Log Flow

**When GPS updates (User A):**
```
[UPDATE-LOCATION] Updating user abc-123 location to: lat=27.245064, lng=75.657444, accuracy=43m, source=gps
[UPDATE-LOCATION] ✅ Updated Chanchal palawat (abc-123): lat=27.245064, lng=75.657444, accuracy=43m, last_update=2025-01-08 16:30:15
```

**When Team Map fetches (User B, 15 seconds later):**
```
[GET-MY-TEAM] Fetching team members for user: def-456
[GET-MY-TEAM] Member: Chanchal palawat (abc-123) - lat=27.245064, lng=75.657444, last_update=2025-01-08 16:30:15, minutes_ago=0.25
```

## If Problem Persists

### Check Database Directly
```sql
-- Connect to Neon database
SELECT 
    id, 
    name, 
    latitude, 
    longitude, 
    last_location_update,
    location_accuracy,
    location_source,
    is_location_tracking_active
FROM users 
WHERE name = 'Chanchal palawat';
```

### Possible Issues

1. **Multiple backend instances** - If running multiple container replicas, check if all are using the same database connection pool
2. **Database replication lag** - If using read replicas, there might be delay
3. **Transaction isolation level** - Check if `READ COMMITTED` is being used

### Additional Debugging

Add this to matching service startup to verify database connection:
```typescript
// In src/index.ts startup
pool.query('SELECT NOW(), pg_backend_pid()').then(result => {
  logger.info(`Database connected: ${result.rows[0].now}, PID: ${result.rows[0].pg_backend_pid}`);
});
```

## Files Changed

### Backend
- ✅ `backend/services/matching-service/src/controllers/MatchingController.ts`
  - Added logging to `updateLocationLive` (line ~1485)
  - Added logging to `getMyTeam` (line ~1000)

### Frontend
- ✅ `frontend/src/features/matching/TeamMapView.tsx`
  - 15-second auto-refresh
  - Saves GPS to backend on load
  - Shows last refresh time

## Next Steps

1. **Deploy backend** via GitHub Actions
2. **Monitor logs** for 5-10 minutes during GPS tracking
3. **Compare timestamps** between UPDATE-LOCATION and GET-MY-TEAM logs
4. **If coordinates still don't match**, it indicates a database-level issue (replication lag, connection pooling, or transaction isolation)

## Current Status

- ✅ Backend code updated with logging
- ✅ Backend compiled successfully (`npm run build`)
- ⏳ **Pending deployment** to Azure Container Apps
- ✅ Frontend deployed and working

## Deployment Command

After pushing to GitHub:
```bash
# Watch GitHub Actions
# https://github.com/karnisinghji/staff/actions

# Once deployed, check logs
az containerapp logs show --name matching-service --resource-group staff-rg --follow
```
