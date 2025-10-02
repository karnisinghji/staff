# Railway Deployment Guide

## Step 1: Create Railway Account
1. Go to [https://railway.app](https://railway.app)
2. Click "Start a New Project"
3. Sign up with GitHub (recommended)
4. Verify your account

## Step 2: Deploy Each Service

### Deploy Auth Service (Port 3001)
1. Click "New Project" → "Deploy from GitHub repo"
2. Connect your GitHub account and select your repository
3. **Root Directory**: `backend/services/auth-service`
4. **Service Name**: `auth-service`
5. **Environment Variables**:
   ```
   NODE_ENV=production
   PORT=3001
   DATABASE_URL=postgresql://your_neon_connection_string
   JWT_SECRET=your-super-secure-jwt-secret-here
   JWT_EXPIRES_IN=24h
   ```

### Deploy User Service (Port 3002)
1. Add new service to the same project
2. **Root Directory**: `backend/services/user-service`
3. **Service Name**: `user-service`
4. **Environment Variables**:
   ```
   NODE_ENV=production
   PORT=3002
   DATABASE_URL=postgresql://your_neon_connection_string
   ```

### Deploy Matching Service (Port 3003)
1. Add new service to the same project
2. **Root Directory**: `backend/services/matching-service`
3. **Service Name**: `matching-service`
4. **Environment Variables**:
   ```
   NODE_ENV=production
   PORT=3003
   DATABASE_URL=postgresql://your_neon_connection_string
   MAX_MATCHING_DISTANCE_KM=50
   DEFAULT_SEARCH_RADIUS_KM=25
   ```

### Deploy Communication Service (Port 3004)
1. Add new service to the same project
2. **Root Directory**: `backend/services/communication-service`
3. **Service Name**: `communication-service`
4. **Environment Variables**:
   ```
   NODE_ENV=production
   PORT=3004
   DATABASE_URL=postgresql://your_neon_connection_string
   ```

### Deploy Notification Service (Port 3005)
1. Add new service to the same project
2. **Root Directory**: `backend/services/notification-service`
3. **Service Name**: `notification-service`
4. **Environment Variables**:
   ```
   NODE_ENV=production
   PORT=3005
   DATABASE_URL=postgresql://your_neon_connection_string
   ```

## Step 3: Get Service URLs
After deployment, Railway will provide URLs like:
- `https://auth-service-production-xxx.up.railway.app`
- `https://user-service-production-xxx.up.railway.app`
- `https://matching-service-production-xxx.up.railway.app`
- `https://communication-service-production-xxx.up.railway.app`
- `https://notification-service-production-xxx.up.railway.app`

## Step 4: Configure CORS
Add these URLs to your frontend's environment variables.

## Railway Features You Get:
✅ **Free $5/month credit** (enough for small apps)
✅ **Automatic HTTPS** and SSL certificates
✅ **Auto-deployment** from GitHub commits
✅ **Built-in monitoring** and logs
✅ **Custom domains** (optional)
✅ **Zero-downtime deployments**

## Common Issues & Solutions:

### Build Fails
- Make sure each service has `build` and `start` scripts in package.json
- Check that TypeScript compiles without errors

### Service Won't Start
- Verify PORT environment variable is set
- Check DATABASE_URL is correct
- Look at Railway logs for specific errors

### Database Connection Issues
- Ensure DATABASE_URL includes `?sslmode=require`
- Test connection string in Neon dashboard first

## Next Steps:
After all services are deployed:
1. Test each service endpoint
2. Update frontend environment variables
3. Deploy frontend to Vercel
4. Test mobile functionality

**Ready to start deploying?** Begin with the auth-service!