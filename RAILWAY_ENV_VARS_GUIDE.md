# 🚀 Railway Environment Variables - Deployment Guide

## Required Environment Variables

Add these environment variables to your Railway services through the Railway dashboard or CLI.

---

## Method 1: Railway Dashboard (Recommended)

### Matching Service
1. Go to https://railway.app/dashboard
2. Select your **matching-service**
3. Go to **Variables** tab
4. Add the following:
   ```
   MIN_MATCH_SCORE=0
   NODE_ENV=production
   ```
5. Click **Deploy** (service will auto-restart)

### Auth Service
1. Select your **auth-service**
2. Go to **Variables** tab
3. Add the following:
   ```
   BCRYPT_ROUNDS=12
   NODE_ENV=production
   ```
4. Click **Deploy**

### All Other Services (user-service, communication-service, notification-service)
1. Select each service
2. Add/verify:
   ```
   NODE_ENV=production
   ```

---

## Method 2: Railway CLI

### Prerequisites
```bash
# Login to Railway
railway login

# Navigate to project
cd /Users/shouryaveersingh/Desktop/old\ data/staff
```

### Add Variables

#### Matching Service
```bash
cd backend/services/matching-service
railway link
railway variables set MIN_MATCH_SCORE=0
railway variables set NODE_ENV=production
```

#### Auth Service
```bash
cd backend/services/auth-service
railway link
railway variables set BCRYPT_ROUNDS=12
railway variables set NODE_ENV=production
```

#### User Service
```bash
cd backend/services/user-service
railway link
railway variables set NODE_ENV=production
```

#### Communication Service
```bash
cd backend/services/communication-service
railway link
railway variables set NODE_ENV=production
```

#### Notification Service
```bash
cd backend/services/notification-service
railway link
railway variables set NODE_ENV=production
```

---

## Verification

After adding variables, verify they were set correctly:

```bash
# Check matching-service
cd backend/services/matching-service
railway variables

# Check auth-service
cd backend/services/auth-service
railway variables
```

Expected output should show:
- `MIN_MATCH_SCORE=0` (matching-service)
- `BCRYPT_ROUNDS=12` (auth-service)
- `NODE_ENV=production` (all services)

---

## What These Variables Do

### MIN_MATCH_SCORE (Matching Service)
- **Purpose**: Configurable minimum matching threshold
- **Default**: 0
- **Range**: 0-100
- **Impact**: Controls minimum score for contractor-worker matches
- **Fix**: Bug #9 - Makes matching threshold configurable

### BCRYPT_ROUNDS (Auth Service)
- **Purpose**: Password hashing strength
- **Default**: 12
- **Range**: 10-15 (higher = more secure, slower)
- **Impact**: Security - stronger password hashing
- **Fix**: Bug #13 - Increased from 10 to 12 rounds

### NODE_ENV (All Services)
- **Purpose**: Controls environment-specific behavior
- **Value**: `production`
- **Impact**: 
  - Hides error details from API responses (security)
  - Optimizes performance
  - Disables debug features
- **Fix**: Bug #5 - Environment-based error handling

---

## Deployment Impact

Once variables are added:
1. ✅ Services will **automatically restart** with new configuration
2. ✅ No code changes needed - variables are read at runtime
3. ✅ Error details will be hidden in production (security)
4. ✅ Password hashing will use 12 rounds (stronger)
5. ✅ Matching threshold is now configurable

---

## Troubleshooting

### Variables not taking effect?
```bash
# Restart the service
railway restart --service <service-name>

# Or redeploy
railway up --detach --service <service-name>
```

### Check service logs
```bash
railway logs --service matching-service
railway logs --service auth-service
```

### Verify environment
```bash
# Check what environment variables are set
railway variables --service <service-name>
```

---

## Next Steps

After adding environment variables:
1. ✅ Verify variables are set correctly
2. ✅ Check service logs for successful restart
3. ⏭️ Proceed to backend deployment (building services)
4. ⏭️ Deploy frontend
5. ⏭️ Test live application

---

**Status**: Environment variables configuration ready  
**Action Required**: Add variables via Railway Dashboard or CLI  
**Estimated Time**: 5-10 minutes
