# Matching Service Role-Based Design

## Design Intent

The 403 Forbidden error when accessing `/api/matching/find-contractors` endpoint is not an issue but a deliberate design choice in the application's architecture.

## Role-Based Access Control

The platform is designed with specific role-based restrictions:

1. **Workers** can search for **Contractors**:
   - Endpoint: `/api/matching/find-contractors`
   - Role required: `worker`

2. **Contractors** can search for **Workers**:
   - Endpoint: `/api/matching/find-workers`
   - Role required: `contractor`

## Implementation

This design is implemented in the matching service routes:

```typescript
// Worker searching for contractors
router.post('/api/matching/find-contractors',
    authenticateToken,
    requireRole(['worker']),  // Only workers can search for contractors
    validate({ schema: findContractorsBody }),
    matchingController.findContractors
);

// Contractor searching for workers
router.post('/api/matching/find-workers',
    authenticateToken,
    requireRole(['contractor']),  // Only contractors can search for workers
    validate({ schema: findWorkersBody }),
    matchingController.findWorkers
);
```

## Frontend Implementation

The frontend in `EnhancedMatchSearchPage.tsx` determines which API to call based on the user's role:

```typescript
const isContractor = user?.role === 'contractor';
const endpoint = isContractor ? 'api/matching/find-workers' : 'api/matching/find-contractors';
```

## Expected Behavior

- When a contractor is logged in, they should only be able to search for workers
- When a worker is logged in, they should only be able to search for contractors
- Attempting to access the wrong endpoint for your role will result in a 403 Forbidden error

## Troubleshooting

If a 403 error is encountered when a user tries to search:

1. Verify the user has the correct role in their JWT token
2. Ensure the frontend is correctly detecting the user's role
3. Check that the user is properly authenticated

This role-based restriction is an important part of the platform's business logic and should be maintained.