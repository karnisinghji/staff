# 🚀 One-Click Railway Deployment

## **Instant Deploy - Click the Button Below!**

[![Deploy on Railway](https://railway.app/button.svg)](https://railway.app/template/quickstart?template=https://github.com/karnisinghji/staff)

## **What This Does:**

✅ **Automatically deploys ALL 5 services**:
- auth-service (Port 3001)
- user-service (Port 3002)  
- matching-service (Port 3003)
- communication-service (Port 3004)
- notification-service (Port 3005)

✅ **Sets up auto-deployment from GitHub**
✅ **Generates HTTPS URLs for each service**
✅ **Ready for mobile app connections**

## **After Clicking Deploy:**

1. **Railway will ask you to connect GitHub** - allow it
2. **It will automatically detect all services** from your repository
3. **Each service will be deployed separately**
4. **You'll get 5 unique HTTPS URLs**

## **Required Environment Variables:**

After deployment, add these environment variables in Railway dashboard:

### **All Services Need:**
- `DATABASE_URL` = Your Neon PostgreSQL connection string
- `NODE_ENV` = production

### **auth-service Additionally Needs:**
- `JWT_SECRET` = V089ClFJonCLhiY7Dov7g1bqE3Mw/9i8T8lwk8ivsms=
- `JWT_EXPIRES_IN` = 24h

### **matching-service Additionally Needs:**
- `MAX_MATCHING_DISTANCE_KM` = 50
- `DEFAULT_SEARCH_RADIUS_KM` = 25

## **Your Service URLs Will Be:**
- https://auth-service-production-xxx.up.railway.app
- https://user-service-production-xxx.up.railway.app
- https://matching-service-production-xxx.up.railway.app
- https://communication-service-production-xxx.up.railway.app
- https://notification-service-production-xxx.up.railway.app

## **🎉 Benefits:**
- ✅ **Zero manual configuration**
- ✅ **Auto-deploy on every GitHub push**
- ✅ **Production-ready HTTPS**
- ✅ **Built-in monitoring and logs**
- ✅ **Perfect for mobile apps**

**Click the deploy button above to get started!** 🚀