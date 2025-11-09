#!/bin/bash

# Script to add https://localhost to ALLOWED_ORIGINS for all Azure Container Apps
# This enables Capacitor mobile app to make API calls

RESOURCE_GROUP="staff-sea-rg"
SERVICES=("auth-service" "user-service" "matching-service" "communication-service" "notification-service")

# New origins to add (if not already present)
MOBILE_ORIGINS="https://localhost,capacitor://localhost"

echo "🔧 Fixing CORS for mobile app (Capacitor)"
echo "================================================"
echo ""

for SERVICE in "${SERVICES[@]}"; do
    echo "📱 Updating $SERVICE..."
    
    # Get current ALLOWED_ORIGINS value
    CURRENT_ORIGINS=$(az containerapp show \
        --name "$SERVICE" \
        --resource-group "$RESOURCE_GROUP" \
        --query "properties.configuration.secrets[?name=='allowed-origins'].value | [0]" \
        -o tsv 2>/dev/null)
    
    if [ -z "$CURRENT_ORIGINS" ]; then
        # Try to get from environment variables instead
        CURRENT_ORIGINS=$(az containerapp show \
            --name "$SERVICE" \
            --resource-group "$RESOURCE_GROUP" \
            --query "properties.template.containers[0].env[?name=='ALLOWED_ORIGINS'].value | [0]" \
            -o tsv 2>/dev/null)
    fi
    
    if [ -z "$CURRENT_ORIGINS" ]; then
        echo "  ⚠️  No ALLOWED_ORIGINS found, using default production origins"
        NEW_ORIGINS="https://comeondost.web.app,https://comeondost.firebaseapp.com,$MOBILE_ORIGINS"
    else
        echo "  ℹ️  Current origins: $CURRENT_ORIGINS"
        
        # Check if mobile origins already exist
        if [[ "$CURRENT_ORIGINS" == *"https://localhost"* ]]; then
            echo "  ✅ Mobile origins already configured, skipping"
            continue
        fi
        
        # Append mobile origins
        NEW_ORIGINS="$CURRENT_ORIGINS,$MOBILE_ORIGINS"
    fi
    
    echo "  🔄 Setting new origins: $NEW_ORIGINS"
    
    # Update the container app
    az containerapp update \
        --name "$SERVICE" \
        --resource-group "$RESOURCE_GROUP" \
        --set-env-vars "ALLOWED_ORIGINS=$NEW_ORIGINS" \
        --output none
    
    if [ $? -eq 0 ]; then
        echo "  ✅ Successfully updated $SERVICE"
    else
        echo "  ❌ Failed to update $SERVICE"
    fi
    
    echo ""
done

echo "================================================"
echo "✅ CORS configuration update complete!"
echo ""
echo "🔍 Verifying updated origins:"
echo ""

for SERVICE in "${SERVICES[@]}"; do
    UPDATED_ORIGINS=$(az containerapp show \
        --name "$SERVICE" \
        --resource-group "$RESOURCE_GROUP" \
        --query "properties.template.containers[0].env[?name=='ALLOWED_ORIGINS'].value | [0]" \
        -o tsv 2>/dev/null)
    
    echo "  $SERVICE: $UPDATED_ORIGINS"
done

echo ""
echo "📱 Mobile app should now be able to make API calls!"
echo "🔄 Note: Changes may take 1-2 minutes to propagate"
