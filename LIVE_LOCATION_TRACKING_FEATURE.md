# Live Location Tracking & Distance Calculation Feature

## Overview
This feature enables contractors to see their team members' live locations and real-time distances on the "My Team" page.

## Backend Implementation ✅

### 1. Database Migration
**File**: `migrations/add_user_coordinates.sql`
- Added `latitude` (DECIMAL 10,8) and `longitude` (DECIMAL 11,8) columns to `users` table
- Created index on coordinates for geospatial queries
- Supports precision to ~1.1 meters

### 2. Distance Calculation Utility
**File**: `src/utils/distance.ts`
- **Haversine Formula**: Calculates great-circle distance between two points on Earth
- **Functions**:
  - `calculateDistance()` - Returns distance in kilometers
  - `formatDistance()` - Formats as "5.2 km" or "850 m"
  - `areCoordinatesValid()` - Validates lat/lng ranges (-90/90, -180/180)
  - `calculateTeamMemberDistance()` - Safe calculation with null checks

### 3. API Endpoints

#### GET `/api/matching/my-team`
**Enhanced Response** (already existing endpoint):
```json
{
  "success": true,
  "data": {
    "teamMembers": [
      {
        "name": "Ram",
        "role": "worker",
        "latitude": 26.9124,
        "longitude": 75.7873,
        "distance_km": 5.2,
        "distance_formatted": "5.2 km"
      }
    ],
    "currentUserLocation": {
      "latitude": 26.9000,
      "longitude": 75.8000
    }
  }
}
```

#### PUT `/api/matching/location` ✨ NEW
**Purpose**: Update current user's location for live tracking

**Request**:
```json
{
  "latitude": 26.9124,
  "longitude": 75.7873,
  "location": "Jaipur, Rajasthan" (optional)
}
```

**Response**:
```json
{
  "success": true,
  "message": "Location updated successfully",
  "data": {
    "latitude": 26.9124,
    "longitude": 75.7873,
    "location": "Jaipur, Rajasthan"
  }
}
```

**Validation**:
- Latitude: -90 to 90
- Longitude: -180 to 180
- Type: Must be numbers

### 4. Rate Limiting
- Increased from 100 to 500 requests per 15 minutes
- Allows for frequent location updates without hitting limits

## Frontend Implementation (Next Steps)

### Planned Features:
1. **Auto-detect location** on page load using Geolocation API
2. **Display distance** next to each team member (e.g., "5.2 km away")
3. **Live update button** to refresh location
4. **Distance indicator colors**:
   - 🟢 Green: < 5 km (nearby)
   - 🟡 Yellow: 5-20 km (moderate distance)
   - 🔴 Red: > 20 km (far)
5. **Sort by distance** option (nearest first)
6. **Auto-refresh** distance every 30 seconds when page is active

### Example UI Addition:
```tsx
<div className="team-member">
  <strong>{member.name}</strong>
  {member.distance_formatted && (
    <span className="distance-badge">
      📍 {member.distance_formatted}
    </span>
  )}
</div>
```

## Security & Privacy

### Considerations:
- ✅ Coordinates only shared with team members (not public)
- ✅ Requires authentication (JWT token)
- ✅ User must manually update location (opt-in)
- ⚠️ Consider adding privacy settings:
  - Toggle to disable location sharing
  - Show approximate distance only (e.g., "within 10 km")
  - Location history retention policy

## Testing

### Manual Test:
```bash
# 1. Update your location
curl -X PUT https://matching-service-production.up.railway.app/api/matching/location \
  -H "Authorization: Bearer YOUR_TOKEN" \
  -H "Content-Type: application/json" \
  -d '{"latitude": 26.9124, "longitude": 75.7873, "location": "Jaipur"}'

# 2. Get team with distances
curl https://matching-service-production.up.railway.app/api/matching/my-team \
  -H "Authorization: Bearer YOUR_TOKEN"
```

### Expected Results:
- Team members show `distance_km` and `distance_formatted` fields
- Members without coordinates show `null` for distance
- Distance calculation accurate to ~0.1 km

## Deployment Status

### Backend:
- ✅ Migration applied (latitude/longitude columns added)
- ✅ Distance calculation utility created
- ✅ API enhanced with distance calculation
- ✅ New endpoint for location updates
- 🚀 **DEPLOYING** to Railway

### Frontend:
- ⏳ Awaiting implementation (next phase)

## Performance Notes

- **Query Optimization**: Indexed on (latitude, longitude)
- **Calculation Cost**: O(n) where n = team members count (typically < 50)
- **No geospatial database**: Using simple Haversine (sufficient for small scale)
- **For large scale**: Consider PostGIS extension for advanced geo queries

## Future Enhancements

1. **Geofencing**: Notify when team member enters/leaves area
2. **Route mapping**: Show directions to team member location
3. **Location history**: Track movement over time
4. **Heat maps**: Visualize where team members work most often
5. **Availability zones**: Auto-set availability based on current location
