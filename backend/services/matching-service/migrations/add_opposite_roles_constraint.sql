-- Migration: Prevent same-role team members (contractors can only team with workers)
-- Date: 2025-10-20
-- Purpose: Add database-level validation to ensure contractors and workers don't team with same role

-- Add a check constraint to team_members table
-- This will validate at database level that user and team_member have opposite roles

-- First, let's create a function to check opposite roles
CREATE OR REPLACE FUNCTION check_opposite_roles()
RETURNS TRIGGER AS $$
DECLARE
    user_role TEXT;
    member_role TEXT;
BEGIN
    -- Get the role of the user
    SELECT role INTO user_role FROM users WHERE id = NEW.user_id;
    
    -- Get the role of the team member
    SELECT role INTO member_role FROM users WHERE id = NEW.team_member_id;
    
    -- Check if roles are the same
    IF user_role = member_role THEN
        IF user_role = 'contractor' THEN
            RAISE EXCEPTION 'Contractors cannot team with other contractors';
        ELSIF user_role = 'worker' THEN
            RAISE EXCEPTION 'Workers cannot team with other workers';
        ELSE
            RAISE EXCEPTION 'Users must have opposite roles to form a team';
        END IF;
    END IF;
    
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Drop the trigger if it exists (for idempotency)
DROP TRIGGER IF EXISTS enforce_opposite_roles_trigger ON team_members;

-- Create trigger on team_members table
CREATE TRIGGER enforce_opposite_roles_trigger
    BEFORE INSERT OR UPDATE ON team_members
    FOR EACH ROW
    EXECUTE FUNCTION check_opposite_roles();

-- Add comment
COMMENT ON FUNCTION check_opposite_roles() IS 'Ensures that team members have opposite roles (contractor with worker only)';

-- Test the constraint (optional - remove in production)
-- This should fail:
-- INSERT INTO team_members (user_id, team_member_id, relationship_type) 
-- VALUES (
--     (SELECT id FROM users WHERE role = 'contractor' LIMIT 1),
--     (SELECT id FROM users WHERE role = 'contractor' LIMIT 1 OFFSET 1),
--     'teammate'
-- );
