#!/bin/bash
# Enhanced script to build and deploy the frontend to Firebase

# Colors for better visibility
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
RED='\033[0;31m'
NC='\033[0m' # No Color

echo -e "${BLUE}=======================================${NC}"
echo -e "${BLUE}🔥 Firebase Frontend Deployment v2.0 🔥${NC}"
echo -e "${BLUE}=======================================${NC}"

# Navigate to the frontend directory
cd "$(dirname "$0")/frontend" || {
    echo -e "${RED}Failed to navigate to the frontend directory. Make sure it exists.${NC}"
    exit 1
}
echo -e "${GREEN}✅ Changed to directory: $(pwd)${NC}"

# Check if firebase CLI is installed
if ! command -v firebase &> /dev/null; then
    echo -e "${YELLOW}Firebase CLI not found. Installing...${NC}"
    npm install -g firebase-tools
    
    # Verify installation
    if ! command -v firebase &> /dev/null; then
        echo -e "${RED}Failed to install Firebase CLI. Please install it manually.${NC}"
        exit 1
    fi
fi
echo -e "${GREEN}✅ Firebase CLI ready${NC}"

# Check if logged in to Firebase
firebase projects:list &> /dev/null
if [ $? -ne 0 ]; then
    echo -e "${YELLOW}Please login to Firebase:${NC}"
    firebase login
    
    # Verify login
    firebase projects:list &> /dev/null
    if [ $? -ne 0 ]; then
        echo -e "${RED}Firebase login failed. Please try again.${NC}"
        exit 1
    fi
fi
echo -e "${GREEN}✅ Logged in to Firebase${NC}"

# Ask if user wants to update API endpoints
echo -e "${YELLOW}Do you want to update API endpoints? (y/n)${NC}"
read update_api

if [ "$update_api" == "y" ] || [ "$update_api" == "Y" ]; then
    echo -e "${BLUE}Enter the Railway service URLs from your deployment:${NC}"
    
    echo -e "${YELLOW}Auth Service URL (e.g. https://auth-service-production-xxxx.up.railway.app):${NC}"
    read auth_url
    
    echo -e "${YELLOW}User Service URL (e.g. https://user-service-production-xxxx.up.railway.app):${NC}"
    read user_url
    
    echo -e "${YELLOW}Matching Service URL (e.g. https://matching-service-production-xxxx.up.railway.app):${NC}"
    read matching_url
    
    echo -e "${YELLOW}Communication Service URL (e.g. https://communication-service-production-xxxx.up.railway.app):${NC}"
    read communication_url
    
    echo -e "${YELLOW}Notification Service URL (e.g. https://notification-service-production-xxxx.up.railway.app):${NC}"
    read notification_url
    
    # Update the API configuration file
    echo -e "${BLUE}Updating API configuration...${NC}"
    
    # Create a backup of the original file
    cp src/config/api.ts src/config/api.ts.bak
    
    # Update the configuration file
    cat > src/config/api.ts << EOL
// API Configuration
const isDevelopment = import.meta.env.MODE === 'development';
const isProduction = import.meta.env.MODE === 'production';

// Base API URLs for production and development
export const API_CONFIG = {
    AUTH_SERVICE: isProduction
        ? '${auth_url}/api/auth'
        : 'http://localhost:3001/api/auth',

    USER_SERVICE: isProduction
        ? '${user_url}'
        : 'http://localhost:3002',

    MATCHING_SERVICE: isProduction
        ? '${matching_url}'
        : 'http://localhost:3003',

    COMMUNICATION_SERVICE: isProduction
        ? '${communication_url}'
        : 'http://localhost:3004',

    NOTIFICATION_SERVICE: isProduction
        ? '${notification_url}'
        : 'http://localhost:3005'
};

// WebSocket URLs for real-time features
export const WS_CONFIG = {
    COMMUNICATION: isProduction
        ? import.meta.env.VITE_WS_COMMUNICATION_URL || 'wss://${communication_url#https://}/ws'
        : 'ws://localhost:3004/ws',

    NOTIFICATION: isProduction
        ? import.meta.env.VITE_WS_NOTIFICATION_URL || 'wss://${notification_url#https://}/ws'
        : 'ws://localhost:3005/ws'
};

// Demo mode - set to false to use real backend
// Demo mode removed. All API calls use real backend endpoints.
console.log('API Config:', { isDevelopment, isProduction, API_CONFIG });
EOL
    
    echo -e "${GREEN}✅ API configuration updated${NC}"
fi

# Install dependencies
echo -e "${BLUE}Installing dependencies...${NC}"
npm install

if [ $? -ne 0 ]; then
    echo -e "${RED}Failed to install dependencies. Please check for errors.${NC}"
    exit 1
fi
echo -e "${GREEN}✅ Dependencies installed${NC}"

# Create Firebase environment variables file
echo -e "${BLUE}Creating Firebase environment variables...${NC}"
cat > .env.production << EOL
VITE_ENV=production
EOL

# Build the frontend
echo -e "${BLUE}Building frontend...${NC}"
npm run build

if [ $? -ne 0 ]; then
    echo -e "${RED}Build failed. Please fix the errors and try again.${NC}"
    exit 1
fi
echo -e "${GREEN}✅ Frontend built successfully${NC}"

# Go back to the root directory where firebase.json is located
cd ..

# Check if firebase.json exists
if [ ! -f "firebase.json" ]; then
    echo -e "${RED}firebase.json not found. Please set up Firebase hosting first.${NC}"
    echo -e "${YELLOW}You can run 'firebase init hosting' to set up Firebase hosting.${NC}"
    exit 1
fi

# Deploy to Firebase
echo -e "${BLUE}Deploying to Firebase...${NC}"
firebase deploy --only hosting

if [ $? -ne 0 ]; then
    echo -e "${RED}Deployment failed. Please check for errors.${NC}"
    exit 1
fi

echo -e "\n${GREEN}🎉 Frontend deployment completed!${NC}"
echo -e "${BLUE}Your app is now live at: ${YELLOW}https://comeondost.web.app${NC}"

# Check Firebase analytics
echo -e "\n${BLUE}Want to check your deployment status and analytics? Run:${NC}"
echo -e "${YELLOW}firebase hosting:channel:open${NC}"