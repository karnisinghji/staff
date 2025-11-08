#!/bin/bash
# Complete APK Setup for Firebase Storage
# Run this script once to set up everything

set -e

echo "🚀 Setting up APK download via Firebase Storage"
echo "================================================"
echo ""

# Check Firebase CLI
if ! command -v firebase &> /dev/null; then
    echo "❌ Firebase CLI not installed"
    echo ""
    echo "Installing Firebase CLI..."
    npm install -g firebase-tools
fi

echo "✅ Firebase CLI ready"
echo ""

# Login to Firebase
echo "🔐 Logging in to Firebase..."
firebase login

echo ""
echo "📋 Deploying Storage Rules..."
firebase deploy --only storage --project comeondost

echo ""
echo "🔨 Building APK..."
cd frontend/android
./gradlew assembleRelease

APK_PATH="app/build/outputs/apk/release/app-release.apk"
APK_SIZE=$(du -h "$APK_PATH" | cut -f1)

echo ""
echo "✅ APK built: $APK_SIZE"

echo ""
echo "📤 Uploading APK to Firebase Storage..."
cd ../..

# Upload APK
firebase storage:upload \
  "frontend/android/$APK_PATH" \
  "apk/app-release.apk" \
  --project comeondost

echo ""
echo "✅ APK uploaded successfully!"
echo ""
echo "🌐 Your APK is now available at:"
echo "   https://firebasestorage.googleapis.com/v0/b/comeondost.appspot.com/o/apk%2Fapp-release.apk?alt=media"
echo ""
echo "🎉 Setup complete! Your homepage is already configured."
echo ""
echo "📱 Test it:"
echo "   1. Visit your homepage"
echo "   2. Click 'Download APK'"
echo "   3. APK should download directly"
echo ""
echo "🔄 To update APK in future, run:"
echo "   ./upload-apk-firebase.sh"
echo ""
