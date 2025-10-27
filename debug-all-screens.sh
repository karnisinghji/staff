#!/bin/bash

# Comprehensive Screen-by-Screen Debugging Script
# Tests all pages and takes screenshots for debugging

export ANDROID_HOME=~/Library/Android/sdk
export PATH=$PATH:$ANDROID_HOME/platform-tools:$ANDROID_HOME/emulator

# Colors
GREEN='\033[0;32m'
BLUE='\033[0;34m'
YELLOW='\033[1;33m'
RED='\033[0;31m'
CYAN='\033[0;36m'
NC='\033[0m' # No Color

SCREENSHOT_DIR="/Users/shouryaveersingh/Desktop/old data/staff/debug-screenshots"
mkdir -p "$SCREENSHOT_DIR"

echo -e "${CYAN}=============================================${NC}"
echo -e "${CYAN}  Screen-by-Screen Emulator Debug${NC}"
echo -e "${CYAN}=============================================${NC}"
echo ""

# Check if emulator is running
if ! adb devices | grep -q "emulator"; then
    echo -e "${RED}❌ No emulator detected${NC}"
    echo "Starting emulator..."
    emulator -avd Pixel_4_API_33 &
    echo "Waiting for emulator to boot..."
    adb wait-for-device
    sleep 15
fi

echo -e "${GREEN}✅ Emulator ready${NC}"
echo ""

# Function to take screenshot and log
take_screenshot() {
    local name=$1
    local description=$2
    echo -e "${BLUE}📸 Capturing: $description${NC}"
    adb exec-out screencap -p > "$SCREENSHOT_DIR/${name}.png"
    sleep 2
}

# Function to check for errors in logs
check_logs() {
    local screen_name=$1
    echo -e "${YELLOW}🔍 Checking logs for $screen_name...${NC}"
    adb logcat -d -s chromium:E AndroidRuntime:E | tail -20 > "$SCREENSHOT_DIR/${screen_name}_errors.log"
    
    if [ -s "$SCREENSHOT_DIR/${screen_name}_errors.log" ]; then
        echo -e "${RED}⚠️  Errors found - saved to ${screen_name}_errors.log${NC}"
    else
        echo -e "${GREEN}✓ No critical errors${NC}"
    fi
}

# Function to prompt for manual check
manual_check() {
    local checks=$1
    echo -e "${CYAN}Manual Check:${NC}"
    echo "$checks"
    read -p "$(echo -e ${YELLOW}Press Enter when ready to continue...${NC})"
}

echo -e "${YELLOW}Starting comprehensive debug...${NC}"
echo "Screenshots will be saved to: $SCREENSHOT_DIR"
echo ""

# Clear app data for fresh start
echo "1. Clearing app data..."
adb shell pm clear com.comeondost.app
sleep 1

# ============================================
# SCREEN 1: Home Page (Logged Out)
# ============================================
echo ""
echo -e "${CYAN}════════════════════════════════════════${NC}"
echo -e "${CYAN}SCREEN 1: Home Page (Logged Out)${NC}"
echo -e "${CYAN}════════════════════════════════════════${NC}"

adb shell am start -n com.comeondost.app/.MainActivity
sleep 4

take_screenshot "01-home-page" "Home Page (logged out)"
check_logs "01-home-page"

manual_check "
  ✓ Come On Dost branding visible
  ✓ Login/Register buttons visible
  ✓ Download APK button visible
  ✓ No layout overflow
  ✓ Fits mobile screen properly"

# ============================================
# SCREEN 2: Login Page
# ============================================
echo ""
echo -e "${CYAN}════════════════════════════════════════${NC}"
echo -e "${CYAN}SCREEN 2: Login Page${NC}"
echo -e "${CYAN}════════════════════════════════════════${NC}"

echo "Navigate to login page..."
echo "Tap the 'Login' button on screen"
manual_check "Tap Login button, then press Enter"

take_screenshot "02-login-page" "Login Page"
check_logs "02-login-page"

manual_check "
  ✓ Email/Username input visible
  ✓ Password input visible
  ✓ Login button visible
  ✓ Forgot password link visible
  ✓ Register link visible
  ✓ No keyboard overlap issues"

# ============================================
# LOGIN CREDENTIALS
# ============================================
echo ""
echo -e "${YELLOW}Please login with your credentials${NC}"
echo "Use the emulator screen to login"
manual_check "After successful login, press Enter"

sleep 2

# ============================================
# SCREEN 3: Dashboard
# ============================================
echo ""
echo -e "${CYAN}════════════════════════════════════════${NC}"
echo -e "${CYAN}SCREEN 3: Dashboard${NC}"
echo -e "${CYAN}════════════════════════════════════════${NC}"

take_screenshot "03-dashboard" "Dashboard (after login)"
check_logs "03-dashboard"

manual_check "
  ✓ Welcome message visible
  ✓ Navigation bar visible
  ✓ Quick action cards visible
  ✓ Stats/summary visible
  ✓ No layout issues"

# ============================================
# SCREEN 4: Profile Page
# ============================================
echo ""
echo -e "${CYAN}════════════════════════════════════════${NC}"
echo -e "${CYAN}SCREEN 4: Profile Page${NC}"
echo -e "${CYAN}════════════════════════════════════════${NC}"

echo "Navigate to Profile page..."
echo "Tap 'Profile' in navigation"
manual_check "Open Profile page, then press Enter"

take_screenshot "04-profile-page" "Profile Page"
check_logs "04-profile-page"

manual_check "
  ✓ Avatar visible and properly sized
  ✓ Profile card fits screen width
  ✓ Form fields readable (no overflow)
  ✓ Edit buttons accessible
  ✓ No horizontal scrolling
  ✓ Skills section visible
  ✓ Contact info section visible"

# Scroll profile page
echo "Scrolling profile page..."
adb shell input swipe 500 1500 500 500 300
sleep 1
take_screenshot "04b-profile-scrolled" "Profile Page (scrolled)"

# ============================================
# SCREEN 5: Search/Matching Page
# ============================================
echo ""
echo -e "${CYAN}════════════════════════════════════════${NC}"
echo -e "${CYAN}SCREEN 5: Search/Matching Page${NC}"
echo -e "${CYAN}════════════════════════════════════════${NC}"

echo "Navigate to Search page..."
echo "Tap 'Search' or 'Find Workers/Contractors' in navigation"
manual_check "Open Search page, then press Enter"

take_screenshot "05-search-page" "Search/Matching Page"
check_logs "05-search-page"

manual_check "
  ✓ Search filters visible
  ✓ Location selector working
  ✓ Skill type dropdown accessible
  ✓ Search button visible
  ✓ Results display properly (if any)"

# ============================================
# SCREEN 6: Messages Page (List)
# ============================================
echo ""
echo -e "${CYAN}════════════════════════════════════════${NC}"
echo -e "${CYAN}SCREEN 6: Messages Page (Chat List)${NC}"
echo -e "${CYAN}════════════════════════════════════════${NC}"

echo "Navigate to Messages page..."
echo "Tap 'Messages' in navigation"
manual_check "Open Messages page, then press Enter"

take_screenshot "06-messages-list" "Messages Chat List"
check_logs "06-messages-list"

manual_check "
  ✓ Chat list visible
  ✓ Team members shown (6 members)
  ✓ Online status indicators visible
  ✓ Last message preview visible
  ✓ New message button accessible
  ✓ No layout overflow"

# ============================================
# SCREEN 7: Chat Window
# ============================================
echo ""
echo -e "${CYAN}════════════════════════════════════════${NC}"
echo -e "${CYAN}SCREEN 7: Chat Window${NC}"
echo -e "${CYAN}════════════════════════════════════════${NC}"

echo "Open a chat..."
echo "Tap on any team member in the list"
manual_check "Open a chat conversation, then press Enter"

take_screenshot "07-chat-window" "Chat Window"
check_logs "07-chat-window"

manual_check "
  ✓ Back button visible
  ✓ Chat header with name/status visible
  ✓ Message bubbles display properly
  ✓ Message timestamps visible
  ✓ No text cutoff in bubbles
  ✓ Chat scrolls smoothly"

# ============================================
# SCREEN 8: Message Input Area (CRITICAL)
# ============================================
echo ""
echo -e "${CYAN}════════════════════════════════════════${NC}"
echo -e "${CYAN}SCREEN 8: Message Input (CRITICAL FIX)${NC}"
echo -e "${CYAN}════════════════════════════════════════${NC}"

echo "Scroll to bottom to see input area..."
adb shell input swipe 500 500 500 1500 300
sleep 1

take_screenshot "08-message-input" "Message Input Area"
check_logs "08-message-input"

echo "Tap on message input field..."
adb shell input tap 500 1800
sleep 1

take_screenshot "08b-message-input-focused" "Message Input (Focused)"

manual_check "
  ✓ Text input box visible and full-width
  ✓ Emoji button SMALL and proportional (32px)
  ✓ Send button visible on right (32px)
  ✓ All three elements fit in one line
  ✓ No horizontal scrolling
  ✓ Keyboard doesn't hide input
  ✓ Can type in text box
  
  IMPORTANT: Emoji should be SMALL, not oversized!"

# Type test message
echo "Typing test message..."
adb shell input text "Test_message_from_emulator"
sleep 1
take_screenshot "08c-message-typed" "Message Input (Text Typed)"

# ============================================
# SCREEN 9: Team Page
# ============================================
echo ""
echo -e "${CYAN}════════════════════════════════════════${NC}"
echo -e "${CYAN}SCREEN 9: Team/Saved Matches Page${NC}"
echo -e "${CYAN}════════════════════════════════════════${NC}"

# Go back first
adb shell input keyevent 4
sleep 1
adb shell input keyevent 4
sleep 1

echo "Navigate to Team page..."
echo "Tap 'Team' or 'My Team' in navigation"
manual_check "Open Team page, then press Enter"

take_screenshot "09-team-page" "Team/Saved Matches Page"
check_logs "09-team-page"

manual_check "
  ✓ Team members list visible
  ✓ Member cards properly sized
  ✓ Action buttons accessible
  ✓ Map view button (if available)
  ✓ No layout issues"

# ============================================
# SCREEN 10: Status Page
# ============================================
echo ""
echo -e "${CYAN}════════════════════════════════════════${NC}"
echo -e "${CYAN}SCREEN 10: Status/Availability Page${NC}"
echo -e "${CYAN}════════════════════════════════════════${NC}"

echo "Navigate to Status page..."
echo "Tap 'Status' in navigation"
manual_check "Open Status page, then press Enter"

take_screenshot "10-status-page" "Status/Availability Page"
check_logs "10-status-page"

manual_check "
  ✓ Current status visible
  ✓ Status toggle/options accessible
  ✓ Availability settings visible
  ✓ No layout issues"

# ============================================
# SCREEN 11: Navigation Bar
# ============================================
echo ""
echo -e "${CYAN}════════════════════════════════════════${NC}"
echo -e "${CYAN}SCREEN 11: Navigation Bar Test${NC}"
echo -e "${CYAN}════════════════════════════════════════${NC}"

take_screenshot "11-navbar" "Navigation Bar"

manual_check "
  ✓ All nav items visible
  ✓ Icons properly sized
  ✓ Text labels readable
  ✓ Active state highlighted
  ✓ No overlap on mobile"

# ============================================
# TEST AUTO-LOGIN
# ============================================
echo ""
echo -e "${CYAN}════════════════════════════════════════${NC}"
echo -e "${CYAN}SCREEN 12: Auto-Login Test${NC}"
echo -e "${CYAN}════════════════════════════════════════${NC}"

echo "Testing auto-login feature..."
echo "Closing app..."
adb shell am force-stop com.comeondost.app
sleep 2

echo "Reopening app..."
adb shell am start -n com.comeondost.app/.MainActivity
sleep 4

take_screenshot "12-reopen-autologin" "App Reopened (Auto-Login)"
check_logs "12-reopen-autologin"

manual_check "
  ✓ Should open directly to DASHBOARD
  ✓ Should NOT show login page
  ✓ User should remain logged in
  ✓ Session persisted correctly"

# ============================================
# NOTIFICATION TEST
# ============================================
echo ""
echo -e "${CYAN}════════════════════════════════════════${NC}"
echo -e "${CYAN}SCREEN 13: Notification Permission${NC}"
echo -e "${CYAN}════════════════════════════════════════${NC}"

echo "Checking notification permission status..."
NOTIF_STATUS=$(adb shell dumpsys notification | grep -i "comeondost" | head -5)
echo "$NOTIF_STATUS" > "$SCREENSHOT_DIR/13-notification-status.txt"

if [[ "$NOTIF_STATUS" == *"enabled"* ]]; then
    echo -e "${GREEN}✓ Notifications are ENABLED${NC}"
else
    echo -e "${YELLOW}⚠️  Notifications status unclear${NC}"
fi

manual_check "
  ✓ Did you see notification permission prompt?
  ✓ Did you grant permission?
  ✓ Check Settings > Apps > Come On Dost > Notifications"

# ============================================
# PERFORMANCE CHECK
# ============================================
echo ""
echo -e "${CYAN}════════════════════════════════════════${NC}"
echo -e "${CYAN}Performance & Memory Check${NC}"
echo -e "${CYAN}════════════════════════════════════════${NC}"

echo "Getting memory usage..."
adb shell dumpsys meminfo com.comeondost.app > "$SCREENSHOT_DIR/memory-usage.txt"
echo -e "${GREEN}✓ Memory usage saved${NC}"

echo "Getting CPU usage..."
adb shell top -n 1 | grep comeondost > "$SCREENSHOT_DIR/cpu-usage.txt"
echo -e "${GREEN}✓ CPU usage saved${NC}"

# ============================================
# GENERATE REPORT
# ============================================
echo ""
echo -e "${CYAN}════════════════════════════════════════${NC}"
echo -e "${CYAN}Generating Debug Report${NC}"
echo -e "${CYAN}════════════════════════════════════════${NC}"

REPORT="$SCREENSHOT_DIR/DEBUG_REPORT.txt"
cat > "$REPORT" << EOF
============================================
EMULATOR DEBUG REPORT
============================================
Date: $(date)
Device: $(adb shell getprop ro.product.model)
Android Version: $(adb shell getprop ro.build.version.release)
App Package: com.comeondost.app

============================================
SCREENS TESTED
============================================
01. Home Page (Logged Out)
02. Login Page
03. Dashboard
04. Profile Page
05. Search/Matching Page
06. Messages List
07. Chat Window
08. Message Input Area (CRITICAL FIX)
09. Team/Saved Matches Page
10. Status/Availability Page
11. Navigation Bar
12. Auto-Login Test
13. Notification Permission

============================================
CRITICAL FIXES TESTED
============================================
1. Message Input Rendering
   - Emoji button size (should be 32px)
   - Text input full width
   - Send button visible
   - No horizontal scroll

2. Profile Page Mobile
   - Full width on mobile
   - No overflow
   - Responsive layout
   - Scrollable content

3. Auto-Login
   - Session persistence
   - Direct to dashboard
   - No repeated login

============================================
FILES GENERATED
============================================
- 15+ screenshots in PNG format
- Error logs for each screen
- Memory usage report
- CPU usage report
- This debug report

============================================
NEXT STEPS
============================================
1. Review all screenshots for visual issues
2. Check error logs for JavaScript errors
3. Verify responsive behavior on different screen sizes
4. Test on real device if possible
5. Upload updated APK to Google Drive

============================================
EOF

echo -e "${GREEN}✓ Debug report generated${NC}"

# ============================================
# SUMMARY
# ============================================
echo ""
echo -e "${CYAN}=============================================${NC}"
echo -e "${CYAN}  Debug Complete!${NC}"
echo -e "${CYAN}=============================================${NC}"
echo ""
echo -e "${GREEN}All screenshots saved to:${NC}"
echo "  $SCREENSHOT_DIR"
echo ""
echo -e "${BLUE}Generated files:${NC}"
ls -lh "$SCREENSHOT_DIR" | awk '{print "  "$9}'
echo ""
echo -e "${YELLOW}Review the screenshots to identify any layout issues${NC}"
echo ""

# Open screenshot directory
echo "Open screenshots folder? (y/n)"
read -p "" open_folder

if [[ "$open_folder" == "y" ]]; then
    open "$SCREENSHOT_DIR"
fi

echo ""
echo -e "${GREEN}Debug session complete!${NC}"
