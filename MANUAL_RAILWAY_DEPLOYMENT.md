# 🚂 Manual Railway Deployment - Step by Step

Since the CLI is having input issues, let's deploy using Railway's web interface (actually easier!):

## 🌐 **Step 1: Web-based Deployment**

### **1. Go to Railway Dashboard**
- Visit: **https://railway.app/dashboard**
- You should see "karnisinghji's Projects" workspace

### **2. Create New Project**
- Click **"New Project"**
- Select **"Deploy from GitHub repo"**
- Choose your **`staff`** repository

### **3. Deploy First Service (Auth Service)**
- Railway will scan your repo and detect multiple services
- Click **"Deploy"** on one of them first
- In **Settings** → **Source**:
  - Set **Root Directory:** `backend/services/auth-service`
  - Set **Build Command:** `npm install && npm run build`
  - Set **Start Command:** `npm start`

### **4. Add Environment Variables (One Time Setup)**
Go to **Variables** tab and add:

```env
DATABASE_URL=postgresql://neondb_owner:npg_AwN7nqtQOs8P@ep-proud-dew-adi1wdgd-pooler.c-2.us-east-1.aws.neon.tech/neondb?sslmode=require
JWT_SECRET=contractor-worker-platform-super-secret-key-2025
JWT_EXPIRES_IN=24h
JWT_REFRESH_EXPIRES_IN=7d
NODE_ENV=production
CORS_ORIGIN=https://karnisinghji.github.io
ALLOWED_ORIGINS=https://karnisinghji.github.io
```

### **5. Deploy Remaining 4 Services**
Repeat for each service with these root directories:
- **User Service:** `backend/services/user-service`
- **Matching Service:** `backend/services/matching-service`  
- **Communication Service:** `backend/services/communication-service`
- **Notification Service:** `backend/services/notification-service`

**Pro Tip:** After deploying the first service, you can **duplicate** it and just change the root directory!

---

## 🎯 **Quick Duplication Method**

1. **Deploy auth-service first** (with all environment variables)
2. **Go to service settings** → **"Duplicate Service"**
3. **Change only the root directory** for each new service
4. **All environment variables copy automatically!** ✨

This eliminates the repetition you were worried about!

---

## 📋 **Service URLs You'll Get**

After deployment, you'll get URLs like:
- `https://staff-auth-service-production-xxxx.up.railway.app`
- `https://staff-user-service-production-xxxx.up.railway.app`
- `https://staff-matching-service-production-xxxx.up.railway.app`
- `https://staff-communication-service-production-xxxx.up.railway.app`
- `https://staff-notification-service-production-xxxx.up.railway.app`

**Copy these URLs** - I'll need them to update your frontend configuration!

---

## ⚡ **Expected Results**

- ✅ **5 services deployed** in ~15 minutes
- ✅ **All services share same environment variables** (no repetition!)
- ✅ **No sleeping services** - always responsive
- ✅ **Health endpoints working** - `/health` on each service
- ✅ **Same database** - all connect to your Neon PostgreSQL

---

## 🆘 **Need Help?**

Once you start deploying:
1. **Share the first service URL** with me
2. I'll **test it immediately** 
3. **Help troubleshoot** any issues
4. **Update your frontend** with all new URLs

**Ready to start? Go to https://railway.app/dashboard and let's deploy!** 🚀