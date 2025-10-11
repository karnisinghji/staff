-- Migration: Reset all user passwords to bcrypt hash
-- Purpose: Fix password hash inconsistencies (SHA-256 vs bcrypt)
-- New universal password: "password123"
-- Date: 2025-10-10

BEGIN;

-- Store the new bcrypt hash for password "password123"
UPDATE users 
SET 
    password_hash = '$2b$10$2oRG/1iejD0x/INAHNMi1enEtSghelPkQhQKqbrnFsNGgKVbiWuqe',
    updated_at = CURRENT_TIMESTAMP
WHERE 
    -- Only update if password_hash doesn't already start with $2b$ (not already bcrypt)
    password_hash NOT LIKE '$2b$%' OR password_hash IS NULL;

-- Report results
SELECT 
    COUNT(*) as users_updated,
    'All non-bcrypt passwords updated to: password123' as message
FROM users 
WHERE password_hash = '$2b$10$2oRG/1iejD0x/INAHNMi1enEtSghelPkQhQKqbrnFsNGgKVbiWuqe';

-- Show all users with their roles
SELECT 
    email,
    role,
    CASE 
        WHEN password_hash LIKE '$2b$%' THEN 'bcrypt ✓'
        ELSE 'OLD HASH ✗'
    END as hash_type,
    created_at
FROM users
ORDER BY created_at DESC
LIMIT 20;

COMMIT;

-- ============================================
-- POST-MIGRATION INSTRUCTIONS:
-- ============================================
-- After running this migration, all users can log in with:
-- Password: "password123"
-- 
-- Working test accounts:
-- - hanny@info.com / password123
-- - hanny2@info.com / password123  
-- - testuser456@example.com / password123
-- - ram@gmail.com / password123
-- - Any other user / password123
-- ============================================
