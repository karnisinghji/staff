# OAuth Social Login Setup Guide

## Overview
The platform now supports OAuth social login for Google, Facebook, and X (Twitter). Users can register and login using their social media accounts.

## What Was Implemented

### Backend Changes

#### 1. Database Schema (`004_add_oauth_support.sql`)
- Added `oauth_provider` column (VARCHAR 50) - stores 'google', 'facebook', or 'twitter'
- Added `oauth_id` column (VARCHAR 255) - stores the provider's user ID
- Added `oauth_profile` column (JSONB) - stores the full OAuth profile data
- Made `email` and `password_hash` nullable (OAuth users may not have passwords)
- Created unique index on `(oauth_provider, oauth_id)` to prevent duplicate OAuth accounts

#### 2. Passport.js Configuration (`src/config/passport.ts`)
- Configured three OAuth strategies:
  - **GoogleStrategy** - Uses OAuth 2.0 with profile and email scopes
  - **FacebookStrategy** - Uses OAuth 2.0 with email scope
  - **TwitterStrategy** - Uses OAuth 1.0a with email inclusion
- Each strategy extracts user profile data (id, displayName, emails, photos)
- Serialization/deserialization for session management

#### 3. OAuth Routes (`src/http/oauthRoutes.ts`)
- **GET /api/auth/google** - Initiates Google OAuth flow
- **GET /api/auth/google/callback** - Handles Google callback
- **GET /api/auth/facebook** - Initiates Facebook OAuth flow
- **GET /api/auth/facebook/callback** - Handles Facebook callback
- **GET /api/auth/twitter** - Initiates Twitter OAuth flow
- **GET /api/auth/twitter/callback** - Handles Twitter callback
- Callback handler generates JWT tokens and redirects to frontend with tokens

#### 4. Repository Updates (`PgCredentialRepository.ts`)
- `findByOAuth(provider, oauthId)` - Finds existing OAuth users
- `createOAuthUser(data)` - Creates new OAuth users with profile data
- Handles duplicate detection for both email and OAuth ID

#### 5. Express App Configuration (`src/app.ts`)
- Added `express-session` middleware with secure cookie settings
- Initialized Passport with `passport.initialize()` and `passport.session()`
- Mounted OAuth routes at `/api/auth`

### Frontend Changes

#### 1. Social Login Buttons (`RegisterPage.tsx`)
- Added Google, Facebook, and X login buttons with proper branding
- Each button redirects to `/api/auth/{provider}` endpoint
- Buttons have hover effects and proper SVG icons
- Added "OR" divider between traditional and social login

#### 2. OAuth Callback Handler (`OAuthCallback.tsx`)
- Handles OAuth redirect from backend
- Extracts tokens from URL params (access_token, refresh_token, user_id)
- Stores tokens in localStorage via AuthContext
- Shows loading spinner during processing
- Error handling with auto-redirect to registration page

#### 3. Routing (`App.tsx`)
- Added `/auth/callback` route for OAuth callback handling

## Environment Variables

Add these to `/backend/services/auth-service/.env`:

```env
# Session Configuration
SESSION_SECRET=your-session-secret-change-in-production

# Frontend URL
FRONTEND_URL=http://localhost:5173

# Google OAuth (Get from: https://console.cloud.google.com/)
GOOGLE_CLIENT_ID=your-google-client-id
GOOGLE_CLIENT_SECRET=your-google-client-secret
GOOGLE_CALLBACK_URL=http://localhost:3001/api/auth/google/callback

# Facebook OAuth (Get from: https://developers.facebook.com/)
FACEBOOK_APP_ID=your-facebook-app-id
FACEBOOK_APP_SECRET=your-facebook-app-secret
FACEBOOK_CALLBACK_URL=http://localhost:3001/api/auth/facebook/callback

# Twitter (X) OAuth (Get from: https://developer.twitter.com/)
TWITTER_CONSUMER_KEY=your-twitter-consumer-key
TWITTER_CONSUMER_SECRET=your-twitter-consumer-secret
TWITTER_CALLBACK_URL=http://localhost:3001/api/auth/twitter/callback
```

## How to Get OAuth Credentials

### Google OAuth
1. Go to [Google Cloud Console](https://console.cloud.google.com/)
2. Create a new project or select existing one
3. Enable "Google+ API"
4. Go to "Credentials" → "Create Credentials" → "OAuth client ID"
5. Choose "Web application"
6. Add authorized redirect URI: `http://localhost:3001/api/auth/google/callback`
7. Copy Client ID and Client Secret

### Facebook OAuth
1. Go to [Facebook Developers](https://developers.facebook.com/)
2. Create a new app or select existing one
3. Add "Facebook Login" product
4. Go to Settings → Basic
5. Copy App ID and App Secret
6. In Facebook Login settings, add valid OAuth redirect URI: `http://localhost:3001/api/auth/facebook/callback`

### Twitter (X) OAuth
1. Go to [Twitter Developer Portal](https://developer.twitter.com/)
2. Create a new project and app
3. Enable OAuth 1.0a with "Request email from users" enabled
4. Add callback URL: `http://localhost:3001/api/auth/twitter/callback`
5. Copy API Key (Consumer Key) and API Secret (Consumer Secret)

## OAuth Flow

### User Journey
1. User clicks "Continue with Google/Facebook/X" button on RegisterPage
2. Browser redirects to `/api/auth/{provider}` (backend)
3. Passport redirects to OAuth provider's authorization page
4. User authorizes the application on provider's site
5. Provider redirects to `/api/auth/{provider}/callback` (backend)
6. Backend:
   - Receives OAuth profile data
   - Checks if user exists by OAuth ID
   - If new user, creates account with OAuth profile
   - If existing user, logs them in
   - Generates JWT access and refresh tokens
   - Redirects to frontend: `http://localhost:5173/auth/callback?access_token=...&refresh_token=...&user_id=...`
7. Frontend OAuthCallback component:
   - Extracts tokens from URL
   - Stores in localStorage via AuthContext
   - Redirects to dashboard

### Backend Token Flow
```typescript
// OAuth callback generates tokens
const accessToken = jwt.sign(
  { userId: user.id },
  process.env.JWT_SECRET!,
  { expiresIn: '15m' }
);

const refreshToken = jwt.sign(
  { userId: user.id },
  process.env.JWT_REFRESH_SECRET!,
  { expiresIn: '7d' }
);

// Redirect with tokens
res.redirect(
  `${frontendUrl}/auth/callback?access_token=${accessToken}&refresh_token=${refreshToken}&user_id=${user.id}`
);
```

## Testing OAuth (Without Real Credentials)

To test the UI and flow without configuring real OAuth apps:

1. The social login buttons are visible and functional on RegisterPage
2. Clicking them will redirect to backend OAuth routes
3. Without valid credentials, Passport will return errors
4. To fully test, you must configure at least one OAuth provider with real credentials

## Security Considerations

1. **Session Secret**: Change `SESSION_SECRET` in production to a strong random value
2. **HTTPS**: In production, use HTTPS for all OAuth callbacks
3. **Redirect URIs**: Whitelist only your domain's callback URLs in OAuth provider settings
4. **Token Storage**: Access tokens are stored in localStorage; consider httpOnly cookies for production
5. **CSRF Protection**: Consider adding CSRF tokens for additional security

## Database Schema

```sql
-- Users table with OAuth support
CREATE TABLE users (
  id SERIAL PRIMARY KEY,
  username VARCHAR(100) UNIQUE,
  email VARCHAR(255) UNIQUE,
  phone VARCHAR(20) UNIQUE,
  password_hash VARCHAR(255),  -- Nullable for OAuth users
  role VARCHAR(20) NOT NULL,
  oauth_provider VARCHAR(50),  -- 'google', 'facebook', 'twitter'
  oauth_id VARCHAR(255),       -- Provider's user ID
  oauth_profile JSONB,         -- Full OAuth profile data
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW(),
  CONSTRAINT users_oauth_provider_id_unique UNIQUE (oauth_provider, oauth_id)
);
```

## Troubleshooting

### "OAuth provider not configured"
- Check that environment variables are set in `.env`
- Restart auth-service after adding environment variables

### "Redirect URI mismatch"
- Ensure callback URLs in `.env` match exactly what's configured in OAuth provider settings
- Check for trailing slashes and http vs https

### "Email already exists"
- User previously registered with email/password
- OAuth user's email matches existing account
- Consider implementing account linking feature

### Session errors
- Ensure `SESSION_SECRET` is set
- Check that express-session middleware is initialized before Passport

## Next Steps

1. **Configure OAuth Providers**: Set up real OAuth apps and add credentials to `.env`
2. **Test Each Provider**: Verify login flow works for Google, Facebook, and Twitter
3. **Account Linking**: Consider allowing users to link multiple OAuth providers to one account
4. **Profile Enhancement**: Use OAuth profile data to pre-fill user profile information
5. **Production Setup**: Update callback URLs and secrets for production environment
