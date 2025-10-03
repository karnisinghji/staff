# 🔑 Complete Environment Variables Checklist

## 🚨 REQUIRED: All Services Need These Variables

### **Core Variables (Add to ALL 5 Services)**

```env
NODE_ENV=production
PORT=10000
DATABASE_URL=postgresql://neondb_owner:npg_AwN7nqtQOs8P@ep-proud-dew-adi1wdgd-pooler.c-2.us-east-1.aws.neon.tech/neondb?sslmode=require
JWT_SECRET=contractor-worker-platform-super-secret-key-2025
JWT_EXPIRES_IN=24h
JWT_REFRESH_EXPIRES_IN=7d
CORS_ORIGIN=https://karnisinghji.github.io
ALLOWED_ORIGINS=https://karnisinghji.github.io,http://localhost:5173
```

## 📋 Services to Configure

### ✅ 1. Auth Service (staff-auth-service-gsg3)
- [x] NODE_ENV=production
- [x] PORT=10000  
- [x] DATABASE_URL=postgresql://neondb_owner:npg_AwN7nqtQOs8P@ep-proud-dew-adi1wdgd-pooler.c-2.us-east-1.aws.neon.tech/neondb?sslmode=require
- [ ] JWT_SECRET=contractor-worker-platform-super-secret-key-2025
- [ ] JWT_EXPIRES_IN=24h
- [ ] JWT_REFRESH_EXPIRES_IN=7d
- [ ] CORS_ORIGIN=https://karnisinghji.github.io
- [ ] ALLOWED_ORIGINS=https://karnisinghji.github.io,http://localhost:5173

### ✅ 2. User Service (staff-user-service)
- [x] NODE_ENV=production
- [x] PORT=10000
- [x] DATABASE_URL=postgresql://neondb_owner:npg_AwN7nqtQOs8P@ep-proud-dew-adi1wdgd-pooler.c-2.us-east-1.aws.neon.tech/neondb?sslmode=require
- [ ] JWT_SECRET=contractor-worker-platform-super-secret-key-2025
- [ ] JWT_EXPIRES_IN=24h
- [ ] JWT_REFRESH_EXPIRES_IN=7d
- [ ] CORS_ORIGIN=https://karnisinghji.github.io
- [ ] ALLOWED_ORIGINS=https://karnisinghji.github.io,http://localhost:5173

### ✅ 3. Matching Service (staff-matching-service)
- [x] NODE_ENV=production
- [x] PORT=10000
- [x] DATABASE_URL=postgresql://neondb_owner:npg_AwN7nqtQOs8P@ep-proud-dew-adi1wdgd-pooler.c-2.us-east-1.aws.neon.tech/neondb?sslmode=require
- [ ] JWT_SECRET=contractor-worker-platform-super-secret-key-2025
- [ ] JWT_EXPIRES_IN=24h
- [ ] JWT_REFRESH_EXPIRES_IN=7d
- [ ] CORS_ORIGIN=https://karnisinghji.github.io
- [ ] ALLOWED_ORIGINS=https://karnisinghji.github.io,http://localhost:5173

### ✅ 4. Communication Service (staff-communication-service-cdqt)
- [x] NODE_ENV=production
- [x] PORT=10000
- [x] DATABASE_URL=postgresql://neondb_owner:npg_AwN7nqtQOs8P@ep-proud-dew-adi1wdgd-pooler.c-2.us-east-1.aws.neon.tech/neondb?sslmode=require
- [ ] JWT_SECRET=contractor-worker-platform-super-secret-key-2025
- [ ] JWT_EXPIRES_IN=24h
- [ ] JWT_REFRESH_EXPIRES_IN=7d
- [ ] CORS_ORIGIN=https://karnisinghji.github.io
- [ ] ALLOWED_ORIGINS=https://karnisinghji.github.io,http://localhost:5173

### ✅ 5. Notification Service (staff-notification-service)
- [x] NODE_ENV=production
- [x] PORT=10000
- [x] DATABASE_URL=postgresql://neondb_owner:npg_AwN7nqtQOs8P@ep-proud-dew-adi1wdgd-pooler.c-2.us-east-1.aws.neon.tech/neondb?sslmode=require
- [ ] JWT_SECRET=contractor-worker-platform-super-secret-key-2025
- [ ] JWT_EXPIRES_IN=24h
- [ ] JWT_REFRESH_EXPIRES_IN=7d
- [ ] CORS_ORIGIN=https://karnisinghji.github.io
- [ ] ALLOWED_ORIGINS=https://karnisinghji.github.io,http://localhost:5173

## 🚨 CRITICAL: Manual Redeploy Required

After adding these variables, you MUST trigger a manual redeploy:

1. **Go to each service on Render**
2. **Click "Manual Deploy"** 
3. **Wait 2-3 minutes for redeploy**
4. **Check logs for "listening on 10000"**

## 🧪 Test After All Variables Added

Once all services have these variables and are redeployed:

```bash
# Test registration (should work)
curl -X POST https://staff-auth-service-gsg3.onrender.com/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{"email":"test@example.com","password":"Test123!","roles":["worker"]}'

# Expected: {"success":true,"user":{...}}
# NOT: connect ECONNREFUSED ::1:5432
```

## 🎯 Why These Variables?

- **DATABASE_URL**: ✅ Added - connects to Neon PostgreSQL
- **JWT_SECRET**: ❌ Missing - needed for token signing/verification  
- **JWT_EXPIRES_IN**: ❌ Missing - token expiration time
- **CORS_ORIGIN**: ❌ Missing - allows frontend to access API
- **NODE_ENV**: ✅ Set - enables production mode
- **PORT**: ✅ Set - Render uses port 10000

The DATABASE_URL connection error means services haven't redeployed yet or are missing JWT_SECRET!