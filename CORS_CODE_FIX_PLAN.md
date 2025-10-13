## CORS Configuration Fix for Communication and Notification Services

We've updated the environment variables for all services, but found code issues in the Communication and Notification services.

### Issue

In both services, the CORS configuration is hardcoded in app.ts to only include specific domains and then append environment variables. The hardcoded list doesn't include `https://karnisinghji.github.io`.

### Fix Required

Modify the app.ts files in both services to properly use environment variables for CORS origins.

### Communication Service

File: `/backend/services/communication-service/src/app.ts`

Change from:
```typescript
const allowedOrigins = (process.env.ALLOWED_ORIGINS || process.env.CORS_ORIGINS)?.split(',').filter(o => o.trim()) || [];
app.use(cors({
    origin: [
        'https://comeondost.web.app',
        'https://comeondost.firebaseapp.com',
        'http://localhost:5173',
        'http://localhost:5174',
        ...allowedOrigins
    ],
    credentials: true,
    // ...
```

Change to:
```typescript
const allowedOrigins = (process.env.ALLOWED_ORIGINS || process.env.CORS_ORIGINS)?.split(',').filter(o => o.trim()) || [
    'https://karnisinghji.github.io',
    'https://comeondost.web.app',
    'https://comeondost.firebaseapp.com',
    'https://comeondost.netlify.app',
    'http://localhost:5173',
    'http://localhost:5174'
];
app.use(cors({
    origin: allowedOrigins,
    credentials: true,
    // ...
```

### Notification Service

File: `/backend/services/notification-service/src/app.ts`

Change from:
```typescript
const allowedOrigins = (process.env.ALLOWED_ORIGINS || process.env.CORS_ORIGINS)?.split(',').filter(o => o.trim()) || [];
app.use(cors({
    origin: [
        'https://comeondost.web.app',
        'https://comeondost.firebaseapp.com',
        'http://localhost:5173',
        'http://localhost:5174',
        ...allowedOrigins
    ],
    credentials: true,
    // ...
```

Change to:
```typescript
const allowedOrigins = (process.env.ALLOWED_ORIGINS || process.env.CORS_ORIGINS)?.split(',').filter(o => o.trim()) || [
    'https://karnisinghji.github.io',
    'https://comeondost.web.app',
    'https://comeondost.firebaseapp.com',
    'https://comeondost.netlify.app',
    'http://localhost:5173',
    'http://localhost:5174'
];
app.use(cors({
    origin: allowedOrigins,
    credentials: true,
    // ...
```

### Implementation Steps

1. Modify both app.ts files
2. Commit and push changes
3. Trigger redeployment through Railway
4. Test CORS configuration again using test-all-services-cors.js

### Note

This approach ensures that:
1. Environment variables take precedence when provided
2. Sensible defaults are used when environment variables are missing
3. All required frontend domains are included