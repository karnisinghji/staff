#!/bin/bash

echo "🚀 Manual Railway Deployment Script"
echo "==================================="
echo ""

# Check if Railway CLI is installed
if ! command -v railway &> /dev/null; then
    echo "📦 Installing Railway CLI..."
    npm install -g @railway/cli
fi

echo "🔐 Please run 'railway login' first if you haven't already"
echo ""

# Services to deploy
services=("auth-service" "user-service" "matching-service" "communication-service" "notification-service")

echo "🎯 Deploying 5 services to Railway..."
echo ""

for service in "${services[@]}"; do
    echo "🚀 Deploying $service..."
    cd "backend/services/$service"
    
    # Check if package.json exists
    if [ ! -f "package.json" ]; then
        echo "❌ package.json not found in $service"
        cd ../../..
        continue
    fi
    
    # Install dependencies
    echo "📦 Installing dependencies..."
    npm install
    
    # Build the service (if build script exists)
    if npm run | grep -q "build"; then
        echo "🔨 Building $service..."
        npm run build
    fi
    
    # Deploy to Railway
    echo "🚀 Deploying to Railway..."
    railway up --service "$service"
    
    cd ../../..
    echo "✅ $service deployed!"
    echo ""
done

echo "🎉 All services deployed successfully!"
echo ""
echo "📱 Your backend is now live and ready for mobile apps!"
echo "🌐 Check your Railway dashboard for service URLs"