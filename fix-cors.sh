#!/bin/bash
# Script to fix CORS settings on Railway deploy    # Set CORS environment variables
    echo -e "${GREEN}Setting CORS environment variables for ${service}...${NC}"
    railway variables --set "CORS_ORIGINS=https://comeondost.web.app,https://comeondost.firebaseapp.com,http://localhost:5173"
    railway variables --set "ALLOWED_ORIGINS=https://comeondost.web.app,https://comeondost.firebaseapp.com,http://localhost:5173"
    
    if [ $? -ne 0 ]; then
        echo -e "${RED}❌ Failed to update CORS variables for ${service}.${NC}"
        return 1
    }es

# Colors for better visibility
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
RED='\033[0;31m'
NC='\033[0m' # No Color

echo -e "${BLUE}=======================================${NC}"
echo -e "${BLUE}🔧 Railway CORS Configuration Fix 🔧${NC}"
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

# Array of services to update
SERVICES=("auth-service" "user-service" "matching-service" "communication-service" "notification-service")

# Function to update CORS settings for a service
update_cors_for_service() {
    local service=$1
    echo -e "\n${BLUE}📝 Updating CORS for ${service}...${NC}"
    
    # Link to the service project
    echo -e "${YELLOW}Linking to ${service} project...${NC}"
    railway link --service "$service"
    
    if [ $? -ne 0 ]; then
        echo -e "${YELLOW}Please select the ${service} project:${NC}"
        railway link
    fi
    
    # Set CORS environment variables
    echo -e "${GREEN}Setting CORS environment variables for ${service}...${NC}"
    railway variables set CORS_ORIGINS="https://comeondost.web.app,https://comeondost.firebaseapp.com,http://localhost:5173"
    railway variables set ALLOWED_ORIGINS="https://comeondost.web.app,https://comeondost.firebaseapp.com,http://localhost:5173"
    
    if [ $? -ne 0 ]; then
        echo -e "${RED}❌ Failed to update CORS variables for ${service}.${NC}"
        return 1
    fi
    
    echo -e "${GREEN}✅ CORS variables updated for ${service}${NC}"
    return 0
}

# Update CORS settings for all services
echo -e "${BLUE}🔄 Updating CORS settings for all services...${NC}"

updated_count=0
failed_count=0
failed_services=""

for service in "${SERVICES[@]}"; do
    update_cors_for_service "$service"
    if [ $? -eq 0 ]; then
        ((updated_count++))
    else
        ((failed_count++))
        failed_services="$failed_services $service"
    fi
done

# Show update summary
echo -e "\n${BLUE}==============================${NC}"
echo -e "${BLUE}🔍 CORS UPDATE SUMMARY${NC}"
echo -e "${BLUE}==============================${NC}"
echo -e "${GREEN}✅ Successfully updated CORS for: ${updated_count} services${NC}"

if [ $failed_count -gt 0 ]; then
    echo -e "${RED}❌ Failed to update CORS for: ${failed_count} services (${failed_services})${NC}"
fi

echo -e "\n${GREEN}✅ CORS configuration update complete!${NC}"
echo -e "${YELLOW}Note: Services will restart automatically with the new CORS settings${NC}"