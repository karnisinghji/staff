# 🔧 Database Connection Fix Required

## ❌ Current Issue
Services are live but can't connect to database:
```
Error: connect ECONNREFUSED ::1:5432
```

This means services are trying to connect to localhost PostgreSQL instead of Neon cloud database.

## ✅ Solution: Configure DATABASE_URL on Render

### Step 1: Go to Render Dashboard
Visit: https://dashboard.render.com/

### Step 2: Update Each Service Environment Variables

For **ALL 5 services**, add this environment variable:

**Key**: `DATABASE_URL`  
**Value**: `postgresql://neondb_owner:npg_AwN7nqtQOs8P@ep-proud-dew-adi1wdgd-pooler.c-2.us-east-1.aws.neon.tech/neondb?sslmode=require`

✅ **Your exact DATABASE_URL** (copy this value):
```
postgresql://neondb_owner:npg_AwN7nqtQOs8P@ep-proud-dew-adi1wdgd-pooler.c-2.us-east-1.aws.neon.tech/neondb?sslmode=require
```

### Step 3: Services to Update

1. **staff-auth-service-gsg3** - Add DATABASE_URL
2. **staff-user-service** - Add DATABASE_URL
3. **staff-matching-service** - Add DATABASE_URL
4. **staff-communication-service-cdqt** - Add DATABASE_URL
5. **staff-notification-service** - Add DATABASE_URL

### Step 4: Redeploy Services

After adding DATABASE_URL to each service:
1. Save the environment variable
2. Click "Manual Deploy" or wait for auto-redeploy
3. Check logs to confirm database connection

### Step 5: Test After Fix

```bash
# Test registration (should work after DATABASE_URL is set)
curl -X POST https://staff-auth-service-gsg3.onrender.com/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{"email":"test@example.com","password":"Test123!","roles":["worker"]}'

# Should return success instead of database connection error
```

## 🎯 Expected Results After Fix

- ✅ Registration will work
- ✅ Login will work  
- ✅ All database operations will function
- ✅ Services will connect to Neon PostgreSQL instead of localhost

## 📋 Environment Variables Checklist

Each service should have:
- ✅ `NODE_ENV=production`
- ✅ `PORT=10000` 
- ✅ `DATABASE_URL=postgresql://...` ← **THIS IS MISSING**
- ✅ `JWT_SECRET=your_secret`
- ✅ `CORS_ORIGIN=https://karnisinghji.github.io`

Once DATABASE_URL is configured, your entire platform will be fully functional! 🚀