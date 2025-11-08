#!/bin/bash
# Script to create a test user for login

# Colors for better visibility
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
RED='\033[0;31m'
NC='\033[0m' # No Color

echo -e "${BLUE}=======================================${NC}"
echo -e "${BLUE}🔐 Test User Registration 🔐${NC}"
echo -e "${BLUE}=======================================${NC}"

AUTH_SERVICE="https://auth-service-production-d5c8.up.railway.app"

# Test user details
echo -e "${YELLOW}Creating a test user...${NC}"

# Register a contractor
echo -e "\n${BLUE}Registering test contractor...${NC}"
CONTRACTOR_RESPONSE=$(curl -s -X POST "${AUTH_SERVICE}/api/auth/register" \
    -H "Content-Type: application/json" \
    -d '{
        "name": "Test Contractor",
        "email": "contractor@test.com",
        "password": "Test123!",
        "phone": "+1234567890",
        "role": "contractor",
        "location": "Delhi"
    }')

echo "Contractor registration response:"
echo $CONTRACTOR_RESPONSE | jq . || echo $CONTRACTOR_RESPONSE

# Register a worker
echo -e "\n${BLUE}Registering test worker...${NC}"
WORKER_RESPONSE=$(curl -s -X POST "${AUTH_SERVICE}/api/auth/register" \
    -H "Content-Type: application/json" \
    -d '{
        "name": "Test Worker",
        "email": "worker@test.com",
        "password": "Test123!",
        "phone": "+1234567891",
        "role": "worker",
        "location": "Mumbai"
    }')

echo "Worker registration response:"
echo $WORKER_RESPONSE | jq . || echo $WORKER_RESPONSE

echo -e "\n${GREEN}✅ Test users created (if they didn't already exist)${NC}"
echo -e "${YELLOW}You can now login with:${NC}"
echo -e "  Contractor: contractor@test.com / Test123!"
echo -e "  Worker: worker@test.com / Test123!"