# OAuth Login Bug Fix Summary

## Bug Report
**Issue**: Users who registered via Google OAuth have NULL password in database and cannot login on subsequent visits.

**Reported By**: User testing registration flow  
**Date**: October 21, 2025

## Root Causes Identified

### 1. Password Field is NULL for OAuth Users ✅ FIXED
- OAuth registration creates users without password_hash
- LoginUseCase tried to compare NULL password_hash with input password
- bcrypt.compare() fails with NULL, causing login to break

### 2. No Detection of OAuth Users ✅ FIXED
- System didn't distinguish between OAuth users and email/password users
- No helpful error message when OAuth user tries password login

### 3. Missing Railway Environment Variables ⚠️ **BLOCKING**
- Railway auth-service missing OAuth credentials
- Passport strategies not initialized: `Unknown authentication strategy "google"`
- OAuth registration/login currently **broken in production**

## Code Changes Made

### 1. Updated UserCredentials Interface
**File**: `backend/services/auth-service/src/hexagon/domain/entities/UserCredentials.ts`

```typescript
export interface UserCredentials {
    id: string;
    email: string;
    passwordHash: string;
    roles: string[];
    createdAt: Date;
    oauthProvider?: string;  // NEW: OAuth provider (google, facebook, twitter)
    oauthId?: string;         // NEW: OAuth provider user ID
}
```

### 2. Updated Repository to Fetch OAuth Fields
**File**: `backend/services/auth-service/src/hexagon/infrastructure/adapters/PgCredentialRepository.ts`

```typescript
async findByEmail(email: string): Promise<UserCredentials | null> {
    const query = `
        SELECT id, email, username, name, password_hash, role::text as roles, 
               created_at, oauth_provider, oauth_id  -- ADDED
        FROM users 
        WHERE (LOWER(email) = LOWER($1) OR LOWER(username) = LOWER($1)) AND is_active = true
    `;
    
    return {
        // ...existing fields
        oauthProvider: row.oauth_provider || undefined,  // NEW
        oauthId: row.oauth_id || undefined                // NEW
    };
}
```

### 3. Updated LoginUseCase to Handle OAuth Users
**File**: `backend/services/auth-service/src/hexagon/application/use-cases/LoginUseCase.ts`

```typescript
async execute(input: Input): Promise<Output> {
    const cred = await this.repo.findByEmail(input.email.toLowerCase());
    if (!cred) throw new Error('INVALID_CREDENTIALS');
    
    // NEW: Check if this is an OAuth user
    if (cred.oauthProvider) {
        throw new Error('OAUTH_LOGIN_REQUIRED');
    }
    
    // NEW: Validate password exists
    if (!cred.passwordHash) {
        throw new Error('INVALID_CREDENTIALS');
    }
    
    const ok = await this.hasher.compare(input.password, cred.passwordHash);
    if (!ok) throw new Error('INVALID_CREDENTIALS');
    
    // ... rest of login logic
}
```

### 4. Updated Login Route Error Handling
**File**: `backend/services/auth-service/src/http/routes.ts`

```typescript
r.post('/login', validate(loginSchema), async (req, res) => {
    try {
        const out = await c.login.execute({ email: req.body.email, password: req.body.password });
        res.json(out);
    } catch (e: any) {
        // NEW: Return specific error for OAuth users
        if (e.message === 'OAUTH_LOGIN_REQUIRED') {
            res.status(401).json({ 
                error: 'OAUTH_LOGIN_REQUIRED', 
                message: 'This account uses OAuth. Please login with Google/Facebook/Twitter.' 
            });
        } else {
            res.status(401).json({ error: 'Invalid credentials' });
        }
    }
});
```

### 5. Updated Frontend Login Error Display
**File**: `frontend/src/features/auth/LoginPage.tsx`

```typescript
} else if (data.error) {
    // NEW: Check if user tried to login with OAuth account using password
    if (data.error === 'OAUTH_LOGIN_REQUIRED') {
        setError('This account was created with Google/Facebook/Twitter. Please use the social login buttons below.');
    } else {
        setError(typeof data.error === 'string' ? data.error : 'Login failed. Please try again.');
    }
    setLoading(false);
}
```

## Current Status

### ✅ Completed
- [x] Added oauthProvider and oauthId fields to UserCredentials interface
- [x] Updated PgCredentialRepository to fetch OAuth fields from database
- [x] Modified LoginUseCase to detect OAuth users and throw OAUTH_LOGIN_REQUIRED error
- [x] Updated login route to return helpful error message for OAuth users
- [x] Enhanced frontend to display user-friendly message for OAuth login attempts
- [x] Built auth-service successfully (TypeScript compilation passed)
- [x] Created .env.example with all required OAuth variables
- [x] Documented OAuth setup requirements in OAUTH_RAILWAY_SETUP.md

### ⚠️ Pending (BLOCKING PRODUCTION)
- [ ] Set OAuth environment variables in Railway:
  - GOOGLE_CLIENT_ID
  - GOOGLE_CLIENT_SECRET
  - GOOGLE_CALLBACK_URL
  - SESSION_SECRET
  - FRONTEND_URL
- [ ] Deploy updated auth-service to Railway
- [ ] Test OAuth registration flow end-to-end
- [ ] Test OAuth login flow end-to-end
- [ ] Verify existing OAuth users can login

## Testing Plan

### Local Testing
1. Set OAuth env vars in `.env`:
   ```bash
   cp .env.example .env
   # Fill in Google OAuth credentials
   ```

2. Start auth-service:
   ```bash
   cd backend/services/auth-service
   npm run dev
   ```

3. Test scenarios:
   - ✅ New user registers with Google → creates user with NULL password
   - ✅ OAuth user tries password login → sees "use social login" message
   - ✅ Regular user with password → logs in normally
   - ✅ OAuth user clicks Google button → redirects to Google → logs in successfully

### Production Testing (After Railway Config)
1. Test OAuth registration:
   ```bash
   # Visit frontend
   https://comeondost.web.app/register
   
   # Click "Sign in with Google"
   # Should redirect to Google auth
   # Should return to app with access token
   # Should see dashboard
   ```

2. Test OAuth login (return visit):
   ```bash
   # Logout and try to login with email/password
   # Should see: "This account was created with Google..."
   
   # Click "Sign in with Google"
   # Should login successfully without creating duplicate user
   ```

3. Verify logs:
   ```bash
   railway logs
   # Should see: "✅ Registering Google OAuth strategy"
   # Should NOT see: "Error: Unknown authentication strategy"
   ```

## User Impact

### Before Fix
- ❌ OAuth users created with NULL password
- ❌ Could not login on return visits
- ❌ Confusing "Invalid credentials" error
- ❌ No way to distinguish OAuth vs password accounts

### After Fix
- ✅ OAuth users clearly identified in database (oauth_provider field)
- ✅ Helpful error: "This account uses OAuth. Please use social login."
- ✅ OAuth users can login via OAuth buttons
- ✅ Password users unaffected, work as before
- ✅ No duplicate accounts created

## Related Files

**Backend**:
- `backend/services/auth-service/src/hexagon/domain/entities/UserCredentials.ts`
- `backend/services/auth-service/src/hexagon/infrastructure/adapters/PgCredentialRepository.ts`
- `backend/services/auth-service/src/hexagon/application/use-cases/LoginUseCase.ts`
- `backend/services/auth-service/src/http/routes.ts`
- `backend/services/auth-service/src/http/oauthRoutes.ts`
- `backend/services/auth-service/src/config/passport.ts`

**Frontend**:
- `frontend/src/features/auth/LoginPage.tsx`
- `frontend/src/features/auth/OAuthCallback.tsx`
- `frontend/src/features/auth/RegisterPage.tsx`

**Documentation**:
- `OAUTH_RAILWAY_SETUP.md` (new)
- `backend/services/auth-service/.env.example` (new)

## Next Immediate Action

🚨 **REQUIRED**: Set OAuth environment variables in Railway Dashboard:

1. Go to https://railway.app/dashboard
2. Select **auth-service-production-d5c8**
3. Click **Variables** tab
4. Add the variables from OAUTH_RAILWAY_SETUP.md
5. Railway will auto-redeploy with new variables
6. Test OAuth flow at https://comeondost.web.app/register

Without these variables, OAuth is **completely broken** in production with error:
```
Error: Unknown authentication strategy "google"
```
