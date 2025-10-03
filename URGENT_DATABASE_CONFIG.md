# 🔧 URGENT: Configure Database Environment Variables

## ⚠️ Auth Service Needs Database Configuration

Your auth service is **LIVE** but getting database connection errors because `DATABASE_URL` is not set.

---

## 📋 Steps to Fix (In Render Dashboard)

### 1. Go to Render Dashboard
Visit: https://dashboard.render.com

### 2. Select Your Auth Service
Find: **staff-auth-service**

### 3. Go to Environment Tab
Click on **Environment** in the left sidebar

### 4. Add Required Environment Variables

Click **Add Environment Variable** and add these:

#### ✅ DATABASE_URL (REQUIRED)
```
postgresql://your-username:your-password@ep-proud-dew-adi1wdgd-pooler.c-2.us-east-1.aws.neon.tech/neondb?sslmode=require
```

**Where to get this:**
1. Go to your Neon dashboard: https://console.neon.tech
2. Click on your project
3. Copy the **Pooled Connection String**
4. Make sure it ends with `?sslmode=require`

#### ✅ JWT_SECRET (REQUIRED)
```
your-super-secret-jwt-key-min-32-characters-long
```

**Generate a secure secret:**
```bash
# In your terminal, generate a random secret:
openssl rand -base64 32
```

#### ✅ CORS_ORIGIN (REQUIRED)
```
https://karnisinghji.github.io
```

#### ⭐ Optional but Recommended:
```bash
JWT_EXPIRES_IN=24h
EMAIL_FROM=noreply@yourdomain.com
```

### 5. Save and Redeploy
- Click **Save Changes**
- Render will automatically redeploy with new environment variables
- Wait 1-2 minutes for redeployment

---

## 🧪 After Configuration

Test your auth service again:

```bash
# Health check (should still work)
curl https://staff-auth-service-gsg3.onrender.com/health

# Register a user (should work after env vars are set)
curl -X POST https://staff-auth-service-gsg3.onrender.com/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{"email":"test@example.com","password":"SecurePass123!","roles":["worker"]}'
```

Expected response after fix:
```json
{
  "id": "uuid-here",
  "email": "test@example.com",
  "roles": ["worker"]
}
```

---

## 📝 Repeat for Other Services

When other services deploy, add the same environment variables:
- ✅ DATABASE_URL
- ✅ JWT_SECRET  
- ✅ CORS_ORIGIN

---

## 🔍 Current Error

```
connect ECONNREFUSED ::1:5432
```

This means the service is trying to connect to `localhost:5432` (local PostgreSQL) instead of your Neon database. Setting `DATABASE_URL` will fix this.

---

## 🚀 Quick Setup Guide

1. **Open Render Dashboard** → https://dashboard.render.com
2. **Click on staff-auth-service**
3. **Click Environment**
4. **Add DATABASE_URL** from your Neon dashboard
5. **Add JWT_SECRET** (generate with `openssl rand -base64 32`)
6. **Add CORS_ORIGIN** = `https://karnisinghji.github.io`
7. **Click Save Changes**
8. **Wait for redeploy** (1-2 minutes)
9. **Test registration endpoint** (see above)

---

**Priority**: 🔴 HIGH - Service is live but not functional without database  
**Time to Fix**: ~5 minutes  
**Impact**: Auth service will work after this fix
