# Login and Role Issue Fix

## Problem
- User login credentials: `john.smith@email.com` (contractor) / `password123`
- When searching for workers, getting 403 Forbidden error
- Frontend was calling `find-contractors` endpoint instead of `find-workers`
- Root cause: User role not being properly provided to frontend

## Root Cause Analysis
1. Backend login response returned `roles: ['contractor']` (array format)
2. Frontend expected `role: 'contractor'` (string format)
3. Frontend search logic checks `user?.role === 'contractor'` to determine which endpoint to call
4. Without `role` field, the check failed, causing wrong endpoint to be called

## Solution
Updated `LoginUseCase.ts` in auth-service to return both formats:
```typescript
return { 
    accessToken, 
    refreshToken, 
    expiresInSeconds: 15 * 60, 
    user: { 
        id: cred.id, 
        email: cred.email, 
        roles: cred.roles,  // Keep for backend compatibility
        role: cred.roles[0] || 'worker'  // Add for frontend compatibility
    } 
};
```

## Deployment Status
✅ Auth-service updated and redeployed to Railway
✅ Frontend already deployed with correct API URLs
✅ CORS configuration already fixed for all services

## Testing
After the auth-service deployment completes (1-2 minutes):
1. Visit https://comeondost.web.app
2. Login with: `john.smith@email.com` / `password123`
3. As a contractor, you should now be able to search for workers
4. The correct endpoint `/api/matching/find-workers` will be called
5. All workers matching your search criteria will be displayed

## API Endpoints by Role
- **Contractor** → calls `/api/matching/find-workers` (search for workers to hire)
- **Worker** → calls `/api/matching/find-contractors` (search for contractors hiring)

## Notes
- The frontend search page (`EnhancedMatchSearchPage.tsx`) already has correct logic to determine endpoint based on user role
- The issue was purely in the login response format mismatch
- No frontend changes required - only backend fix needed