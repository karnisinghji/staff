#!/bin/bash
# Upload APK to GitHub Releases (Works Immediately!)
# No Firebase Storage setup needed

set -e

echo "🚀 GitHub Releases APK Setup"
echo "============================"
echo ""

# Get version from user
read -p "Enter version (e.g., v1.0.0): " VERSION

if [ -z "$VERSION" ]; then
    VERSION="v1.0.0"
    echo "Using default version: $VERSION"
fi

echo ""
echo "🔨 Building APK..."
cd frontend/android
./gradlew assembleRelease

APK_PATH="app/build/outputs/apk/release/app-release.apk"
APK_SIZE=$(du -h "$APK_PATH" | cut -f1)

echo ""
echo "✅ APK built: $APK_SIZE"

# Copy and rename APK
cd ../..
cp "frontend/android/$APK_PATH" "contractor-platform.apk"

echo ""
echo "📦 APK ready: contractor-platform.apk ($APK_SIZE)"
echo ""
echo "📋 Next steps to upload to GitHub Releases:"
echo ""
echo "1. Create a new release on GitHub:"
echo "   https://github.com/karnisinghji/staff/releases/new"
echo ""
echo "2. Fill in:"
echo "   - Tag: $VERSION"
echo "   - Title: Android App $VERSION"
echo "   - Description: Latest Android APK release"
echo ""
echo "3. Upload the file: contractor-platform.apk"
echo ""
echo "4. Click 'Publish release'"
echo ""
echo "5. Your download link will be:"
echo "   https://github.com/karnisinghji/staff/releases/download/$VERSION/contractor-platform.apk"
echo ""
echo "   Or use latest:"
echo "   https://github.com/karnisinghji/staff/releases/latest/download/contractor-platform.apk"
echo ""
echo "✅ Your homepage is already configured to use the 'latest' link!"
echo ""

# Offer to open GitHub
read -p "Open GitHub Releases page now? (y/n): " OPEN_GITHUB

if [ "$OPEN_GITHUB" = "y" ] || [ "$OPEN_GITHUB" = "Y" ]; then
    open "https://github.com/karnisinghji/staff/releases/new"
fi

echo ""
echo "🎉 Done! APK file ready at: $(pwd)/contractor-platform.apk"
