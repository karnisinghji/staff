#!/bin/bash

# GitHub Release Script for ComeOnDost APK
# This script creates a GitHub release and uploads the APK

set -e

VERSION="v1.0.0"
TAG="v1.0.0"
RELEASE_NAME="ComeOnDost Android App v1.0.0"
APK_PATH="comeondost-v1.0.apk"
REPO="karnisinghji/staff"

echo "📦 Creating GitHub Release: $RELEASE_NAME"
echo "=================================================="

# Check if gh CLI is installed
if ! command -v gh &> /dev/null; then
    echo "❌ GitHub CLI (gh) is not installed"
    echo "Install it with: brew install gh"
    echo "Or visit: https://cli.github.com"
    exit 1
fi

# Check if logged in
if ! gh auth status &> /dev/null; then
    echo "❌ Not logged in to GitHub CLI"
    echo "Run: gh auth login"
    exit 1
fi

# Check if APK exists
if [ ! -f "$APK_PATH" ]; then
    echo "❌ APK not found at: $APK_PATH"
    echo "Run: cp frontend/android/app/build/outputs/apk/debug/app-debug.apk comeondost-v1.0.apk"
    exit 1
fi

# Get APK size
APK_SIZE=$(du -h "$APK_PATH" | cut -f1)
echo "✅ APK found: $APK_SIZE"

# Create release notes
RELEASE_NOTES="# ComeOnDost Android App v1.0.0

## 📱 Download & Install

Download the APK below and install on your Android device.

### Installation Steps:
1. Download \`comeondost-v1.0.apk\` (${APK_SIZE})
2. Open the downloaded file
3. Enable \"Install from Unknown Sources\" if prompted
4. Tap Install and follow prompts

## ✨ Features

- 🔔 **Push Notifications** - Instant message alerts
- 📍 **GPS Location** - Auto-detect location for searches
- 💬 **Real-time Messaging** - Chat with team members
- 👥 **Team Management** - Send/receive invitations
- 🔒 **Secure OAuth** - Google/Facebook/Twitter login
- 📊 **Profile Management** - Skills, contacts, availability

## 🔧 Technical Details

- **Android Version**: 5.0+ (API 21+)
- **Permissions**: Location, Notifications, Internet
- **Size**: ${APK_SIZE}
- **Architecture**: ARM, ARM64, x86, x86_64

## 🐛 Known Issues

- First-time login may require notification permission
- OAuth login requires Chrome browser installed
- Push notifications require Google Play Services

## 📚 Documentation

- [Installation Guide](https://github.com/${REPO}/blob/main/ANDROID_NOTIFICATION_TROUBLESHOOTING.md)
- [Push Notification Setup](https://github.com/${REPO}/blob/main/PUSH_NOTIFICATIONS_GUIDE.md)
- [Testing Guide](https://github.com/${REPO}/blob/main/test-push-notification-flow.js)

## 🔄 Changelog

### Added
- POST_NOTIFICATIONS permission for Android 13+
- Enhanced console logging with colors
- OAuth callback user profile fetching
- Push notification troubleshooting tools
- Diagnostic script for testing notifications

### Fixed
- OAuth login not storing user name
- Push notifications showing \"Someone\" instead of sender
- Notification permissions not requested properly
- FCM token registration issues

### Improved
- Better error messages with solutions
- Detailed logging for debugging
- Notification channel configuration

---

**Full Changelog**: https://github.com/${REPO}/commits/main
"

echo ""
echo "📝 Release Notes:"
echo "$RELEASE_NOTES"
echo ""
echo "=================================================="

# Create the release
echo "🚀 Creating release on GitHub..."
gh release create "$TAG" \
    --repo "$REPO" \
    --title "$RELEASE_NAME" \
    --notes "$RELEASE_NOTES" \
    "$APK_PATH"

echo ""
echo "✅ Release created successfully!"
echo "🔗 View release: https://github.com/${REPO}/releases/tag/${TAG}"
echo "📥 Direct download: https://github.com/${REPO}/releases/download/${TAG}/comeondost-v1.0.apk"
