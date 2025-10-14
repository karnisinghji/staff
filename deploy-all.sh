#!/bin/bash
# Master deployment script for Railway and Firebase

# Colors for better visibility
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
RED='\033[0;31m'
NC='\033[0m' # No Color

echo -e "${BLUE}=====================================${NC}"
echo -e "${BLUE}🚀 Full Deployment Script 🚀${NC}"
echo -e "${BLUE}=====================================${NC}"
echo -e "${YELLOW}This script will deploy your backend services to Railway and your frontend to Firebase.${NC}"
echo -e "${YELLOW}Make sure you have the necessary credentials for both platforms.${NC}"

echo -e "\n${BLUE}Press Enter to begin deployment, or Ctrl+C to cancel.${NC}"
read -p ""

# Make scripts executable
chmod +x deploy-railway-enhanced.sh
chmod +x deploy-firebase-enhanced.sh

# Step 1: Deploy backend to Railway
echo -e "\n${BLUE}Step 1: Deploying backend services to Railway...${NC}"
./deploy-railway-enhanced.sh

if [ $? -ne 0 ]; then
    echo -e "${RED}Railway deployment failed. Stopping deployment process.${NC}"
    exit 1
fi

# Step 2: Deploy frontend to Firebase
echo -e "\n${BLUE}Step 2: Deploying frontend to Firebase...${NC}"
./deploy-firebase-enhanced.sh

if [ $? -ne 0 ]; then
    echo -e "${RED}Firebase deployment failed.${NC}"
    exit 1
fi

echo -e "\n${GREEN}🎉 Full deployment completed successfully!${NC}"
echo -e "${GREEN}Backend services are running on Railway${NC}"
echo -e "${GREEN}Frontend is live at https://comeondost.web.app${NC}"
echo -e "\n${BLUE}Verify that everything is working as expected.${NC}"