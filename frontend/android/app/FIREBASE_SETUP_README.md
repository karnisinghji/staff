# Firebase Android Setup (Push Notifications)

The app was crashing with `IllegalStateException: Default FirebaseApp is not initialized` because `google-services.json` was missing. Capacitor's PushNotifications plugin calls into Firebase Messaging, which requires the FirebaseApp to be auto-initialized by the Google Services Gradle plugin.

## What Was Added
A placeholder `google-services.json` has been committed in this directory. You MUST replace the placeholder values with the real file downloaded from the Firebase Console for your project.

## Steps to Replace Placeholder
1. Go to Firebase Console > Project Settings > Your Apps (Android).
2. If an Android app is not registered yet, add one:
   - Package name: `com.comeondost.app`
   - (Optional) App nickname: `ComeOnDost`
   - Skip SHA-1 for now (add later for Dynamic Links / Phone Auth).
3. Download the generated `google-services.json`.
4. Replace the existing placeholder file here with the downloaded one.
5. Confirm the file contains (example structure):
   - `project_number`
   - `project_id`
   - `mobilesdk_app_id`
   - `current_key` (Web API key)

## Verify Gradle Configuration
Top-level `android/build.gradle` already has:
```
classpath 'com.google.gms:google-services:4.4.2'
```
Module `app/build.gradle` conditionally applies the plugin:
```
try {
  def servicesJSON = file('google-services.json')
  if (servicesJSON.text) {
    apply plugin: 'com.google.gms.google-services'
  }
} catch(Exception e) {
  logger.info("google-services.json not found, google-services plugin not applied. Push Notifications won't work")
}
```
With a valid file present, the plugin will apply and FirebaseApp will initialize before any push registration calls.

## Rebuild After Adding File
From `frontend/android/` run:
```
./gradlew :app:clean :app:assembleDebug
```
Then reinstall:
```
./gradlew :app:installDebug
```
Or from project root:
```
(cd frontend/android && ./gradlew :app:installDebug)
```

## Common Issues
- Crash persists: Ensure the `package_name` inside `google-services.json` matches `com.comeondost.app` exactly.
- Token still not returned: Add a short delay before calling `PushNotifications.register()` or move registration to after user login, but with a correct config it should work immediately.
- Duplicate API keys or wrong project: Regenerate file from correct Firebase project.

## Next Steps
Once token appears in the Debug Token page, register it with backend via `/api/notifications/register-device` and send a test push using `/api/notifications/send-push`.
