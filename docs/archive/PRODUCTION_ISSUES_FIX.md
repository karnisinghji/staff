# Production Issues - Quick Fix Guide

## Current Issues & Solutions

### 1. WebSocket Connection Failure ❌

**Problem**: Frontend tries to connect to WebSocket but backend doesn't have WebSocket server implemented.

**Quick Fix** - Disable WebSocket in frontend:

Edit `frontend/src/features/notifications/NotificationContext.tsx`:

```typescript
export const NotificationProvider = ({ children }: { children: ReactNode }) => {
  const [notifications, setNotifications] = useState<Notification[]>([]);

  useEffect(() => {
    // TODO: Re-enable when backend WebSocket is implemented
    // Temporarily disabled to prevent console errors
    /*
    const ws = new WebSocket(WS_CONFIG.NOTIFICATION);
    ws.onmessage = (event) => {
      const data = JSON.parse(event.data);
      setNotifications((prev) => [
        ...prev,
        { id: Date.now().toString(), message: data.message, type: data.type || 'info' }
      ]);
    };
    return () => ws.close();
    */
    console.log('WebSocket notifications disabled - backend implementation pending');
  }, []);

  // ... rest of the code remains the same
```

### 2. Matching Service 400 Error - find-contractors ❌

**Problem**: Missing or incorrect required fields in request.

**Backend expects** (from `matchingRoutes.ts`):
```typescript
{
  location: string,      // REQUIRED
  maxDistance: number,   // REQUIRED
  skillType?: string,    // optional
  limit?: number        // optional
}
```

**Frontend Fix** - Check `EnhancedMatchSearchPage.tsx` line 479:

Current problem: Frontend might be sending undefined values. Ensure:

```typescript
const searchBody = {
  location: location || 'Unknown',  // Provide default or validate before submit
  maxDistance: maxDistance || 50,   // Ensure always a number
  skillType: skillType || undefined,
  limit: 12
};
```

### 3. Matching Service 500 Error - send-team-request ❌

**Problem**: Frontend sends wrong field name and wrong endpoint.

**Current Frontend Code** (WRONG):
```typescript
fetch(`${API_CONFIG.MATCHING_SERVICE}/api/matching/team-requests`, {  // ❌ Wrong endpoint
  body: JSON.stringify({
    recipient_id: match.id,  // ❌ Wrong field name
    message: '...'
  })
})
```

**Corrected Code** (RIGHT):
```typescript
fetch(`${API_CONFIG.MATCHING_SERVICE}/api/matching/send-team-request`, {  // ✓ Correct
  method: 'POST',
  headers: {
    'Authorization': `Bearer ${token}`,
    'Content-Type': 'application/json',
  },
  body: JSON.stringify({
    receiverId: match.id,  // ✓ Correct field name (must be valid UUID)
    message: `Hi ${match.name}, I'd like to invite you to join my team.`,
    matchContext: {
      skill: skillType,
      searchType: user?.role === 'contractor' ? 'worker' : 'contractor'
    }
  })
})
```

### 4. Fix EnhancedMatchSearchPage.tsx

**Line ~540 - Update team request call:**

```typescript
const handleTeamRequest = async (match: any) => {
  if (!token) return;
  
  setActionLoading(`team-${match.id}`);
  
  try {
    // FIXED: Use correct endpoint and field names
    const response = await fetch(`${API_CONFIG.MATCHING_SERVICE}/api/matching/send-team-request`, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        receiverId: match.id,  // Changed from recipient_id
        message: `Hi ${match.name || 'there'}, I'd like to invite you to join my team. Your skills in ${skillType} would be a great fit for our project.`,
        matchContext: {
          skill: skillType,
          distance: match.distanceKm ? `${Math.round(match.distanceKm)} km` : undefined,
          matchScore: match.score,
          searchType: user?.role === 'contractor' ? 'worker' : 'contractor'
        }
      }),
    });

    if (response.ok) {
      success('Team request sent', `Invitation sent to ${match.name || 'worker'}`);
    } else {
      const errorData = await response.json();
      throw new Error(errorData.message || 'Failed to send team request');
    }
  } catch (err) {
    console.error('Team request error:', err);
    showError('Failed to send request', err.message || 'Please try again');
  } finally {
    setActionLoading(null);
  }
};
```

## Testing Steps

1. **Run diagnostic script**:
```bash
node test-production-issues.js YOUR_JWT_TOKEN
```

2. **Check Railway logs**:
```bash
railway logs -s matching-service
```

3. **Test locally**:
```bash
cd backend/services/matching-service
npm run dev
```

4. **Verify JWT token role**:
```bash
# Decode JWT to check role claim
echo 'YOUR_TOKEN' | cut -d'.' -f2 | base64 -d | jq
```

## Backend Validation Rules

**find-contractors** (Worker searching for contractors):
- Requires: `location` (string), `maxDistance` (number)
- User must have `worker` role
- Optional: `skillType`, `budgetRange`, `experienceLevel`, `urgency`

**send-team-request**:
- Requires: `receiverId` (valid UUID from database)
- Optional: `message` (string, max 500 chars), `matchContext` (object)
- Validates:
  - User is not sending to themselves
  - Neither user has blocked the other
  - No pending request already exists
  - Receiver exists in database

## Common Pitfalls

1. ❌ Sending `undefined` or empty string for required fields
2. ❌ Using wrong endpoint URLs (check `api.ts` config)
3. ❌ Mismatched field names between frontend/backend
4. ❌ Invalid UUID format for `receiverId`
5. ❌ Missing Authorization header or expired token
6. ❌ User role doesn't match endpoint requirements

## Quick Deploy After Fixes

```bash
# Frontend
cd frontend
npm run build
git add .
git commit -m "fix: correct matching service API calls"
git push

# Backend (if changes needed)
cd backend/services/matching-service
railway up --detach
```
