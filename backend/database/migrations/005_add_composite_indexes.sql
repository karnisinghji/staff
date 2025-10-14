-- Add composite indexes for optimizing common query patterns
-- Migration: 005_add_composite_indexes.sql
-- Date: 2025-10-14
-- Description: Adds composite indexes to improve performance of team request and member queries

-- Composite index for fetching pending requests by receiver
-- Optimizes: SELECT * FROM team_requests WHERE receiver_id = ? AND status = 'pending'
CREATE INDEX IF NOT EXISTS idx_team_requests_receiver_status 
ON team_requests(receiver_id, status) 
WHERE status = 'pending';

-- Composite index for fetching requests by sender and status
-- Optimizes: SELECT * FROM team_requests WHERE sender_id = ? AND status = ?
CREATE INDEX IF NOT EXISTS idx_team_requests_sender_status 
ON team_requests(sender_id, status);

-- Composite index for team member lookups with relationship filtering
-- Optimizes: SELECT * FROM team_members WHERE user_id = ? AND relationship_type = ?
CREATE INDEX IF NOT EXISTS idx_team_members_user_relationship 
ON team_members(user_id, relationship_type);

-- Index for blocking checks in team queries
-- Optimizes: LEFT JOIN user_blocks WHERE blocker_id = ? OR blocked_id = ?
CREATE INDEX IF NOT EXISTS idx_user_blocks_blocker_blocked 
ON user_blocks(blocker_id, blocked_id);

-- Composite index for team member bidirectional lookups
-- Optimizes: WHERE (user_id = ? AND team_member_id = ?) OR (user_id = ? AND team_member_id = ?)
CREATE INDEX IF NOT EXISTS idx_team_members_bidirectional 
ON team_members(user_id, team_member_id, created_at DESC);

-- Index for efficient pagination queries with ORDER BY created_at
-- Optimizes: WHERE receiver_id = ? ORDER BY created_at DESC LIMIT ? OFFSET ?
CREATE INDEX IF NOT EXISTS idx_team_requests_receiver_created 
ON team_requests(receiver_id, created_at DESC);

-- Index for sender requests with ordering
CREATE INDEX IF NOT EXISTS idx_team_requests_sender_created 
ON team_requests(sender_id, created_at DESC);

-- Comments explaining the benefits
COMMENT ON INDEX idx_team_requests_receiver_status IS 'Optimizes pending team request queries';
COMMENT ON INDEX idx_team_requests_sender_status IS 'Optimizes sender request history queries';
COMMENT ON INDEX idx_team_members_user_relationship IS 'Optimizes relationship type filtering';
COMMENT ON INDEX idx_user_blocks_blocker_blocked IS 'Optimizes blocking checks in joins';
COMMENT ON INDEX idx_team_members_bidirectional IS 'Optimizes bidirectional team member lookups';
COMMENT ON INDEX idx_team_requests_receiver_created IS 'Optimizes paginated receiver queries';
COMMENT ON INDEX idx_team_requests_sender_created IS 'Optimizes paginated sender queries';

-- Add analyze after index creation for better query planning
ANALYZE team_requests;
ANALYZE team_members;
ANALYZE user_blocks;
