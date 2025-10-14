#!/bin/bash
# Script to add new environment variables to Railway services
# Run this script to add the required environment variables for the bug fixes

set -e

echo "🚀 Adding Environment Variables to Railway Services"
echo "=================================================="
echo ""

# Check if railway CLI is logged in
if ! railway whoami &> /dev/null; then
    echo "❌ Not logged in to Railway. Please run: railway login"
    exit 1
fi

echo "✅ Railway CLI authenticated"
echo ""

# Function to add env var to a service
add_env_var() {
    local service_name=$1
    local var_name=$2
    local var_value=$3
    
    echo "Adding $var_name=$var_value to $service_name..."
    railway variables --service "$service_name" set "$var_name=$var_value" || echo "  ⚠️  Already exists or error"
}

# Add to Matching Service
echo "📦 Updating Matching Service..."
railway link --service matching-service
add_env_var "matching-service" "MIN_MATCH_SCORE" "0"
add_env_var "matching-service" "NODE_ENV" "production"
echo ""

# Add to Auth Service
echo "🔐 Updating Auth Service..."
railway link --service auth-service
add_env_var "auth-service" "BCRYPT_ROUNDS" "12"
add_env_var "auth-service" "NODE_ENV" "production"
echo ""

# Add to all other services for consistency
echo "🔧 Updating other services with NODE_ENV..."
for service in user-service communication-service notification-service; do
    echo "  - $service"
    railway link --service "$service"
    add_env_var "$service" "NODE_ENV" "production"
done

echo ""
echo "✅ Environment variables added successfully!"
echo ""
echo "📋 Summary of changes:"
echo "  - matching-service: MIN_MATCH_SCORE=0, NODE_ENV=production"
echo "  - auth-service: BCRYPT_ROUNDS=12, NODE_ENV=production"
echo "  - All services: NODE_ENV=production"
echo ""
echo "⚠️  Note: Services will automatically restart with new variables"
echo "🔄 You can verify with: railway variables --service <service-name>"
