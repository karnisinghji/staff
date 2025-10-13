#!/bin/bash
# force-redeploy.sh - Force clean redeploy of services with CORS issues
# Usage: ./force-redeploy.sh

echo -e "\033[1;34m╔════════════════════════════════════════════════════════════════════╗\033[0m"
echo -e "\033[1;34m║         FORCE CLEAN REDEPLOY - COMMUNICATION & NOTIFICATION        ║\033[0m"
echo -e "\033[1;34m╚════════════════════════════════════════════════════════════════════╝\033[0m"

# Check if Railway CLI is installed
if ! command -v railway &> /dev/null; then
    echo -e "\033[1;31m✗ Railway CLI is not installed. Please install it first.\033[0m"
    echo "   npm install -g @railway/cli"
    exit 1
fi

# Check if Railway is logged in
echo -e "\033[1;33m⚠ Verifying Railway login status...\033[0m"
railway whoami || {
    echo -e "\033[1;31m✗ Railway CLI is not logged in. Please log in first.\033[0m"
    echo "   railway login"
    exit 1
}

# Function to redeploy a service with status tracking
redeploy_service() {
    local service_name=$1
    local service_path="backend/services/$service_name"
    
    echo -e "\n\033[1;36m→ Redeploying $service_name...\033[0m"
    
    # Check if directory exists
    if [ ! -d "$service_path" ]; then
        echo -e "\033[1;31m✗ Service directory not found: $service_path\033[0m"
        return 1
    fi
    
    # Navigate to service directory
    cd "$service_path" || {
        echo -e "\033[1;31m✗ Failed to navigate to service directory\033[0m"
        return 1
    }
    
    # Display current environment variables
    echo -e "\033[1;33m⚠ Checking environment variables before deployment...\033[0m"
    railway variables | grep -i "CORS\\|ALLOWED_ORIGINS" || echo "No CORS variables found"
    
    # Force clean rebuild and deploy
    echo -e "\033[1;36m→ Triggering deployment with clean rebuild...\033[0m"
    railway up --detach --service "$service_name" || {
        echo -e "\033[1;31m✗ Deployment failed for $service_name\033[0m"
        cd - > /dev/null
        return 1
    }
    
    echo -e "\033[1;32m✓ Deployment initiated for $service_name\033[0m"
    cd - > /dev/null
}

# Start from the project root
cd "$(dirname "$0")" || {
    echo -e "\033[1;31m✗ Failed to navigate to script directory\033[0m"
    exit 1
}

# Redeploy Communication Service
redeploy_service "communication-service"

# Redeploy Notification Service
redeploy_service "notification-service"

echo -e "\n\033[1;32m✓ Deployment requests have been submitted\033[0m"
echo -e "\033[1;33m⚠ It may take a few minutes for changes to take effect\033[0m"
echo -e "\033[1;36m→ Check deployment status with: railway status\033[0m"
echo -e "\033[1;36m→ Verify CORS headers with: node test-all-services-cors.js\033[0m"