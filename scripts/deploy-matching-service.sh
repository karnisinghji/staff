#!/bin/bash
# Script to deploy just the matching service to Railway

# Colors for better visibility
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

echo -e "${BLUE}=== Deploying matching service to Railway ===${NC}"

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

# Navigate to the matching service directory
cd "$(dirname "$0")/backend/services/matching-service" || exit 1
echo -e "${BLUE}Changed to directory: $(pwd)${NC}"

# Build the service
echo -e "${BLUE}Building matching service...${NC}"
npm run build

if [ $? -ne 0 ]; then
    echo -e "${YELLOW}Build failed. Please fix the errors and try again.${NC}"
    exit 1
fi

# Deploy to Railway
echo -e "${GREEN}Deploying matching service to Railway...${NC}"
railway up --detach

echo -e "${BLUE}=== Matching service deployment initiated ===${NC}"
echo -e "${YELLOW}Note: Deployment may take a few minutes to complete.${NC}"
echo -e "${YELLOW}Check Railway dashboard for deployment status.${NC}"