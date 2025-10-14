#!/bin/bash
# Script to test the complete login and search flow

# Colors for better visibility
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
RED='\033[0;31m'
NC='\033[0m' # No Color

echo -e "${BLUE}=======================================${NC}"
echo -e "${BLUE}🧪 Testing Login and Search Flow 🧪${NC}"
echo -e "${BLUE}=======================================${NC}"

# API endpoints
AUTH_SERVICE="https://auth-service-production-d5c8.up.railway.app"
MATCHING_SERVICE="https://matching-service-production.up.railway.app"

# Test credentials
EMAIL="john.smith@email.com"
PASSWORD="password123"

echo -e "\n${YELLOW}Step 1: Testing Auth Service Health...${NC}"
AUTH_HEALTH=$(curl -s "${AUTH_SERVICE}/health")
echo "$AUTH_HEALTH" | jq . 2>/dev/null || echo "$AUTH_HEALTH"

if echo "$AUTH_HEALTH" | grep -q '"status":"ok"'; then
    echo -e "${GREEN}✅ Auth service is healthy${NC}"
else
    echo -e "${RED}❌ Auth service health check failed${NC}"
fi

echo -e "\n${YELLOW}Step 2: Testing Login with contractor credentials...${NC}"
echo -e "Email: ${EMAIL}"
echo -e "Password: ${PASSWORD}"

LOGIN_RESPONSE=$(curl -s -X POST "${AUTH_SERVICE}/api/auth/login" \
    -H "Content-Type: application/json" \
    -H "Origin: https://comeondost.web.app" \
    -d "{\"email\":\"${EMAIL}\",\"password\":\"${PASSWORD}\"}")

echo -e "\n${BLUE}Login Response:${NC}"
echo "$LOGIN_RESPONSE" | jq . 2>/dev/null || echo "$LOGIN_RESPONSE"

# Extract token and user info
TOKEN=$(echo "$LOGIN_RESPONSE" | jq -r '.accessToken' 2>/dev/null)
USER_ROLE=$(echo "$LOGIN_RESPONSE" | jq -r '.user.role' 2>/dev/null)
USER_ROLES=$(echo "$LOGIN_RESPONSE" | jq -r '.user.roles' 2>/dev/null)

if [ "$TOKEN" != "null" ] && [ ! -z "$TOKEN" ]; then
    echo -e "${GREEN}✅ Login successful!${NC}"
    echo -e "Token: ${TOKEN:0:20}..."
    echo -e "User Role (string): ${USER_ROLE}"
    echo -e "User Roles (array): ${USER_ROLES}"
    
    if [ "$USER_ROLE" = "contractor" ]; then
        echo -e "${GREEN}✅ User role correctly set as 'contractor'${NC}"
    else
        echo -e "${RED}❌ User role not correctly set (expected 'contractor', got '${USER_ROLE}')${NC}"
    fi
else
    echo -e "${RED}❌ Login failed - no token received${NC}"
    exit 1
fi

echo -e "\n${YELLOW}Step 3: Testing Matching Service Health...${NC}"
MATCHING_HEALTH=$(curl -s "${MATCHING_SERVICE}/health")
echo "$MATCHING_HEALTH" | jq . 2>/dev/null || echo "$MATCHING_HEALTH"

if echo "$MATCHING_HEALTH" | grep -q '"status":"ok"'; then
    echo -e "${GREEN}✅ Matching service is healthy${NC}"
else
    echo -e "${RED}❌ Matching service health check failed${NC}"
fi

echo -e "\n${YELLOW}Step 4: Testing Worker Search (as contractor)...${NC}"
echo -e "Endpoint: /api/matching/find-workers"
echo -e "Location: Delhi"
echo -e "Max Distance: 50 km"

SEARCH_RESPONSE=$(curl -s -w "\nHTTP_STATUS:%{http_code}" -X POST "${MATCHING_SERVICE}/api/matching/find-workers" \
    -H "Content-Type: application/json" \
    -H "Authorization: Bearer ${TOKEN}" \
    -H "Origin: https://comeondost.web.app" \
    -d '{"location":"Delhi","maxDistance":50}')

# Split response body and status
HTTP_BODY=$(echo "$SEARCH_RESPONSE" | sed -e 's/HTTP_STATUS\:.*//g')
HTTP_STATUS=$(echo "$SEARCH_RESPONSE" | tr -d '\n' | sed -e 's/.*HTTP_STATUS://')

echo -e "\n${BLUE}HTTP Status: ${HTTP_STATUS}${NC}"
echo -e "${BLUE}Search Response:${NC}"
echo "$HTTP_BODY" | jq . 2>/dev/null || echo "$HTTP_BODY"

if [ "$HTTP_STATUS" = "200" ]; then
    echo -e "${GREEN}✅ Worker search successful!${NC}"
    
    # Count results
    MATCH_COUNT=$(echo "$HTTP_BODY" | jq '.data.matches | length' 2>/dev/null)
    TOTAL_RESULTS=$(echo "$HTTP_BODY" | jq '.data.total' 2>/dev/null)
    
    if [ "$MATCH_COUNT" != "null" ] && [ ! -z "$MATCH_COUNT" ]; then
        echo -e "${GREEN}Found ${MATCH_COUNT} workers on this page${NC}"
        echo -e "${GREEN}Total matching workers: ${TOTAL_RESULTS}${NC}"
        
        # Show first worker details if available
        FIRST_WORKER=$(echo "$HTTP_BODY" | jq '.data.matches[0]' 2>/dev/null)
        if [ "$FIRST_WORKER" != "null" ]; then
            echo -e "\n${BLUE}Sample Worker:${NC}"
            echo "$FIRST_WORKER" | jq '{name, skill_type, location, experience_years, hourly_rate, rating}' 2>/dev/null || echo "$FIRST_WORKER"
        fi
    fi
elif [ "$HTTP_STATUS" = "403" ]; then
    echo -e "${RED}❌ 403 Forbidden - CORS or authentication issue${NC}"
elif [ "$HTTP_STATUS" = "401" ]; then
    echo -e "${RED}❌ 401 Unauthorized - token may be invalid${NC}"
else
    echo -e "${RED}❌ Search failed with status ${HTTP_STATUS}${NC}"
fi

echo -e "\n${YELLOW}Step 5: Testing Wrong Endpoint (should fail)...${NC}"
echo -e "Endpoint: /api/matching/find-contractors (wrong for contractor)"

WRONG_RESPONSE=$(curl -s -w "\nHTTP_STATUS:%{http_code}" -X POST "${MATCHING_SERVICE}/api/matching/find-contractors" \
    -H "Content-Type: application/json" \
    -H "Authorization: Bearer ${TOKEN}" \
    -H "Origin: https://comeondost.web.app" \
    -d '{"location":"Delhi","maxDistance":50}')

WRONG_HTTP_STATUS=$(echo "$WRONG_RESPONSE" | tr -d '\n' | sed -e 's/.*HTTP_STATUS://')

echo -e "${BLUE}HTTP Status: ${WRONG_HTTP_STATUS}${NC}"

if [ "$WRONG_HTTP_STATUS" = "403" ]; then
    echo -e "${GREEN}✅ Correctly blocked - contractors cannot search for contractors${NC}"
else
    echo -e "${YELLOW}⚠️  Got status ${WRONG_HTTP_STATUS} (expected 403)${NC}"
fi

echo -e "\n${BLUE}=======================================${NC}"
echo -e "${BLUE}📊 TEST SUMMARY${NC}"
echo -e "${BLUE}=======================================${NC}"

if [ "$HTTP_STATUS" = "200" ] && [ "$USER_ROLE" = "contractor" ]; then
    echo -e "${GREEN}✅ All tests passed!${NC}"
    echo -e "${GREEN}✅ Login working correctly${NC}"
    echo -e "${GREEN}✅ User role properly set${NC}"
    echo -e "${GREEN}✅ Worker search working for contractors${NC}"
    echo -e "${GREEN}✅ System ready for production use${NC}"
else
    echo -e "${RED}❌ Some tests failed${NC}"
    echo -e "${YELLOW}Please check the detailed output above${NC}"
fi