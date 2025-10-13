#!/bin/bash

# Script to set ALLOWED_ORIGINS (not CORS_ORIGINS) on all Railway services
# The services use ALLOWED_ORIGINS in their code!

echo "╔════════════════════════════════════════════════════════════════════╗"
echo "║                                                                    ║"
echo "║         🔧 FIXING CORS - SETTING ALLOWED_ORIGINS                   ║"
echo "║                                                                    ║"
echo "╚════════════════════════════════════════════════════════════════════╝"
echo ""

ORIGINS="https://comeondost.web.app,http://localhost:5173"

cd "/Users/shouryaveersingh/Desktop/old data/staff/backend"

echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo "1️⃣  Updating user-service..."
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
railway unlink --yes 2>/dev/null
railway link --project user-service --environment production
railway variables --set ALLOWED_ORIGINS="$ORIGINS"
echo "✅ user-service updated"
echo ""

echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo "2️⃣  Updating matching-service..."
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
railway unlink --yes 2>/dev/null
railway link --project matching-service --environment production
railway variables --set ALLOWED_ORIGINS="$ORIGINS"
echo "✅ matching-service updated"
echo ""

echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo "3️⃣  Updating communication-service..."
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
railway unlink --yes 2>/dev/null
railway link --project communication-service --environment production
railway variables --set ALLOWED_ORIGINS="$ORIGINS"
echo "✅ communication-service updated"
echo ""

echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo "4️⃣  Updating notification-service..."
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
railway unlink --yes 2>/dev/null
railway link --project notification-service --environment production
railway variables --set ALLOWED_ORIGINS="$ORIGINS"
echo "✅ notification-service updated"
echo ""

echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo "5️⃣  Updating auth-service..."
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
railway unlink --yes 2>/dev/null
railway link --project auth-service --environment production
railway variables --set ALLOWED_ORIGINS="$ORIGINS"
echo "✅ auth-service updated"
echo ""

echo "╔════════════════════════════════════════════════════════════════════╗"
echo "║                                                                    ║"
echo "║              ✅ ALL SERVICES UPDATED!                              ║"
echo "║                                                                    ║"
echo "║  Services will automatically restart with new CORS settings        ║"
echo "║  Wait 1-2 minutes, then test at: https://comeondost.web.app       ║"
echo "║                                                                    ║"
echo "╚════════════════════════════════════════════════════════════════════╝"
