#!/bin/bash

# Test Auto-Login Feature

export ANDROID_HOME=~/Library/Android/sdk
export PATH=$PATH:$ANDROID_HOME/platform-tools

echo "Testing Auto-Login Feature..."
echo "================================"
echo ""

echo "Step 1: App should show home page (not logged in)"
read -p "Press Enter to continue..."

echo ""
echo "Step 2: Please login with your credentials"
echo "After login, you should be redirected to TEAM PAGE (/team)"
read -p "Press Enter after logging in..."

echo ""
echo "Step 3: Force stopping app..."
adb shell am force-stop com.comeondost.app
sleep 2

echo "Step 4: Restarting app..."
adb shell am start -n com.comeondost.app/.MainActivity
sleep 3

echo ""
echo "Step 5: Check the app now..."
echo "Expected: Should open directly to TEAM PAGE (not login)"
echo "If it shows login page, auto-login is NOT working"
echo ""
read -p "Did the app open to TEAM page without asking for login? (y/n): " result

echo ""
if [[ "$result" == "y" ]]; then
    echo "✅ AUTO-LOGIN WORKING!"
else
    echo "❌ AUTO-LOGIN NOT WORKING"
    echo ""
    echo "Checking logs for errors..."
    adb logcat -d | grep -i "AuthContext\|Preferences\|error" | tail -20
fi

echo ""
echo "Test complete!"
