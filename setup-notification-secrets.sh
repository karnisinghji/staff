#!/bin/bash

# Setup Azure Container App Secrets for Notification Service
# This script must be run with Firebase service account JSON provided

echo "🔧 Setting up Azure secrets for notification-service..."

# Check if Firebase JSON is provided
if [ -z "$FIREBASE_JSON" ]; then
  echo "❌ Error: FIREBASE_JSON environment variable not set"
  echo ""
  echo "Usage:"
  echo "  export FIREBASE_JSON='{\"type\":\"service_account\",\"project_id\":\"...\"}'"
  echo "  ./setup-notification-secrets.sh"
  echo ""
  echo "Or provide via GitHub secret:"
  echo "  gh secret list | grep FIREBASE"
  exit 1
fi

# Verify DATABASE_URL is set
if [ -z "$DATABASE_URL" ]; then
  echo "❌ Error: DATABASE_URL environment variable not set"
  exit 1
fi

echo "✅ Environment variables found"

# Create/update database-url secret
echo "📦 Creating database-url secret..."
az containerapp secret set \
  --name notification-service \
  --resource-group staff-sea-rg \
  --secrets "database-url=$DATABASE_URL"

# Create/update firebase-service-account secret
echo "📦 Creating firebase-service-account secret..."
az containerapp secret set \
  --name notification-service \
  --resource-group staff-sea-rg \
  --secrets "firebase-service-account=$FIREBASE_JSON"

# Update container app environment variables to reference secrets
echo "🔗 Updating environment variables to use secrets..."
az containerapp update \
  --name notification-service \
  --resource-group staff-sea-rg \
  --set-env-vars \
    DATABASE_URL=secretref:database-url \
    FIREBASE_SERVICE_ACCOUNT_JSON=secretref:firebase-service-account \
    NODE_ENV=production \
    SERVICE_NAME=notification-service \
    ALLOWED_ORIGINS=https://comeondost.web.app,https://comeondost.firebaseapp.com,https://localhost,capacitor://localhost

echo "✅ Secrets configured successfully!"
echo ""
echo "🔄 Service will restart automatically to apply changes"
echo "⏳ Wait 30-60 seconds then test with:"
echo "   curl https://notification-service.delightfulflower-04821c4b.southeastasia.azurecontainerapps.io/health"
