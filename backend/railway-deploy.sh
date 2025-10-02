#!/bin/bash

# Railway Deployment Helper Script
# This script helps you deploy all services to Railway

echo "🚀 Railway Deployment Helper for Contractor-Worker Platform"
echo "============================================================"

echo ""
echo "📋 Pre-deployment Checklist:"
echo "✅ 1. Neon database created and schema deployed"
echo "✅ 2. Railway account created"
echo "✅ 3. GitHub repository pushed"
echo ""

echo "🎯 Services to Deploy:"
echo "1. auth-service (Authentication & JWT)"
echo "2. user-service (User profiles & management)"
echo "3. matching-service (Worker-contractor matching)"
echo "4. communication-service (Messages & contacts)"
echo "5. notification-service (Push notifications)"
echo ""

echo "📝 Required Environment Variables:"
echo ""
echo "For ALL services:"
echo "- NODE_ENV=production"
echo "- PORT=(Railway will auto-assign)"
echo "- DATABASE_URL=(your Neon connection string)"
echo ""
echo "For auth-service additionally:"
echo "- JWT_SECRET=(generate a secure random string)"
echo "- JWT_EXPIRES_IN=24h"
echo ""
echo "For matching-service additionally:"
echo "- MAX_MATCHING_DISTANCE_KM=50"
echo "- DEFAULT_SEARCH_RADIUS_KM=25"
echo ""

echo "🔗 Deployment Order (recommended):"
echo "1. Start with auth-service (other services may depend on it)"
echo "2. Deploy user-service"
echo "3. Deploy matching-service"
echo "4. Deploy communication-service"
echo "5. Deploy notification-service"
echo ""

echo "📱 Mobile-Ready Features:"
echo "✅ HTTPS endpoints for secure mobile connections"
echo "✅ CORS configured for cross-origin requests"
echo "✅ JWT authentication for secure API access"
echo "✅ RESTful APIs optimized for mobile bandwidth"
echo "✅ Real-time capabilities for notifications"
echo ""

echo "🎉 After deployment, you'll have:"
echo "- 5 microservices running on Railway"
echo "- Automatic HTTPS and SSL"
echo "- Auto-deployment from GitHub"
echo "- Production-ready scalable backend"
echo ""

echo "Ready to deploy? Go to https://railway.app and start with auth-service!"
echo "Follow the detailed guide in RAILWAY_DEPLOYMENT.md"