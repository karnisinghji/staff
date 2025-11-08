# 🔧 How to Update Google Cloud Console - Step by Step

**You need to do this manually because it requires your Google account login.**

---

## ✅ Step 1: Open Google Cloud Console

Go to: **https://console.cloud.google.com/apis/credentials**

---

## ✅ Step 2: Find Your OAuth Client

Look for:
- **Client ID**: `346188939499-68nadmhoo0v5d51g3l8dop77nkdm4vuu`
- **Type**: Web application
- **Name**: Something like "ComeOnDost Web Client" or similar

Click on it to edit.

---

## ✅ Step 3: Update Authorized Redirect URIs

In the **Authorized redirect URIs** section, make sure you have ALL of these:

### ✅ Add These URLs:

```
http://localhost:3001/api/auth/google/callback
https://auth-service.delightfulflower-04821c4b.southeastasia.azurecontainerapps.io/api/auth/google/callback
https://comeondost.web.app/auth/callback
https://comeondost.firebaseapp.com/auth/callback
```

### 📝 Explanation:
- **localhost** = For local development testing
- **Azure URL** = Your production backend (where Google redirects after sign-in)
- **Firebase URLs** = Your production frontend (for web flow)

---

## ✅ Step 4: Update Authorized JavaScript Origins

In the **Authorized JavaScript origins** section, add:

```
http://localhost:5173
https://comeondost.web.app
https://comeondost.firebaseapp.com
https://auth-service.delightfulflower-04821c4b.southeastasia.azurecontainerapps.io
```

---

## ✅ Step 5: Save Changes

Click **SAVE** at the bottom.

---

## 🧪 Test It Works

After saving, test with:

### Browser Test (Production):
```
https://auth-service.delightfulflower-04821c4b.southeastasia.azurecontainerapps.io/api/auth/google
```

This should:
1. Redirect to Google sign-in page
2. Ask for your permission
3. Redirect back to your app with tokens

---

## ❓ Troubleshooting

### Error: "redirect_uri_mismatch"
- The callback URL in Google Console doesn't match what your backend is sending
- Double-check ALL redirect URIs are added exactly as shown above
- Make sure there are no typos or extra spaces

### Error: "access_denied"
- User canceled the sign-in
- OR OAuth consent screen not configured properly

### Error: "invalid_client"
- Client ID or Secret is wrong
- Check your `.env` file matches Google Console credentials

---

## 📸 What It Should Look Like

Your OAuth client should have:
- ✅ Client ID: 346188939499-68nadmhoo0v5d51g3l8dop77nkdm4vuu
- ✅ Client Secret: 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
- ✅ 4 Authorized redirect URIs (as listed above)
- ✅ 4 Authorized JavaScript origins (as listed above)

---

## 🎯 Next Steps After Updating

1. ✅ Verify Google Console is saved
2. ✅ Wait 2-3 minutes for changes to propagate
3. ✅ Test the login URL above
4. ✅ Check your GitHub deployment completed successfully
5. ✅ Verify Azure logs show "Google Client ID: SET"

---

**Done! Let me know if you see any errors during testing.**
