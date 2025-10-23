# Location History Feature - Implementation Guide

## Overview
Track and store user GPS location updates over time for historical analysis, route tracking, and team coordination.

## Database Schema Created

### `location_history` Table
- **id**: UUID primary key
- **user_id**: Reference to users table
- **latitude**: GPS latitude (-90 to 90)
- **longitude**: GPS longitude (-180 to 180)
- **accuracy**: GPS accuracy in meters (optional)
- **location_name**: Reverse geocoded address (optional)
- **recorded_at**: Timestamp when location was recorded
- **source**: How location was captured ('manual', 'auto', 'background')

### Indexes
- `user_id` - Fast user lookups
- `recorded_at DESC` - Time-based queries
- `(user_id, recorded_at DESC)` - Combined queries

### Auto-Cleanup
- Function `cleanup_old_location_history()` deletes records older than 30 days
- Can be scheduled with pg_cron extension

## API Endpoints

### 1. Save Location History
```http
POST /api/matching/location/history
Authorization: Bearer <token>
Content-Type: application/json

{
  "latitude": 27.2453,
  "longitude": 75.6575,
  "accuracy": 10.5,
  "source": "manual"
}
```

**Response:**
```json
{
  "success": true,
  "message": "Location history saved successfully",
  "data": {
    "historyId": "uuid",
    "recordedAt": "2025-10-20T10:30:00Z"
  }
}
```

### 2. Get Your Location History
```http
GET /api/matching/location/history?hours=24&limit=100
Authorization: Bearer <token>
```

**Query Parameters:**
- `hours` - Time range (default: 24, max: 720 = 30 days)
- `limit` - Max records (default: 100, max: 1000)

**Response:**
```json
{
  "success": true,
  "message": "Found 45 location records",
  "data": {
    "locations": [
      {
        "id": "uuid",
        "latitude": 27.2453,
        "longitude": 75.6575,
        "accuracy": 10.5,
        "source": "manual",
        "recorded_at": "2025-10-20T10:30:00Z"
      }
    ],
    "timeRange": {
      "hours": 24,
      "from": "2025-10-19T10:30:00Z",
      "to": "2025-10-20T10:30:00Z"
    }
  }
}
```

### 3. Get Team Member's Location History
```http
GET /api/matching/location/history/:teamMemberId?hours=24
Authorization: Bearer <token>
```

**Note:** Only works if you have a team relationship with the user.

### 4. Cleanup Old History
```http
DELETE /api/matching/location/history?days=30
Authorization: Bearer <token>
```

## Setup Instructions

### 1. Run Database Migration
```bash
cd backend/services/matching-service
psql $DATABASE_URL -f migrations/create_location_history_table.sql
```

### 2. Add Routes to Matching Service
Add to `src/routes/matchingRoutes.ts`:
```typescript
import { LocationHistoryController } from '../controllers/LocationHistoryController';

const locationHistoryController = new LocationHistoryController();

// Location history routes
router.post('/location/history', authMiddleware, locationHistoryController.saveLocationHistory);
router.get('/location/history', authMiddleware, locationHistoryController.getLocationHistory);
router.get('/location/history/:teamMemberId', authMiddleware, locationHistoryController.getTeamMemberLocationHistory);
router.delete('/location/history', authMiddleware, locationHistoryController.cleanupOldHistory);
```

### 3. Update Frontend Location Update Function
Modify `SavedMatchesPage.tsx` `updateLocationToBackend()`:
```typescript
const updateLocationToBackend = async (lat: number, lng: number) => {
  if (!token) return;
  
  setLocationUpdateStatus('updating');
  
  try {
    // Save to location history (new endpoint)
    await fetch(`${API_CONFIG.MATCHING_SERVICE}/api/matching/location/history`, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ 
        latitude: lat, 
        longitude: lng,
        source: 'manual'
      })
    });
    
    setLocationUpdateStatus('success');
    setLocationUpdateMessage('✅ Location saved to history');
    fetchMatches();
    
  } catch (err) {
    setLocationUpdateStatus('error');
    setLocationUpdateMessage('❌ Failed to save location');
  }
};
```

## Use Cases

### 1. Track Worker Movement (Contractor View)
- Contractor can see where worker has been in last 24 hours
- Useful for verifying job site visits
- Shows route taken between locations

### 2. Personal Location History
- Users can see their own location history
- Review places visited
- Privacy-controlled

### 3. Team Coordination
- See when team member was last at specific location
- Coordinate meetups based on historical patterns
- Verify work completion

### 4. Analytics
- Most visited locations
- Travel patterns
- Time spent at job sites

## Frontend Components (Optional)

### Location History Map Component
```typescript
// Show location trail on map with timestamps
<LocationHistoryMap 
  locations={locationHistory}
  hours={24}
  showRoute={true}
/>
```

### Location Timeline
```typescript
// Timeline view of location updates
<LocationTimeline 
  locations={locationHistory}
  groupBy="hour" // or "day"
/>
```

## Privacy Considerations

1. **Team-Only Access**: Only team members can view each other's history
2. **Time Limits**: Max 7 days for team members, 30 days for self
3. **Auto-Cleanup**: Old data (>30 days) automatically deleted
4. **User Control**: Users can manually delete their history

## Storage Estimates

- **1 location record** ≈ 200 bytes
- **1 update/hour for 30 days** = 720 records = 140 KB
- **100 active users** = 14 MB/month
- **Very manageable** for typical use case

## Performance

- Indexes ensure fast queries even with millions of records
- Time-based partitioning can be added for scale
- Automatic cleanup prevents unbounded growth

## Next Steps

1. ✅ Run the migration SQL
2. ✅ Add routes to matching service
3. ✅ Update frontend to save history
4. 🔄 Create location history viewer component (optional)
5. 🔄 Add map trail visualization (optional)
6. 🔄 Setup pg_cron for auto-cleanup (optional)

---

**Questions? Need help implementing? Let me know!**
