# Come On Dost - Android APK Release Information

## APK Details

**App Name:** Come On Dost  
**Package ID:** com.comeondost.app  
**Version:** 1.0.0  
**APK Size:** 8.7 MB  
**Build Date:** October 26, 2024  

## APK Locations

### Signed Release APK (Play Store Ready)
```
frontend/android/app/build/outputs/apk/release/app-release.apk
```
**File Size:** 8.7 MB  
**Status:** ✅ Signed with release key  
**Purpose:** Ready for Google Play Store distribution

### Debug APK (Testing)
```
frontend/android/app/build/outputs/apk/debug/app-debug.apk
```
**File Size:** 9.6 MB  
**Purpose:** For development and testing

## Branding & Assets

### Custom Icon
- **Design:** WhatsApp green (#25D366) background with white circle
- **Logo:** "CD" text representing "Come On Dost"
- **Format:** Adaptive icon with foreground and background layers
- **Generated Densities:** 
  - mipmap-ldpi (36x36)
  - mipmap-mdpi (48x48)
  - mipmap-hdpi (72x72)
  - mipmap-xhdpi (96x96)
  - mipmap-xxhdpi (144x144)
  - mipmap-xxxhdpi (192x192)

### Splash Screen
- **Design:** Gradient green background with "CD" logo
- **Text:** "Come On Dost" app name and tagline
- **Orientations:** Portrait and landscape
- **Generated Densities:** ldpi, mdpi, hdpi, xhdpi, xxhdpi, xxxhdpi
- **Dark Mode:** Separate splash screens for dark theme

## Signing Credentials

**⚠️ CRITICAL - KEEP SECURE - BACKUP REQUIRED**

### Keystore Information
```
Location: frontend/android/app/comeondost-release-key.jks
Key Algorithm: RSA 2048-bit
Format: PKCS12
Validity: 10,000 days (~27 years)
Created: October 26, 2024
```

### Distinguished Name
```
CN: Come On Dost
OU: Development
O: Come On Dost
L: Jaipur
ST: Rajasthan
C: IN
```

### Credentials
```
Store Password: comeondost123
Key Alias: comeondost
Key Password: comeondost123
```

**⚠️ IMPORTANT SECURITY NOTES:**
1. This keystore must be backed up to a secure location
2. If the keystore is lost, you CANNOT update the app on Play Store
3. Keep the passwords secure and private
4. Do not commit the keystore to public repositories

## App Configuration

### Capacitor Config
```typescript
{
  appId: 'com.comeondost.app',
  appName: 'Come On Dost',
  webDir: 'dist',
  server: {
    url: 'https://comeondost.web.app',
    cleartext: true
  },
  android: {
    allowMixedContent: true,
    useLegacyBridge: false
  }
}
```

### Android Manifest
- **Min SDK:** 22 (Android 5.1 Lollipop)
- **Target SDK:** 34 (Android 14)
- **Compile SDK:** 34

### Permissions
- Internet access
- Network state
- Location access (GPS for worker tracking)
- Camera (for profile pictures)
- Storage (for message attachments)

## Features Included

### ✅ Worker & Contractor Matching
- GPS-based location tracking
- Real-time availability updates
- Skill-based search with 100+ Indian cities
- Team request system

### ✅ Modern Messaging (WhatsApp-style)
- Real-time chat with 5-second polling
- Online/offline status based on location updates
- Message soft delete
- Team member filtering
- Optimistic updates

### ✅ Team Management
- My Team dashboard with tabs
- Team member profiles with contact info
- Activity tracking
- Distance-based sorting

### ✅ Location Services
- Auto-detect GPS location
- 100+ Indian cities supported
- Haversine distance calculation
- Smart caching (5 min auto, 1 min manual)
- Cell tower triangulation fallback

## Testing Checklist

### Before Distribution
- [ ] Install APK on test device
- [ ] Verify custom icon appears in launcher
- [ ] Verify splash screen displays correctly
- [ ] Test GPS location detection
- [ ] Test team member loading (should show 6 members for Ram Singh)
- [ ] Test messaging (should filter to accepted team members only)
- [ ] Test online/offline status
- [ ] Test soft delete (chat messages only)
- [ ] Test new message button
- [ ] Verify no crashes or errors

### Performance
- [ ] App launches within 3 seconds
- [ ] Messages load within 2 seconds
- [ ] Location detection completes within 5 seconds
- [ ] No memory leaks during extended use

## Distribution Options

### Option 1: Google Play Store (Recommended)
1. Create Google Play Developer account ($25 one-time fee)
2. Upload app-release.apk to Play Console
3. Fill in store listing details
4. Submit for review (typically 1-3 days)
5. Publish to production or internal testing

### Option 2: Direct Distribution
1. Enable "Install from Unknown Sources" on Android device
2. Transfer app-release.apk via USB or download link
3. Install directly on device
4. Note: Users must manually enable unknown sources

### Option 3: Enterprise Distribution
1. Host APK on secure server
2. Share download link with team members
3. Use Mobile Device Management (MDM) for fleet deployment

## Build Commands Reference

### Rebuild APK
```bash
cd frontend

# Build web bundle
npm run build

# Sync to Android
npx cap sync android

# Build release APK
cd android
./gradlew clean
./gradlew assembleRelease
```

### Regenerate Assets
```bash
cd frontend

# Edit resources/icon.svg or resources/splash.svg
# Then regenerate:
npx @capacitor/assets generate --iconBackgroundColor '#25D366' --splashBackgroundColor '#25D366'

# Sync and rebuild
npx cap sync android
cd android && ./gradlew assembleRelease
```

## Backend Services

The APK connects to these production Railway services:

- **Auth Service:** https://auth-service-production-d5c8.up.railway.app
- **User Service:** https://user-service-production-f141.up.railway.app
- **Matching Service:** https://matching-service-production.up.railway.app
- **Communication Service:** https://communication-service-production-c165.up.railway.app
- **Notification Service:** https://notification-service-production-8738.up.railway.app

## Support & Documentation

- **Frontend Repo:** comeondost.web.app (Firebase Hosting)
- **Database:** PostgreSQL on Neon
- **Architecture:** Hexagonal architecture with NPM workspaces
- **Git Branch:** "message" (messaging features), "main" (stable)

## Version History

### v1.0.0 (October 26, 2024)
- ✅ Initial release
- ✅ WhatsApp-style messaging UI
- ✅ Team member filtering (accepted only)
- ✅ Real online/offline status
- ✅ Soft delete for chat messages
- ✅ Custom green icon and splash screen
- ✅ GPS-based location tracking
- ✅ 100+ Indian cities support

## Known Issues

### Fixed in This Release
- ✅ Non-team members showing in conversations (Manoj bug)
- ✅ Conversation names showing "You"
- ✅ Online status always showing "online"
- ✅ Soft delete failing on team requests
- ✅ Database column name mismatches
- ✅ JWT parsing with sub/id fields

### Pending
- ⏳ WebSocket implementation for real-time notifications
- ⏳ Message attachments (images, documents)
- ⏳ Voice messages
- ⏳ Group chat support

## Contact

For technical support or questions:
- Developer: Shourya Veer Singh
- Platform: Worker & Contractor Matching
- Location: Jaipur, Rajasthan, India

---

**Last Updated:** October 26, 2024  
**Document Version:** 1.0
