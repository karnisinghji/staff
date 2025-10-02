# 🔧 GitHub Actions CI/CD Setup Guide

## 🎯 **Step 1: Get Railway API Token**

1. **Go to Railway Dashboard**: https://railway.app
2. **Click your profile** (top right)
3. **Go to "Account Settings"**
4. **Click "Tokens"** in the left sidebar
5. **Click "Create Token"**
6. **Name**: `GitHub Actions CI/CD`
7. **Copy the token** (starts with `railway_`)

## 🔐 **Step 2: Set Up GitHub Secrets**

1. **Go to your GitHub repository**: https://github.com/karnisinghji/staff
2. **Click "Settings"** tab
3. **Click "Secrets and variables"** → **"Actions"**
4. **Click "New repository secret"**

### **Add These Secrets:**

#### **Secret 1: RAILWAY_TOKEN**
- **Name**: `RAILWAY_TOKEN`
- **Value**: `railway_xxxxxxxxxxxxxxxxxx` (your token from Step 1)

#### **Secret 2: RAILWAY_PROJECT_ID** (Optional - for advanced setups)
- **Name**: `RAILWAY_PROJECT_ID`
- **Value**: Your Railway project ID (found in Railway project settings)

## 🚀 **Step 3: Trigger Deployment**

### **Automatic Deployment:**
Every time you push to the `main` branch, GitHub Actions will:
1. ✅ **Test all services**
2. ✅ **Build each service**
3. ✅ **Deploy to Railway**
4. ✅ **Notify you of success/failure**

### **Manual Deployment:**
You can also trigger deployment manually:
1. Go to **Actions** tab in GitHub
2. Click **"🚀 Deploy Contractor-Worker Platform to Railway"**
3. Click **"Run workflow"**
4. Select branch and click **"Run workflow"**

## 📊 **What the CI/CD Pipeline Does:**

### **🧪 Test Phase:**
- Installs dependencies
- Runs all unit tests
- Validates code quality

### **🚀 Deploy Phase (5 services in parallel):**
- **auth-service** - Authentication & JWT
- **user-service** - User profiles & management
- **matching-service** - Worker-contractor matching
- **communication-service** - Messages & communication
- **notification-service** - Push notifications

### **📢 Notification Phase:**
- Reports deployment status
- Lists all deployed services
- Confirms mobile-ready endpoints

## 🎉 **Benefits:**

✅ **Automated Testing** - Catches bugs before deployment
✅ **Zero-Downtime Deployment** - Services update without interruption
✅ **Parallel Deployment** - All 5 services deploy simultaneously
✅ **Rollback Capability** - Easy to revert if issues occur
✅ **Production Monitoring** - Built-in deployment tracking
✅ **Mobile-Ready** - HTTPS endpoints ready for mobile apps

## 🔧 **Environment Variables in Railway:**

After first deployment, add these in Railway dashboard:

### **All Services:**
```
NODE_ENV=production
DATABASE_URL=your_neon_connection_string
```

### **auth-service:**
```
JWT_SECRET=V089ClFJonCLhiY7Dov7g1bqE3Mw/9i8T8lwk8ivsms=
JWT_EXPIRES_IN=24h
```

### **matching-service:**
```
MAX_MATCHING_DISTANCE_KM=50
DEFAULT_SEARCH_RADIUS_KM=25
```

## 🎯 **Next Steps:**

1. **Set up Railway token and project ID as GitHub secrets**
2. **Push any change to main branch to trigger deployment**
3. **Monitor deployment in GitHub Actions tab**
4. **Add environment variables in Railway dashboard**
5. **Test your API endpoints**

**Ready to deploy? Just push to main branch!** 🚀