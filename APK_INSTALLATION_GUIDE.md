# Come On Dost - Android APK Installation Guide

## Quick Start

Your Android APK is ready! Follow these simple steps to install it on your device.

## 📱 Installation Methods

### Method 1: Install via USB (Recommended)

1. **Enable Developer Options on your Android device:**
   - Go to **Settings → About Phone**
   - Tap **Build Number** 7 times
   - You'll see "You are now a developer!"

2. **Enable USB Debugging:**
   - Go to **Settings → Developer Options**
   - Toggle **USB Debugging** ON

3. **Connect your device to computer:**
   - Use USB cable to connect phone to your Mac
   - On phone, tap **"Allow"** when prompted to trust this computer

4. **Install the APK:**
   ```bash
   cd "/Users/shouryaveersingh/Desktop/old data/staff/frontend/android/app/build/outputs/apk/release"
   adb install -r app-release.apk
   ```

5. **Launch the app:**
   - Find "Come On Dost" icon (green with "CD" logo) in your app drawer
   - Tap to open!

### Method 2: Direct Install (No Computer)

1. **Enable Unknown Sources:**
   - Go to **Settings → Security**
   - Toggle **"Install from Unknown Sources"** ON
   - (Or allow installation for specific app like Files/Chrome)

2. **Transfer APK to phone:**
   - Copy `app-release.apk` to your phone via:
     - Google Drive / Dropbox
     - Email attachment
     - WhatsApp file share
     - Bluetooth
     - USB cable (copy to Downloads folder)

3. **Install:**
   - Open **Files** app or **Downloads**
   - Tap on `app-release.apk`
   - Tap **"Install"**
   - Tap **"Open"** when installation completes

### Method 3: Web Download (Coming Soon)

Upload the APK to a hosting service and share the link:
- Firebase Hosting
- Google Drive (enable link sharing)
- Dropbox
- Your own web server

## 📋 What You'll Need to Allow

When you first launch the app, you'll be asked for these permissions:

### Required Permissions
- ✅ **Location** - For GPS tracking and finding nearby workers/contractors
- ✅ **Internet** - To connect with other users and backend services

### Optional Permissions  
- 📷 **Camera** - For profile pictures (future feature)
- 💾 **Storage** - For message attachments (future feature)

## 🎯 First Launch Setup

1. **Location Detection:**
   - App will ask for location permission
   - Tap **"Allow"** to enable GPS tracking
   - Wait a few seconds for initial location detection

2. **Login:**
   - Use your existing account credentials
   - Or create a new account if first time user

3. **Messages Tab:**
   - App opens directly to **Messages** tab
   - You'll see your team members (if you have any)
   - Green status = online, gray = offline

## ✅ Verify Installation

After installing, check these features work:

### Test Location
- Go to search page
- Tap **"Use My Location"** button
- Should detect your city within 5 seconds
- Status should show "Using GPS location"

### Test Messages
- Go to **My Team → Messages** tab
- Should see your team members (if any)
- Online status should show correctly
- Can send messages to team members

### Test Profile
- Go to **Profile** page
- Should load your user information
- Can edit contact details

## 🔧 Troubleshooting

### App won't install
**Error: "App not installed"**
- Solution: Uninstall old version first, then try again
- Or use `adb install -r` to replace

### Location not working
**"Location permission denied"**
- Solution: Go to **Settings → Apps → Come On Dost → Permissions**
- Enable **Location** with **"Allow all the time"**

### Can't find app icon
- Check app drawer (swipe up from home screen)
- Search for "Come On Dost" in app list
- Icon is green with white "CD" logo

### Messages not loading
**"Failed to load messages"**
- Check internet connection
- Make sure you're logged in
- Backend services might be starting up (wait 30 seconds)

### Login issues
**"Invalid credentials" or "Token expired"**
- Clear app data: **Settings → Apps → Come On Dost → Storage → Clear Data**
- Login again with correct credentials

## 📊 App Information

**What the app does:**
- Matches workers with contractors based on skills and location
- Real-time GPS tracking for availability
- WhatsApp-style messaging with team members
- Team management with activity tracking
- Distance-based search (100+ Indian cities)

**Data Usage:**
- Very light (~1-2 MB per hour of active use)
- Messages use minimal data (text only currently)
- Location updates every 5 minutes when active
- Mostly uses data when searching or messaging

**Battery Usage:**
- Low battery usage with smart location tracking
- GPS only active when needed (not constant)
- Background location updates optimized
- No significant battery drain

**Storage:**
- App size: 8.7 MB
- Additional data: ~10-20 MB for cache and messages
- Total: ~20-30 MB after installation

## 🚀 Key Features to Try

### 1. Find Workers/Contractors
- Go to **Search** page
- Select skill type (electrician, plumber, carpenter, etc.)
- App auto-detects your location via GPS
- See results sorted by distance
- Send team request to connect

### 2. Team Management
- Go to **My Team** tab
- See all your team members
- View their online/offline status
- Check last active time
- Contact directly

### 3. WhatsApp-Style Messaging
- Go to **Messages** tab (default)
- See conversations with team members only
- Real-time online status (green dot)
- Send messages with optimistic updates
- Delete messages (long press → 🗑️)

### 4. Location Tracking
- Auto-detect on app launch
- Manual refresh with **"Use My Location"** button
- Works with GPS and cell towers
- Supports 100+ Indian cities
- Smart caching (5 min auto)

## 📱 Device Compatibility

**Minimum Requirements:**
- Android 5.1 (Lollipop) or higher
- 50 MB free storage
- Internet connection (WiFi or mobile data)
- GPS or network location enabled

**Recommended:**
- Android 8.0 (Oreo) or higher
- 100 MB free storage
- 4G/5G mobile data or WiFi
- GPS enabled for accurate location

**Tested Devices:**
- ✅ Android 14 (latest)
- ✅ Android 10-13
- ⚠️ Android 5.1-9 (should work, not fully tested)

## 🔐 Security & Privacy

### Your Data
- All data encrypted in transit (HTTPS)
- Location data only shared with team members
- Messages are private (no public posts)
- Can delete messages anytime

### Permissions
- Location: Only used for matching and availability
- Internet: Required for app functionality
- No access to contacts, SMS, or phone calls
- No background audio or video recording

### Account Security
- Password hashed with bcrypt
- JWT tokens expire after 24 hours
- Secure session management
- Can logout anytime

## 📞 Support

### Need Help?
- Check troubleshooting section above
- Review app features guide
- Contact support through app (coming soon)

### Found a Bug?
Please report with:
- Device model and Android version
- Steps to reproduce the issue
- Screenshots if possible
- What you expected vs what happened

### Feature Requests
We'd love to hear your ideas:
- Voice messages
- Image attachments
- Group chats
- Video calls
- Job posting system

## 🎨 App Branding

**Icon:** Green background with white "CD" logo  
**Theme:** WhatsApp green (#25D366)  
**Style:** Modern, clean, professional

**Why green?**
- Represents growth and opportunity
- Matches successful messaging apps
- Easy to spot in app drawer
- Professional yet friendly

---

## 📝 Quick Reference

**APK Location:**
```
frontend/android/app/build/outputs/apk/release/app-release.apk
```

**App Details:**
- Name: Come On Dost
- Package: com.comeondost.app
- Version: 1.0.0
- Size: 8.7 MB
- Platform: Android 5.1+

**Install Command:**
```bash
adb install -r app-release.apk
```

**Uninstall Command:**
```bash
adb uninstall com.comeondost.app
```

---

**Ready to install? Let's go! 🚀**

Choose your installation method above and follow the steps. The app will be ready to use in less than 2 minutes!
