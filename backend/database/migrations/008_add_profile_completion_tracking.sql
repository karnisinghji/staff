-- Migration: Add profile completion tracking fields
-- Description: Add profileCompletedAt and profileLockedAt timestamps to users table

BEGIN;

-- Add profile completion tracking fields
ALTER TABLE users 
ADD COLUMN profile_completed_at TIMESTAMP NULL,
ADD COLUMN profile_locked_at TIMESTAMP NULL;

-- Add indexes for performance
CREATE INDEX IF NOT EXISTS idx_users_profile_completed_at ON users(profile_completed_at);
CREATE INDEX IF NOT EXISTS idx_users_profile_locked_at ON users(profile_locked_at);

-- Add comment for documentation
COMMENT ON COLUMN users.profile_completed_at IS 'Timestamp when user first completed their mandatory profile fields';
COMMENT ON COLUMN users.profile_locked_at IS 'Timestamp when critical fields (username, email, phone) were locked for security';

COMMIT;