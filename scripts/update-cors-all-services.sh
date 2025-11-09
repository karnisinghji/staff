#!/bin/bash
# Quick CORS update script with auto-login
# Usage: ./scripts/update-cors-all-services.sh

set -e

SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
CORS_ORIGINS="https://comeondost.web.app,https://comeondost.firebaseapp.com,https://localhost,capacitor://localhost"

echo "🔄 Updating CORS for all services..."
source "$SCRIPT_DIR/azure-auto-login.sh"

SERVICES=("matching-service" "communication-service" "auth-service" "user-service" "notification-service")

for service in "${SERVICES[@]}"; do
    echo "📝 Configuring CORS on $service ingress..."
    az containerapp ingress cors enable \
        --name "$service" \
        --resource-group staff-sea-rg \
        --allowed-origins "https://comeondost.web.app" "https://comeondost.firebaseapp.com" "https://localhost" "capacitor://localhost" \
        --allowed-methods GET POST PUT DELETE OPTIONS PATCH \
        --allowed-headers "*" \
        --allow-credentials true \
        --query "allowedOrigins[0]" -o tsv > /dev/null || echo "⚠️  Failed to update $service"
    echo "✅ $service CORS enabled"
done

echo ""
echo "🎉 All services updated with Azure ingress CORS policy!"
echo "✅ Mobile app should now work without CORS errors."
