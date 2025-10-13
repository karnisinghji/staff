# GitHub Pages Cache Clearing Guide
**Issue:** Browser still loading old cached JavaScript bundle  
**Evidence:** Still seeing `index-P90yXLtf.js` instead of `index-B3Gyfc_R.js`

---

## 🔍 How to Confirm You Have the Cache Issue

Look for these in browser console:
- ❌ `index-P90yXLtf.js` (OLD bundle)
- ❌ `localhost:3003` connection errors
- ❌ "Demo mode: Simulating API call" messages

After clearing cache, you should see:
- ✅ `index-B3Gyfc_R.js` (NEW bundle)
- ✅ No localhost errors
- ✅ Calls to `matching-service-production.up.railway.app`

---

## 🔧 Step-by-Step Cache Clearing

### **Method 1: Hard Refresh (Recommended - Takes 5 seconds)**

#### Chrome / Edge:
1. Open the website: https://karnisinghji.github.io/staff/
2. Press: **`Cmd + Shift + R`** (Mac) or **`Ctrl + Shift + R`** (Windows/Linux)
3. OR Right-click refresh button → "Empty Cache and Hard Reload"

#### Safari:
1. Open the website
2. Press: **`Cmd + Option + R`**
3. OR Go to Develop → Empty Caches (then reload)

#### Firefox:
1. Open the website  
2. Press: **`Ctrl + Shift + R`** (Windows/Linux) or **`Cmd + Shift + R`** (Mac)
3. OR Press `Ctrl + F5`

---

### **Method 2: Clear All Cache (Most Thorough - Takes 30 seconds)**

#### Chrome:
1. Open Chrome
2. Press `Cmd + Shift + Delete` (Mac) or `Ctrl + Shift + Delete` (Windows/Linux)
3. Select "Cached images and files"
4. Time range: "Last hour" or "All time"
5. Click "Clear data"
6. Reload https://karnisinghji.github.io/staff/

#### Safari:
1. Safari → Settings → Privacy → Manage Website Data
2. Search for "karnisinghji.github.io"
3. Click "Remove"
4. Close settings
5. Reload the page

#### Firefox:
1. Press `Cmd + Shift + Delete` (Mac) or `Ctrl + Shift + Delete` (Windows/Linux)
2. Select "Cache"
3. Time range: "Everything"
4. Click "Clear Now"
5. Reload the page

---

### **Method 3: Incognito/Private Window (For Testing - Takes 10 seconds)**

This is useful to test if cache is the issue:

#### Chrome:
1. Press `Cmd + Shift + N` (Mac) or `Ctrl + Shift + N` (Windows/Linux)
2. Visit: https://karnisinghji.github.io/staff/
3. Check console - should show new bundle

#### Safari:
1. Press `Cmd + Shift + N`
2. Visit: https://karnisinghji.github.io/staff/

#### Firefox:
1. Press `Cmd + Shift + P` (Mac) or `Ctrl + Shift + P` (Windows/Linux)
2. Visit: https://karnisinghji.github.io/staff/

---

### **Method 4: Disable Cache in DevTools (For Development)**

This prevents caching while DevTools is open:

1. Open DevTools (`F12` or `Cmd + Option + I`)
2. Go to **Network** tab
3. Check ✅ **"Disable cache"** checkbox at the top
4. Keep DevTools open
5. Reload the page

**Note:** Cache only stays disabled while DevTools is open.

---

## ✅ How to Verify the Fix Worked

After clearing cache, open browser console and check:

### 1. Check Bundle Name
Look in the **Network** tab or **Sources** tab:
- ✅ Should see: `index-B3Gyfc_R.js`
- ❌ Should NOT see: `index-P90yXLtf.js`

### 2. Check API Calls
Look in the **Console** tab or **Network** tab:
- ✅ Should see: `https://matching-service-production.up.railway.app/api/matching/team-requests/received`
- ❌ Should NOT see: `http://localhost:3003/api/matching/team-requests/received`

### 3. Check for Demo Mode
Look in the **Console** tab:
- ❌ Should NOT see: "Demo mode: Simulating API call"
- ✅ Should see: Clean console or real API responses

### 4. Check HTML Comment
View page source (`Cmd+U` or `Ctrl+U`):
- ✅ Should see: `<!-- Build: 2025-10-10T11:50:00Z - NotificationBell fix deployed -->`

---

## 🐛 If Cache Clearing Doesn't Work

### Step 1: Check Service Worker
Some apps use service workers that aggressively cache:

1. Open DevTools
2. Go to **Application** tab (Chrome) or **Storage** tab (Firefox)
3. Click **Service Workers** in the left sidebar
4. Click **Unregister** on any service workers
5. Reload the page

### Step 2: Clear All Site Data
In Chrome DevTools:
1. Open DevTools (`F12`)
2. Go to **Application** tab
3. In left sidebar, click **Storage** or **Clear storage**
4. Click **"Clear site data"** button
5. Reload the page

### Step 3: Check if GitHub Pages CDN Updated
The CDN should update within 10 minutes. Check current status:

```bash
curl -s https://karnisinghji.github.io/staff/ | grep -o 'index-[A-Za-z0-9_-]*\.js'
```

Expected output: `index-B3Gyfc_R.js`

If still showing old bundle, wait 5 more minutes and try again.

---

## 📱 Mobile Devices

### iOS Safari:
1. Settings → Safari → Clear History and Website Data
2. Confirm
3. Open Safari and visit the site

### Android Chrome:
1. Chrome → Settings → Privacy → Clear browsing data
2. Select "Cached images and files"
3. Tap "Clear data"
4. Reload the page

---

## 🔄 Alternative: Use Cache-Busting URL

As a temporary workaround, add a version parameter:

```
https://karnisinghji.github.io/staff/?v=20251010
```

This forces the browser to treat it as a new URL and bypass cache.

---

## 🎯 Expected Behavior After Fix

### Before (OLD bundle - `index-P90yXLtf.js`):
```
❌ Demo mode: Simulating API call to /api/auth/login
❌ GET http://localhost:3003/api/matching/team-requests/received net::ERR_CONNECTION_REFUSED
❌ Error fetching team requests: TypeError: Failed to fetch
```

### After (NEW bundle - `index-B3Gyfc_R.js`):
```
✅ API Config: {isProduction: true, API_CONFIG: {...}}
✅ GET https://matching-service-production.up.railway.app/api/matching/team-requests/received (Status: 200 or 401)
✅ No "Demo mode" messages
✅ No "localhost" connection errors
```

---

## 💡 Why This Happened

### Local Development Works Because:
- Vite dev server (`npm run dev`) serves fresh code directly
- No caching between source files and browser
- Every change is immediately reflected

### Production GitHub Pages Has Cache Because:
- **Browser cache:** Your browser saves JS/CSS files locally
- **CDN cache:** GitHub's CDN caches files globally
- **Service worker cache:** If the app uses service workers
- **HTTP cache headers:** Tell browsers to cache for performance

This is **normal and expected** - caching makes websites load faster for users. But during development/deployment, you need to manually clear it.

---

## 🚀 Future Prevention

To avoid this in future deployments:

### Option 1: Use Versioned Filenames (Already Implemented)
Vite automatically generates new filenames with hashes:
- Old: `index-P90yXLtf.js`
- New: `index-B3Gyfc_R.js`

This means once cache clears, you'll always get the latest version.

### Option 2: Always Test in Incognito
After deploying, test in incognito window first to see fresh version.

### Option 3: Keep DevTools Cache Disabled
While developing, keep "Disable cache" checked in Network tab.

---

## 📞 Need Help?

If you've tried all methods and still see the old bundle:

1. Check browser console and note the bundle name
2. Check GitHub Actions to confirm deployment succeeded
3. Wait 15 minutes for CDN to fully propagate
4. Try from a different device or network

---

**TL;DR: Press `Cmd + Shift + R` (Mac) or `Ctrl + Shift + R` (Windows) to force refresh!** 🔄
