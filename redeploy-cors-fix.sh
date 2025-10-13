#!/bin/bash

# Quick redeploy script for services with CORS fixes
# Only redeploys matching-service and user-service (already built)

set -e

echo "╔════════════════════════════════════════════════════════════════════╗"
echo "║                                                                    ║"
echo "║         🔧 REDEPLOY SERVICES WITH CORS FIX                         ║"
echo "║                                                                    ║"
echo "╚════════════════════════════════════════════════════════════════════╝"
echo ""

cd "/Users/shouryaveersingh/Desktop/old data/staff/backend"

echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo "1️⃣  Deploying matching-service..."
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"

# Remove railway config
rm -f .railway.json

# Link to matching-service (will prompt for selection)
echo "Please select: matching-service"
railway link

# Deploy
cd services/matching-service
railway up --detach
cd ../..

echo "✅ matching-service deployed"
echo ""
sleep 5

echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo "2️⃣  Deploying user-service..."
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"

# Unlink and remove config
railway unlink --yes 2>/dev/null || true
rm -f .railway.json

# Link to user-service
echo "Please select: user-service"
railway link

# Deploy
cd services/user-service
railway up --detach
cd ../..

echo "✅ user-service deployed"
echo ""

echo "╔════════════════════════════════════════════════════════════════════╗"
echo "║                                                                    ║"
echo "║              ✅ DEPLOYMENTS COMPLETE!                              ║"
echo "║                                                                    ║"
echo "║  Wait 2-3 minutes for services to restart with new CORS settings  ║"
echo "║                                                                    ║"
echo "╚════════════════════════════════════════════════════════════════════╝"
echo ""
echo "🧪 Test after 2-3 minutes:"
echo ""
echo "curl -H 'Origin: https://comeondost.web.app' \\"
echo "     -X OPTIONS \\"
echo "     https://matching-service-production.up.railway.app/health -v 2>&1 | grep 'access-control-allow-origin'"
echo ""
echo "Expected: access-control-allow-origin: https://comeondost.web.app"
echo ""
