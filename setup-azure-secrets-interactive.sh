#!/bin/bash

# Quick setup script to configure Azure secrets from GitHub secrets
# This script fetches Firebase credentials from GitHub and sets up Azure

set -e

echo "🔧 Setting up notification service secrets from GitHub..."

# Check if gh CLI is installed
if ! command -v gh &> /dev/null; then
    echo "❌ GitHub CLI (gh) is not installed"
    echo "Install it with: brew install gh"
    exit 1
fi

# Check if authenticated
if ! gh auth status &> /dev/null; then
    echo "❌ Not authenticated with GitHub CLI"
    echo "Run: gh auth login"
    exit 1
fi

# Fetch Firebase secret from GitHub (this is a workaround as gh doesn't allow direct value access)
echo "⚠️  Note: GitHub CLI cannot directly access secret values for security"
echo ""
echo "Please provide the Firebase service account JSON manually:"
echo "1. Go to: https://github.com/settings/secrets/actions"
echo "2. Find: FIREBASE_SERVICE_ACCOUNT_COMEONDOST"
echo "3. Copy the JSON value"
echo ""
read -p "Paste Firebase JSON here (single line): " FIREBASE_JSON

if [ -z "$FIREBASE_JSON" ]; then
    echo "❌ Firebase JSON not provided"
    exit 1
fi

# Verify it's valid JSON
if ! echo "$FIREBASE_JSON" | jq . > /dev/null 2>&1; then
    echo "❌ Invalid JSON provided"
    exit 1
fi

echo "✅ Valid JSON detected"

# Check DATABASE_URL
if [ -z "$DATABASE_URL" ]; then
    echo "❌ DATABASE_URL not set in environment"
    echo "Please set it: export DATABASE_URL='postgresql://...'"
    exit 1
fi

echo "✅ DATABASE_URL found"

# Create secrets in Azure
echo "📦 Creating Azure secrets..."
az containerapp secret set \
  --name notification-service \
  --resource-group staff-sea-rg \
  --secrets "database-url=$DATABASE_URL" "firebase-service-account=$FIREBASE_JSON"

echo "✅ Secrets created"

# Update environment variables
echo "🔗 Updating environment variables..."
az containerapp update \
  --name notification-service \
  --resource-group staff-sea-rg \
  --set-env-vars \
    DATABASE_URL=secretref:database-url \
    FIREBASE_SERVICE_ACCOUNT_JSON=secretref:firebase-service-account \
    NODE_ENV=production \
    SERVICE_NAME=notification-service \
    ALLOWED_ORIGINS=https://comeondost.web.app,https://comeondost.firebaseapp.com,https://localhost,capacitor://localhost

echo ""
echo "✅ Setup complete!"
echo "🔄 Service will restart automatically"
echo ""
echo "⏳ Wait 30-60 seconds, then test:"
echo "   curl https://notification-service.delightfulflower-04821c4b.southeastasia.azurecontainerapps.io/health"
