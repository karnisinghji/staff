-- Migration: Add unique constraint on worker_profiles.user_id
-- Purpose: Enable UPSERT operations with ON CONFLICT (user_id)
-- Date: 2025-10-01

-- Add unique constraint on user_id column
ALTER TABLE worker_profiles 
ADD CONSTRAINT worker_profiles_user_id_unique UNIQUE (user_id);

-- Create index for performance (automatically created with unique constraint, but being explicit)
-- This index is automatically created by the unique constraint above