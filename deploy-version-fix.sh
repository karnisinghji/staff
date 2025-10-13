#!/bin/bash

# Script to add version helper to all services and rebuild

echo "╔════════════════════════════════════════════════════════════════════╗"
echo "║                                                                    ║"
echo "║         🔧 ADDING VERSION HELPERS TO ALL SERVICES                  ║"
echo "║                                                                    ║"
echo "╚════════════════════════════════════════════════════════════════════╝"
echo ""

cd "/Users/shouryaveersingh/Desktop/old data/staff/backend"

# Build shared library first
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo "📦 Building shared library..."
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
cd services/shared
npm run build
echo "✅ Shared library built"
echo ""

# Build and deploy auth-service
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo "🚀 Building and deploying auth-service..."
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
cd ../auth-service
npm run build
railway link --project auth-service --environment production
railway up --detach
echo "✅ Auth service deployed"
echo ""

echo "╔════════════════════════════════════════════════════════════════════╗"
echo "║                                                                    ║"
echo "║              ✅ VERSION FIX DEPLOYED                               ║"
echo "║                                                                    ║"
echo "╚════════════════════════════════════════════════════════════════════╝"
