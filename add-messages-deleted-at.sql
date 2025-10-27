-- Add deleted_at column to messages table for soft delete functionality
-- Run this on your Neon PostgreSQL database

ALTER TABLE messages 
ADD COLUMN IF NOT EXISTS deleted_at TIMESTAMP DEFAULT NULL;

-- Create index for efficient queries (exclude deleted messages)
CREATE INDEX IF NOT EXISTS idx_messages_not_deleted 
ON messages(from_user_id, to_user_id, created_at DESC) 
WHERE deleted_at IS NULL;

-- Verify the column was added
SELECT 
    column_name, 
    data_type, 
    is_nullable,
    column_default
FROM information_schema.columns 
WHERE table_name = 'messages' 
AND column_name = 'deleted_at';

SELECT 'Messages table updated with deleted_at column' AS status;
