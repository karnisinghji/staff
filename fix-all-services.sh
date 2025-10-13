#!/bin/bash

# Fix ALL Railway Services: Version + CORS
# This script updates code, builds, and deploys all 5 services

set -e

echo "╔════════════════════════════════════════════════════════════════════╗"
echo "║                                                                    ║"
echo "║         🔧 FIX ALL SERVICES: VERSION + CORS                        ║"
echo "║                                                                    ║"
echo "╚════════════════════════════════════════════════════════════════════╝"
echo ""

cd "/Users/shouryaveersingh/Desktop/old data/staff/backend"

# Services to fix
declare -a services=(
    "user-service"
    "matching-service"
    "communication-service"
    "notification-service"
)

echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo "📦 Step 1: Build shared library"
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
cd services/shared
npm run build
echo "✅ Shared library built"
cd ../..
echo ""

echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo "📦 Step 2: Build all services"
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"

for service in "${services[@]}"; do
    echo "Building $service..."
    cd "services/$service"
    npm run build
    cd ../..
    echo "✅ $service built"
done

echo ""
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo "🚀 Step 3: Deploy all services"
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo ""
echo "⚠️  You will be prompted to select each service"
echo "    Please select the correct service when prompted"
echo ""

for service in "${services[@]}"; do
    echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
    echo "📤 Deploying $service..."
    echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
    
    # Unlink and remove config
    railway unlink --yes 2>/dev/null || true
    rm -f .railway.json
    
    # Link to service
    echo "👉 SELECT: $service (from the list)"
    railway link
    
    # Deploy
    cd "services/$service"
    railway up --detach
    cd ../..
    
    echo "✅ $service deployed"
    echo ""
    sleep 3
done

echo "╔════════════════════════════════════════════════════════════════════╗"
echo "║                                                                    ║"
echo "║              ✅ ALL SERVICES DEPLOYED!                             ║"
echo "║                                                                    ║"
echo "╚════════════════════════════════════════════════════════════════════╝"
echo ""
echo "⏱️  Wait 3-5 minutes for all services to fully restart"
echo ""
echo "Then test with:"
echo "./test-all-services.sh"
