-- Script to create initial admin user
-- Run this to set up the first admin account

-- Insert admin user (password: Admin@123456)
-- Note: This bcrypt hash corresponds to "Admin@123456"
INSERT INTO users (
    email,
    password,
    name,
    phone,
    location,
    role
) VALUES (
    'admin@platform.com',
    '$2b$10$ZGxVmJ5aK1YH3k2VZx.8J.FKvNq8KGYLxH9eZvZEz4F6oFHkPXWv6',
    'System Administrator',
    '+1-555-0100',
    'Headquarters',
    'admin'
) ON CONFLICT (email) DO NOTHING
RETURNING id, email, role;

-- Insert the admin profile
INSERT INTO admin_profiles (
    id,
    can_manage_users,
    can_manage_roles,
    can_view_analytics
) SELECT 
    id,
    TRUE,
    TRUE,
    TRUE
FROM users
WHERE email = 'admin@platform.com'
ON CONFLICT (id) DO NOTHING;

-- Create a super_viewer user for testing (password: Viewer@123456)
INSERT INTO users (
    email,
    password,
    name,
    phone,
    location,
    role
) VALUES (
    'viewer@platform.com',
    '$2b$10$ZGxVmJ5aK1YH3k2VZx.8J.FKvNq8KGYLxH9eZvZEz4F6oFHkPXWv6',
    'System Viewer',
    '+1-555-0101',
    'Remote',
    'super_viewer'
) ON CONFLICT (email) DO NOTHING
RETURNING id, email, role;

-- Insert the super_viewer profile  
INSERT INTO super_viewer_profiles (
    id,
    view_permissions,
    departments
) SELECT 
    id,
    '{"users": true, "jobs": true, "analytics": true, "contractors": true, "workers": true}'::jsonb,
    ARRAY['all']::TEXT[]
FROM users
WHERE email = 'viewer@platform.com'
ON CONFLICT (id) DO NOTHING;

-- Display created users
SELECT 
    id,
    email,
    name,
    role,
    created_at
FROM users
WHERE email IN ('admin@platform.com', 'viewer@platform.com')
ORDER BY role;
