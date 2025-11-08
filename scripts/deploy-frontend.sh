#!/bin/bash
# Script to build and deploy the frontend to Firebase

# Colors for better visibility
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

echo -e "${BLUE}=== Starting frontend build and Firebase deployment ===${NC}"

# Navigate to the frontend directory
cd "$(dirname "$0")/frontend" || exit 1
echo -e "${BLUE}Changed to directory: $(pwd)${NC}"

# Check if firebase CLI is installed
if ! command -v firebase &> /dev/null; then
    echo -e "${YELLOW}Firebase CLI not found. Installing...${NC}"
    npm install -g firebase-tools
fi

# Check if logged in to Firebase
firebase projects:list &> /dev/null
if [ $? -ne 0 ]; then
    echo -e "${YELLOW}Please login to Firebase:${NC}"
    firebase login
fi

# Install dependencies if needed
echo -e "${YELLOW}Checking for dependencies...${NC}"
npm install

# Build the frontend
echo -e "${GREEN}Building frontend...${NC}"
npm run build

if [ $? -ne 0 ]; then
    echo -e "${YELLOW}Build failed. Please fix the errors and try again.${NC}"
    exit 1
fi

# Go back to the root directory where firebase.json is located
cd ..

# Deploy to Firebase
echo -e "${GREEN}Deploying to Firebase...${NC}"
firebase deploy --only hosting

echo -e "${BLUE}=== Frontend deployment completed ===${NC}"
echo -e "${YELLOW}Your app is now live at https://comeondost.web.app${NC}"