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
    
    # Build the service
    npm run build
    
    # Deploy to Railway
    railway up --service "$service"
    
    cd ../../..
    echo "✅ $service deployed!"
    echo ""
done

echo "🎉 All services deployed successfully!"
echo ""
echo "📱 Your backend is now live and ready for mobile apps!"
echo "🌐 Check your Railway dashboard for service URLs"