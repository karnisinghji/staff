#!/bin/bash

echo "=========================================="
echo "AUTO-LOGIN PERSISTENCE TEST - FINAL"
echo "=========================================="
echo ""

echo "📱 STEP 1: Open Chrome DevTools"
echo "   Run: open -a 'Google Chrome' 'chrome://inspect'"
echo "   Click 'inspect' under your device"
echo ""
read -p "Press Enter when DevTools is open..."

echo ""
echo "📱 STEP 2: Clear app data for fresh test"
adb shell pm clear com.comeondost.app
echo "   ✓ App data cleared"
echo ""

echo "📱 STEP 3: Launch the app"
adb shell am start -n com.comeondost.app/.MainActivity
echo "   ✓ App launched"
echo ""

echo "🔍 STEP 4: Login and check storage"
echo ""
echo "   In Chrome DevTools Console, run these commands:"
echo ""
echo "   BEFORE LOGIN:"
echo "   localStorage.getItem('token')"
echo "   localStorage.getItem('user')"
echo "   // Should return: null"
echo ""
read -p "Press Enter after checking pre-login storage..."

echo ""
echo "   Now LOGIN with your credentials in the app"
echo ""
read -p "Press Enter after successful login..."

echo ""
echo "   AFTER LOGIN:"
echo "   localStorage.getItem('token')"
echo "   localStorage.getItem('user')"
echo "   // Should return: actual token and user data"
echo ""
echo "   Also check for these console logs:"
echo "   '[AuthContext] Login called'"
echo "   '[AuthContext] Token and user saved to both Preferences and localStorage'"
echo ""
read -p "Press Enter after verifying login saved data..."

echo ""
echo "📱 STEP 5: Force stop the app"
adb shell am force-stop com.comeondost.app
echo "   ✓ App force stopped"
sleep 2
echo ""

echo "🔍 STEP 6: Check if storage persisted"
echo "   In Chrome DevTools Console (before reopening app):"
echo ""
echo "   localStorage.getItem('token')"
echo "   localStorage.getItem('user')"
echo ""
echo "   ⚠️  CRITICAL TEST:"
echo "   If these return NULL → Storage is being cleared on app close!"
echo "   If these return values → Storage persisted, loading issue"
echo ""
read -p "Press Enter after checking storage (RECORD THE RESULT)..."

echo ""
echo "📱 STEP 7: Reopen the app"
adb shell am start -n com.comeondost.app/.MainActivity
echo "   ✓ App relaunched"
sleep 2
echo ""

echo "🔍 STEP 8: Check startup logs and storage"
echo "   IMMEDIATELY in Chrome DevTools Console:"
echo ""
echo "   1. Check console for:"
echo "      '[AuthContext] Loading stored auth...'"
echo "      '[AuthContext] Stored token exists: true/false'"
echo "      '[AuthContext] Token loaded successfully'"
echo ""
echo "   2. Run in console:"
echo "      localStorage.getItem('token')"
echo "      localStorage.getItem('user')"
echo ""
echo "   3. Check what page loaded:"
echo "      - Login page = Auto-login FAILED"
echo "      - Team page = Auto-login SUCCESS"
echo ""
read -p "Press Enter after checking..."

echo ""
echo "=========================================="
echo "DIAGNOSTIC RESULTS"
echo "=========================================="
echo ""
echo "Please answer these questions:"
echo ""
read -p "Q1: After login, did localStorage.getItem('token') return a token? (y/n): " q1
read -p "Q2: After force stop (before reopen), did localStorage still have token? (y/n): " q2
read -p "Q3: After reopening, did you see '[AuthContext] Loading stored auth...' log? (y/n): " q3
read -p "Q4: After reopening, did localStorage still have the token? (y/n): " q4
read -p "Q5: After reopening, which page loaded? (login/team): " q5

echo ""
echo "=========================================="
echo "DIAGNOSIS"
echo "=========================================="
echo ""

if [ "$q1" = "n" ]; then
    echo "❌ ISSUE: Login is not saving to localStorage"
    echo "   FIX: Check AuthContext login function"
fi

if [ "$q1" = "y" ] && [ "$q2" = "n" ]; then
    echo "❌ ISSUE: Android WebView is clearing localStorage on app close"
    echo "   CAUSE: WebView cache/storage being cleared"
    echo "   FIX NEEDED:"
    echo "   1. Check AndroidManifest.xml for android:allowBackup"
    echo "   2. Add WebView settings to keep cache"
    echo "   3. Use IndexedDB instead of localStorage"
    echo "   4. Use Capacitor Preferences ONLY (not localStorage)"
fi

if [ "$q1" = "y" ] && [ "$q2" = "y" ] && [ "$q3" = "n" ]; then
    echo "❌ ISSUE: AuthContext not initializing on app restart"
    echo "   CAUSE: React component not mounting"
    echo "   FIX NEEDED: Add window.onload handler or App plugin"
fi

if [ "$q1" = "y" ] && [ "$q2" = "y" ] && [ "$q3" = "y" ] && [ "$q4" = "n" ]; then
    echo "❌ ISSUE: localStorage cleared between force stop and app load"
    echo "   CAUSE: Timing issue or WebView reset"
fi

if [ "$q1" = "y" ] && [ "$q2" = "y" ] && [ "$q3" = "y" ] && [ "$q4" = "y" ] && [ "$q5" = "login" ]; then
    echo "❌ ISSUE: Token exists but not being loaded by AuthContext"
    echo "   CAUSE: Logic error in loadStoredAuth useEffect"
    echo "   FIX: Check if setToken(localToken) is actually being called"
fi

if [ "$q5" = "team" ]; then
    echo "✅ SUCCESS: Auto-login is working!"
    echo "   Token persisted and loaded successfully"
fi

echo ""
echo "=========================================="
echo "NEXT STEPS"
echo "=========================================="
echo ""
echo "Based on the diagnosis above, we'll implement the appropriate fix."
echo "Share the answers (Q1-Q5) with me to proceed."
echo ""
