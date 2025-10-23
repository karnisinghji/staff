# Team Map Location Guide

## Why Some Team Members Don't Show on Map

Team members need **valid GPS coordinates** (latitude/longitude) to appear on the map. Currently showing **"📍 Location not set"** means they haven't updated their location yet.

## The Issue

- **Narendra Sharma** and **Ramparkesh Kumawat** are showing in "My Team" list ✅
- But they DON'T appear on the team map ❌
- They have a city name ("Chomu", "गोविन्दगढ") but **NO GPS coordinates**

## Why This Happens

The system has two types of location data:

1. **Location String** (city name) - Examples: "Chomu", "गोविन्दगढ, Rajasthan"
   - ✅ Good for display
   - ❌ NOT precise enough for map markers
   
2. **GPS Coordinates** (latitude/longitude) - Examples: `27.245256, 75.657677`
   - ✅ Required for map markers
   - ✅ Shows exact position
   - ❌ Must be collected from mobile device

## How to Fix (For Team Members)

### Step 1: Open App on Mobile Device
- Go to https://comeondost.web.app
- Login with your account

### Step 2: Navigate to "My Team" Page
- Click on "My Team" in the navigation menu

### Step 3: Update Location
- Look for the **"📍 Update My Location"** button at the top
- Click it

### Step 4: Allow Location Access
- Browser will ask: "Allow comeondost.web.app to access your location?"
- Click **"Allow"** or **"Yes"**

### Step 5: Wait for Confirmation
- You'll see: ✅ **"Location updated successfully"**
- Your GPS coordinates are now saved

### Step 6: Verify on Map
- Your location will now appear on the team map
- Other team members can see your position
- **"📍 Location not set"** badge will disappear
- **"🗺️ View on Map"** button will appear

## What Changed in the UI

### Before Fix:
```
Narendra Sharma — electrician
worker • गोविन्दगढ, Rajasthan, India • Rating: 0.00
N/A
📞 Contact
📍 View Location History
```

### After Fix:
```
Narendra Sharma — electrician
worker • गोविन्दगढ, Rajasthan, India • Rating: 0.00
N/A
📞 Contact
📍 Location not set    ← NEW: Shows why no map button
📍 View Location History
```

### After User Updates Location:
```
Narendra Sharma — electrician
worker • गोविन्दगढ, Rajasthan, India • Rating: 0.00
N/A
📞 Contact
🗺️ View on Map    ← NOW AVAILABLE!
📍 View Location History
```

## For Developers: Testing Location Data

### Test Team Member Locations
```bash
# Get your JWT token from browser localStorage
# Then run:
node test-team-locations.js YOUR_JWT_TOKEN
```

This will show:
- ✅ Members with valid GPS coordinates
- ❌ Members without GPS coordinates
- Exact latitude/longitude values
- Which members need to update their location

### Test Worker Names in Search
```bash
node test-worker-names.js YOUR_JWT_TOKEN
```

This will show:
- ✅ Workers with real names (Hari Singh, Karni Singh)
- ❌ Workers showing "Worker 4fa4b7" (backend bug)

## Backend Fix Applied

Fixed bug in `matching-service/src/controllers/MatchingController.ts`:

**Before (Bug):**
```typescript
name: w.workerName || `Worker ${w.id?.slice(-6)}`
```

**After (Fixed):**
```typescript
name: w.name || `Worker ${w.id?.slice(-6)}`
```

The repository returns `name`, not `workerName`. This caused all worker names to fall back to "Worker [ID]".

## Map Features

### Unique Colors per Member
- Each team member gets a distinct color marker
- Colors: Blue, Green, Orange, Red, Purple, Yellow, Gray, Black
- Legend shows each member with their color

### Overlapping Markers
- If multiple members are at the same location, markers are automatically offset in a circular pattern
- Each marker remains clickable and shows member details

### Legend
Shows:
- Member name
- Unique color dot
- Availability status (🟢 Available / 🔴 Busy)

## Current Status

**Working Members (with GPS):**
- ✅ Hari Singh - lat: 27.245256, lng: 75.657677
- ✅ Karni Singh - lat: 27.245256, lng: 75.657677

**Need to Update Location:**
- ❌ Narendra Sharma - has city "गोविन्दगढ" but NO GPS coordinates
- ❌ Ramparkesh Kumawat - has city "Chomu" but NO GPS coordinates

## Auto-Tracking Feature

Once a user enables location tracking:
- Location is automatically saved every **30 minutes**
- Runs in background while app is open
- Location history is preserved
- Can be disabled anytime with "Stop Auto-Tracking" button

## Summary

**The map works perfectly!** ✅

Team members just need to:
1. Open app on mobile
2. Click "📍 Update My Location"
3. Allow browser location access

Then they'll appear on the map with a unique colored marker! 🗺️
