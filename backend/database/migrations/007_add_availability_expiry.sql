-- Migration: Add availability expiry tracking
-- Purpose: Track when worker availability status should automatically expire
-- Date: 2025-10-01

-- Add column to track when availability expires (NULL means no expiry)
ALTER TABLE worker_profiles 
ADD COLUMN availability_expires_at TIMESTAMP WITH TIME ZONE DEFAULT NULL;

-- Create index for efficient queries to find expired availability statuses
CREATE INDEX idx_worker_profiles_availability_expires 
ON worker_profiles(availability_expires_at) 
WHERE availability_expires_at IS NOT NULL;

-- Add comment to document the feature
COMMENT ON COLUMN worker_profiles.availability_expires_at IS 
'Timestamp when availability status should automatically reset to false. NULL means no auto-expiry.';