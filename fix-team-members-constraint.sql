-- Fix: Add missing UNIQUE constraint on team_members table
-- This allows ON CONFLICT to work when accepting team requests

-- Check if constraint already exists (will error if not, which is fine)
-- If this runs successfully, the constraint already exists

-- Drop constraint if it exists with wrong name
DO $$
BEGIN
    IF EXISTS (
        SELECT 1 FROM pg_constraint 
        WHERE conname = 'team_members_user_id_team_member_id_key'
    ) THEN
        RAISE NOTICE 'Constraint team_members_user_id_team_member_id_key already exists';
    ELSE
        -- Add the unique constraint
        ALTER TABLE team_members 
        ADD CONSTRAINT team_members_user_id_team_member_id_key 
        UNIQUE (user_id, team_member_id);
        
        RAISE NOTICE 'Added UNIQUE constraint on team_members(user_id, team_member_id)';
    END IF;
END $$;

-- Verify the constraint exists
SELECT 
    conname as constraint_name,
    contype as constraint_type,
    pg_get_constraintdef(oid) as constraint_definition
FROM pg_constraint
WHERE conrelid = 'team_members'::regclass
AND contype = 'u';
