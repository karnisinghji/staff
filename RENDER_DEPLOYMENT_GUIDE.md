# 🚀 Render.com Deployment Guide
# Complete guide to deploy your backend services to Render.com

## 📋 Prerequisites

1. ✅ GitHub account
2. ✅ Render.com account (sign up at https://render.com)
3. ✅ Neon PostgreSQL database (you already have this!)
4. ✅ Your repository pushed to GitHub

---

## 🎯 Deployment Strategy

We'll deploy services one by one for better control:
1. **Auth Service** (most critical)
2. **User Service** (depends on auth)
3. **Matching Service** (core functionality)
4. **Communication Service** (optional for now)
5. **Notification Service** (optional for now)

---

## 📦 Step 1: Prepare Your Repository

### 1.1 Commit and Push Everything

```bash
cd /Users/shouryaveersingh/Desktop/old\ data/staff
git add .
git commit -m "Prepare for Render.com deployment"
git push origin main
```

---

## 🔧 Step 2: Deploy Auth Service (First)

### 2.1 Create New Web Service

1. Go to https://dashboard.render.com
2. Click **"New +"** → **"Web Service"**
3. Connect your GitHub repository: **karnisinghji/staff**

### 2.2 Configure Auth Service

**Basic Settings:**
- **Name:** `staff-auth-service`
- **Region:** Oregon (or closest to you)
- **Branch:** `main`
- **Root Directory:** Leave empty
- **Runtime:** `Node`
- **Build Command:**
  ```bash
  cd backend/services/auth-service && npm install && npm run build
  ```
- **Start Command:**
  ```bash
  cd backend/services/auth-service && npm start
  ```

### 2.3 Environment Variables

Click **"Advanced"** → **"Add Environment Variable"**

Add these variables:

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

### 2.4 Deploy!

1. Click **"Create Web Service"**
2. Wait 5-10 minutes for deployment
3. Note your service URL: `https://staff-auth-service.onrender.com`

### 2.5 Test Auth Service

Open browser and test:
```
https://staff-auth-service.onrender.com/health
```

Should return: `{"status": "ok"}`

---

## 👤 Step 3: Deploy User Service

Repeat Step 2 with these changes:

**Basic Settings:**
- **Name:** `staff-user-service`
- **Build Command:**
  ```bash
  cd backend/services/user-service && npm install && npm run build
  ```
- **Start Command:**
  ```bash
  cd backend/services/user-service && npm start
  ```

**Environment Variables:** (same as auth service)

**URL:** `https://staff-user-service.onrender.com`

---

## 🤝 Step 4: Deploy Matching Service

**Basic Settings:**
- **Name:** `staff-matching-service`
- **Build Command:**
  ```bash
  cd backend/services/matching-service && npm install && npm run build
  ```
- **Start Command:**
  ```bash
  cd backend/services/matching-service && npm start
  ```

**URL:** `https://staff-matching-service.onrender.com`

---

## 💬 Step 5: Deploy Communication Service (Optional)

**Basic Settings:**
- **Name:** `staff-communication-service`
- **Build Command:**
  ```bash
  cd backend/services/communication-service && npm install && npm run build
  ```
- **Start Command:**
  ```bash
  cd backend/services/communication-service && npm start
  ```

**URL:** `https://staff-communication-service.onrender.com`

---

## 🔔 Step 6: Deploy Notification Service (Optional)

**Basic Settings:**
- **Name:** `staff-notification-service`
- **Build Command:**
  ```bash
  cd backend/services/notification-service && npm install && npm run build
  ```
- **Start Command:**
  ```bash
  cd backend/services/notification-service && npm start
  ```

**URL:** `https://staff-notification-service.onrender.com`

---

## 🌐 Step 7: Update Frontend Configuration

Once your services are deployed, update the frontend:

### 7.1 Update Frontend Environment Variables

Edit `frontend/.env.production`:

```env
# Your Render.com Service URLs
VITE_AUTH_SERVICE_URL=https://staff-auth-service.onrender.com/api/auth
VITE_USER_SERVICE_URL=https://staff-user-service.onrender.com/api/users
VITE_MATCHING_SERVICE_URL=https://staff-matching-service.onrender.com/api/matching
VITE_COMMUNICATION_SERVICE_URL=https://staff-communication-service.onrender.com/api/communication
VITE_NOTIFICATION_SERVICE_URL=https://staff-notification-service.onrender.com/api/notification

# WebSocket URLs
VITE_WS_COMMUNICATION_URL=wss://staff-communication-service.onrender.com/ws
VITE_WS_NOTIFICATION_URL=wss://staff-notification-service.onrender.com/ws

# App Configuration
VITE_APP_URL=https://karnisinghji.github.io/staff
```

### 7.2 Rebuild and Deploy Frontend

```bash
cd frontend
npm run build
cp -r dist/* ../docs/
cd ..
git add .
git commit -m "Update frontend with Render.com backend URLs"
git push origin main
```

---

## ✅ Step 8: Test Everything

### 8.1 Test Each Service

```bash
# Auth Service
curl https://staff-auth-service.onrender.com/health

# User Service
curl https://staff-user-service.onrender.com/health

# Matching Service
curl https://staff-matching-service.onrender.com/health
```

### 8.2 Test Your Web App

Visit: https://karnisinghji.github.io/staff/

Try:
1. Register a new user
2. Login
3. View profile
4. Test matching features

---

## 🎉 Your URLs

After deployment, you'll have:

**Backend Services:**
- Auth: `https://staff-auth-service.onrender.com`
- User: `https://staff-user-service.onrender.com`
- Matching: `https://staff-matching-service.onrender.com`
- Communication: `https://staff-communication-service.onrender.com`
- Notification: `https://staff-notification-service.onrender.com`

**Frontend:**
- Web: `https://karnisinghji.github.io/staff/`
- Android APK: Will use same backend URLs

**Database:**
- Neon PostgreSQL: `ep-proud-dew-adi1wdgd-pooler.c-2.us-east-1.aws.neon.tech`

---

## ⚠️ Important Notes

### Free Tier Limitations

**Render.com Free Plan:**
- ✅ 750 hours/month per service
- ✅ Services sleep after 15 minutes of inactivity
- ✅ First request after sleep takes ~30 seconds
- ✅ Perfect for development/testing

**Solution for Production:**
- Upgrade to paid plan ($7/month per service)
- Or use cron job to keep services awake

### CORS Configuration

Make sure your backend services have CORS properly configured:

```javascript
app.use(cors({
  origin: [
    'https://karnisinghji.github.io',
    'http://localhost:5173'
  ],
  credentials: true
}));
```

---

## 🔧 Troubleshooting

### Service Won't Start?
- Check build logs in Render dashboard
- Verify all environment variables are set
- Check database connection string

### CORS Errors?
- Verify `CORS_ORIGIN` in environment variables
- Check backend CORS configuration

### Database Connection Fails?
- Verify Neon database URL
- Check if IP is whitelisted (Neon allows all by default)

---

## 📞 Need Help?

If you encounter issues:
1. Check Render.com logs (Dashboard → Your Service → Logs)
2. Check browser console (F12)
3. Test API endpoints directly with curl/Postman

---

## 🚀 Next Steps

After successful deployment:
1. ✅ Test all features thoroughly
2. ✅ Build and test Android APK
3. ✅ Consider upgrading to paid plan for production
4. ✅ Set up monitoring and alerts
5. ✅ Add custom domain (optional)

---

**Ready to deploy? Let's start with Step 1!**
