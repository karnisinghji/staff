# Railway Auto-Deploy Setup Guide

## 🚀 **Super Simple Auto-Deploy Method**

Instead of manual configuration, we'll use Railway's **auto-deploy from GitHub** feature!

### **Step 1: Create Railway Project with Auto-Deploy**

1. **Go to Railway Dashboard**: https://railway.app
2. **Click "New Project"**
3. **Select "Deploy from GitHub repo"**
4. **Choose your repository**: `karnisinghji/staff`
5. **Railway will automatically detect all services!**

### **Step 2: Let Railway Auto-Configure**

Railway will automatically:
- ✅ Detect all 5 services in `backend/services/`
- ✅ Create separate deployments for each
- ✅ Set up auto-deploy on GitHub pushes
- ✅ Generate unique URLs for each service
- ✅ Handle builds and deployments

### **Step 3: Set Environment Variables (One Time)**

After Railway creates the services, you just need to add environment variables to each:

#### **For ALL Services:**
```bash
NODE_ENV=production
DATABASE_URL=your_neon_connection_string
```

#### **For auth-service additionally:**
```bash
JWT_SECRET=V089ClFJonCLhiY7Dov7g1bqE3Mw/9i8T8lwk8ivsms=
JWT_EXPIRES_IN=24h
```

#### **For matching-service additionally:**
```bash
MAX_MATCHING_DISTANCE_KM=50
DEFAULT_SEARCH_RADIUS_KM=25
```

## 🎉 **What You Get:**

✅ **Auto-deployment**: Every GitHub push automatically deploys
✅ **All 5 services**: Deployed simultaneously
✅ **Unique URLs**: Each service gets its own HTTPS endpoint
✅ **Zero-downtime**: Rolling deployments
✅ **Logs & Monitoring**: Built-in observability
✅ **Auto-scaling**: Handles traffic spikes

## 📱 **Mobile-Ready Features:**

✅ **HTTPS by default**: Secure for mobile apps
✅ **Global CDN**: Fast worldwide access
✅ **CORS enabled**: Cross-origin requests work
✅ **WebSocket support**: Real-time features
✅ **API rate limiting**: Prevents abuse

## 🔧 **Alternative: One-Click Deploy Button**

I can also create a **"Deploy to Railway" button** for instant deployment!