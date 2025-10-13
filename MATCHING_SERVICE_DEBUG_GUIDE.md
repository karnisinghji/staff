# Matching Service Debug Guide

This guide provides information on common issues with the matching service and how to troubleshoot them.

## API Requirements

### Find Contractors/Workers API

These endpoints require specific parameters to work correctly:

#### Find Contractors (`/api/matching/find-contractors`)
- **Required fields**: 
  - `location`: String (city name like "Delhi", "Mumbai", or coordinate pair like "12.9716,77.5946")
  - `maxDistance`: Number (max distance in km, capped at value in `MAX_MATCHING_DISTANCE_KM` env var)
- **Optional fields**:
  - `skillType`: String (type of skill needed)
  - `budgetRange`: Object with `min` and `max` properties
  - `limit`: Number (max results to return, capped at 100)

#### Find Workers (`/api/matching/find-workers`)
- **Required fields**: 
  - `skillType`: String (type of skill needed)
  - `location`: String (city name or coordinate pair)
  - `maxDistance`: Number (max distance in km)
- **Optional fields**: 
  - Same as Find Contractors API

### Team Request API

The `/api/matching/send-team-request` endpoint requires:

- **Required fields**:
  - `receiverId`: String (UUID of the recipient)
- **Optional fields**:
  - `message`: String (message to send with request)
  - `matchContext`: Object containing additional info (skill, distance, matchScore, searchType)

## Common Issues and Solutions

### 400 Bad Request

For `/api/matching/find-contractors` or `/api/matching/find-workers`:
1. Missing required fields - ensure `location` and `maxDistance` are provided
2. For workers search, `skillType` is also required
3. Ensure numeric fields are actually numbers, not strings

### 500 Internal Server Error

For `/api/matching/send-team-request`:
1. `receiverId` is missing or invalid (must be UUID format)
2. Database connection issues
3. Receiver doesn't exist in database
4. Block relationship exists between users

### Location Issues

1. **Location format**: Accepts both city names ("Delhi", "Mumbai") and coordinates ("12.9716,77.5946")
2. **Supported cities**: 100+ Indian cities (see list in `location.ts`)
3. **Fallback city**: If location can't be matched, defaults to Jaipur (26.9124, 75.7873)
4. **Alternative names**: Supports variations like "Bengaluru"/"Bangalore", "Trivandrum"/"Thiruvananthapuram"

### Authentication Issues

1. JWT token missing or invalid
2. User doesn't have correct role:
   - `find-contractors` requires `worker` role
   - `find-workers` requires `contractor` role
   - Check roles in decoded JWT or database

## Testing & Debugging Tips

### Client-Side Request Format

```javascript
// Search for contractors example
const response = await fetch(`${API_CONFIG.MATCHING_SERVICE}/api/matching/find-contractors`, {
  method: 'POST',
  headers: {
    'Authorization': `Bearer ${token}`,
    'Content-Type': 'application/json',
  },
  body: JSON.stringify({
    location: "Delhi",
    maxDistance: 50,
    limit: 12
  })
});

// Team request example
const response = await fetch(`${API_CONFIG.MATCHING_SERVICE}/api/matching/send-team-request`, {
  method: 'POST',
  headers: {
    'Authorization': `Bearer ${token}`,
    'Content-Type': 'application/json',
  },
  body: JSON.stringify({
    receiverId: "123e4567-e89b-12d3-a456-426614174000", // Must be UUID
    message: "Join my team",
    matchContext: { skill: "electrician" }
  })
});
```

### Checking API Health

```bash
# Check if service is healthy
curl http://localhost:3003/health
```

### Debugging with test-production-issues.js

```bash
node test-production-issues.js YOUR_TOKEN
```

This tool will run diagnostics on all services including matching service.

## Environment Variables

Key environment variables that affect matching service:

- `JWT_SECRET`: Must match across all services
- `MAX_MATCHING_DISTANCE_KM`: Maximum allowed search radius (defaults to 50km)
- `CORS_ORIGINS` or `ALLOWED_ORIGINS`: For cross-origin requests