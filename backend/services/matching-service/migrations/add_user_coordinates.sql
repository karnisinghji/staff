-- Migration: Add latitude and longitude columns to users table for distance calculation
-- Date: 2025-10-20
-- Purpose: Enable real-time distance tracking between contractors and team members

ALTER TABLE users 
ADD COLUMN IF NOT EXISTS latitude DECIMAL(10, 8),
ADD COLUMN IF NOT EXISTS longitude DECIMAL(11, 8);

-- Add index for geospatial queries
CREATE INDEX IF NOT EXISTS idx_users_coordinates ON users(latitude, longitude);

-- Add comment for documentation
COMMENT ON COLUMN users.latitude IS 'User latitude coordinate for distance calculations (-90 to 90)';
COMMENT ON COLUMN users.longitude IS 'User longitude coordinate for distance calculations (-180 to 180)';
