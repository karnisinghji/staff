# 🚂 Railway.app Migration Guide - Step by Step

## 🎯 **Migration Plan: Render → Railway**

**Goal:** Move all 5 microservices to Railway for $5/month total with zero sleeping issues.

---

## 📋 **Step 1: Create Railway Account & Setup**

### **1.1 Sign Up for Railway**
1. Go to **https://railway.app/**
2. Click **"Start a new project"**
3. Sign up with **GitHub** (recommended)
4. This automatically connects your GitHub account

### **1.2 Verify Your Account**
- Railway may ask for phone verification
- This unlocks the $5/month hobby plan
- Without verification, you're limited to hobby tier

---

## 🚀 **Step 2: Deploy All 5 Services**

### **2.1 Deploy from GitHub Repository**

For each service, you'll:
1. Click **"New Project"** 
2. Select **"Deploy from GitHub repo"**
3. Choose your **`staff`** repository
4. Railway will detect multiple services - deploy them one by one

### **2.2 Service Configuration**

**Each service needs these settings:**

#### **Root Directory Settings:**
- **Auth Service:** `backend/services/auth-service`
- **User Service:** `backend/services/user-service`  
- **Matching Service:** `backend/services/matching-service`
- **Communication Service:** `backend/services/communication-service`
- **Notification Service:** `backend/services/notification-service`

#### **Build & Start Commands:**
```bash
# Build Command (for all services)
npm install && npm run build

# Start Command (for all services)  
npm start
```

---

## 🔧 **Step 3: Environment Variables**

**Add these to EACH service in Railway:**

```env
# Database (same for all services)
DATABASE_URL=postgresql://neondb_owner:npg_AwN7nqtQOs8P@ep-proud-dew-adi1wdgd-pooler.c-2.us-east-1.aws.neon.tech/neondb?sslmode=require

# Authentication
JWT_SECRET=contractor-worker-platform-super-secret-key-2025
JWT_EXPIRES_IN=24h
JWT_REFRESH_EXPIRES_IN=7d

# Environment
NODE_ENV=production

# CORS (update after getting Railway URLs)
CORS_ORIGIN=https://karnisinghji.github.io
ALLOWED_ORIGINS=https://karnisinghji.github.io

# Port (Railway handles this automatically)
PORT=$PORT
```

---

## 🌐 **Step 4: Get Your New URLs**

After deployment, Railway will give you URLs like:
- `https://auth-service-production-xxxx.up.railway.app`  
- `https://user-service-production-xxxx.up.railway.app`
- `https://matching-service-production-xxxx.up.railway.app`
- `https://communication-service-production-xxxx.up.railway.app`
- `https://notification-service-production-xxxx.up.railway.app`

---

## 📱 **Step 5: Update Frontend Configuration**

Update `frontend/src/config/api.ts`:

```typescript
export const API_CONFIG = {
    AUTH_SERVICE: isProduction 
        ? 'https://your-auth-service.up.railway.app/api/auth'
        : 'http://localhost:3001/api/auth',

    USER_SERVICE: isProduction
        ? 'https://your-user-service.up.railway.app/api/users'  
        : 'http://localhost:3002/api/users',

    MATCHING_SERVICE: isProduction
        ? 'https://your-matching-service.up.railway.app/api/matching'
        : 'http://localhost:3003/api/matching',

    COMMUNICATION_SERVICE: isProduction
        ? 'https://your-communication-service.up.railway.app/api/communication'
        : 'http://localhost:3004/api/communication',

    NOTIFICATION_SERVICE: isProduction
        ? 'https://your-notification-service.up.railway.app/api/notification'
        : 'http://localhost:3005/api/notification'
};
```

---

## 💰 **Step 6: Billing Setup**

1. Go to **Railway Dashboard → Billing**
2. Add a payment method (credit card)
3. You'll be charged ~$5/month for all services
4. Much cheaper than Render's $7/service ($35 total)

---

## ✅ **Benefits You'll Get**

- 🚀 **No sleeping services** - Always responsive
- ⚡ **Faster response times** - Better performance  
- 📊 **Better monitoring** - Superior dashboard
- 💰 **Cost effective** - $5/month vs $35/month on Render
- 🔄 **Auto-deployments** - Deploy on git push
- 🌍 **Global edge network** - Better for users worldwide

---

## 🎯 **Next Steps**

1. **Sign up for Railway** → https://railway.app/
2. **Deploy first service** (start with auth-service)
3. **Test the deployment** 
4. **Deploy remaining 4 services**
5. **Update frontend URLs**
6. **Deploy to GitHub Pages**

---

## 🆘 **Need Help?**

I'll guide you through each step! Just let me know:
- ✅ When you've created your Railway account
- ✅ When you're ready to deploy the first service  
- ✅ If you need help with any configuration

**Ready to start? Let's get your first service deployed on Railway!** 🚂