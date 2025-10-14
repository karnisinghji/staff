# Location Search and User Role Investigation

## Issues Investigated

We've addressed two important issues with the matching system:

1. **Location Geocoding Issues**: Users searching with specific locations like "Govindgarh" weren't finding results
2. **403 Forbidden Errors**: Users receiving authorization errors when trying to search for contractors

## Location Geocoding Fix

### Problem

When users searched with specific locations, the system was defaulting to coordinates "27.2440, 75.6581" instead of properly geocoding the location. This happened because:

1. The location wasn't in the predefined list of Indian cities
2. The geocoding function didn't properly handle coordinate input
3. There was limited error logging to debug location issues

### Solution

We've enhanced the `geocodeLocation` function in `utils/location.ts` to:

1. Add better error logging for debugging location issues
2. Support direct coordinate input (lat,lng format)
3. Explicitly handle the specific "27.2440, 75.6581" coordinates
4. Add "Govindgarh" to the supported cities list
5. Improve the partial matching algorithm

## User Role Authentication

The 403 Forbidden errors are related to the platform's design architecture, where:

1. Only workers can search for contractors (`/api/matching/find-contractors`)
2. Only contractors can search for workers (`/api/matching/find-workers`)

### Investigation Findings

1. The frontend correctly determines which API to call based on user role:
   ```typescript
   const isContractor = user?.role === 'contractor';
   const endpoint = isContractor ? 'api/matching/find-workers' : 'api/matching/find-contractors';
   ```

2. The backend JWT token contains the user's role in the roles array:
   ```typescript
   // In LoginUseCase.ts
   const accessToken = this.signer.signAccessToken({ sub: cred.id, roles: cred.roles }, '15m');
   ```

3. The matching service routes enforce role-based access:
   ```typescript
   router.post('/api/matching/find-contractors',
       authenticateToken,
       requireRole(['worker']),  // Only workers can search for contractors
       validate({ schema: findContractorsBody }),
       matchingController.findContractors
   );
   ```

### Potential Issues

If users are still experiencing 403 errors, check:

1. **JWT Token Generation**: Ensure the auth service properly includes the user's role in the token
2. **Token Storage**: Verify that the frontend correctly stores and retrieves the user role
3. **User Accounts**: Confirm users have the correct role assigned in the database

## Testing

To test the location search fix:
1. Search with various city names including newly added ones
2. Search with explicit coordinates like "27.2440, 75.6581"
3. Check logs for better geocoding diagnostic messages

To test role-based access:
1. Login as a worker and verify you can search for contractors
2. Login as a contractor and verify you can search for workers
3. Inspect JWT token to ensure role information is correctly included