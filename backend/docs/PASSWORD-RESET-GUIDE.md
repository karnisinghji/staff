# Password Reset Email Functionality - Implementation Guide

## Overview
Full email-based password reset functionality has been implemented with the following features:
- Secure token generation
- Email sending via SMTP (Nodemailer)
- Token validation and expiry (1 hour)
- Complete frontend UI for password reset
- Secure password hashing with bcrypt

## What Was Implemented

### 1. Backend Components

#### Email Service (`/backend/services/auth-service/src/services/emailService.ts`)
- Nodemailer SMTP configuration
- Styled HTML email templates
- `sendPasswordResetEmail()` method
- Environment variable configuration for SMTP

#### Database Migration (`/backend/database/migrations/005_add_password_reset_tokens.sql`)
- `password_reset_tokens` table with:
  - `id` (SERIAL PRIMARY KEY)
  - `user_id` (UUID, foreign key to users)
  - `token` (VARCHAR(255) UNIQUE)
  - `expires_at` (TIMESTAMP)
  - `used` (BOOLEAN)
- Indexes on token, user_id, and expires_at
- Foreign key cascade delete

#### Backend API Endpoints (Updated `/backend/services/auth-service/src/http/routes.ts`)

**1. POST /api/auth/forgot-password**
- Accepts: `{ email: string }`
- Validates user exists
- Generates secure random token (crypto.randomBytes)
- Saves token to database with 1-hour expiry
- Sends reset email via emailService
- Returns generic success message (prevents email enumeration)

**2. GET /api/auth/validate-reset-token/:token**
- Validates token exists
- Checks if token is expired
- Checks if token has been used
- Returns validation status

**3. POST /api/auth/reset-password**
- Accepts: `{ token: string, newPassword: string }`
- Validates token (exists, not expired, not used)
- Validates password length (minimum 6 characters)
- Hashes password with bcrypt
- Updates user password
- Marks token as used
- Returns success message

### 2. Frontend Components

#### Reset Password Page (`/frontend/src/features/auth/ResetPasswordPage.tsx`)
- Token validation on mount
- Loading states for validation and submission
- Password confirmation validation
- Success/error feedback
- Auto-redirect to login after success
- Styled with Tailwind CSS

#### Updated App Routes (`/frontend/src/App.tsx`)
- Added route: `/reset-password/:token`
- Imported and configured ResetPasswordPage component

### 3. Environment Configuration

Updated `.env` file with SMTP configuration:
```env
# Email Configuration (SMTP)
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_USER=your-email@gmail.com
SMTP_PASS=your-app-specific-password
EMAIL_FROM_NAME=Contractor Worker Platform
```

### 4. Dependencies Installed
- `nodemailer` - Email sending library
- `@types/nodemailer` - TypeScript types
- `bcrypt` - Password hashing
- `@types/bcrypt` - TypeScript types

## Setup Instructions

### Step 1: Configure SMTP Credentials

You need to update the `.env` file with real SMTP credentials:

#### Option A: Gmail (Recommended for Development)

1. **Enable 2-Factor Authentication** on your Gmail account:
   - Go to: https://myaccount.google.com/security
   - Enable 2-Step Verification

2. **Generate App Password**:
   - Go to: https://myaccount.google.com/apppasswords
   - Select app: "Mail"
   - Select device: "Other" → "Contractor Platform"
   - Copy the 16-character password

3. **Update .env file**:
   ```env
   SMTP_HOST=smtp.gmail.com
   SMTP_PORT=587
   SMTP_USER=your-email@gmail.com
   SMTP_PASS=your-16-char-app-password
   EMAIL_FROM_NAME=Contractor Worker Platform
   ```

#### Option B: Other SMTP Services

**SendGrid**:
```env
SMTP_HOST=smtp.sendgrid.net
SMTP_PORT=587
SMTP_USER=apikey
SMTP_PASS=your-sendgrid-api-key
EMAIL_FROM_NAME=Contractor Worker Platform
```

**Mailgun**:
```env
SMTP_HOST=smtp.mailgun.org
SMTP_PORT=587
SMTP_USER=postmaster@your-domain.mailgun.org
SMTP_PASS=your-mailgun-password
EMAIL_FROM_NAME=Contractor Worker Platform
```

**AWS SES**:
```env
SMTP_HOST=email-smtp.us-east-1.amazonaws.com
SMTP_PORT=587
SMTP_USER=your-ses-smtp-username
SMTP_PASS=your-ses-smtp-password
EMAIL_FROM_NAME=Contractor Worker Platform
```

### Step 2: Run Database Migration (Already Done ✓)

The migration has already been applied, but if you need to run it again:

```bash
cd /Users/shouryaveersingh/Desktop/old\ data/staff
psql -U postgres -d contractor_worker_platform -f backend/database/migrations/005_add_password_reset_tokens.sql
```

### Step 3: Rebuild Backend

```bash
cd backend/services/auth-service
npm run build
```

### Step 4: Restart Backend Service

```bash
# If using dev mode
npm run dev

# Or if running production
npm start
```

### Step 5: Test the Flow

1. **Frontend should already be running** on http://localhost:5174

2. **Request Password Reset**:
   - Go to: http://localhost:5174/forgot-password
   - Enter a registered email address
   - Click "Send Reset Link"
   - Check your email inbox

3. **Check Email**:
   - Look for email from "Contractor Worker Platform"
   - Subject: "Password Reset Request"
   - Click the "Reset Password" button

4. **Reset Password**:
   - You'll be redirected to: http://localhost:5174/reset-password/[token]
   - Enter new password (minimum 6 characters)
   - Confirm password
   - Click "Reset Password"

5. **Login with New Password**:
   - After success, you'll be redirected to login page
   - Use your email and new password

## Testing Checklist

- [ ] Configure SMTP credentials in .env
- [ ] Restart backend service
- [ ] Request password reset for existing user
- [ ] Receive email with reset link
- [ ] Click link and verify token validation works
- [ ] Enter new password and confirm
- [ ] Successfully reset password
- [ ] Login with new password
- [ ] Verify old password no longer works

## Security Features

1. **Token Security**:
   - 32-byte cryptographically secure random tokens
   - Tokens are unique and indexed in database
   - One-time use only (marked as used after password reset)

2. **Token Expiration**:
   - 1 hour expiry from generation
   - Expired tokens are rejected
   - Database index for efficient expiry checks

3. **Email Enumeration Prevention**:
   - Always returns success message, regardless of email existence
   - Prevents attackers from discovering valid email addresses

4. **Password Security**:
   - Minimum 6 characters (client and server validation)
   - Bcrypt hashing with salt rounds = 10
   - Password confirmation on frontend

5. **Database Security**:
   - UUID foreign keys
   - Cascade delete (tokens deleted when user is deleted)
   - Indexes for performance

## Database Schema

```sql
CREATE TABLE password_reset_tokens (
    id SERIAL PRIMARY KEY,
    user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    token VARCHAR(255) NOT NULL UNIQUE,
    expires_at TIMESTAMP NOT NULL,
    used BOOLEAN NOT NULL DEFAULT false,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Indexes for performance
CREATE INDEX idx_password_reset_tokens_token ON password_reset_tokens(token);
CREATE INDEX idx_password_reset_tokens_user_id ON password_reset_tokens(user_id);
CREATE INDEX idx_password_reset_tokens_expires_at ON password_reset_tokens(expires_at);
```

## API Endpoints

### 1. Request Password Reset
```
POST /api/auth/forgot-password
Content-Type: application/json

{
  "email": "user@example.com"
}

Response:
{
  "success": true,
  "message": "If an account exists for this email, a reset link has been sent."
}
```

### 2. Validate Reset Token
```
GET /api/auth/validate-reset-token/:token

Response (Valid):
{
  "success": true,
  "valid": true
}

Response (Invalid/Expired/Used):
{
  "success": true,
  "valid": false,
  "message": "This reset link has expired"
}
```

### 3. Reset Password
```
POST /api/auth/reset-password
Content-Type: application/json

{
  "token": "abc123...",
  "newPassword": "newpassword123"
}

Response (Success):
{
  "success": true,
  "message": "Password has been successfully reset"
}

Response (Error):
{
  "success": false,
  "message": "This reset link has expired"
}
```

## Email Template Preview

The password reset email includes:
- Professional header with your app name
- Clear explanation of the request
- Prominent "Reset Password" button (blue, styled)
- Alternative text link if button doesn't work
- Security note about link expiry (1 hour)
- Note about ignoring email if not requested
- Footer with timestamp

## Troubleshooting

### Issue: "Failed to send email"

**Cause**: SMTP credentials not configured or incorrect

**Solution**:
1. Check `.env` file has correct SMTP settings
2. Verify Gmail app password (not regular password)
3. Check console for detailed error message
4. Test SMTP connection:
```bash
telnet smtp.gmail.com 587
```

### Issue: "Invalid reset token"

**Cause**: Token expired, used, or doesn't exist

**Solution**:
1. Request new password reset
2. Check token wasn't used already
3. Verify token matches exactly (no spaces)
4. Check database:
```sql
SELECT * FROM password_reset_tokens WHERE used = false AND expires_at > NOW();
```

### Issue: Email not received

**Cause**: Email in spam, wrong address, or SMTP not configured

**Solution**:
1. Check spam/junk folder
2. Verify email exists in database:
```sql
SELECT * FROM users WHERE email = 'user@example.com';
```
3. Check backend console for email sending logs
4. Test with different email provider

### Issue: "Network error" on frontend

**Cause**: Backend not running or CORS issue

**Solution**:
1. Verify backend running on port 3001
2. Check CORS configuration includes localhost:5174
3. Check browser console for specific error
4. Verify API URL: `http://localhost:3001/api/auth/...`

## Production Considerations

### Before Deploying to Production:

1. **Update Frontend URL**:
   - Change reset URL in routes.ts from localhost to production domain
   - Update `.env` FRONTEND_URL

2. **SMTP Service**:
   - Use professional SMTP service (SendGrid, Mailgun, AWS SES)
   - Configure proper SPF, DKIM, DMARC records
   - Use verified domain for emails

3. **Security Enhancements**:
   - Consider shorter token expiry (15-30 minutes)
   - Add rate limiting on forgot-password endpoint
   - Log password reset attempts
   - Add CAPTCHA to prevent abuse

4. **Email Template**:
   - Add company logo
   - Update footer with company info
   - Add unsubscribe link if required
   - Ensure mobile-responsive

5. **Database**:
   - Set up automatic cleanup of expired tokens
   - Add indexes for performance
   - Monitor token generation rate

6. **Monitoring**:
   - Track email delivery success/failure
   - Monitor token usage patterns
   - Alert on unusual password reset activity

## Files Modified/Created

### Created:
- `/backend/services/auth-service/src/services/emailService.ts` - Email service
- `/backend/database/migrations/005_add_password_reset_tokens.sql` - Database migration
- `/frontend/src/features/auth/ResetPasswordPage.tsx` - Reset password UI
- `/backend/docs/PASSWORD-RESET-GUIDE.md` - This guide

### Modified:
- `/backend/services/auth-service/src/http/routes.ts` - Added 3 endpoints
- `/backend/services/auth-service/.env` - Added SMTP configuration
- `/backend/services/auth-service/package.json` - Added nodemailer, bcrypt
- `/frontend/src/App.tsx` - Added reset password route

## Next Steps

1. ✅ **Configure SMTP credentials** in `.env` (Required before testing)
2. ✅ **Restart backend** to load new code
3. ✅ **Test the flow** end-to-end
4. ⏳ Add rate limiting on forgot-password endpoint (recommended)
5. ⏳ Set up automated cleanup of expired tokens (recommended)
6. ⏳ Add logging/monitoring for password reset attempts (recommended)

## Support

If you encounter issues:
1. Check backend console for error messages
2. Check frontend browser console
3. Verify SMTP credentials are correct
4. Test with a simple email first
5. Check database for token records

## Success Indicators

You'll know it's working when:
- ✅ Forgot password form submits successfully
- ✅ Email arrives in inbox within seconds
- ✅ Reset link opens the reset password page
- ✅ New password saves successfully
- ✅ You can login with the new password
- ✅ Old password no longer works
