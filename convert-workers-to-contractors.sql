-- Convert specific workers to contractors
-- Run this script to change Chanchal, Narendra, Shyam, Hari, and Karni from workers to contractors

-- 1. Update user role from 'worker' to 'contractor'
UPDATE users 
SET role = 'contractor' 
WHERE email IN (
    '2024mcaaimlchanchal20239@poornima.edu.in',  -- Chanchal Palawat
    'narendrasharma@example.com',                -- Narendra Sharma (adjust email if different)
    'shyamsingh@example.com',                    -- Shyam Singh (adjust email if different)
    'harisingh@example.com',                     -- Hari Singh (adjust email if different)
    'karnisingh@example.com'                     -- Karni Singh (adjust email if different)
);

-- 2. For each converted user, create a contractor_profile
-- First, get the user IDs
DO $$
DECLARE
    user_record RECORD;
BEGIN
    -- Loop through the users we want to convert
    FOR user_record IN 
        SELECT id, name, location FROM users 
        WHERE email IN (
            '2024mcaaimlchanchal20239@poornima.edu.in',
            'narendrasharma@example.com',
            'shyamsingh@example.com',
            'harisingh@example.com',
            'karnisingh@example.com'
        )
        AND role = 'contractor'  -- Only process if role update was successful
    LOOP
        -- Create contractor_profile if it doesn't exist
        INSERT INTO contractor_profiles (id, company_name, rating, total_projects, need_worker_status)
        VALUES (
            user_record.id,
            user_record.name || ' Construction',  -- Company name based on user name
            0.0,                                   -- Starting rating
            0,                                     -- No projects yet
            true                                   -- Need workers
        )
        ON CONFLICT (id) DO NOTHING;  -- Skip if already exists
        
        -- Optionally delete their worker_profile
        DELETE FROM worker_profiles WHERE id = user_record.id;
    END LOOP;
END $$;

-- 3. Verify the changes
SELECT u.id, u.name, u.email, u.role, cp.company_name, cp.need_worker_status
FROM users u
LEFT JOIN contractor_profiles cp ON u.id = cp.id
WHERE u.email IN (
    '2024mcaaimlchanchal20239@poornima.edu.in',
    'narendrasharma@example.com',
    'shyamsingh@example.com',
    'harisingh@example.com',
    'karnisingh@example.com'
);
