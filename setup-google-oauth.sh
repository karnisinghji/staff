#!/bin/bash

# 🔐 Google OAuth Setup Script for Railway
# Run this script after you have your Google OAuth credentials

echo "🔐 Google OAuth Setup for Railway Auth Service"
echo "=============================================="
echo ""

# Check if Railway CLI is installed
if ! command -v railway &> /dev/null; then
    echo "❌ Railway CLI not found!"
    echo "Install it with: npm install -g @railway/cli"
    exit 1
fi

echo "✅ Railway CLI found"
echo ""

# Prompt for Google OAuth credentials
echo "📝 Please provide your Google OAuth credentials:"
echo "(Get these from: https://console.cloud.google.com/apis/credentials)"
echo ""

read -p "Enter GOOGLE_CLIENT_ID: " GOOGLE_CLIENT_ID
read -sp "Enter GOOGLE_CLIENT_SECRET: " GOOGLE_CLIENT_SECRET
echo ""
echo ""

# Validate inputs
if [ -z "$GOOGLE_CLIENT_ID" ] || [ -z "$GOOGLE_CLIENT_SECRET" ]; then
    echo "❌ Client ID and Secret cannot be empty!"
    exit 1
fi

echo "📍 Setting up environment variables..."
echo ""

# Navigate to auth service directory
cd "$(dirname "$0")/backend/services/auth-service" || exit 1

# Login to Railway (if not already logged in)
echo "🔑 Logging into Railway..."
railway login

# Link to the project
echo "🔗 Linking to auth-service project..."
railway link

# Set environment variables
echo "⚙️  Setting GOOGLE_CLIENT_ID..."
railway variables set GOOGLE_CLIENT_ID="$GOOGLE_CLIENT_ID"

echo "⚙️  Setting GOOGLE_CLIENT_SECRET..."
railway variables set GOOGLE_CLIENT_SECRET="$GOOGLE_CLIENT_SECRET"

echo "⚙️  Setting GOOGLE_CALLBACK_URL..."
railway variables set GOOGLE_CALLBACK_URL="https://auth-service-production-d5c8.up.railway.app/api/auth/google/callback"

echo "⚙️  Setting FRONTEND_URL..."
railway variables set FRONTEND_URL="https://comeondost.netlify.app"

echo ""
echo "✅ Environment variables set successfully!"
echo ""

# Show all variables
echo "📋 Current environment variables:"
railway variables | grep -E "GOOGLE|FRONTEND"

echo ""
echo "🚀 Redeploying auth service..."
railway up --detach

echo ""
echo "✅ Setup complete!"
echo ""
echo "⏱️  Wait ~30 seconds for deployment to complete, then test:"
echo ""
echo "1. Visit: https://comeondost.netlify.app"
echo "2. Click 'Register'"
echo "3. Click 'Continue with Google' button"
echo "4. Sign in with your Google account"
echo ""
echo "🎉 You should be redirected back and logged in!"
