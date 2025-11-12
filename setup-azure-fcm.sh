#!/bin/bash

# Script to add Firebase credentials to Azure Container App
# This sets up push notifications for the notification-service

set -e

echo "🔥 Adding Firebase Credentials to Azure Notification Service"
echo "=============================================================="
echo ""

# Configuration
RESOURCE_GROUP="staff-sea-rg"
CONTAINER_APP_NAME="notification-service"

# Check if FIREBASE_JSON is provided
if [ -z "$1" ]; then
    echo "❌ Error: Firebase service account JSON required"
    echo ""
    echo "Usage:"
    echo "  ./setup-azure-fcm.sh '<firebase-json>'"
    echo ""
    echo "To get the Firebase JSON:"
    echo "  1. Go to: https://github.com/karnisinghji/staff/settings/secrets/actions"
    echo "  2. Find: FIREBASE_SERVICE_ACCOUNT_COMEONDOST"
    echo "  3. Copy the entire JSON"
    echo "  4. Run: ./setup-azure-fcm.sh '<paste-json-here>'"
    echo ""
    exit 1
fi

FIREBASE_JSON="$1"

echo "📋 Validating Firebase JSON..."
if echo "$FIREBASE_JSON" | jq empty 2>/dev/null; then
    PROJECT_ID=$(echo "$FIREBASE_JSON" | jq -r '.project_id')
    echo "✅ Valid JSON for project: $PROJECT_ID"
else
    echo "❌ Invalid JSON format"
    exit 1
fi

echo ""
echo "🔐 Checking Azure login..."
if ! az account show &>/dev/null; then
    echo "⚠️  Not logged in to Azure. Logging in..."
    az login
else
    ACCOUNT=$(az account show --query name -o tsv)
    echo "✅ Logged in as: $ACCOUNT"
fi

echo ""
echo "📦 Checking if Container App exists..."
if az containerapp show \
    --name "$CONTAINER_APP_NAME" \
    --resource-group "$RESOURCE_GROUP" &>/dev/null; then
    echo "✅ Container App found: $CONTAINER_APP_NAME"
else
    echo "❌ Container App not found: $CONTAINER_APP_NAME"
    echo "   Waiting for GitHub Actions deployment..."
    exit 1
fi

echo ""
echo "🔧 Adding Firebase credentials to Container App..."

# Add DATABASE_URL if not present (notification service needs it for device tokens)
echo "  → Checking DATABASE_URL..."
if az containerapp show \
    --name "$CONTAINER_APP_NAME" \
    --resource-group "$RESOURCE_GROUP" \
    --query "properties.template.containers[0].env[?name=='DATABASE_URL'].value" -o tsv | grep -q .; then
    echo "  ✅ DATABASE_URL already set"
else
    echo "  ⚠️  DATABASE_URL not found - you'll need to add it separately"
fi

# Update container app with Firebase credentials
az containerapp update \
    --name "$CONTAINER_APP_NAME" \
    --resource-group "$RESOURCE_GROUP" \
    --set-env-vars "FIREBASE_SERVICE_ACCOUNT_JSON=$FIREBASE_JSON" \
    --output none

echo ""
echo "✅ Firebase credentials added successfully!"
echo ""
echo "🔄 Waiting for Container App to restart..."
sleep 10

echo ""
echo "🏥 Checking service health..."
FQDN=$(az containerapp show \
    --name "$CONTAINER_APP_NAME" \
    --resource-group "$RESOURCE_GROUP" \
    --query "properties.configuration.ingress.fqdn" -o tsv)

if [ -n "$FQDN" ]; then
    echo "  Service URL: https://$FQDN"
    echo ""
    echo "  Testing health endpoint..."
    
    for i in {1..5}; do
        if curl -s "https://$FQDN/health" | jq . 2>/dev/null; then
            echo ""
            echo "✅ Service is healthy and responding!"
            
            # Check if FCM is enabled in logs
            echo ""
            echo "📱 Checking FCM status in logs..."
            az containerapp logs show \
                --name "$CONTAINER_APP_NAME" \
                --resource-group "$RESOURCE_GROUP" \
                --type console \
                --tail 20 \
                --follow false 2>/dev/null | grep -E "FCM|Push|Firebase" || echo "  (No FCM logs yet - service may still be starting)"
            
            echo ""
            echo "=============================================================="
            echo "🎉 Setup Complete!"
            echo "=============================================================="
            echo ""
            echo "Next steps:"
            echo "  1. Login on Android app"
            echo "  2. Device will auto-register"
            echo "  3. Send test notification:"
            echo "     NOTIFICATION_SERVICE_URL=https://$FQDN node test-push-notifications.js <USER_ID>"
            echo ""
            exit 0
        fi
        echo "  Attempt $i/5 - waiting for service to start..."
        sleep 5
    done
    
    echo ""
    echo "⚠️  Service deployed but not responding yet"
    echo "   Check logs: az containerapp logs show --name $CONTAINER_APP_NAME --resource-group $RESOURCE_GROUP --follow"
else
    echo "❌ Could not get service URL"
fi
