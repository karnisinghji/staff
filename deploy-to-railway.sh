#!/bin/bash

# Railway Deployment Script - Deploy All Services with Shared Variables
# This script eliminates the need to manually set environment variables for each service

echo "🚂 Railway.app Deployment Script"
echo "================================="

# Check if Railway CLI is installed
if ! command -v railway &> /dev/null; then
    echo "❌ Railway CLI not found. Installing..."
    npm install -g @railway/cli
fi

echo "✅ Railway CLI ready"

# Login to Railway (if not already logged in)
echo "🔐 Logging into Railway..."
railway login

# Create new project
echo "📁 Creating new Railway project..."
railway init

# Set project name
railway variables set PROJECT_NAME="staff-platform"

echo "🔧 Setting up shared environment variables..."

# Set shared variables that all services will inherit
railway variables set DATABASE_URL="postgresql://neondb_owner:npg_AwN7nqtQOs8P@ep-proud-dew-adi1wdgd-pooler.c-2.us-east-1.aws.neon.tech/neondb?sslmode=require"
railway variables set JWT_SECRET="contractor-worker-platform-super-secret-key-2025"
railway variables set JWT_EXPIRES_IN="24h"
railway variables set JWT_REFRESH_EXPIRES_IN="7d"
railway variables set NODE_ENV="production"
railway variables set CORS_ORIGIN="https://karnisinghji.github.io"
railway variables set ALLOWED_ORIGINS="https://karnisinghji.github.io,http://localhost:5173"

echo "✅ Shared variables configured"

# Deploy each service
echo "🚀 Deploying services..."

echo "📦 Deploying Auth Service..."
cd backend/services/auth-service
railway up --service auth-service
cd ../../..

echo "📦 Deploying User Service..."
cd backend/services/user-service  
railway up --service user-service
cd ../../..

echo "📦 Deploying Matching Service..."
cd backend/services/matching-service
railway up --service matching-service
cd ../../..

echo "📦 Deploying Communication Service..."
cd backend/services/communication-service
railway up --service communication-service
cd ../../..

echo "📦 Deploying Notification Service..."
cd backend/services/notification-service
railway up --service notification-service
cd ../../..

echo "🎉 All services deployed!"
echo ""
echo "📋 Getting service URLs..."
railway status

echo ""
echo "✅ Deployment Complete!"
echo "💰 Cost: ~$5/month for all 5 services"
echo "🚀 No sleeping services - always responsive!"
echo ""
echo "Next steps:"
echo "1. Note down the service URLs from above"
echo "2. Update frontend configuration"
echo "3. Deploy frontend to GitHub Pages"