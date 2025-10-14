#!/bin/bash
# Script to update frontend API configuration with Railway URLs and redeploy

# Colors for better visibility
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
RED='\033[0;31m'
NC='\033[0m' # No Color

echo -e "${BLUE}=======================================${NC}"
echo -e "${BLUE}🔧 Frontend API Config Update 🔧${NC}"
echo -e "${BLUE}=======================================${NC}"

# Railway service URLs (update these if they change)
AUTH_SERVICE="https://auth-service-production-d5c8.up.railway.app"
USER_SERVICE="https://user-service-production-f141.up.railway.app"
MATCHING_SERVICE="https://matching-service-production.up.railway.app"
COMMUNICATION_SERVICE="https://communication-service-production-c165.up.railway.app"
NOTIFICATION_SERVICE="https://notification-service-production-8738.up.railway.app"

echo -e "${BLUE}Updating frontend API configuration...${NC}"

# Backup the original file
cp frontend/src/config/api.ts frontend/src/config/api.ts.backup

# Create new API configuration
cat > frontend/src/config/api.ts << EOL
// API Configuration
const isDevelopment = import.meta.env.MODE === 'development';
const isProduction = import.meta.env.MODE === 'production';

// Base API URLs for production and development
export const API_CONFIG = {
    AUTH_SERVICE: isProduction
        ? '${AUTH_SERVICE}/api/auth'
        : 'http://localhost:3001/api/auth',

    USER_SERVICE: isProduction
        ? '${USER_SERVICE}'
        : 'http://localhost:3002',

    MATCHING_SERVICE: isProduction
        ? '${MATCHING_SERVICE}'
        : 'http://localhost:3003',

    COMMUNICATION_SERVICE: isProduction
        ? '${COMMUNICATION_SERVICE}'
        : 'http://localhost:3004',

    NOTIFICATION_SERVICE: isProduction
        ? '${NOTIFICATION_SERVICE}'
        : 'http://localhost:3005'
};

// WebSocket URLs for real-time features
export const WS_CONFIG = {
    COMMUNICATION: isProduction
        ? 'wss://communication-service-production-c165.up.railway.app/ws'
        : 'ws://localhost:3004/ws',

    NOTIFICATION: isProduction
        ? 'wss://notification-service-production-8738.up.railway.app/ws'
        : 'ws://localhost:3005/ws'
};

// Demo mode - set to false to use real backend
// Demo mode removed. All API calls use real backend endpoints.
console.log('API Config:', { isDevelopment, isProduction, API_CONFIG });
EOL

echo -e "${GREEN}✅ API configuration updated${NC}"

# Navigate to frontend directory
cd frontend

echo -e "${BLUE}Installing dependencies...${NC}"
npm install

echo -e "${BLUE}Building frontend...${NC}"
npm run build

if [ $? -ne 0 ]; then
    echo -e "${RED}❌ Build failed${NC}"
    exit 1
fi

echo -e "${GREEN}✅ Frontend built successfully${NC}"

# Navigate back to root
cd ..

echo -e "${BLUE}Deploying to Firebase...${NC}"
firebase deploy --only hosting

if [ $? -ne 0 ]; then
    echo -e "${RED}❌ Firebase deployment failed${NC}"
    exit 1
fi

echo -e "\n${GREEN}🎉 Frontend deployment completed successfully!${NC}"
echo -e "${BLUE}Your app is live at: ${YELLOW}https://comeondost.web.app${NC}"
echo -e "\n${YELLOW}Railway Service URLs configured:${NC}"
echo -e "  - Auth: ${AUTH_SERVICE}"
echo -e "  - User: ${USER_SERVICE}"
echo -e "  - Matching: ${MATCHING_SERVICE}"
echo -e "  - Communication: ${COMMUNICATION_SERVICE}"
echo -e "  - Notification: ${NOTIFICATION_SERVICE}"