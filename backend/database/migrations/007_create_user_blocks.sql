-- Migration: Create user_blocks table for blocking functionality
-- Purpose: Allow users to block other users for safety and professional network management
-- Date: 2025-10-02

-- Create user_blocks table
CREATE TABLE IF NOT EXISTS user_blocks (
    id SERIAL PRIMARY KEY,
    blocker_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    blocked_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    reason VARCHAR(100), -- Optional reason: 'harassment', 'unprofessional', 'spam', 'other'
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    
    -- Ensure unique blocking relationship
    UNIQUE(blocker_id, blocked_id),
    
    -- Prevent self-blocking
    CHECK (blocker_id != blocked_id)
);

-- Create indexes for performance
CREATE INDEX IF NOT EXISTS idx_user_blocks_blocker_id ON user_blocks(blocker_id);
CREATE INDEX IF NOT EXISTS idx_user_blocks_blocked_id ON user_blocks(blocked_id);
CREATE INDEX IF NOT EXISTS idx_user_blocks_created_at ON user_blocks(created_at);

-- Add comments for documentation
COMMENT ON TABLE user_blocks IS 'Stores user blocking relationships for safety and professional network management';
COMMENT ON COLUMN user_blocks.blocker_id IS 'User who initiated the block';
COMMENT ON COLUMN user_blocks.blocked_id IS 'User who was blocked';
COMMENT ON COLUMN user_blocks.reason IS 'Optional reason for blocking: harassment, unprofessional, spam, other';