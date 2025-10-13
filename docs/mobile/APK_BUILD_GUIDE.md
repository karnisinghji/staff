# 📦 APK Build & Distribution Guide

## **Build Traditional Android APK**

### 🛠️ **Prerequisites**

1. **Android Studio** (Download from: https://developer.android.com/studio)
2. **Java Development Kit (JDK) 11+**
3. **Our project** already set up with Capacitor

### 🏗️ **Build APK Steps**

#### **Step 1: Open Android Studio**
```bash
# Open Android Studio and select "Open an existing project"
# Navigate to: frontend/android/
```

#### **Step 2: Sync Project**
- Android Studio will automatically sync Gradle files
- Wait for "Gradle sync completed" message
- If sync fails, click "Sync Now" or "Retry"

#### **Step 3: Build APK**
```bash
# In Android Studio:
# 1. Go to "Build" menu
# 2. Select "Build Bundle(s) / APK(s)"
# 3. Choose "Build APK(s)"
# 4. Wait for build to complete
```

#### **Step 4: Locate APK**
```bash
# APK will be created at:
# frontend/android/app/build/outputs/apk/debug/app-debug.apk
```

### 🚀 **Alternative: Command Line Build**

```bash
# Navigate to project root
cd /Users/shouryaveersingh/Desktop/old\ data/staff

# Build the web app first
cd frontend
npm run build

# Sync with Capacitor
npx cap sync android

# Build APK using Gradle
cd android
./gradlew assembleDebug

# APK location: app/build/outputs/apk/debug/app-debug.apk
```

### 📱 **Production APK (Release Build)**

```bash
# For production/release APK:
cd frontend/android
./gradlew assembleRelease

# Location: app/build/outputs/apk/release/app-release-unsigned.apk
```

### 🔐 **Signing APK (For Distribution)**

#### **Generate Keystore**
```bash
keytool -genkey -v -keystore contractor-platform.keystore -keyalg RSA -keysize 2048 -validity 10000 -alias contractor-platform
```

#### **Sign APK**
```bash
jarsigner -verbose -sigalg SHA1withRSA -digestalg SHA1 -keystore contractor-platform.keystore app-release-unsigned.apk contractor-platform
```

### 📦 **Distribution Options**

#### **1. Direct File Sharing**
- Share `app-debug.apk` via email, cloud storage, or messaging
- Users need to enable "Install from Unknown Sources"

#### **2. Own Website Distribution**
```html
<!-- Add to your website -->
<a href="/downloads/contractor-platform.apk" download>
  <button>Download Android APK</button>
</a>
```

#### **3. File Hosting Services**
- **Google Drive**: Share APK with download link
- **Dropbox**: Public download links
- **Firebase Hosting**: Professional APK distribution
- **GitHub Releases**: Version-controlled APK releases

### 📋 **APK Installation Instructions for Users**

#### **For Android Users:**

1. **Download APK** from your distribution method
2. **Enable Unknown Sources**:
   - Go to Settings → Security → Unknown Sources
   - Or Settings → Apps → Special Access → Install Unknown Apps
3. **Install APK**:
   - Tap the downloaded APK file
   - Tap "Install" when prompted
   - Wait for installation to complete
4. **Launch App**:
   - Find "Contractor Platform" in app drawer
   - Tap to open and start using

### ⚠️ **Important Notes**

- **Debug APK**: For testing only, larger file size
- **Release APK**: Optimized for distribution, requires signing
- **Permissions**: Users will be prompted for camera, location, etc.
- **Updates**: Manual APK updates require new download/install

### 🔧 **Troubleshooting**

**Build Failed?**
```bash
# Clean and rebuild
cd frontend/android
./gradlew clean
./gradlew assembleDebug
```

**"Unknown Sources" Option Missing?**
- Look for "Install Unknown Apps" in newer Android versions
- Some phones have it under "Special Access" in app settings

**APK Won't Install?**
- Check Android version compatibility (Android 5.0+)
- Verify APK is not corrupted
- Try uninstalling old version first

### 📊 **APK Size Optimization**

```json
// Add to android/app/build.gradle
android {
    buildTypes {
        release {
            minifyEnabled true
            shrinkResources true
            proguardFiles getDefaultProguardFile('proguard-android-optimize.txt'), 'proguard-rules.pro'
        }
    }
}
```

### 🎯 **Next Steps**

1. **Build your APK** using Android Studio
2. **Test installation** on physical device
3. **Choose distribution method** (direct sharing, website, etc.)
4. **Share with users** along with installation instructions

**Need help?** Check our troubleshooting section or contact support!