# 🔧 URGENT FIX: Correct Environment Variables for Render

## ❌ Problem Found
Your services are configured to use **individual database environment variables** but you only set `DATABASE_URL`. 

The auth service expects these variables:
- `DB_HOST`
- `DB_PORT` 
- `DB_NAME`
- `DB_USER`
- `DB_PASSWORD`

## ✅ Solution: Add Individual Database Variables

For **EACH SERVICE** in Render, add these environment variables:

### From your Neon connection string:
```
postgresql://neondb_owner:npg_AwN7nqtQOs8P@ep-proud-dew-adi1wdgd-pooler.c-2.us-east-1.aws.neon.tech/neondb?sslmode=require
```

### Add these variables to ALL 5 services:

```bash
# Database Configuration
DB_HOST=ep-proud-dew-adi1wdgd-pooler.c-2.us-east-1.aws.neon.tech
DB_PORT=5432
DB_NAME=neondb
DB_USER=neondb_owner
DB_PASSWORD=npg_AwN7nqtQOs8P
DB_SSL=true

# Keep these existing variables too
NODE_ENV=production
PORT=10000
JWT_SECRET=your_jwt_secret_here
JWT_EXPIRES_IN=24h
JWT_REFRESH_EXPIRES_IN=7d
CORS_ORIGIN=https://karnisinghji.github.io
ALLOWED_ORIGINS=https://karnisinghji.github.io
```

## 🎯 Services to Update

1. **staff-auth-service-gsg3**
2. **staff-user-service** 
3. **staff-matching-service**
4. **staff-communication-service-cdqt**
5. **staff-notification-service**

## 📋 Steps for Each Service

1. Go to https://dashboard.render.com
2. Click on the service name
3. Click **Environment** tab
4. Add ALL the variables above
5. Click **Save Changes**
6. Wait for automatic redeploy (2-3 minutes)

## 🧪 Test After Fix

```bash
# This should work after adding the correct environment variables
curl -X POST https://staff-auth-service-gsg3.onrender.com/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{"email":"test@example.com","password":"Test123!","roles":["worker"]}'
```

Expected success response:
```json
{
  "success": true,
  "data": {
    "id": "uuid-here",
    "email": "test@example.com", 
    "roles": ["worker"]
  }
}
```

## ⚡ Why This Fixes It

Your services were trying to connect to:
- `localhost:5432` (because DB_HOST wasn't set)

After adding the variables, they'll connect to:
- `ep-proud-dew-adi1wdgd-pooler.c-2.us-east-1.aws.neon.tech:5432` ✅

This will resolve the `connect ECONNREFUSED ::1:5432` error!