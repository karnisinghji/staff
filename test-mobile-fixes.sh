#!/bin/bash

# Mobile App Testing Script
# Tests all three fixes: message input, profile page, and auto-login

export ANDROID_HOME=~/Library/Android/sdk
export PATH=$PATH:$ANDROID_HOME/platform-tools:$ANDROID_HOME/emulator

# Colors
GREEN='\033[0;32m'
BLUE='\033[0;34m'
YELLOW='\033[1;33m'
RED='\033[0;31m'
NC='\033[0m' # No Color

echo -e "${BLUE}=======================================${NC}"
echo -e "${BLUE}  Mobile App Testing Script${NC}"
echo -e "${BLUE}=======================================${NC}"
echo ""

# Check if emulator is running
if ! adb devices | grep -q "emulator"; then
    echo -e "${RED}❌ No emulator detected${NC}"
    echo "Please start the emulator first"
    exit 1
fi

echo -e "${GREEN}✅ Emulator detected${NC}"
echo ""

# Test 1: Auto-Login Feature
echo -e "${YELLOW}Test 1: Auto-Login Feature${NC}"
echo "-----------------------------------"
echo "1. Clearing app data to simulate fresh install..."
adb shell pm clear com.comeondost.app
sleep 1

echo "2. Launching app (should show home page)..."
adb shell am start -n com.comeondost.app/.MainActivity
sleep 3

echo "3. Taking screenshot: fresh-install.png"
adb exec-out screencap -p > "/Users/shouryaveersingh/Desktop/old data/staff/test-fresh-install.png"

echo -e "${BLUE}📝 Manual Test:${NC}"
echo "   - App should show HOME PAGE (not login)"
echo "   - Tap 'Get Started' or 'Login' button"
echo "   - Login with your credentials"
echo ""
read -p "Press Enter after logging in..."

echo "4. Closing and reopening app..."
adb shell am force-stop com.comeondost.app
sleep 1
adb shell am start -n com.comeondost.app/.MainActivity
sleep 3

echo "5. Taking screenshot: after-reopen.png"
adb exec-out screencap -p > "/Users/shouryaveersingh/Desktop/old data/staff/test-after-reopen.png"

echo -e "${BLUE}📝 Expected Result:${NC}"
echo "   ✅ Should open directly to DASHBOARD (not login page)"
echo "   ✅ User should stay logged in"
echo ""
read -p "Did the app open to dashboard without login? (y/n): " auto_login_result

# Test 2: Message Input Rendering
echo ""
echo -e "${YELLOW}Test 2: Message Input Rendering${NC}"
echo "-----------------------------------"
echo "1. Navigate to Messages page..."
echo -e "${BLUE}📝 Manual Navigation:${NC}"
echo "   - Tap on 'Messages' in navigation"
echo "   - Select any chat"
echo ""
read -p "Press Enter after opening a chat..."

echo "2. Taking screenshot: message-input.png"
adb exec-out screencap -p > "/Users/shouryaveersingh/Desktop/old data/staff/test-message-input.png"

echo -e "${BLUE}📝 Check These:${NC}"
echo "   ✅ Text input box is visible and full-width"
echo "   ✅ Emoji button is small and proportional"
echo "   ✅ Send button is visible on the right"
echo "   ✅ No horizontal scrolling"
echo "   ✅ Can type in the text box"
echo ""
read -p "Is the message input rendering correctly? (y/n): " message_input_result

# Test 3: Profile Page Rendering
echo ""
echo -e "${YELLOW}Test 3: Profile Page Rendering${NC}"
echo "-----------------------------------"
echo "1. Navigate to Profile page..."
echo -e "${BLUE}📝 Manual Navigation:${NC}"
echo "   - Tap on 'Profile' or user icon in navigation"
echo ""
read -p "Press Enter after opening profile..."

echo "2. Taking screenshot: profile-page.png"
adb exec-out screencap -p > "/Users/shouryaveersingh/Desktop/old data/staff/test-profile-page.png"

echo -e "${BLUE}📝 Check These:${NC}"
echo "   ✅ Profile card fits screen width"
echo "   ✅ Avatar is properly sized"
echo "   ✅ Form fields are readable"
echo "   ✅ No horizontal scrolling"
echo "   ✅ All sections are accessible"
echo ""
read -p "Is the profile page rendering correctly? (y/n): " profile_result

# Test 4: Notification Permission
echo ""
echo -e "${YELLOW}Test 4: Notification Permission${NC}"
echo "-----------------------------------"
echo -e "${BLUE}📝 Check:${NC}"
echo "   - Did you see a notification permission prompt after login?"
echo ""
read -p "Did you grant notification permission? (y/n): " notification_result

# Summary
echo ""
echo -e "${BLUE}=======================================${NC}"
echo -e "${BLUE}  Test Results Summary${NC}"
echo -e "${BLUE}=======================================${NC}"
echo ""

if [[ "$auto_login_result" == "y" ]]; then
    echo -e "${GREEN}✅ Auto-Login: PASSED${NC}"
else
    echo -e "${RED}❌ Auto-Login: FAILED${NC}"
fi

if [[ "$message_input_result" == "y" ]]; then
    echo -e "${GREEN}✅ Message Input: PASSED${NC}"
else
    echo -e "${RED}❌ Message Input: FAILED${NC}"
fi

if [[ "$profile_result" == "y" ]]; then
    echo -e "${GREEN}✅ Profile Page: PASSED${NC}"
else
    echo -e "${RED}❌ Profile Page: FAILED${NC}"
fi

if [[ "$notification_result" == "y" ]]; then
    echo -e "${GREEN}✅ Notifications: ENABLED${NC}"
else
    echo -e "${YELLOW}⚠️  Notifications: NOT ENABLED${NC}"
fi

echo ""
echo -e "${BLUE}Screenshots saved to:${NC}"
echo "   - test-fresh-install.png"
echo "   - test-after-reopen.png"
echo "   - test-message-input.png"
echo "   - test-profile-page.png"
echo ""

# View logs
echo -e "${BLUE}View logs? (y/n):${NC}"
read -p "" view_logs

if [[ "$view_logs" == "y" ]]; then
    echo ""
    echo -e "${YELLOW}Recent logs (last 50 lines):${NC}"
    adb logcat -d | grep -i "comeondost\|chromium\|notification" | tail -50
fi

echo ""
echo -e "${GREEN}Testing complete!${NC}"
