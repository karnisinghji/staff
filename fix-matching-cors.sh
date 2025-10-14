#!/bin/bash
# Script to fix CORS settings for the matching service on Railway

# Colors for better visibility
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
RED='\033[0;31m'
NC='\033[0m' # No Color

echo -e "${BLUE}=======================================${NC}"
echo -e "${BLUE}🔧 Railway Matching Service CORS Fix 🔧${NC}"
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

# Link to the matching service project
echo -e "${YELLOW}Linking to matching-service project...${NC}"
railway link
echo -e "${GREEN}✅ Project linked${NC}"

# Set CORS environment variables
echo -e "${BLUE}Setting CORS environment variables...${NC}"
railway variables --set "CORS_ORIGINS=https://comeondost.web.app,https://comeondost.firebaseapp.com,http://localhost:5173"
railway variables --set "ALLOWED_ORIGINS=https://comeondost.web.app,https://comeondost.firebaseapp.com,http://localhost:5173"

# Check if variables were set successfully
if [ $? -ne 0 ]; then
    echo -e "${RED}❌ Failed to update CORS variables.${NC}"
    exit 1
fi

echo -e "${GREEN}✅ CORS variables updated successfully${NC}"

# Redeploy the service to apply the changes
echo -e "${BLUE}Redeploying matching service...${NC}"
railway redeploy

if [ $? -ne 0 ]; then
    echo -e "${RED}❌ Failed to redeploy the service.${NC}"
    exit 1
fi

echo -e "${GREEN}✅ Service redeployed successfully${NC}"
echo -e "${YELLOW}Note: It may take a few minutes for the changes to take effect.${NC}"

echo -e "\n${GREEN}🎉 CORS configuration completed!${NC}"
echo -e "${BLUE}Your API should now accept requests from your Firebase frontend.${NC}"