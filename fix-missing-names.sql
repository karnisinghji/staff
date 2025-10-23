-- Fix missing names in users table
-- This script copies email usernames as names for users without names

-- Show current state
SELECT id, name, email, role 
FROM users 
WHERE role IN ('worker', 'contractor') 
AND (name IS NULL OR name = '')
ORDER BY created_at DESC;

-- Update workers without names: use email prefix as name
UPDATE users 
SET name = SPLIT_PART(email, '@', 1)
WHERE role = 'worker' 
AND (name IS NULL OR name = '')
AND email IS NOT NULL;

-- Update contractors without names: use email prefix as name
UPDATE users 
SET name = SPLIT_PART(email, '@', 1)
WHERE role = 'contractor' 
AND (name IS NULL OR name = '')
AND email IS NOT NULL;

-- Show results
SELECT id, name, email, role 
FROM users 
WHERE role IN ('worker', 'contractor')
ORDER BY created_at DESC
LIMIT 20;
