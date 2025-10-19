-- Communication Service - Messages Schema
-- This table stores direct messages between users

CREATE TABLE IF NOT EXISTS messages (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    from_user_id VARCHAR(255) NOT NULL,
    to_user_id VARCHAR(255) NOT NULL,
    body TEXT NOT NULL,
    created_at TIMESTAMP DEFAULT NOW(),
    read_at TIMESTAMP,
    
    -- Indexes for efficient queries
    CONSTRAINT messages_check_not_self CHECK (from_user_id != to_user_id)
);

-- Index for fetching user's messages (sent or received)
CREATE INDEX IF NOT EXISTS idx_messages_from_user ON messages(from_user_id, created_at DESC);
CREATE INDEX IF NOT EXISTS idx_messages_to_user ON messages(to_user_id, created_at DESC);

-- Index for conversation queries (between two specific users)
CREATE INDEX IF NOT EXISTS idx_messages_conversation ON messages(from_user_id, to_user_id, created_at DESC);

-- Index for unread messages
CREATE INDEX IF NOT EXISTS idx_messages_unread ON messages(to_user_id, read_at) WHERE read_at IS NULL;

-- Sample query to verify
SELECT 'Messages table created successfully' AS status;
