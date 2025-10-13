# 🚨 Railway Deployment Health Check Failure - Debugging Guide

## 🔍 **Problem Analysis**

Your user-service deployed successfully but failed all health checks at `/health`. This indicates the service isn't starting properly.

## 🛠️ **Common Causes & Solutions**

### **Issue 1: Missing Environment Variables**
**Symptoms:** Service can't connect to database
**Solution:** Ensure all required variables are set

### **Issue 2: Port Configuration**
**Symptoms:** Railway can't reach the service
**Solution:** Service must listen on Railway's assigned PORT

### **Issue 3: Database Connection Timeout**
**Symptoms:** Service starts but can't connect to Neon
**Solution:** Verify DATABASE_URL and connection settings

### **Issue 4: Build vs Runtime Directory**
**Symptoms:** Built files not in correct location
**Solution:** Fix build output paths

---

## ✅ **Immediate Fixes to Apply**

### **Fix 1: Check Railway Environment Variables**

In Railway Dashboard → Your Service → Variables tab, ensure you have:

```env
DATABASE_URL=postgresql://neondb_owner:npg_AwN7nqtQOs8P@ep-proud-dew-adi1wdgd-pooler.c-2.us-east-1.aws.neon.tech/neondb?sslmode=require
JWT_SECRET=contractor-worker-platform-super-secret-key-2025
JWT_EXPIRES_IN=24h
JWT_REFRESH_EXPIRES_IN=7d
NODE_ENV=production
CORS_ORIGIN=https://karnisinghji.github.io
ALLOWED_ORIGINS=https://karnisinghji.github.io
PORT=$PORT
```

**⚠️ CRITICAL:** Make sure `PORT=$PORT` is set (Railway needs this)

### **Fix 2: Check Service Logs**

In Railway Dashboard → Your Service → Deployments → Click on failed deployment → View Logs

Look for errors like:
- `ECONNREFUSED` (database connection)
- `EADDRINUSE` (port conflicts)
- `MODULE_NOT_FOUND` (missing dependencies)

### **Fix 3: Verify Build Configuration**

In Railway Dashboard → Your Service → Settings → Build:

```bash
Build Command: npm install && npm run build
Start Command: npm start
Root Directory: backend/services/user-service
```

---

## 🔧 **Updated Railway Configuration**

Let me create a fixed configuration for your services:

### **Package.json Scripts Check**

Your service needs these scripts:
```json
{
  "scripts": {
    "build": "tsc",
    "start": "node dist/index.js",
    "dev": "ts-node src/index.ts"
  }
}
```

### **Port Configuration Fix**

Your service must listen on Railway's PORT:
```typescript
const PORT = process.env.PORT || 3002;
app.listen(PORT, '0.0.0.0', () => {
  console.log(`User service listening on port ${PORT}`);
});
```

**Note:** `'0.0.0.0'` is important for Railway!

---

## 🚀 **Quick Fix Steps**

### **Step 1: Add Missing PORT Variable**
1. Go to Railway Dashboard → Your Service → Variables
2. Add: `PORT=$PORT`
3. Redeploy

### **Step 2: Check Service Logs**
1. Go to Deployments → Failed deployment → Logs
2. Look for error messages
3. Share any errors you see

### **Step 3: Verify Database Connection**
Test if your Neon database is accessible:
```bash
# Test database connection
psql "postgresql://neondb_owner:npg_AwN7nqtQOs8P@ep-proud-dew-adi1wdgd-pooler.c-2.us-east-1.aws.neon.tech/neondb?sslmode=require"
```

---

## 📊 **Expected vs Actual**

**Expected:** Service starts → Health check at `/health` returns 200 OK
**Actual:** Service fails to start → Health check gets "service unavailable"

**Root Cause:** Service not listening on correct port or crashing during startup

---

## 🆘 **Next Steps**

1. **Check Railway logs** for specific error messages
2. **Add PORT=$PORT** environment variable
3. **Verify database connection** works
4. **Redeploy** the service
5. **Share logs** if still failing

**Which step should we tackle first? Check the deployment logs in Railway Dashboard and let me know what errors you see!** 🔍