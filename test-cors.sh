#!/bin/bash
# Script to test CORS configuration directly

# Colors for better visibility
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
RED='\033[0;31m'
NC='\033[0m' # No Color

echo -e "${BLUE}=======================================${NC}"
echo -e "${BLUE}🔍 CORS Configuration Test 🔍${NC}"
echo -e "${BLUE}=======================================${NC}"

# Define API endpoints
MATCHING_SERVICE="https://matching-service-production.up.railway.app"

# Test CORS preflight request
echo -e "\n${YELLOW}Testing CORS preflight request to Matching Service...${NC}"

curl -v -X OPTIONS "${MATCHING_SERVICE}/api/matching/find-contractors" \
    -H "Origin: https://comeondost.web.app" \
    -H "Access-Control-Request-Method: POST" \
    -H "Access-Control-Request-Headers: Content-Type, Authorization"

echo -e "\n${BLUE}=======================================${NC}"
echo -e "${BLUE}🔍 CORS Test Complete 🔍${NC}"
echo -e "${BLUE}=======================================${NC}"
echo -e "${YELLOW}Look for Access-Control-Allow-Origin header in the response${NC}"
echo -e "${YELLOW}If it contains 'https://comeondost.web.app', CORS is configured correctly${NC}"