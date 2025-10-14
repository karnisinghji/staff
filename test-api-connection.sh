#!/bin/bash
# Script to test API connectivity

# Colors for better visibility
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
RED='\033[0;31m'
NC='\033[0m' # No Color

echo -e "${BLUE}=======================================${NC}"
echo -e "${BLUE}🔍 API Connection Test 🔍${NC}"
echo -e "${BLUE}=======================================${NC}"

# Check if curl is installed
if ! command -v curl &> /dev/null; then
    echo -e "${RED}❌ curl is not installed. Please install it to run this test.${NC}"
    exit 1
fi

# Define API endpoints
AUTH_SERVICE="https://auth-service-production-d5c8.up.railway.app/api/auth"
MATCHING_SERVICE="https://matching-service-production.up.railway.app"
USER_SERVICE="https://user-service-production-f141.up.railway.app"

# Test Auth Service - Health check
echo -e "\n${YELLOW}Testing Auth Service health...${NC}"
curl -s "${AUTH_SERVICE/\/api\/auth/}/health" | jq . || echo -e "${RED}Failed to connect to Auth Service${NC}"

# Test Matching Service - Health check
echo -e "\n${YELLOW}Testing Matching Service health...${NC}"
curl -s "${MATCHING_SERVICE}/health" | jq . || echo -e "${RED}Failed to connect to Matching Service${NC}"

# Try login to get a token
echo -e "\n${YELLOW}Attempting to log in...${NC}"
LOGIN_RESPONSE=$(curl -s -X POST "${AUTH_SERVICE}/login" \
    -H "Content-Type: application/json" \
    -H "Origin: https://comeondost.web.app" \
    -d '{"email":"john.smith@example.com","password":"example_hash_11"}')

echo "Login response:"
echo $LOGIN_RESPONSE | jq . || echo $LOGIN_RESPONSE

# Extract token if login was successful
TOKEN=$(echo $LOGIN_RESPONSE | jq -r '.token')

if [[ "$TOKEN" == "null" || -z "$TOKEN" ]]; then
    echo -e "${RED}❌ Failed to get auth token. Cannot proceed with authenticated requests.${NC}"
else
    echo -e "${GREEN}✅ Got auth token${NC}"
    
    # Test Matching Service - Find Contractors
    echo -e "\n${YELLOW}Testing Matching Service - Find Contractors...${NC}"
    MATCHING_RESPONSE=$(curl -s -X POST "${MATCHING_SERVICE}/api/matching/find-contractors" \
        -H "Content-Type: application/json" \
        -H "Authorization: Bearer ${TOKEN}" \
        -H "Origin: https://comeondost.web.app" \
        -d '{"location":"Delhi","maxDistance":50}')
    
    echo "Matching service response:"
    echo $MATCHING_RESPONSE | jq . || echo $MATCHING_RESPONSE
    
    # Test User Service - Get Profile
    echo -e "\n${YELLOW}Testing User Service - Get Profile...${NC}"
    USER_RESPONSE=$(curl -s "${USER_SERVICE}/api/users/me" \
        -H "Authorization: Bearer ${TOKEN}" \
        -H "Origin: https://comeondost.web.app")
    
    echo "User service response:"
    echo $USER_RESPONSE | jq . || echo $USER_RESPONSE
fi

echo -e "\n${BLUE}=======================================${NC}"
echo -e "${BLUE}🔍 API Test Complete 🔍${NC}"
echo -e "${BLUE}=======================================${NC}"