# 🚀 Railway Deployment Guide

## Current Setup

**Status:** ✅ All services deployed and running on Railway

**Services:**
- Auth Service: `https://auth-service-production-d5c8.up.railway.app`
- User Service: `https://user-service-production-f141.up.railway.app`
- Matching Service: `https://matching-service-production.up.railway.app`
- Communication Service: `https://communication-service-production-c165.up.railway.app`
- Notification Service: `https://notification-service-production-8738.up.railway.app`

---

## Manual Deployment (Recommended)

Railway deployments work best when done manually or through Railway's own CI/CD integration.

### Deploy a Single Service

```bash
# Navigate to the service directory
cd backend/services/auth-service

# Deploy to Railway
railway up --detach

# View logs
railway logs
```

### Deploy All Services

```bash
# From project root
for service in auth-service user-service matching-service communication-service notification-service; do
  echo "Deploying $service..."
  cd "backend/services/$service"
  railway up --detach
  cd ../../..
done
```

---

## Railway GitHub Integration (Recommended)

Railway can automatically deploy when you push to GitHub.

### Setup Steps:

1. **Go to Railway Dashboard**
   - Visit: https://railway.app/dashboard

2. **For Each Service:**
   - Click on the service (e.g., auth-service)
   - Go to Settings → Deploy
   - Enable "Deploy on Push"
   - Set Root Directory: `backend/services/auth-service`
   - Set Build Command: `npm install --legacy-peer-deps && npm run build`
   - Set Start Command: `npm start`

3. **Branch Configuration:**
   - Watch Branch: `main`
   - Deploy on PR: Optional (recommended for staging)

4. **That's it!** Railway will now automatically deploy when you push to main.

---

## GitHub Actions Deployment (Advanced)

If you want to deploy via GitHub Actions, you'll need Railway project tokens.

### Setup Railway Tokens:

1. **Get Project Token:**
   ```bash
   railway project tokens:create
   ```

2. **Add to GitHub Secrets:**
   - Go to: https://github.com/karnisinghji/staff/settings/secrets/actions
   - Add secret: `RAILWAY_TOKEN` with the token value

3. **Get Project ID:**
   ```bash
   railway status
   # Copy the Project ID
   ```

4. **Update Workflow:**

Create `.github/workflows/deploy-railway.yml`:

```yaml
name: Deploy to Railway

on:
  push:
    branches: [ main ]
    paths:
      - 'backend/**'
  workflow_dispatch:  # Allow manual triggers

env:
  RAILWAY_TOKEN: ${{ secrets.RAILWAY_TOKEN }}

jobs:
  deploy:
    runs-on: ubuntu-latest
    strategy:
      matrix:
        service: 
          - auth-service
          - user-service
          - matching-service
          - communication-service
          - notification-service
    
    steps:
      - uses: actions/checkout@v3
      
      - name: Install Railway CLI
        run: npm install -g @railway/cli

      - name: Deploy to Railway
        working-directory: backend/services/${{ matrix.service }}
        run: |
          railway up --service ${{ matrix.service }} --detach
        env:
          RAILWAY_TOKEN: ${{ secrets.RAILWAY_TOKEN }}
```

### Why We Don't Use This:

- **Project Token Complexity:** Need separate tokens for each service
- **Railway Integration Better:** Railway's native GitHub integration is more reliable
- **Manual Control:** For production, manual deployments give more control
- **Build Already Validated:** GitHub Actions already validates builds

---

## Current GitHub Actions Setup

**What it does:** ✅ Validates builds only

Our current workflow (`.github/workflows/build-backend.yml`) only:
1. ✅ Installs dependencies
2. ✅ Runs tests
3. ✅ Builds TypeScript
4. ✅ Verifies build output

**What it doesn't do:** Deploy to Railway (by design)

**Why:** 
- Manual deployments work great
- Railway's GitHub integration is better for auto-deploy
- Keeps CI/CD simple and fast
- No token management needed

---

## Deployment Checklist

Before deploying:

- [ ] All tests passing locally
- [ ] GitHub Actions build passing
- [ ] Environment variables set on Railway
- [ ] Database migrations run (if any)
- [ ] Check Railway logs for errors

### Environment Variables on Railway:

Each service needs:
```bash
NODE_ENV=production
PORT=8080
DATABASE_URL=postgresql://...
JWT_SECRET=your-secret-here
CORS_ORIGIN=https://karnisinghji.github.io
ALLOWED_ORIGINS=https://karnisinghji.github.io,http://localhost:5173
```

Check with:
```bash
railway variables
```

Set with:
```bash
railway variables set KEY=value
```

---

## Rollback a Deployment

If something goes wrong:

```bash
# View deployment history
railway deployments

# Rollback to previous deployment
railway rollback [deployment-id]
```

Or in Railway dashboard:
1. Go to service → Deployments
2. Find the working deployment
3. Click "Redeploy"

---

## Monitoring

### View Logs:
```bash
# Real-time logs
railway logs --follow

# Last 100 lines
railway logs --tail 100
```

### Check Service Health:
```bash
curl https://auth-service-production-d5c8.up.railway.app/health
```

### Railway Dashboard:
Visit: https://railway.app/dashboard
- View metrics (CPU, Memory, Network)
- Check deployment status
- View logs
- Restart services

---

## Best Practices

1. **Use Railway's GitHub Integration**
   - Most reliable for auto-deployments
   - No token management needed
   - Better error reporting

2. **Manual Deploys for Production**
   - More control over timing
   - Can verify locally first
   - No CI/CD delays

3. **GitHub Actions for Validation**
   - Keep it fast and simple
   - Just build and test
   - Let Railway handle deployment

4. **Environment Variables**
   - Set once on Railway dashboard
   - Don't commit secrets
   - Use Railway's secrets management

---

## Troubleshooting

### "Project Token not found"
- You need to run `railway link` in each service directory
- Or use Railway's GitHub integration instead

### "Build failed in Railway"
- Check Dockerfile is correct
- Verify all dependencies in package.json
- Check Railway build logs

### "Service won't start"
- Check Railway logs: `railway logs`
- Verify PORT environment variable
- Ensure listening on `0.0.0.0` not `localhost`

### "Can't connect to database"
- Check DATABASE_URL is set
- Verify Neon database is running
- Check connection string format

---

## Summary

**Current Recommendation:** 

✅ **Use Railway's GitHub Integration** for automatic deployments  
✅ **OR Manual Deployment** via `railway up` for control  
✅ **GitHub Actions** for build validation only  

**Don't:** Try to deploy via GitHub Actions with tokens (unnecessary complexity)

---

**Updated:** October 10, 2025  
**Status:** All services deployed and operational  
**Method:** Manual deployment via Railway CLI
