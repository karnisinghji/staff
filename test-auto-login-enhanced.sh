#!/bin/bash

# Enhanced Auto-Login Test with Chrome DevTools Instructions

export ANDROID_HOME=~/Library/Android/sdk
export PATH=$PATH:$ANDROID_HOME/platform-tools

echo "=========================================="
echo "  Enhanced Auto-Login Test"
echo "=========================================="
echo ""

echo "📱 The app should now be open on the emulator"
echo ""
echo "🔧 To see console logs in real-time:"
echo "   1. Open Google Chrome browser"
echo "   2. Go to: chrome://inspect"
echo "   3. Find 'com.comeondost.app' under Remote Target"
echo "   4. Click 'inspect'"
echo "   5. Go to Console tab"
echo ""
read -p "Press Enter when ready to continue..."

echo ""
echo "Step 1: Login to the app"
echo "------------------------"
echo "Please login with your credentials"
echo "After login, you should see TEAM PAGE (/team)"
echo ""
echo "👀 Watch the Chrome DevTools Console for:"
echo "   [AuthContext] Login called"
echo "   [AuthContext] Token and user saved to both Preferences and localStorage"
echo ""
read -p "Press Enter after successful login..."

echo ""
echo "Step 2: Testing Auto-Login"
echo "------------------------"
echo "Force stopping app..."
adb shell am force-stop com.comeondost.app
sleep 2

echo "Restarting app..."
adb shell am start -n com.comeondost.app/.MainActivity
sleep 3

echo ""
echo "👀 Watch the Chrome DevTools Console for:"
echo "   [AuthContext] Loading stored auth..."
echo "   [AuthContext] Stored token exists: true"
echo "   [AuthContext] Token loaded successfully"
echo ""
echo "Expected behavior:"
echo "  ✅ App should open directly to TEAM PAGE"
echo "  ✅ User should NOT see login screen"
echo "  ✅ Navigation should be visible"
echo ""
read -p "Did the app open to TEAM page without login? (y/n): " result

echo ""
if [[ "$result" == "y" ]]; then
    echo "✅ ✅ ✅ AUTO-LOGIN IS WORKING! ✅ ✅ ✅"
    echo ""
    echo "Now testing persistence across app restarts..."
    echo "Closing app again..."
    adb shell am force-stop com.comeondost.app
    sleep 2
    echo "Reopening..."
    adb shell am start -n com.comeondost.app/.MainActivity
    sleep 3
    echo ""
    read -p "Did it still stay logged in? (y/n): " result2
    if [[ "$result2" == "y" ]]; then
        echo "✅ Perfect! Auto-login is fully working!"
    else
        echo "⚠️  Second restart failed - token might be expiring"
    fi
else
    echo "❌ AUTO-LOGIN NOT WORKING"
    echo ""
    echo "Debugging steps:"
    echo "1. Check Chrome DevTools Console (chrome://inspect)"
    echo "2. Look for [AuthContext] logs"
    echo "3. Check if 'Stored token exists: false'"
    echo ""
    echo "Common issues:"
    echo "- Token not being saved during login"
    echo "- localStorage/Preferences not persisting"
    echo "- App cache being cleared automatically"
    echo ""
    echo "Try this:"
    echo "1. Login again"
    echo "2. In Chrome DevTools Console, type:"
    echo "   localStorage.getItem('token')"
    echo "3. If it returns null, storage is not working"
fi

echo ""
echo "=========================================="
echo "  Test Complete"
echo "=========================================="
