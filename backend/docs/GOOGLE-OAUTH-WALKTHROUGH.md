# Google OAuth Setup - Interactive Guide

## 🎯 Goal
Get your Google Client ID and Client Secret to enable "Continue with Google" login.

---

## 📋 Step-by-Step Instructions

### Step 1: Open Google Cloud Console
🔗 **Open this link**: https://console.cloud.google.com/

**What you'll see**: Google Cloud Console dashboard

---

### Step 2: Create a New Project (or Select Existing)

1. **Click** the project dropdown at the top (says "Select a project")
2. **Click** "NEW PROJECT" button
3. **Enter project name**: `Contractor Worker Platform` (or any name you prefer)
4. **Click** "CREATE"
5. **Wait** for project creation (~10 seconds)
6. **Select** your new project from the dropdown

---

### Step 3: Enable Google+ API

1. **Click** ☰ menu (top left) → "APIs & Services" → "Library"
2. **Search** for "Google+ API" in the search box
3. **Click** on "Google+ API" from results
4. **Click** "ENABLE" button
5. **Wait** for confirmation

**Why?** This API provides user profile information for OAuth login.

---

### Step 4: Configure OAuth Consent Screen

1. **Click** ☰ menu → "APIs & Services" → "OAuth consent screen"
2. **Select** "External" user type (unless you have Google Workspace)
3. **Click** "CREATE"

4. **Fill in App Information**:
   ```
   App name: Contractor Worker Platform
   User support email: [your-email@example.com]
   ```

5. **Scroll down** to "Developer contact information":
   ```
   Email addresses: [your-email@example.com]
   ```

6. **Click** "SAVE AND CONTINUE"

7. **Scopes screen** (Step 2):
   - Just **click** "SAVE AND CONTINUE" (default scopes are fine)

8. **Test users** (Step 3):
   - **Click** "ADD USERS"
   - **Enter** your email address
   - **Click** "ADD"
   - **Click** "SAVE AND CONTINUE"

9. **Summary** (Step 4):
   - **Review** and **click** "BACK TO DASHBOARD"

---

### Step 5: Create OAuth Client ID (The Important Part!)

1. **Click** ☰ menu → "APIs & Services" → "Credentials"
2. **Click** "CREATE CREDENTIALS" button (top)
3. **Select** "OAuth client ID"

4. **Application type**: Select "Web application"

5. **Fill in the form**:
   ```
   Name: Contractor Worker Platform Web Client
   ```

6. **Authorized JavaScript origins**:
   - **Click** "ADD URI"
   - **Enter**: `http://localhost:3001`
   - **Click** outside the field

7. **Authorized redirect URIs**:
   - **Click** "ADD URI"
   - **Enter**: `http://localhost:3001/api/auth/google/callback`
   - **Click** outside the field

8. **Click** "CREATE"

---

### Step 6: Copy Your Credentials 🔑

A popup will appear with your credentials!

**YOU'LL SEE**:
```
Your Client ID
123456789012-abcdefghijklmnopqrstuvwxyz1234.apps.googleusercontent.com

Your Client Secret
GOCSPX-AbCdEfGhIjKlMnOpQrStUvWx
```

**⚠️ IMPORTANT**: Don't close this popup yet! Copy these values.

---

## 💾 Adding Credentials to Your App

### Method 1: Interactive Script (Easiest)

Open a terminal and run:

```bash
cd /Users/shouryaveersingh/Desktop/old\ data/staff/backend/services/auth-service

bash setup-oauth-credentials.sh
```

When prompted:
1. Type `y` for Google OAuth
2. Paste your **Client ID**
3. Paste your **Client Secret**
4. Type `n` for Facebook and Twitter (we'll do those later)

### Method 2: Manual Edit

Open the .env file:
```bash
cd /Users/shouryaveersingh/Desktop/old\ data/staff/backend/services/auth-service
code .env  # or nano .env
```

Replace these lines:
```env
GOOGLE_CLIENT_ID=your-google-client-id
GOOGLE_CLIENT_SECRET=your-google-client-secret
```

With:
```env
GOOGLE_CLIENT_ID=123456789012-abcdefghijklmnopqrstuvwxyz1234.apps.googleusercontent.com
GOOGLE_CLIENT_SECRET=GOCSPX-AbCdEfGhIjKlMnOpQrStUvWx
```
(Use YOUR actual values from Step 6)

Also update the session secret:
```env
SESSION_SECRET=my-super-secret-session-key-12345
```
(Any random string, at least 20 characters)

---

## ✅ Validate Your Setup

Run the validator:
```bash
cd /Users/shouryaveersingh/Desktop/old\ data/staff/backend/services/auth-service
node validate-oauth-credentials.js
```

**You should see**:
```
🔵 Google OAuth
  ✓ GOOGLE_CLIENT_ID: Set
  ✓ GOOGLE_CLIENT_SECRET: Set
  ✓ GOOGLE_CALLBACK_URL: Set
```

---

## 🧪 Test Google Login

### 1. Restart Auth Service
```bash
# Stop the current service (Ctrl+C in the terminal running it)
cd /Users/shouryaveersingh/Desktop/old\ data/staff/backend
npm run dev
```

### 2. Open Frontend
Open in your browser: http://localhost:5173/register

### 3. Test Google Login
1. **Click** "Continue with Google" button
2. **You'll be redirected** to Google's login page
3. **Sign in** with your Google account
4. **Authorize** the app (click "Continue" or "Allow")
5. **You should be** redirected back and automatically logged in!

### 4. Verify in Database
```bash
psql -h localhost -U postgres -d contractor_worker_platform
```

Then run:
```sql
SELECT id, username, email, oauth_provider, oauth_id 
FROM users 
WHERE oauth_provider = 'google';
```

You should see your Google account user!

---

## ❓ Troubleshooting

### Error: "redirect_uri_mismatch"
**Problem**: The callback URL doesn't match exactly.

**Solution**:
1. Go back to Google Cloud Console → Credentials
2. Click on your OAuth Client
3. Under "Authorized redirect URIs", verify it's exactly:
   ```
   http://localhost:3001/api/auth/google/callback
   ```
   (No trailing slash, must be http not https for localhost)

### Error: "invalid_client"
**Problem**: Wrong Client ID or Secret.

**Solution**:
1. Double-check you copied both values correctly
2. No extra spaces or line breaks
3. Regenerate credentials if needed (in Google Console)

### Error: "Access blocked: This app's request is invalid"
**Problem**: OAuth consent screen not configured properly.

**Solution**:
1. Go back to OAuth consent screen
2. Make sure you added your email as a test user
3. Save changes

### No redirect after login
**Problem**: Auth service might not be running or .env not loaded.

**Solution**:
1. Stop and restart auth service
2. Check terminal for errors
3. Verify .env file has correct values

---

## 🎉 Success!

If you successfully:
- ✅ Created Google OAuth app
- ✅ Added credentials to .env
- ✅ Restarted auth service
- ✅ Tested login button
- ✅ Saw your user in database

**You're done with Google OAuth!** 🚀

---

## 📱 Next Steps

Want to add more providers?

- **Facebook OAuth**: See `backend/docs/OAUTH-CREDENTIALS-SETUP.md` (Section 2)
- **Twitter OAuth**: See `backend/docs/OAUTH-CREDENTIALS-SETUP.md` (Section 3)

Or you can continue using just Google - many apps only support 1-2 OAuth providers!

---

## 📞 Need Help?

If you get stuck:
1. Check the error message in browser console (F12)
2. Check auth-service terminal for errors
3. Re-read this guide carefully
4. Check full documentation: `backend/docs/OAUTH-CREDENTIALS-SETUP.md`

---

**Good luck! You've got this! 💪**
