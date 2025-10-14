#!/bin/bash
# Enhanced script to deploy backend services to Railway with proper error handling and status reporting

# Colors for better visibility
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
RED='\033[0;31m'
NC='\033[0m' # No Color

# Array of services to deploy
SERVICES=("auth-service" "user-service" "matching-service" "communication-service" "notification-service")

echo -e "${BLUE}=======================================${NC}"
echo -e "${BLUE}🚂 Railway.app Deployment Script v2.0 🚂${NC}"
echo -e "${BLUE}=======================================${NC}"

# Check if Railway CLI is installed
if ! command -v railway &> /dev/null; then
    echo -e "${YELLOW}❌ Railway CLI not found. Installing...${NC}"
    npm install -g @railway/cli
    
    # Check if installation succeeded
    if ! command -v railway &> /dev/null; then
        echo -e "${RED}Failed to install Railway CLI. Please install it manually.${NC}"
        exit 1
    fi
fi
echo -e "${GREEN}✅ Railway CLI ready${NC}"

# Check if logged in to Railway
railway whoami &> /dev/null
if [ $? -ne 0 ]; then
    echo -e "${YELLOW}🔐 Please login to Railway:${NC}"
    railway login
    
    # Check if login succeeded
    railway whoami &> /dev/null
    if [ $? -ne 0 ]; then
        echo -e "${RED}Railway login failed. Please try again.${NC}"
        exit 1
    fi
fi
echo -e "${GREEN}✅ Logged in to Railway${NC}"

# Create or link project
echo -e "${YELLOW}Do you want to create a new Railway project or use an existing one? (new/existing)${NC}"
read project_choice

if [ "$project_choice" == "new" ]; then
    echo -e "${BLUE}📁 Creating new Railway project...${NC}"
    railway init
    
    # Set project name
    echo -e "${YELLOW}Setting project name...${NC}"
    railway variables set PROJECT_NAME="staff-platform-$(date +%Y%m%d)"
    
    # Set shared environment variables
    echo -e "${BLUE}🔧 Setting up shared environment variables...${NC}"
    
    # Ask for database connection string
    echo -e "${YELLOW}Enter your PostgreSQL Database URL:${NC}"
    read -s database_url
    
    # Generate a secure JWT secret if not provided
    echo -e "${YELLOW}Enter your JWT Secret (leave blank to generate one):${NC}"
    read -s jwt_secret
    
    if [ -z "$jwt_secret" ]; then
        jwt_secret=$(openssl rand -hex 32)
        echo -e "${GREEN}Generated JWT Secret: $jwt_secret${NC}"
    fi
    
    # Set shared variables that all services will inherit
    railway variables set DATABASE_URL="$database_url"
    railway variables set JWT_SECRET="$jwt_secret"
    railway variables set JWT_EXPIRES_IN="24h"
    railway variables set JWT_REFRESH_EXPIRES_IN="7d"
    railway variables set NODE_ENV="production"
    railway variables set CORS_ORIGIN="https://comeondost.web.app"
    railway variables set ALLOWED_ORIGINS="https://comeondost.web.app,http://localhost:5173"
    
    echo -e "${GREEN}✅ Shared variables configured${NC}"
elif [ "$project_choice" == "existing" ]; then
    echo -e "${YELLOW}Linking to existing project...${NC}"
    railway link
else
    echo -e "${RED}Invalid choice. Exiting.${NC}"
    exit 1
fi

# Function to deploy a service
deploy_service() {
    local service=$1
    echo -e "\n${BLUE}📦 Deploying ${service}...${NC}"
    
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
    
    # Deploy to Railway
    echo -e "${GREEN}Deploying ${service} to Railway...${NC}"
    railway up --service "$service" --detach
    
    # Check deployment status
    if [ $? -ne 0 ]; then
        echo -e "${RED}❌ ${service} deployment failed.${NC}"
        cd ../../../
        return 1
    fi
    
    echo -e "${GREEN}✅ ${service} deployment initiated${NC}"
    cd ../../../
    return 0
}

# Deploy all services
echo -e "${BLUE}🚀 Deploying services...${NC}"

deployed_count=0
failed_count=0
failed_services=""

for service in "${SERVICES[@]}"; do
    deploy_service "$service"
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
echo -e "${GREEN}✅ Successfully deployed: ${deployed_count} services${NC}"

if [ $failed_count -gt 0 ]; then
    echo -e "${RED}❌ Failed to deploy: ${failed_count} services (${failed_services})${NC}"
fi

# Get service URLs
echo -e "\n${BLUE}📋 Getting service URLs...${NC}"
railway status

# Update frontend configuration
echo -e "\n${BLUE}📝 To update your frontend configuration:${NC}"
echo -e "${YELLOW}1. Update the API_CONFIG in frontend/src/config/api.ts with the new service URLs${NC}"
echo -e "${YELLOW}2. Build and deploy the frontend with: ./deploy-frontend.sh${NC}"

echo -e "\n${GREEN}✅ Deployment process complete!${NC}"
echo -e "${YELLOW}Note: Deployments may take a few minutes to become active${NC}"