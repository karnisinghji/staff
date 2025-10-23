-- Add real-time GPS tracking metadata to users table
-- Migration: add_live_location_tracking.sql
-- Date: October 23, 2025

-- Add location tracking metadata columns
ALTER TABLE users 
ADD COLUMN IF NOT EXISTS last_location_update TIMESTAMP WITH TIME ZONE,
ADD COLUMN IF NOT EXISTS location_accuracy FLOAT,
ADD COLUMN IF NOT EXISTS is_location_tracking_active BOOLEAN DEFAULT false,
ADD COLUMN IF NOT EXISTS location_source VARCHAR(20) DEFAULT 'manual'; -- 'gps', 'manual', 'network', 'cell'

-- Create index for efficient queries on location update time
CREATE INDEX IF NOT EXISTS idx_users_last_location_update ON users(last_location_update DESC);
CREATE INDEX IF NOT EXISTS idx_users_tracking_active ON users(is_location_tracking_active) WHERE is_location_tracking_active = true;

-- Update existing records to set last_location_update based on updated_at where location exists
UPDATE users 
SET last_location_update = updated_at 
WHERE latitude IS NOT NULL 
  AND longitude IS NOT NULL 
  AND last_location_update IS NULL;

-- Add comments for documentation
COMMENT ON COLUMN users.last_location_update IS 'Timestamp when location (latitude/longitude) was last updated via GPS or manual entry';
COMMENT ON COLUMN users.location_accuracy IS 'GPS accuracy in meters (lower is better, typical range: 5-50m)';
COMMENT ON COLUMN users.is_location_tracking_active IS 'Whether user has active real-time GPS tracking enabled';
COMMENT ON COLUMN users.location_source IS 'Source of last location update: gps, manual, network, cell';
