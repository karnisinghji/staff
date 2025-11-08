#!/bin/bash
# Update APK for Direct Download from Website
# This script copies the latest APK build to the public folder

set -e

echo "🔨 Building Android APK..."
cd frontend/android
./gradlew assembleRelease

echo ""
echo "📦 APK built successfully!"
APK_PATH="app/build/outputs/apk/release/app-release.apk"
APK_SIZE=$(du -h "$APK_PATH" | cut -f1)
echo "   Size: $APK_SIZE"
echo "   Location: frontend/android/$APK_PATH"

echo ""
echo "📋 Copying APK to public folder..."
cp "$APK_PATH" ../public/app-release.apk

echo ""
echo "✅ APK ready for deployment!"
echo ""
echo "📝 Next steps:"
echo "   1. Commit the updated APK:"
echo "      git add frontend/public/app-release.apk"
echo "      git commit -m 'Update Android APK'"
echo ""
echo "   2. Deploy frontend:"
echo "      cd frontend && npm run build && npm run deploy"
echo ""
echo "   3. Users will now download directly from your website!"
echo "      URL: https://your-website.com/app-release.apk"
echo ""
