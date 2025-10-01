-- Migration 002: admin_settings table to persist default matching weights

CREATE TABLE IF NOT EXISTS admin_settings (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    key TEXT NOT NULL UNIQUE,
    value JSONB NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Insert default weights if not present
INSERT INTO admin_settings (key, value)
SELECT 'matching_default_weights', '{"skill":40,"distance":25,"experience":15,"budget":10,"rating":7,"availability":3,"verification":25,"jobHistory":15}'::jsonb
WHERE NOT EXISTS (SELECT 1 FROM admin_settings WHERE key = 'matching_default_weights');
