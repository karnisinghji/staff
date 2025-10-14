#!/bin/bash
# Script to redeploy specific Railway services

# Colors for better visibility
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
RED='\033[0;31m'
NC='\033[0m' # No Color

echo -e "${BLUE}=======================================${NC}"
echo -e "${BLUE}🚂 Railway Service Redeployment 🚂${NC}"
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

# Function to redeploy a service by linking to its project
redeploy_service() {
    local service=$1
    local project_name=$2
    
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
    
    # Link to the project and redeploy
    echo -e "${GREEN}Linking to ${project_name} and deploying...${NC}"
    railway link
    
    # Upload and deploy
    railway up --detach
    
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

# Redeploy auth-service
echo -e "\n${YELLOW}========== Processing auth-service ==========${NC}"
echo -e "${YELLOW}Please select 'auth-service' project when prompted${NC}"
redeploy_service "auth-service" "auth-service"
auth_status=$?

# Redeploy user-service
echo -e "\n${YELLOW}========== Processing user-service ==========${NC}"
echo -e "${YELLOW}Please select 'user-service' project when prompted${NC}"
redeploy_service "user-service" "user-service"
user_status=$?

# Show deployment summary
echo -e "\n${BLUE}==============================${NC}"
echo -e "${BLUE}🔍 DEPLOYMENT SUMMARY${NC}"
echo -e "${BLUE}==============================${NC}"

if [ $auth_status -eq 0 ]; then
    echo -e "${GREEN}✅ auth-service redeployed successfully${NC}"
else
    echo -e "${RED}❌ auth-service deployment failed${NC}"
fi

if [ $user_status -eq 0 ]; then
    echo -e "${GREEN}✅ user-service redeployed successfully${NC}"
else
    echo -e "${RED}❌ user-service deployment failed${NC}"
fi

echo -e "\n${GREEN}✅ Redeployment process complete!${NC}"
echo -e "${YELLOW}Note: Deployments may take a few minutes to become active${NC}"