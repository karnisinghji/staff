-- Performance Optimization: Database Indexes
-- Run this on your Neon PostgreSQL database

-- 1. Team Members Query Optimization
-- Index for team_members.user_id (most common query)
CREATE INDEX CONCURRENTLY IF NOT EXISTS idx_team_members_user_id 
ON team_members(user_id) WHERE team_member_id IS NOT NULL;

-- Index for team_members lookups with created_at ordering
CREATE INDEX CONCURRENTLY IF NOT EXISTS idx_team_members_user_created 
ON team_members(user_id, created_at DESC) WHERE team_member_id IS NOT NULL;

-- 2. User Blocks Query Optimization
CREATE INDEX CONCURRENTLY IF NOT EXISTS idx_user_blocks_blocker 
ON user_blocks(blocker_id, blocked_id);

CREATE INDEX CONCURRENTLY IF NOT EXISTS idx_user_blocks_blocked 
ON user_blocks(blocked_id, blocker_id);

-- 3. User Location Query Optimization
-- Index for location queries (latitude, longitude lookups)
CREATE INDEX CONCURRENTLY IF NOT EXISTS idx_users_location 
ON users(latitude, longitude) WHERE latitude IS NOT NULL AND longitude IS NOT NULL;

-- Index for tracking active users
CREATE INDEX CONCURRENTLY IF NOT EXISTS idx_users_tracking_active 
ON users(is_location_tracking_active, last_location_update) 
WHERE is_location_tracking_active = true;

-- 4. User Profile Joins Optimization
CREATE INDEX CONCURRENTLY IF NOT EXISTS idx_contractor_profiles_user 
ON contractor_profiles(user_id);

CREATE INDEX CONCURRENTLY IF NOT EXISTS idx_worker_profiles_user 
ON worker_profiles(user_id);

-- 5. Check existing indexes
SELECT 
    schemaname,
    tablename,
    indexname,
    indexdef
FROM pg_indexes
WHERE schemaname = 'public'
    AND tablename IN ('users', 'team_members', 'user_blocks', 'contractor_profiles', 'worker_profiles')
ORDER BY tablename, indexname;

-- 6. Analyze tables to update statistics
ANALYZE users;
ANALYZE team_members;
ANALYZE user_blocks;
ANALYZE contractor_profiles;
ANALYZE worker_profiles;
