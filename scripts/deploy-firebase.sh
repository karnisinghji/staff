#!/bin/bash

# Firebase Deployment Script for ComeOnDost Worker Platform
# Project: staff-473807
# Account: khushabhu@gmail.com

cd "/Users/shouryaveersingh/Desktop/old data/staff"

echo "🔥 Firebase Deployment for ComeOnDost"
echo "======================================"
echo ""
echo "Project: staff-473807"
echo "Account: khushabhu@gmail.com"
echo "Build: frontend/dist"
echo ""

# Check if build exists
if [ ! -d "frontend/dist" ] || [ ! -f "frontend/dist/index.html" ]; then
    echo "❌ Build not found or incomplete!"
    echo "📦 Building frontend..."
    cd frontend
    npm run build
    if [ $? -ne 0 ]; then
        echo "❌ Build failed!"
        exit 1
    fi
    cd ..
    echo "✅ Build complete"
else
    echo "✅ Build found"
fi

echo ""
echo "🚀 Deploying to Firebase Hosting..."
echo ""
echo "When prompted for site ID, use one of:"
echo "  - comeondost-staff"
echo "  - worker-contractor-platform"
echo "  - staff-platform"
echo ""

firebase deploy --only hosting

if [ $? -eq 0 ]; then
    echo ""
    echo "✅ Deployment successful!"
    echo ""
    echo "🌐 Your app is now live at:"
    echo "   https://<your-site-id>.web.app"
    echo "   https://<your-site-id>.firebaseapp.com"
    echo ""
    echo "📝 Next steps:"
    echo "   1. Test the app"
    echo "   2. Update Google OAuth redirect URIs"
    echo "   3. Clear browser cache (Ctrl+Shift+R)"
else
    echo ""
    echo "❌ Deployment failed!"
    echo ""
    echo "💡 Troubleshooting:"
    echo "   1. Visit: https://console.firebase.google.com/project/staff-473807"
    echo "   2. Go to Build → Hosting"
    echo "   3. Click 'Get Started' to enable hosting"
    echo "   4. Run this script again"
fi
