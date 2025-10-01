#!/bin/bash

# OAuth Credentials Setup Helper Script
# This script helps you interactively add OAuth credentials to your .env file
# 
# Usage: bash setup-oauth-credentials.sh

set -e

echo ""
echo "🔐 OAuth Credentials Setup Helper"
echo "=================================="
echo ""
echo "This script will help you add OAuth credentials to your .env file."
echo "Make sure you have created OAuth apps for the providers you want to use."
echo ""
echo "📖 Setup guides:"
echo "  • Google: https://console.cloud.google.com/"
echo "  • Facebook: https://developers.facebook.com/"
echo "  • Twitter: https://developer.twitter.com/"
echo ""
echo "Full guide: backend/docs/OAUTH-CREDENTIALS-SETUP.md"
echo ""

# Function to update or add env variable
update_env_var() {
    local key=$1
    local value=$2
    local env_file=".env"
    
    # Escape special characters for sed
    value_escaped=$(echo "$value" | sed 's/[\/&]/\\&/g')
    
    if grep -q "^${key}=" "$env_file"; then
        # Update existing
        sed -i '' "s|^${key}=.*|${key}=${value_escaped}|" "$env_file"
    else
        # Add new
        echo "${key}=${value_escaped}" >> "$env_file"
    fi
}

# Ask which providers to configure
echo "Which OAuth providers do you want to configure?"
echo ""

read -p "Configure Google OAuth? (y/n): " setup_google
read -p "Configure Facebook OAuth? (y/n): " setup_facebook
read -p "Configure Twitter OAuth? (y/n): " setup_twitter

echo ""

# Google OAuth
if [[ "$setup_google" == "y" || "$setup_google" == "Y" ]]; then
    echo "🔵 Google OAuth Setup"
    echo "-------------------"
    read -p "Enter Google Client ID: " google_client_id
    read -p "Enter Google Client Secret: " google_client_secret
    
    update_env_var "GOOGLE_CLIENT_ID" "$google_client_id"
    update_env_var "GOOGLE_CLIENT_SECRET" "$google_client_secret"
    
    echo "✅ Google OAuth credentials saved"
    echo ""
fi

# Facebook OAuth
if [[ "$setup_facebook" == "y" || "$setup_facebook" == "Y" ]]; then
    echo "🔷 Facebook OAuth Setup"
    echo "---------------------"
    read -p "Enter Facebook App ID: " facebook_app_id
    read -p "Enter Facebook App Secret: " facebook_app_secret
    
    update_env_var "FACEBOOK_APP_ID" "$facebook_app_id"
    update_env_var "FACEBOOK_APP_SECRET" "$facebook_app_secret"
    
    echo "✅ Facebook OAuth credentials saved"
    echo ""
fi

# Twitter OAuth
if [[ "$setup_twitter" == "y" || "$setup_twitter" == "Y" ]]; then
    echo "⚫ Twitter OAuth Setup"
    echo "-------------------"
    read -p "Enter Twitter Consumer Key (API Key): " twitter_consumer_key
    read -p "Enter Twitter Consumer Secret (API Secret): " twitter_consumer_secret
    
    update_env_var "TWITTER_CONSUMER_KEY" "$twitter_consumer_key"
    update_env_var "TWITTER_CONSUMER_SECRET" "$twitter_consumer_secret"
    
    echo "✅ Twitter OAuth credentials saved"
    echo ""
fi

# Update session secret if still placeholder
if grep -q "SESSION_SECRET=your-session-secret-change-in-production" .env; then
    echo "🔒 Generating Session Secret"
    echo "--------------------------"
    session_secret=$(openssl rand -base64 32 2>/dev/null || echo "change-me-to-random-string-$(date +%s)")
    update_env_var "SESSION_SECRET" "$session_secret"
    echo "✅ Session secret generated"
    echo ""
fi

echo ""
echo "=================================="
echo "✅ Configuration Complete!"
echo "=================================="
echo ""
echo "Next steps:"
echo "  1. Validate credentials: node validate-oauth-credentials.js"
echo "  2. Restart auth service: npm run dev"
echo "  3. Test OAuth login at: http://localhost:5173/register"
echo ""
