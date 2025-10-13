# Matching Service CORS Fix

## Issue
The matching service was not properly configured for CORS, causing frontend applications hosted at `https://comeondost.web.app` to fail when making API requests.

## Root Cause
1. The CORS configuration environment variables were incomplete:
   - `ALLOWED_ORIGINS` only included `https://comeondost.netlify.app`
   - `CORS_ORIGIN` was set to `https://comeondost.netlify.app`
   - `CORS_ORIGINS` had some origins but was missing `https://karnisinghji.github.io`
   
2. The application looks for both `ALLOWED_ORIGINS` and `CORS_ORIGINS`, but they were inconsistent.

## Solution
1. Updated all three environment variables to include all required frontend domains:
   ```
   ALLOWED_ORIGINS=https://karnisinghji.github.io,https://comeondost.web.app,https://comeondost.netlify.app,http://localhost:5173
   CORS_ORIGINS=https://karnisinghji.github.io,https://comeondost.web.app,https://comeondost.netlify.app,http://localhost:5173
   CORS_ORIGIN=https://comeondost.web.app
   ```

2. Redeployed the matching service to apply the changes.

## Verification
1. Created and ran a specialized CORS test script (`test-matching-cors.js`) which:
   - Tests CORS headers for the health endpoint
   - Tests preflight requests for the `/api/matching/find-contractors` endpoint
   - Verifies all required domains are properly configured

2. Confirmed all origins now return the proper CORS headers:
   - `Access-Control-Allow-Origin` set to the requesting origin
   - `Access-Control-Allow-Methods` includes all required HTTP methods
   - `Access-Control-Allow-Headers` includes the necessary headers

## Next Steps
1. Test frontend integration by making real requests from `https://comeondost.web.app`
2. Apply similar CORS fixes to other services if needed

## Implementation Details

### CORS Configuration in `app.ts`
The matching service handles CORS configuration in `app.ts`:

```typescript
// CORS must be applied BEFORE security middleware for preflight requests
const allowedOrigins = (process.env.ALLOWED_ORIGINS || process.env.CORS_ORIGINS)?.split(',').filter(o => o.trim()) || [
    'http://localhost:3000',
    'http://localhost:5173',
    'https://comeondost.web.app',
    'https://comeondost.firebaseapp.com'
];

app.use(cors({
    origin: allowedOrigins,
    credentials: true,
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS', 'PATCH'],
    allowedHeaders: ['Content-Type', 'Authorization', 'X-Requested-With'],
    optionsSuccessStatus: 200
}));
```

### Railway Environment Variables
Use the following commands to update the environment variables in Railway:

```bash
railway variables --set "ALLOWED_ORIGINS=https://karnisinghji.github.io,https://comeondost.web.app,https://comeondost.netlify.app,http://localhost:5173"
railway variables --set "CORS_ORIGINS=https://karnisinghji.github.io,https://comeondost.web.app,https://comeondost.netlify.app,http://localhost:5173"
railway variables --set "CORS_ORIGIN=https://comeondost.web.app"
railway redeploy --service matching-service
```

### Diagnostic Script
Created a specialized test script (`test-matching-cors.js`) to verify CORS configuration:

```javascript
#!/usr/bin/env node
const https = require('https');
const MATCHING_SERVICE_URL = 'https://matching-service-production.up.railway.app';
const FRONTEND_ORIGINS = [
  'https://karnisinghji.github.io',
  'https://comeondost.web.app',
  'http://localhost:5173'
];

// Test each frontend origin for proper CORS headers
// See test-matching-cors.js for complete implementation
```