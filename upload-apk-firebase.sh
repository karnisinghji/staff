#!/bin/bash
# Upload APK to Firebase Storage
# This script builds the APK and uploads it to Firebase Storage for direct download

set -e

echo "🔨 Building Android APK..."
cd frontend/android
./gradlew assembleRelease

APK_PATH="app/build/outputs/apk/release/app-release.apk"
APK_SIZE=$(du -h "$APK_PATH" | cut -f1)

echo ""
echo "✅ APK built successfully!"
echo "   Size: $APK_SIZE"
echo "   Location: frontend/android/$APK_PATH"

echo ""
echo "📤 Uploading to Firebase Storage..."
cd ../..

# Check if Firebase CLI is installed
if ! command -v firebase &> /dev/null; then
    echo "❌ Firebase CLI not found!"
    echo ""
    echo "Install it with:"
    echo "  npm install -g firebase-tools"
    echo ""
    exit 1
fi

# Upload to Firebase Storage
firebase storage:upload \
  "frontend/android/$APK_PATH" \
  "apk/app-release.apk" \
  --project comeondost

echo ""
echo "✅ APK uploaded to Firebase Storage!"
echo ""
echo "📱 Download URL:"
echo "   https://firebasestorage.googleapis.com/v0/b/comeondost.appspot.com/o/apk%2Fapp-release.apk?alt=media"
echo ""
echo "🔐 Make sure the file is publicly accessible:"
echo "   1. Go to: https://console.firebase.google.com/project/comeondost/storage"
echo "   2. Find: apk/app-release.apk"
echo "   3. Click the 3 dots → Edit Access"
echo "   4. Set to 'Public' or add rule in Storage Rules"
echo ""
echo "📋 Storage Rules (if needed):"
echo "   rules_version = '2';"
echo "   service firebase.storage {"
echo "     match /b/{bucket}/o {"
echo "       match /apk/{allPaths=**} {"
echo "         allow read: if true;  // Public read access for APK"
echo "       }"
echo "     }"
echo "   }"
echo ""
echo "🚀 Your homepage is already configured to use this URL!"
