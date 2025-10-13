# User-Facing Toast Notifications Guide

## 🎯 What Users Will See

### Scenario 1: Registering with Duplicate Email

**Steps:**
1. User enters email: `john@example.com`
2. User enters password and role
3. User clicks "Register"

**Result:**
```
┌─────────────────────────────────────────┐
│  🔴 This email is already registered!   │
└─────────────────────────────────────────┘
                                    (Top-right corner)
```

**On Form:**
- Red text below email field: "This email is already registered. Please use a different email or login."
- Email input field has red border
- Form stays filled (no data loss)

---

### Scenario 2: Registering with Duplicate Phone

**Steps:**
1. User enters phone: `+15551234567`
2. User enters password and role
3. User clicks "Register"

**Result:**
```
┌──────────────────────────────────────────────────┐
│  🔴 This phone number is already registered!     │
└──────────────────────────────────────────────────┘
                                           (Top-right corner)
```

**On Form:**
- Red text below contact field: "This phone number is already registered. Please use a different phone number or login."
- Contact input field has red border

---

### Scenario 3: Successful Registration

**Result:**
```
┌───────────────────────────────────────────────────┐
│  ✅ Registration successful! Redirecting to      │
│     login...                                      │
└───────────────────────────────────────────────────┘
                                          (Top-right corner)
```

**On Form:**
- Green success message appears
- Automatically redirects to dashboard after 3 seconds

---

### Scenario 4: Updating Profile with Duplicate Email

**Steps:**
1. User registered with phone: `+15551234567`
2. User goes to Profile page
3. User tries to add email: `existing@example.com` (already used by another user)
4. User clicks "Save Changes"

**Result:**
```
┌───────────────────────────────────────────────────────┐
│  🔴 This email is already in use by another          │
│     account.                                          │
└───────────────────────────────────────────────────────┘
                                               (Top-right corner)
```

**On Form:**
- Red text below email field: "This email is already in use by another account."
- Email input field has red border
- Other fields remain unchanged
- User can correct and try again

---

### Scenario 5: Updating Profile with Duplicate Phone

**Result:**
```
┌───────────────────────────────────────────────────────┐
│  🔴 This phone number is already in use by another   │
│     account.                                          │
└───────────────────────────────────────────────────────┘
                                               (Top-right corner)
```

---

### Scenario 6: Network Error

**Result:**
```
┌───────────────────────────────────────────────────────┐
│  🔴 Network error. Please check your connection and   │
│     try again.                                        │
└───────────────────────────────────────────────────────┘
                                               (Top-right corner)
```

---

## 🎨 Toast Notification Appearance

### Visual Features

**Success Toast (Green):**
```
╔═══════════════════════════════════════════════════╗
║  ✅ Registration successful!                      ║
║     [Progress bar ▓▓▓▓▓▓▓▓░░░░░░░░░░░░░░░]       ║
╚═══════════════════════════════════════════════════╝
```

**Error Toast (Red):**
```
╔═══════════════════════════════════════════════════╗
║  ❌ This email is already registered!            ║
║     [Progress bar ▓▓▓▓▓▓▓▓░░░░░░░░░░░░░░░]       ║
╚═══════════════════════════════════════════════════╝
```

### Toast Behavior

| Feature | Behavior |
|---------|----------|
| **Position** | Top-right corner of screen |
| **Duration** | Success: 3 seconds<br>Error: 5 seconds |
| **Animation** | Slides in from right |
| **Progress Bar** | Shows time remaining |
| **Hover** | Pauses auto-dismiss |
| **Click** | Dismisses immediately |
| **Multiple** | Stack vertically |

---

## 📱 Responsive Design

### Desktop (>768px)
```
                                           ┌─────────┐
                                           │  Toast  │
                                           │  Here   │
                                           └─────────┘
┌─────────────────────────────────────────────────────┐
│                                                     │
│              Registration Form                      │
│                                                     │
└─────────────────────────────────────────────────────┘
```

### Mobile (<768px)
```
┌──────────────┐
│   Toast Here │
└──────────────┘
┌──────────────┐
│              │
│ Registration │
│     Form     │
│              │
└──────────────┘
```

---

## 🔔 Toast Types Summary

| Icon | Type | Use Case | Duration |
|------|------|----------|----------|
| ✅ | Success | Registration completed | 3s |
| ❌ | Error | Duplicate email/phone | 5s |
| ⚠️ | Warning | Validation issues | 5s |
| ℹ️ | Info | General information | 4s |

---

## 💡 User Guidance

### What to do when seeing "Email already registered":
1. **Option 1:** Click the "Login" link to access your account
2. **Option 2:** Use a different email address
3. **Option 3:** Click "Forgot Password" if you forgot credentials

### What to do when seeing "Phone already registered":
1. **Option 1:** Click the "Login" link to access your account
2. **Option 2:** Use a different phone number
3. **Option 3:** Contact support if you believe this is an error

### What to do when updating profile with duplicate:
1. The email/phone is being used by another account
2. Choose a different email/phone number
3. Keep your current information if you don't need to change it

---

## 🎭 Example User Journey

### First Time User
```
1. Visit Register Page
2. Enter: john@example.com, password123, role: worker
3. Click "Register"
4. ✅ Success toast appears
5. Redirected to dashboard
6. Goes to Profile page
7. Fills in additional details
8. Click "Save Changes"
9. ✅ Success toast appears
```

### Returning User (Wrong Email)
```
1. Visit Register Page
2. Enter: existing@example.com, newpassword, role: worker
3. Click "Register"
4. ❌ Error toast appears: "This email is already registered!"
5. Red error message below form
6. Clicks "Login" link instead
7. Successfully logs in
```

### User Adding Email to Phone Account
```
1. Registered with: +15551234567
2. Logs in
3. Goes to Profile page
4. Adds email: john@example.com
5. Click "Save Changes"
6. ✅ Success toast appears
7. Email added to profile
8. Can now login with either phone or email
```

---

## 📊 Error Prevention Tips

**Shown to Users:**
- "Make sure you're using a unique email address"
- "Phone numbers must be unique per account"
- "If you already have an account, please login instead"
- "Use the 'Forgot Password' option to recover your account"

This creates a smooth, user-friendly experience with clear communication!
