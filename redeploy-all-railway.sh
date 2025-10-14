#!/bin/bash
# Simple script to redeploy all Railway services with updated code

# Colors for better visibility
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
RED='\033[0;31m'
NC='\033[0m' # No Color

# Array of services to redeploy
SERVICES=("auth-service" "user-service" "matching-service" "communication-service" "notification-service")

echo -e "${BLUE}=======================================${NC}"
echo -e "${BLUE}🚂 Railway Redeploy All Services 🚂${NC}"
echo -e "${BLUE}=======================================${NC}"

# Check if Railway CLI is installed
if ! command -v railway &> /dev/null; then
    echo -e "${RED}❌ Railway CLI not found. Please install it first.${NC}"
    exit 1
fi
echo -e "${GREEN}✅ Railway CLI ready${NC}"

# Check if logged in to Railway
railway whoami &> /dev/null
if [ $? -ne 0 ]; then
    echo -e "${RED}❌ Not logged in to Railway. Please run: railway login${NC}"
    exit 1
fi
echo -e "${GREEN}✅ Logged in to Railway${NC}"

# Function to redeploy a service
redeploy_service() {
    local service=$1
    echo -e "\n${BLUE}📦 Redeploying ${service}...${NC}"
    
    # Navigate to service directory
    cd "$(dirname "$0")/backend/services/${service}" || {
        echo -e "${RED}Failed to navigate to ${service} directory${NC}"
        return 1
    }
    
    # Build the service
    echo -e "${YELLOW}Building ${service}...${NC}"
    npm run build
    
    if [ $? -ne 0 ]; then
        echo -e "${RED}❌ ${service} build failed. Skipping deployment.${NC}"
        cd ../../../
        return 1
    fi
    
    # Link to the service and redeploy
    echo -e "${GREEN}Deploying ${service} to Railway...${NC}"
    railway link
    railway up --service "$service" --detach
    
    # Check deployment status
    if [ $? -ne 0 ]; then
        echo -e "${RED}❌ ${service} deployment failed.${NC}"
        cd ../../../
        return 1
    fi
    
    echo -e "${GREEN}✅ ${service} redeployed successfully${NC}"
    cd ../../../
    return 0
}

# Redeploy all services
echo -e "${BLUE}🚀 Redeploying all services...${NC}"

deployed_count=0
failed_count=0
failed_services=""

for service in "${SERVICES[@]}"; do
    echo -e "\n${YELLOW}========== Processing ${service} ==========${NC}"
    redeploy_service "$service"
    if [ $? -eq 0 ]; then
        ((deployed_count++))
    else
        ((failed_count++))
        failed_services="$failed_services $service"
    fi
done

# Show deployment summary
echo -e "\n${BLUE}==============================${NC}"
echo -e "${BLUE}🔍 DEPLOYMENT SUMMARY${NC}"
echo -e "${BLUE}==============================${NC}"
echo -e "${GREEN}✅ Successfully redeployed: ${deployed_count} services${NC}"

if [ $failed_count -gt 0 ]; then
    echo -e "${RED}❌ Failed to redeploy: ${failed_count} services (${failed_services})${NC}"
fi

echo -e "\n${GREEN}✅ Redeployment process complete!${NC}"
echo -e "${YELLOW}Note: Deployments may take a few minutes to become active${NC}"
echo -e "${YELLOW}Check Railway dashboard for deployment status: https://railway.app${NC}"