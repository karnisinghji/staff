#!/bin/bash
# Android Emulator Testing Script for Come On Dost APK

# Colors for output
GREEN='\033[0;32m'
BLUE='\033[0;34m'
YELLOW='\033[1;33m'
RED='\033[0;31m'
NC='\033[0m' # No Color

# Set Android SDK paths
export ANDROID_HOME=~/Library/Android/sdk
export PATH=$PATH:$ANDROID_HOME/emulator:$ANDROID_HOME/platform-tools

APK_PATH="frontend/android/app/build/outputs/apk/release/app-release.apk"

echo -e "${BLUE}━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━${NC}"
echo -e "${GREEN}  Come On Dost - APK Emulator Testing${NC}"
echo -e "${BLUE}━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━${NC}"
echo ""

# Function to check if emulator is running
check_emulator() {
    adb devices | grep -q "emulator"
}

# Function to wait for emulator to boot
wait_for_boot() {
    echo -e "${YELLOW}⏳ Waiting for emulator to fully boot...${NC}"
    adb wait-for-device
    
    # Wait for boot animation to finish
    while [ "$(adb shell getprop init.svc.bootanim 2>/dev/null | tr -d '\r')" != "stopped" ]; do
        sleep 2
        echo -n "."
    done
    echo ""
    echo -e "${GREEN}✓ Emulator is ready!${NC}"
}

# Menu
echo "What would you like to do?"
echo ""
echo "1) Start emulator"
echo "2) Install APK"
echo "3) Start + Install APK"
echo "4) Open app"
echo "5) Uninstall app"
echo "6) View logs"
echo "7) Take screenshot"
echo "8) Stop emulator"
echo ""
read -p "Enter choice [1-8]: " choice

case $choice in
    1)
        echo -e "${BLUE}Starting Android Emulator...${NC}"
        emulator -list-avds
        echo ""
        read -p "Enter AVD name (or press Enter for Pixel_4_API_33): " avd_name
        avd_name=${avd_name:-Pixel_4_API_33}
        
        echo -e "${YELLOW}🚀 Launching emulator: $avd_name${NC}"
        emulator -avd $avd_name &
        
        wait_for_boot
        echo -e "${GREEN}✓ Emulator started successfully!${NC}"
        ;;
        
    2)
        if ! check_emulator; then
            echo -e "${RED}❌ No emulator running. Please start emulator first (option 1).${NC}"
            exit 1
        fi
        
        if [ ! -f "$APK_PATH" ]; then
            echo -e "${RED}❌ APK not found at: $APK_PATH${NC}"
            echo -e "${YELLOW}Run: cd frontend/android && ./gradlew assembleRelease${NC}"
            exit 1
        fi
        
        echo -e "${BLUE}📦 Installing APK...${NC}"
        adb install -r "$APK_PATH"
        
        if [ $? -eq 0 ]; then
            echo -e "${GREEN}✓ APK installed successfully!${NC}"
            echo -e "${YELLOW}💡 Tap the app icon to launch, or use option 4${NC}"
        else
            echo -e "${RED}❌ Failed to install APK${NC}"
        fi
        ;;
        
    3)
        echo -e "${BLUE}Starting emulator and installing APK...${NC}"
        
        # Start emulator
        echo -e "${YELLOW}🚀 Launching emulator...${NC}"
        emulator -avd Pixel_4_API_33 &
        wait_for_boot
        
        # Install APK
        if [ ! -f "$APK_PATH" ]; then
            echo -e "${RED}❌ APK not found at: $APK_PATH${NC}"
            exit 1
        fi
        
        echo -e "${BLUE}📦 Installing APK...${NC}"
        adb install -r "$APK_PATH"
        
        if [ $? -eq 0 ]; then
            echo -e "${GREEN}✓ Complete! App is ready to test.${NC}"
            echo -e "${YELLOW}💡 Launching app...${NC}"
            adb shell am start -n com.comeondost.app/.MainActivity
        fi
        ;;
        
    4)
        if ! check_emulator; then
            echo -e "${RED}❌ No emulator running.${NC}"
            exit 1
        fi
        
        echo -e "${BLUE}🚀 Launching app...${NC}"
        adb shell am start -n com.comeondost.app/.MainActivity
        echo -e "${GREEN}✓ App launched!${NC}"
        ;;
        
    5)
        if ! check_emulator; then
            echo -e "${RED}❌ No emulator running.${NC}"
            exit 1
        fi
        
        echo -e "${YELLOW}🗑️  Uninstalling app...${NC}"
        adb uninstall com.comeondost.app
        echo -e "${GREEN}✓ App uninstalled!${NC}"
        ;;
        
    6)
        if ! check_emulator; then
            echo -e "${RED}❌ No emulator running.${NC}"
            exit 1
        fi
        
        echo -e "${BLUE}📜 Showing app logs (Ctrl+C to stop)...${NC}"
        echo ""
        adb logcat | grep -i "comeondost\|chromium\|console"
        ;;
        
    7)
        if ! check_emulator; then
            echo -e "${RED}❌ No emulator running.${NC}"
            exit 1
        fi
        
        timestamp=$(date +%Y%m%d_%H%M%S)
        screenshot_file="screenshot_$timestamp.png"
        
        echo -e "${BLUE}📸 Taking screenshot...${NC}"
        adb exec-out screencap -p > "$screenshot_file"
        
        if [ $? -eq 0 ]; then
            echo -e "${GREEN}✓ Screenshot saved: $screenshot_file${NC}"
            open "$screenshot_file"
        else
            echo -e "${RED}❌ Failed to take screenshot${NC}"
        fi
        ;;
        
    8)
        if ! check_emulator; then
            echo -e "${YELLOW}No emulator running.${NC}"
            exit 0
        fi
        
        echo -e "${YELLOW}🛑 Stopping emulator...${NC}"
        adb emu kill
        echo -e "${GREEN}✓ Emulator stopped!${NC}"
        ;;
        
    *)
        echo -e "${RED}Invalid choice${NC}"
        exit 1
        ;;
esac

echo ""
echo -e "${BLUE}━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━${NC}"
