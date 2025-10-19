-- Add last_submitted_at column to contractor_requirements table
-- This enables the 24-hour cooldown feature for contractor submissions

ALTER TABLE contractor_requirements 
ADD COLUMN IF NOT EXISTS last_submitted_at TIMESTAMP DEFAULT NOW();

-- Update existing rows to set last_submitted_at to their created_at
UPDATE contractor_requirements 
SET last_submitted_at = created_at 
WHERE last_submitted_at IS NULL;

-- Verify the change
SELECT id, contractor_id, required_workers, created_at, last_submitted_at 
FROM contractor_requirements 
ORDER BY created_at DESC 
LIMIT 5;
