# Cloud Run Deployment Setup Guide

## ✅ What's Already Done

- ✅ Dockerfiles created for all 5 services (auth, user, matching, communication, notification)
- ✅ GitHub Actions workflows configured for auto-deployment
- ✅ GCP project configured: `staff-473807`
- ✅ Authenticated account: `khushabhu@gmail.com`

## 🔧 Required Setup Steps

### Step 1: Enable Billing (REQUIRED)
1. Go to: https://console.cloud.google.com/billing/linkedaccount?project=staff-473807
2. Link a billing account to the `staff-473807` project
3. This is required for Cloud Run and Cloud Build

### Step 2: Enable Required APIs

Once billing is enabled, run:

```bash
gcloud services enable \
  run.googleapis.com \
  cloudbuild.googleapis.com \
  artifactregistry.googleapis.com \
  --project=staff-473807
```

### Step 3: Create Artifact Registry Repositories

Create a repository for each service to store Docker images:

```bash
# Create repositories
gcloud artifacts repositories create auth-service \
  --repository-format=docker \
  --location=us-central1 \
  --project=staff-473807

gcloud artifacts repositories create user-service \
  --repository-format=docker \
  --location=us-central1 \
  --project=staff-473807

gcloud artifacts repositories create matching-service \
  --repository-format=docker \
  --location=us-central1 \
  --project=staff-473807

gcloud artifacts repositories create communication-service \
  --repository-format=docker \
  --location=us-central1 \
  --project=staff-473807

gcloud artifacts repositories create notification-service \
  --repository-format=docker \
  --location=us-central1 \
  --project=staff-473807
```

### Step 4: Create Service Account for GitHub Actions

```bash
# Create service account
gcloud iam service-accounts create github-actions \
  --display-name="GitHub Actions Deployer" \
  --project=staff-473807

# Grant necessary permissions
gcloud projects add-iam-policy-binding staff-473807 \
  --member="serviceAccount:github-actions@staff-473807.iam.gserviceaccount.com" \
  --role="roles/run.admin"

gcloud projects add-iam-policy-binding staff-473807 \
  --member="serviceAccount:github-actions@staff-473807.iam.gserviceaccount.com" \
  --role="roles/storage.admin"

gcloud projects add-iam-policy-binding staff-473807 \
  --member="serviceAccount:github-actions@staff-473807.iam.gserviceaccount.com" \
  --role="roles/artifactregistry.writer"

gcloud projects add-iam-policy-binding staff-473807 \
  --member="serviceAccount:github-actions@staff-473807.iam.gserviceaccount.com" \
  --role="roles/iam.serviceAccountUser"

# Create and download service account key
gcloud iam service-accounts keys create github-actions-key.json \
  --iam-account=github-actions@staff-473807.iam.gserviceaccount.com \
  --project=staff-473807
```

**⚠️ IMPORTANT:** The `github-actions-key.json` file will be created in your current directory. Keep it secure!

### Step 5: Add GitHub Secret

1. Go to your GitHub repository: https://github.com/KarniSinghji/staff
2. Navigate to **Settings** → **Secrets and variables** → **Actions**
3. Click **New repository secret**
4. Name: `GCP_SA_KEY`
5. Value: Paste the entire contents of `github-actions-key.json`
6. Click **Add secret**

**After adding the secret, DELETE the local file:**
```bash
rm github-actions-key.json
```

### Step 6: Create Secrets in Google Secret Manager

Store sensitive environment variables:

```bash
# Enable Secret Manager API
gcloud services enable secretmanager.googleapis.com --project=staff-473807

# Create DATABASE_URL secret (replace with your actual PostgreSQL URL)
echo -n "postgresql://user:password@host:5432/database" | \
  gcloud secrets create DATABASE_URL \
  --data-file=- \
  --replication-policy=automatic \
  --project=staff-473807

# Create JWT_SECRET secret (replace with your actual secret)
echo -n "your-super-secret-jwt-key-256-bits" | \
  gcloud secrets create JWT_SECRET \
  --data-file=- \
  --replication-policy=automatic \
  --project=staff-473807

# Grant Cloud Run access to secrets
gcloud secrets add-iam-policy-binding DATABASE_URL \
  --member="serviceAccount:346188939499-compute@developer.gserviceaccount.com" \
  --role="roles/secretmanager.secretAccessor" \
  --project=staff-473807

gcloud secrets add-iam-policy-binding JWT_SECRET \
  --member="serviceAccount:346188939499-compute@developer.gserviceaccount.com" \
  --role="roles/secretmanager.secretAccessor" \
  --project=staff-473807
```

### Step 7: Get Your Current Secrets from Railway

To migrate from Railway, get your current environment variables:

```bash
# Get from Railway dashboard or environment
# DATABASE_URL: Your PostgreSQL connection string
# JWT_SECRET: Your JWT signing key
```

## 🚀 Deployment

Once setup is complete, deployment is automatic:

1. **Commit and push** to `main` branch
2. GitHub Actions will:
   - Build Docker image
   - Push to Artifact Registry
   - Deploy to Cloud Run
   - Show the service URL

### Deploy All Services Manually (First Time)

If you want to trigger all deployments at once:

```bash
# Make a small change to trigger all workflows
touch backend/services/auth-service/trigger-deploy
touch backend/services/user-service/trigger-deploy
touch backend/services/matching-service/trigger-deploy
touch backend/services/communication-service/trigger-deploy
touch backend/services/notification-service/trigger-deploy

git add .
git commit -m "Deploy all services to Cloud Run"
git push origin main
```

## 📊 Monitoring Deployment

Watch deployment progress:
- GitHub: https://github.com/KarniSinghji/staff/actions
- GCP Console: https://console.cloud.google.com/run?project=staff-473807

## 🔗 Service URLs

After deployment, your services will be available at:
- `https://auth-service-xxxxxx-uc.a.run.app`
- `https://user-service-xxxxxx-uc.a.run.app`
- `https://matching-service-xxxxxx-uc.a.run.app`
- `https://communication-service-xxxxxx-uc.a.run.app`
- `https://notification-service-xxxxxx-uc.a.run.app`

Get URLs with:
```bash
gcloud run services list --project=staff-473807 --region=us-central1
```

## 🔄 Update Frontend API Config

After deployment, update `frontend/src/config/api.ts` with new Cloud Run URLs.

## 💰 Cost Optimization

Cloud Run pricing:
- **Free tier**: 2 million requests/month
- **Scale to zero**: No cost when idle
- **Pay per use**: Only charged when handling requests

Current configuration:
- Min instances: 0 (scale to zero)
- Max instances: 10 (auto-scale)
- Memory: 512Mi per service
- CPU: 1 per service

## 🐛 Troubleshooting

### Deployment fails with billing error
→ Enable billing at https://console.cloud.google.com/billing/linkedaccount?project=staff-473807

### "Permission denied" errors
→ Ensure service account has all required roles (Step 4)

### Secret not found
→ Verify secrets exist: `gcloud secrets list --project=staff-473807`

### Service won't start
→ Check logs: `gcloud run services logs read SERVICE_NAME --project=staff-473807 --region=us-central1`

## 📝 Next Steps After Deployment

1. ✅ Test all service health endpoints: `/health`
2. ✅ Update frontend with new Cloud Run URLs
3. ✅ Update mobile app API configuration
4. ✅ Test authentication flow
5. ✅ Test GPS tracking and location updates
6. ✅ Monitor performance in Cloud Console
7. ✅ Set up Cloud Monitoring alerts (optional)
