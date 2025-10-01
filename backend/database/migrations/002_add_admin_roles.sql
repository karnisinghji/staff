-- Migration: Add admin and super_viewer roles
-- Date: 2025-10-01
-- Description: Extends the user_role ENUM to include admin and super_viewer roles

-- Step 1: Add new values to the user_role ENUM type
ALTER TYPE user_role ADD VALUE IF NOT EXISTS 'admin';
ALTER TYPE user_role ADD VALUE IF NOT EXISTS 'super_viewer';

-- Step 2: Create admin_profiles table for admin-specific metadata
CREATE TABLE IF NOT EXISTS admin_profiles (
    id UUID PRIMARY KEY REFERENCES users(id) ON DELETE CASCADE,
    permissions JSONB DEFAULT '{}', -- Store granular permissions
    can_manage_users BOOLEAN DEFAULT TRUE,
    can_manage_roles BOOLEAN DEFAULT TRUE,
    can_view_analytics BOOLEAN DEFAULT TRUE,
    last_login TIMESTAMP WITH TIME ZONE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Step 3: Create super_viewer_profiles table for viewer-specific metadata  
CREATE TABLE IF NOT EXISTS super_viewer_profiles (
    id UUID PRIMARY KEY REFERENCES users(id) ON DELETE CASCADE,
    view_permissions JSONB DEFAULT '{"users": true, "jobs": true, "analytics": true}',
    departments TEXT[], -- Which departments they can view
    last_viewed TIMESTAMP WITH TIME ZONE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Step 4: Add comments for documentation
COMMENT ON TABLE admin_profiles IS 'Administrative users with full system access and management capabilities';
COMMENT ON TABLE super_viewer_profiles IS 'Read-only users who can view all system data but cannot make any modifications';
COMMENT ON COLUMN users.role IS 'User role: contractor, worker, admin, or super_viewer';

-- Step 5: Create indexes for performance
CREATE INDEX IF NOT EXISTS idx_users_role ON users(role);
CREATE INDEX IF NOT EXISTS idx_admin_profiles_last_login ON admin_profiles(last_login);
CREATE INDEX IF NOT EXISTS idx_super_viewer_profiles_last_viewed ON super_viewer_profiles(last_viewed);
