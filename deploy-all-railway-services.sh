#!/bin/bash

# Deploy All Railway Services with CORS Fix
# Updated for Firebase Hosting (comeondost.web.app)

set -e  # Exit on error

echo "╔════════════════════════════════════════════════════════════════════╗"
echo "║                                                                    ║"
echo "║         🚀 DEPLOY ALL SERVICES TO RAILWAY                          ║"
echo "║         With Firebase CORS Configuration                           ║"
echo "║                                                                    ║"
echo "╚════════════════════════════════════════════════════════════════════╝"
echo ""

# Check if Railway CLI is installed
if ! command -v railway &> /dev/null; then
    echo "❌ Railway CLI not found. Please install it:"
    echo "   npm install -g @railway/cli"
    exit 1
fi

# Navigate to backend directory
cd "/Users/shouryaveersingh/Desktop/old data/staff/backend"

# Array of services to deploy
declare -a services=(
    "auth-service"
    "user-service"
    "matching-service"
    "communication-service"
    "notification-service"
)

echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo "📦 Building all services..."
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"

# Build shared library first
echo "Building shared library..."
cd services/shared
npm run build
cd ../..
echo "✅ Shared library built"
echo ""

# Build all services
for service in "${services[@]}"; do
    echo "Building $service..."
    cd "services/$service"
    npm run build
    cd ../..
    echo "✅ $service built"
    echo ""
done

echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo "🚀 Deploying services to Railway..."
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo ""

# Deploy each service
for service in "${services[@]}"; do
    echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
    echo "📦 Deploying $service..."
    echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
    
    # Unlink any existing connection
    railway unlink --yes 2>/dev/null || true
    
    # Remove .railway.json to force fresh linking
    rm -f .railway.json
    
    # Link to the service
    echo "Linking to $service..."
    # The CLI will prompt interactively - user needs to select the right project
    railway link
    
    # Deploy
    echo "Deploying $service to Railway..."
    cd "services/$service"
    railway up --detach
    cd ../..
    
    echo "✅ $service deployed"
    echo ""
    
    # Wait a bit between deployments
    sleep 5
done

echo "╔════════════════════════════════════════════════════════════════════╗"
echo "║                                                                    ║"
echo "║              ✅ ALL SERVICES DEPLOYED!                             ║"
echo "║                                                                    ║"
echo "╚════════════════════════════════════════════════════════════════════╝"
echo ""
echo "🔍 Verification Steps:"
echo ""
echo "1. Check deployment status:"
for service in "${services[@]}"; do
    case $service in
        "auth-service")
            echo "   curl https://auth-service-production-d5c8.up.railway.app/health"
            ;;
        "user-service")
            echo "   curl https://user-service-production-f141.up.railway.app/health"
            ;;
        "matching-service")
            echo "   curl https://matching-service-production.up.railway.app/health"
            ;;
        "communication-service")
            echo "   curl https://communication-service-production-c165.up.railway.app/health"
            ;;
        "notification-service")
            echo "   curl https://notification-service-production-8738.up.railway.app/health"
            ;;
    esac
done
echo ""
echo "2. Test CORS:"
echo "   curl -H 'Origin: https://comeondost.web.app' \\"
echo "        -X OPTIONS \\"
echo "        https://matching-service-production.up.railway.app/health -I"
echo ""
echo "3. Test the app:"
echo "   open https://comeondost.web.app"
echo ""
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo "⏱️  Services will be fully ready in 2-3 minutes"
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
