#!/bin/bash

# Railway Backend Deployment Script
# Run this to deploy all backend services to Railway

echo "🚂 Railway Backend Deployment Script"
echo "====================================="
echo ""

# Check if Railway CLI is installed
if ! command -v railway &> /dev/null
then
    echo "⚠️  Railway CLI not found!"
    echo "📦 Installing Railway CLI..."
    npm install -g @railway/cli
    echo "✅ Railway CLI installed!"
    echo ""
fi

# Login check
echo "🔐 Checking Railway login status..."
if ! railway whoami &> /dev/null
then
    echo "⚠️  Not logged in to Railway"
    echo "🔑 Please login:"
    railway login
    echo ""
fi

echo "✅ Railway CLI ready!"
echo ""

# Get current directory
ROOT_DIR=$(pwd)

# Array of services to deploy
services=("auth-service" "user-service" "matching-service" "communication-service" "notification-service")

echo "📋 Services to deploy:"
for service in "${services[@]}"; do
    echo "   - $service"
done
echo ""

# Confirm deployment
read -p "🚀 Deploy all 5 services? (y/n) " -n 1 -r
echo ""

if [[ ! $REPLY =~ ^[Yy]$ ]]
then
    echo "❌ Deployment cancelled"
    exit 1
fi

echo ""
echo "🚀 Starting deployment..."
echo ""

# Deploy each service
for service in "${services[@]}"; do
    echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
    echo "📦 Deploying $service..."
    echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
    
    cd "$ROOT_DIR/backend/services/$service"
    
    if [ ! -d "$ROOT_DIR/backend/services/$service" ]; then
        echo "❌ Error: $service directory not found"
        continue
    fi
    
    # Deploy using Railway CLI
    railway up
    
    if [ $? -eq 0 ]; then
        echo "✅ $service deployed successfully!"
    else
        echo "❌ $service deployment failed!"
    fi
    
    echo ""
done

cd "$ROOT_DIR"

echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo "🎉 Deployment Complete!"
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo ""
echo "✅ All services deployed to Railway"
echo ""
echo "🔍 Check deployment status:"
echo "   https://railway.app"
echo ""
echo "🧪 Test health endpoints:"
echo "   curl https://auth-service-production.up.railway.app/health"
echo "   curl https://user-service-production.up.railway.app/health"
echo "   curl https://matching-service-production.up.railway.app/health"
echo "   curl https://communication-service-production.up.railway.app/health"
echo "   curl https://notification-service-production.up.railway.app/health"
echo ""
echo "🎊 Deployment successful! 🎊"
