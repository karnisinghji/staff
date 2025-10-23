-- Script: Clean up invalid same-role team members
-- Date: 2025-10-20
-- Purpose: Remove existing team_members records where both users have the same role

-- First, let's see what invalid relationships exist
SELECT 
    tm.id,
    tm.user_id,
    tm.team_member_id,
    u1.name as user_name,
    u1.role as user_role,
    u1.email as user_email,
    u2.name as team_member_name,
    u2.role as team_member_role,
    u2.email as team_member_email,
    tm.relationship_type,
    tm.created_at
FROM team_members tm
JOIN users u1 ON tm.user_id = u1.id
JOIN users u2 ON tm.team_member_id = u2.id
WHERE u1.role = u2.role
ORDER BY tm.created_at DESC;

-- Show count of invalid relationships
SELECT 
    u1.role as same_role,
    COUNT(*) as invalid_count
FROM team_members tm
JOIN users u1 ON tm.user_id = u1.id
JOIN users u2 ON tm.team_member_id = u2.id
WHERE u1.role = u2.role
GROUP BY u1.role;

-- ⚠️ DESTRUCTIVE OPERATION - Remove invalid team relationships
-- Uncomment the following line to execute the cleanup:

-- DELETE FROM team_members tm
-- USING users u1, users u2
-- WHERE tm.user_id = u1.id 
--   AND tm.team_member_id = u2.id
--   AND u1.role = u2.role;

-- After cleanup, verify no invalid relationships remain:
-- SELECT COUNT(*) as invalid_count
-- FROM team_members tm
-- JOIN users u1 ON tm.user_id = u1.id
-- JOIN users u2 ON tm.team_member_id = u2.id
-- WHERE u1.role = u2.role;
-- Expected result: invalid_count = 0

-- Also clean up any invalid team_requests (pending requests between same roles)
-- Uncomment to execute:

-- UPDATE team_requests tr
-- SET status = 'cancelled', updated_at = CURRENT_TIMESTAMP
-- FROM users u1, users u2
-- WHERE tr.sender_id = u1.id 
--   AND tr.receiver_id = u2.id
--   AND u1.role = u2.role
--   AND tr.status = 'pending';
