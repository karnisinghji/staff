-- Add admin role to user_role enum if it doesn't exist
DO $$ 
BEGIN 
    IF NOT EXISTS (SELECT 1 FROM pg_enum WHERE enumlabel = 'admin' AND enumtypid = (SELECT oid FROM pg_type WHERE typname = 'user_role')) THEN
        ALTER TYPE user_role ADD VALUE 'admin';
    END IF;
END $$;

-- Verify the enum values
SELECT enumlabel FROM pg_enum WHERE enumtypid = (SELECT oid FROM pg_type WHERE typname = 'user_role');