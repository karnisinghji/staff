# GitHub Secrets Configuration Guide

This repository requires certain secrets to be configured for automated deployments.

## Required Secrets

### 1. FIREBASE_SERVICE_ACCOUNT_COMEONDOST

**Required for**: Frontend deployment to Firebase Hosting

**How to get it**:

1. Go to [Firebase Console](https://console.firebase.google.com/)
2. Select your project: `comeondost`
3. Click the gear icon ⚙️ → **Project settings**
4. Go to the **Service accounts** tab
5. Click **Generate new private key**
6. A JSON file will download - **keep this secure!**
7. Copy the entire contents of the JSON file

**How to add it to GitHub**:

1. Go to your repository: https://github.com/karnisinghji/staff
2. Click **Settings** → **Secrets and variables** → **Actions**
3. Click **New repository secret**
4. Name: `FIREBASE_SERVICE_ACCOUNT_COMEONDOST`
5. Value: Paste the entire JSON content from the downloaded file
6. Click **Add secret**

### 2. AZURE_CREDENTIALS (Already Configured ✅)

**Required for**: Backend service deployments to Azure Container Apps

This is already configured and working. The workflows successfully deploy all 5 backend services.

## Verifying Secrets

After adding secrets, you can verify they're working by:

1. Go to **Actions** tab in GitHub
2. Manually trigger the "Deploy Frontend to Firebase" workflow
3. Check that it completes successfully

## Workflow Status

Current automated workflows:
- ✅ **Build Backend Services** - Working
- ✅ **Deploy Azure Services** (5 services) - Working  
- ⏭️ **Deploy Firebase** - Skipped until secret configured
- ✅ **Build Android APK** - Working (after Node 20 update)
- ⏭️ **Deploy All** - Orchestrator workflow

## Troubleshooting

If workflows fail:
- Check the **Actions** tab for error logs
- Ensure all required secrets are added
- Verify secret names match exactly (case-sensitive)
- For Firebase, ensure the service account has "Firebase Hosting Admin" role
