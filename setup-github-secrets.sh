#!/bin/bash

echo "🚂 Railway Token Setup Helper"
echo "============================"
echo
echo "1. Visit https://railway.app/account/tokens"
echo "2. Click 'New Token'"
echo "3. Name it 'GitHub CI/CD'"
echo "4. Copy the token"
echo
echo "Then add it to your GitHub repository:"
echo "1. Go to your repository settings"
echo "2. Click 'Secrets and variables' -> 'Actions'"
echo "3. Click 'New repository secret'"
echo "4. Name: RAILWAY_TOKEN"
echo "5. Value: [Paste your Railway token]"
echo
echo "Additional required secrets to add:"
echo "- DATABASE_URL (your Neon PostgreSQL URL)"
echo "- JWT_SECRET (your JWT signing key)"
echo "- VITE_API_URL (your API base URL)"
echo
echo "Once you've added these secrets, your CI/CD pipeline will be ready to use!"