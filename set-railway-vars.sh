#!/bin/bash
# Script to set Railway environment variables via API
# You'll need your Railway API token

echo "🚂 Railway Environment Variables Setup"
echo "======================================="
echo ""

# Check if Railway CLI is logged in
if ! railway whoami &>/dev/null; then
    echo "❌ Not logged into Railway CLI"
    echo "Please run: railway login"
    exit 1
fi

echo "✅ Railway CLI is authenticated"
echo ""

# Get Railway API token from CLI config
RAILWAY_TOKEN=$(railway whoami --json 2>/dev/null | grep -o '"token":"[^"]*"' | cut -d'"' -f4)

if [ -z "$RAILWAY_TOKEN" ]; then
    echo "❌ Could not get Railway token"
    echo "Please run: railway login"
    exit 1
fi

# Project and service IDs
PROJECT_ID="bb05dc64-069a-4e31-9783-111970652866"
SERVICE_ID="0b7f0dfa-17ad-4cf7-bc1a-40d5492755a2"
ENVIRONMENT_ID="62f957ec-e080-475e-8e3b-feed91fa2741"

echo "📦 Project ID: $PROJECT_ID"
echo "🔧 Service: auth-service"
echo "🌍 Environment: production"
echo ""

# Gmail API credentials
declare -A VARIABLES=(
    ["GMAIL_CLIENT_ID"]="your-google-oauth-client-id.apps.googleusercontent.com"
    ["GMAIL_CLIENT_SECRET"]="your-google-oauth-client-secret"
    ["GMAIL_REFRESH_TOKEN"]="your-google-oauth-refresh-token"
    ["GMAIL_USER"]="your-email@gmail.com"
)

echo "Setting environment variables..."
echo ""

for VAR_NAME in "${!VARIABLES[@]}"; do
    VAR_VALUE="${VARIABLES[$VAR_NAME]}"
    
    echo "  Setting: $VAR_NAME"
    
    # Use Railway GraphQL API to set variable
    RESPONSE=$(curl -s -X POST https://backboard.railway.app/graphql/v2 \
        -H "Authorization: Bearer $RAILWAY_TOKEN" \
        -H "Content-Type: application/json" \
        -d "{
            \"query\": \"mutation variableUpsert(\$input: VariableUpsertInput!) { variableUpsert(input: \$input) }\",
            \"variables\": {
                \"input\": {
                    \"projectId\": \"$PROJECT_ID\",
                    \"environmentId\": \"$ENVIRONMENT_ID\",
                    \"serviceId\": \"$SERVICE_ID\",
                    \"name\": \"$VAR_NAME\",
                    \"value\": \"$VAR_VALUE\"
                }
            }
        }")
    
    if echo "$RESPONSE" | grep -q "variableUpsert"; then
        echo "    ✅ Success"
    else
        echo "    ❌ Failed: $RESPONSE"
    fi
    
    sleep 1
done

echo ""
echo "✅ All variables set!"
echo ""
echo "📝 Next steps:"
echo "1. Railway will automatically redeploy the service"
echo "2. Wait ~2-3 minutes for deployment to complete"
echo "3. Test password reset again"
echo ""
echo "To monitor deployment:"
echo "  railway logs --service auth-service"
