-- Migration: Add OAuth support to users table
-- Date: 2025-10-01
-- Description: Add columns to support social login via Google, Facebook, and X (Twitter)

-- Add OAuth provider columns
ALTER TABLE users 
ADD COLUMN IF NOT EXISTS oauth_provider VARCHAR(50),
ADD COLUMN IF NOT EXISTS oauth_id VARCHAR(255),
ADD COLUMN IF NOT EXISTS oauth_profile JSONB;

-- Create unique index to prevent duplicate OAuth accounts
CREATE UNIQUE INDEX IF NOT EXISTS users_oauth_provider_id_unique 
ON users(oauth_provider, oauth_id) 
WHERE oauth_provider IS NOT NULL AND oauth_id IS NOT NULL;

-- Make email and username nullable for OAuth users
-- (OAuth users might not have email initially, or we generate username)
ALTER TABLE users ALTER COLUMN email DROP NOT NULL;
ALTER TABLE users ALTER COLUMN password_hash DROP NOT NULL;

-- Add comment for documentation
COMMENT ON COLUMN users.oauth_provider IS 'OAuth provider name: google, facebook, twitter';
COMMENT ON COLUMN users.oauth_id IS 'Unique ID from OAuth provider';
COMMENT ON COLUMN users.oauth_profile IS 'JSON data from OAuth provider profile';
