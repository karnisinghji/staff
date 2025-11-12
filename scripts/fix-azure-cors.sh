#!/bin/bash

# Script to fix CORS on all Azure Container Apps
# Run this after deployments if CORS errors return

set -e

RESOURCE_GROUP="staff-sea-rg"
ALLOWED_ORIGINS='"https://localhost" "capacitor://localhost" "https://comeondost.web.app" "https://comeondost.firebaseapp.com" "http://localhost:5173"'

echo "========================================="
echo "Fixing CORS on Azure Container Apps"
echo "========================================="

# Matching Service
echo ""
echo "1. Configuring CORS for matching-service..."
az containerapp ingress cors enable \
  --name matching-service \
  --resource-group $RESOURCE_GROUP \
  --allowed-origins $ALLOWED_ORIGINS \
  --allowed-methods GET POST PUT DELETE OPTIONS PATCH \
  --allowed-headers "*" \
  --allow-credentials true \
  --max-age 3600 \
  --output none

echo "✅ matching-service CORS configured"

# Communication Service
echo ""
echo "2. Configuring CORS for communication-service..."
az containerapp ingress cors enable \
  --name communication-service \
  --resource-group $RESOURCE_GROUP \
  --allowed-origins $ALLOWED_ORIGINS \
  --allowed-methods GET POST PUT DELETE OPTIONS PATCH \
  --allowed-headers "*" \
  --allow-credentials true \
  --max-age 3600 \
  --output none

echo "✅ communication-service CORS configured"

# User Service
echo ""
echo "3. Configuring CORS for user-service..."
az containerapp ingress cors enable \
  --name user-service \
  --resource-group $RESOURCE_GROUP \
  --allowed-origins $ALLOWED_ORIGINS \
  --allowed-methods GET POST PUT DELETE OPTIONS PATCH \
  --allowed-headers "*" \
  --allow-credentials true \
  --max-age 3600 \
  --output none

echo "✅ user-service CORS configured"

# Notification Service
echo ""
echo "4. Configuring CORS for notification-service..."
az containerapp ingress cors enable \
  --name notification-service \
  --resource-group $RESOURCE_GROUP \
  --allowed-origins $ALLOWED_ORIGINS \
  --allowed-methods GET POST PUT DELETE OPTIONS PATCH \
  --allowed-headers "*" \
  --allow-credentials true \
  --max-age 3600 \
  --output none

echo "✅ notification-service CORS configured"

echo ""
echo "========================================="
echo "✅ All services CORS configured!"
echo "========================================="
echo ""
echo "Verifying settings..."
echo ""

# Verify
echo "Matching Service CORS:"
az containerapp ingress cors show --name matching-service --resource-group $RESOURCE_GROUP --query allowCredentials

echo ""
echo "Communication Service CORS:"
az containerapp ingress cors show --name communication-service --resource-group $RESOURCE_GROUP --query allowCredentials

echo ""
echo "Done! CORS should now work on mobile app."
