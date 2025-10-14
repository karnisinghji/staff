#!/bin/bash
# Script to redeploy all backend services to Railway

# Colors for better visibility
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

echo -e "${BLUE}=== Starting redeployment of all backend services ===${NC}"

# Array of services to redeploy
SERVICES=("auth-service" "user-service" "matching-service" "communication-service" "notification-service")

# Check if railway CLI is installed
if ! command -v railway &> /dev/null; then
    echo -e "${YELLOW}Railway CLI not found. Installing...${NC}"
    npm install -g @railway/cli
fi

# Check if logged in to Railway
railway whoami &> /dev/null
if [ $? -ne 0 ]; then
    echo -e "${YELLOW}Please login to Railway:${NC}"
    railway login
fi

# Navigate to the backend directory
cd "$(dirname "$0")/backend" || exit 1
echo -e "${BLUE}Changed to directory: $(pwd)${NC}"

# Build all services first
echo -e "${BLUE}Building all services...${NC}"
npm run build:all

# Deploy each service
for service in "${SERVICES[@]}"; do
    echo -e "${YELLOW}Deploying ${service}...${NC}"
    cd "services/${service}" || continue
    
    echo -e "${GREEN}Running railway up for ${service}${NC}"
    railway up --detach
    
    echo -e "${GREEN}✓ ${service} deployment initiated${NC}"
    cd ../.. || exit 1
done

echo -e "${BLUE}=== All services redeployment initiated ===${NC}"
echo -e "${YELLOW}Note: Deployments may take a few minutes to complete.${NC}"
echo -e "${YELLOW}Check Railway dashboard for deployment status.${NC}"