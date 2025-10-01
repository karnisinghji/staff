-- Create additional tables for matching service

-- Match preferences table
CREATE TABLE IF NOT EXISTS match_preferences (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    preferred_skill_types JSONB DEFAULT '[]',
    preferred_locations JSONB DEFAULT '[]',
    max_distance INTEGER DEFAULT 25,
    budget_preference JSONB DEFAULT NULL,
    experience_preference VARCHAR(20) DEFAULT 'any' CHECK (experience_preference IN ('beginner', 'intermediate', 'expert', 'any')),
    urgency_preference VARCHAR(20) DEFAULT 'any' CHECK (urgency_preference IN ('low', 'medium', 'high', 'any')),
    work_type_preference VARCHAR(20) DEFAULT 'any' CHECK (work_type_preference IN ('one-time', 'recurring', 'any')),
    rating_threshold DECIMAL(3,2) DEFAULT 3.0,
    auto_match BOOLEAN DEFAULT true,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    UNIQUE(user_id)
);

-- Saved matches table
CREATE TABLE IF NOT EXISTS saved_matches (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    matched_user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    match_type VARCHAR(20) NOT NULL CHECK (match_type IN ('worker', 'contractor')),
    match_score INTEGER NOT NULL CHECK (match_score >= 0 AND match_score <= 100),
    notes TEXT,
    is_favorite BOOLEAN DEFAULT false,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    UNIQUE(user_id, matched_user_id)
);

-- Match requests table for tracking matching history
CREATE TABLE IF NOT EXISTS match_requests (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    requester_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    requester_role VARCHAR(20) NOT NULL CHECK (requester_role IN ('contractor', 'worker')),
    criteria JSONB NOT NULL,
    status VARCHAR(20) DEFAULT 'pending' CHECK (status IN ('pending', 'completed', 'expired')),
    matches_found INTEGER DEFAULT 0,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    expires_at TIMESTAMP WITH TIME ZONE DEFAULT (CURRENT_TIMESTAMP + INTERVAL '24 hours')
);

-- Create indexes for better performance
CREATE INDEX IF NOT EXISTS idx_match_preferences_user_id ON match_preferences(user_id);
CREATE INDEX IF NOT EXISTS idx_saved_matches_user_id ON saved_matches(user_id);
CREATE INDEX IF NOT EXISTS idx_saved_matches_matched_user_id ON saved_matches(matched_user_id);
CREATE INDEX IF NOT EXISTS idx_saved_matches_is_favorite ON saved_matches(is_favorite);
CREATE INDEX IF NOT EXISTS idx_match_requests_requester_id ON match_requests(requester_id);
CREATE INDEX IF NOT EXISTS idx_match_requests_status ON match_requests(status);
CREATE INDEX IF NOT EXISTS idx_match_requests_created_at ON match_requests(created_at);

-- Create indexes on worker_profiles for matching queries
CREATE INDEX IF NOT EXISTS idx_worker_profiles_skill_type ON worker_profiles(skill_type);
CREATE INDEX IF NOT EXISTS idx_worker_profiles_is_available ON worker_profiles(is_available);
CREATE INDEX IF NOT EXISTS idx_worker_profiles_rating ON worker_profiles(rating);
CREATE INDEX IF NOT EXISTS idx_worker_profiles_hourly_rate ON worker_profiles(hourly_rate);

-- Create indexes on contractor_profiles for matching queries  
CREATE INDEX IF NOT EXISTS idx_contractor_profiles_verification_status ON contractor_profiles(verification_status);
CREATE INDEX IF NOT EXISTS idx_contractor_profiles_rating ON contractor_profiles(rating);

-- Create composite indexes for common matching queries
CREATE INDEX IF NOT EXISTS idx_worker_profiles_skill_available_rating ON worker_profiles(skill_type, is_available, rating);
CREATE INDEX IF NOT EXISTS idx_users_role_active ON users(role, is_active);

-- Add some sample match preferences for existing users
INSERT INTO match_preferences (user_id, preferred_skill_types, preferred_locations, max_distance, rating_threshold)
SELECT 
    id,
    CASE 
        WHEN role = 'contractor' THEN '["carpenter", "plumber", "electrician"]'::jsonb
        ELSE '[]'::jsonb
    END,
    '[' || '"' || location || '"' || ']',
    25,
    3.5
FROM users 
WHERE role IN ('contractor', 'worker')
ON CONFLICT (user_id) DO NOTHING;