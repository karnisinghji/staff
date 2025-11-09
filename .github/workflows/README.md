# Automated Deployment Workflows

This directory contains GitHub Actions workflows for automated deployment of all services.

## Workflows Overview

### 🔄 `deploy-all.yml` - Master Deployment Orchestrator
**Triggers:** Push to `main` branch affecting backend or frontend, or manual dispatch

**What it does:**
- Detects which parts of the codebase changed
- Deploys backend services (if `backend/services/**` changed)
- Deploys frontend to Firebase (if `frontend/**` or backend changed)
- Builds and commits Android APK (if `frontend/**` or backend changed)
- Provides deployment summary with URLs and status

**Manual Trigger:**
```bash
# Go to GitHub Actions tab → Deploy All Services → Run workflow
# Select options: deploy_backend, deploy_frontend, deploy_mobile
```

### 📱 `build-android-apk.yml` - Android APK Builder
**Triggers:** 
- Push to `main` affecting `frontend/**` or `backend/services/**`
- Called by `deploy-all.yml`
- Manual dispatch

**What it does:**
1. Installs Node.js dependencies
2. Builds frontend with Vite
3. Sets up Android SDK and Java 17
4. Syncs Capacitor
5. Builds debug APK with Gradle
6. Copies APK to root as `contractor-platform.apk`
7. Commits APK back to repo (with `[skip ci]` to prevent loop)
8. Uploads APK as artifact (90-day retention)
9. Creates GitHub release if tagged

**Output:**
- APK committed to: `contractor-platform.apk` (root)
- Download URL: `https://github.com/karnisinghji/staff/raw/main/contractor-platform.apk`

### 🚀 `deploy-firebase.yml` - Firebase Hosting Deployment
**Triggers:**
- Push to `main` affecting `frontend/**` or `backend/services/**`
- Called by `deploy-all.yml`
- Manual dispatch

**What it does:**
1. Installs frontend dependencies
2. Builds production frontend (`npm run build`)
3. Deploys to Firebase Hosting (live channel)

**Output:**
- Production URL: `https://comeondost.web.app`
- Alternative URL: `https://comeondost.firebaseapp.com`

**Required Secret:**
- `FIREBASE_SERVICE_ACCOUNT_COMEONDOST` - Firebase service account JSON

### 🔧 Individual Service Deployments
- `deploy-azure-auth.yml` - Auth Service
- `deploy-azure-user.yml` - User Service
- `deploy-azure-matching.yml` - Matching Service
- `deploy-azure-communication.yml` - Communication Service
- `deploy-azure-notification.yml` - Notification Service

Each deploys to Azure Container Apps when their service code changes.

## Setup Requirements

### GitHub Secrets Needed
1. `AZURE_CREDENTIALS` - Azure service principal for container app deployments
2. `GHCR_TOKEN` - GitHub Container Registry token (for Docker images)
3. `FIREBASE_SERVICE_ACCOUNT_COMEONDOST` - Firebase service account JSON
4. `JWT_SECRET` - Shared JWT secret for all services

### Environment Variables (set in Azure)
Each Azure Container App needs:
- `DATABASE_URL` - PostgreSQL connection string
- `JWT_SECRET` - JWT signing secret
- `ALLOWED_ORIGINS` - CORS origins (includes `https://localhost,capacitor://localhost` for mobile)
- `NODE_ENV=production`

## Deployment Flow

```
┌──────────────────────────────────────────────────────────┐
│  Push to main (frontend or backend changes)              │
└────────────────────┬─────────────────────────────────────┘
                     │
                     ▼
         ┌───────────────────────┐
         │  deploy-all.yml       │
         │  (Detects changes)    │
         └───────┬───────────────┘
                 │
    ┌────────────┼────────────┐
    │            │            │
    ▼            ▼            ▼
┌───────┐  ┌──────────┐  ┌─────────┐
│Backend│  │ Firebase │  │   APK   │
│Services│  │ Hosting  │  │ Builder │
└───┬───┘  └────┬─────┘  └────┬────┘
    │           │             │
    ▼           ▼             ▼
Azure      comeondost    contractor-
Container    .web.app    platform.apk
  Apps                    (committed)
```

## Manual Deployment

### Deploy Everything
```bash
# Via GitHub UI
Actions → Deploy All Services → Run workflow

# Or trigger via API
gh workflow run deploy-all.yml
```

### Deploy Only APK
```bash
gh workflow run build-android-apk.yml
```

### Deploy Only Firebase
```bash
gh workflow run deploy-firebase.yml
```

### Deploy Specific Backend Service
```bash
# Make a change to that service and push, or trigger manually
gh workflow run deploy-azure-matching.yml
```

## Workflow Features

### ✅ Change Detection
- Only deploys what changed (saves time and resources)
- Uses `dorny/paths-filter` for intelligent path detection

### ✅ APK Auto-Commit
- APK is built and committed back to repo automatically
- Uses `[skip ci]` tag to prevent infinite loops
- Bot account commits: `github-actions[bot]`

### ✅ Artifact Retention
- APK artifacts stored for 90 days
- Downloadable from Actions → Run → Artifacts

### ✅ Release Management
- Tag a commit to create a GitHub release with APK
- Example: `git tag v1.0.0 && git push --tags`

### ✅ Deployment Summary
- Each run creates a summary with:
  - Status of all deployments
  - URLs for frontend and APK download
  - Any errors or warnings

## Monitoring Deployments

### Check Status
```bash
# List recent workflow runs
gh run list --workflow=deploy-all.yml

# Watch specific run
gh run watch <run-id>

# View logs
gh run view <run-id> --log
```

### Common Issues

**APK build fails:**
- Check Gradle build logs
- Verify Android SDK setup
- Ensure `capacitor.build.gradle` is valid

**Firebase deployment fails:**
- Verify `FIREBASE_SERVICE_ACCOUNT_COMEONDOST` secret
- Check `firebase.json` configuration
- Ensure `frontend/dist` directory exists

**Backend deployment fails:**
- Verify Azure credentials
- Check Docker build logs
- Ensure all environment variables set

## Automatic Updates

When you push changes:
- ✅ Backend code → Services redeploy with updated CORS origins
- ✅ Frontend code → Firebase updates + new APK built
- ✅ Both → Everything updates in sequence

The app-store page will always have the latest APK!

## Testing Workflows

To test without triggering full deployment:
```bash
# Test workflow syntax
gh workflow view deploy-all.yml

# Dry-run (requires act CLI)
act -W .github/workflows/build-android-apk.yml --dry-run
```

## Rollback

If deployment fails:
```bash
# Revert to previous commit
git revert HEAD
git push

# Or manually redeploy previous version
gh workflow run deploy-all.yml --ref <commit-sha>
```
