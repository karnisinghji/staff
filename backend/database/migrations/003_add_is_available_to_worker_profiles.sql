-- Migration: Add is_available column to worker_profiles table
-- This column tracks whether a worker is available for work and visible in My Team section

-- Add is_available column with default value of false
ALTER TABLE worker_profiles 
ADD COLUMN IF NOT EXISTS is_available BOOLEAN DEFAULT false;

-- Add comment to document the column
COMMENT ON COLUMN worker_profiles.is_available IS 'Indicates if the worker is currently available for work. Used for filtering in My Team section.';

-- Optional: Update existing rows to set a default value
-- UPDATE worker_profiles SET is_available = false WHERE is_available IS NULL;
