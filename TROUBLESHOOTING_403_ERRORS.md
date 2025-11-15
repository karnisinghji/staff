# Troubleshooting 403 Errors on Team Requests Endpoint

## Issue
Frontend is getting `403 Forbidden` errors when fetching team requests:
```
Failed to load resource: the server responded with a status of 403 ()
matching-service.del…requests/received:1
```

## Root Causes & Fixes

### 1. **Expired/Invalid JWT Token** (Most Common)
The user's authentication token has expired or is invalid.

**Check token expiry:**
```javascript
// In browser console
const token = localStorage.getItem('token');
const payload = JSON.parse(atob(token.split('.')[1]));
console.log('Token expires:', new Date(payload.exp * 1000));
console.log('Current time:', new Date());
```

**Fix**: Log out and log back in to get a fresh token

### 2. **CORS Headers Missing**
The response might not include proper CORS headers.

**Backend fix** (`backend/services/matching-service/src/app.ts`):
```typescript
app.use(cors({
  origin: process.env.ALLOWED_ORIGINS?.split(',') || [
    'http://localhost:5173',
    'https://comeondost.web.app',
    'https://comeondost.firebaseapp.com'
  ],
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization']
}));
```

**Environment variable** (Azure Container Apps):
```
ALLOWED_ORIGINS=https://comeondost.web.app,https://comeondost.firebaseapp.com
```

### 3. **User Role Not Authorized**
The endpoint might require specific user roles (contractor vs worker).

**Check your role:**
```javascript
const user = JSON.parse(localStorage.getItem('user'));
console.log('Your role:', user.role);
```

**Backend validation** (line 119 in `matchingRoutes.ts`):
- `GET /api/matching/team-requests/received` - Can be accessed by any authenticated user
- No specific role restriction in current implementation

### 4. **User Blocked or Blocked Sender**
The query filters out blocked users (line ~636 in MatchingController.ts):
```sql
LEFT JOIN user_blocks ub ON (
    (ub.blocker_id = $1 AND ub.blocked_id = tr.sender_id) OR 
    (ub.blocker_id = tr.sender_id AND ub.blocked_id = $1)
)
```

**Fix**: Check if you've blocked the sender or vice versa

### 5. **Request No Longer Pending**
Only requests with `status = 'pending'` are returned.

**Statuses**:
- ✅ `pending` - Shown in received requests
- ❌ `accepted` - Moved to team
- ❌ `rejected` - Hidden

---

## Debug Steps

### Step 1: Check Network Request
```
1. Open DevTools (F12)
2. Go to Network tab
3. Refresh page
4. Look for GET request to:
   - Production: https://matching-service.delightfulflower-04821c4b.southeastasia.azurecontainerapps.io/api/matching/team-requests/received
   - Local: http://localhost:3003/api/matching/team-requests/received
5. Click request, check Response headers for CORS issues
```

### Step 2: Check Authorization Header
```
Request Headers should include:
Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
```

### Step 3: Test Endpoint Directly
```bash
# Terminal
TOKEN=$(curl -s -X POST http://localhost:3001/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{"email":"test@example.com","password":"password"}' \
  | jq -r '.data.token')

curl -H "Authorization: Bearer $TOKEN" \
  http://localhost:3003/api/matching/team-requests/received
```

### Step 4: Check Backend Logs
```bash
# For Azure Container Apps
az containerapp logs show \
  --name matching-service \
  --resource-group staff-sea-rg \
  --type console \
  --tail 50
```

---

## Quick Fix Checklist

- [ ] Logged out and logged back in (refresh token)
- [ ] Checked `console.log` for token expiry
- [ ] Verified user role is correctly set
- [ ] Cleared browser cache (Ctrl+Shift+Delete)
- [ ] Checked if you've blocked/been blocked by users
- [ ] Verified `ALLOWED_ORIGINS` environment variable in Azure
- [ ] Hard refresh frontend (Ctrl+F5)
- [ ] Checked backend logs for stack trace

---

## Fixed Issues

### ✅ Icon MIME Type Error
**Error**: `Error while trying to use the following icon from the Manifest: https://comeondost.web.app/icons/icon-192.webp (Download error or resource isn't a valid image)`

**Fix**: Updated `frontend/public/manifest.json` to declare icons as `image/webp` instead of `image/png`
- Icons are .webp format but were incorrectly declared as .png
- Browser couldn't load them due to MIME type mismatch
- **Status**: ✅ Fixed in commit e53ebdf0

---

## Related Endpoints

All endpoints requiring authentication will return 403 if token is invalid:

```
GET  /api/matching/team-requests/received    - Fetch received requests
GET  /api/matching/team-requests/sent        - Fetch sent requests
GET  /api/matching/my-team                   - Fetch team members
POST /api/matching/send-team-request         - Send new request
PUT  /api/matching/team-requests/:requestId  - Accept/reject request
DELETE /api/matching/team-members/:memberId  - Remove team member
```

---

## Contact Support

If errors persist after checking above:
1. Take screenshot of Network tab response
2. Check browser console for error details
3. Provide: User ID, timestamp, and full error message
