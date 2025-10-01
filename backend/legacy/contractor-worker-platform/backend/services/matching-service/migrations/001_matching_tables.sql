-- Matching Service Database Schema
-- Add matching-specific tables to support the matching algorithm

-- Worker Availability table
CREATE TABLE IF NOT EXISTS worker_availability (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    worker_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    is_available BOOLEAN DEFAULT true,
    available_hours JSONB, -- {"monday": ["09:00-17:00"], "tuesday": ["09:00-17:00"], ...}
    preferred_locations TEXT[], -- Array of preferred work locations
    max_travel_distance INTEGER DEFAULT 25, -- in kilometers
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Matching Preferences table
CREATE TABLE IF NOT EXISTS matching_preferences (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    preferred_skills TEXT[], -- For contractors: skills they need, For workers: skills they offer
    min_hourly_rate DECIMAL(10,2),
    max_hourly_rate DECIMAL(10,2),
    preferred_experience_years INTEGER,
    max_distance_km INTEGER DEFAULT 25,
    auto_match_enabled BOOLEAN DEFAULT false,
    notification_preferences JSONB, -- {"email": true, "push": false, ...}
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Match Results table
CREATE TABLE IF NOT EXISTS match_results (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    contractor_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    worker_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    match_score DECIMAL(5,2) NOT NULL, -- 0.00 to 100.00
    skill_match_score DECIMAL(5,2), -- Component scores
    location_match_score DECIMAL(5,2),
    rate_match_score DECIMAL(5,2),
    rating_match_score DECIMAL(5,2),
    availability_match_score DECIMAL(5,2),
    status VARCHAR(20) DEFAULT 'pending', -- 'pending', 'viewed', 'contacted', 'hired', 'declined'
    contractor_viewed BOOLEAN DEFAULT false,
    worker_viewed BOOLEAN DEFAULT false,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    expires_at TIMESTAMP DEFAULT (CURRENT_TIMESTAMP + INTERVAL '7 days')
);

-- Saved Searches table
CREATE TABLE IF NOT EXISTS saved_searches (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    search_name VARCHAR(100) NOT NULL,
    search_criteria JSONB NOT NULL, -- Store search filters as JSON
    is_active BOOLEAN DEFAULT true,
    auto_notifications BOOLEAN DEFAULT false,
    last_run_at TIMESTAMP,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Indexes for performance
CREATE INDEX IF NOT EXISTS idx_worker_availability_worker_id ON worker_availability(worker_id);
CREATE INDEX IF NOT EXISTS idx_worker_availability_available ON worker_availability(is_available);

CREATE INDEX IF NOT EXISTS idx_matching_preferences_user_id ON matching_preferences(user_id);
CREATE INDEX IF NOT EXISTS idx_matching_preferences_skills ON matching_preferences USING GIN(preferred_skills);

CREATE INDEX IF NOT EXISTS idx_match_results_contractor ON match_results(contractor_id);
CREATE INDEX IF NOT EXISTS idx_match_results_worker ON match_results(worker_id);
CREATE INDEX IF NOT EXISTS idx_match_results_score ON match_results(match_score DESC);
CREATE INDEX IF NOT EXISTS idx_match_results_status ON match_results(status);
CREATE INDEX IF NOT EXISTS idx_match_results_expires ON match_results(expires_at);

CREATE INDEX IF NOT EXISTS idx_saved_searches_user_id ON saved_searches(user_id);
CREATE INDEX IF NOT EXISTS idx_saved_searches_active ON saved_searches(is_active);

-- Insert some sample worker availability data
INSERT INTO worker_availability (worker_id, is_available, available_hours, preferred_locations, max_travel_distance) VALUES 
('550e8400-e29b-41d4-a716-446655440004', true, '{"monday": ["09:00-17:00"], "tuesday": ["09:00-17:00"], "wednesday": ["09:00-17:00"], "thursday": ["09:00-17:00"], "friday": ["09:00-17:00"]}', ARRAY['Downtown', 'Midtown'], 30),
('550e8400-e29b-41d4-a716-446655440005', true, '{"monday": ["08:00-18:00"], "wednesday": ["08:00-18:00"], "friday": ["08:00-18:00"], "saturday": ["10:00-16:00"]}', ARRAY['Suburbs', 'North End'], 40),
('550e8400-e29b-41d4-a716-446655440006', false, '{"tuesday": ["07:00-15:00"], "thursday": ["07:00-15:00"]}', ARRAY['Industrial District'], 20),
('550e8400-e29b-41d4-a716-446655440007', true, '{"monday": ["06:00-14:00"], "tuesday": ["06:00-14:00"], "wednesday": ["06:00-14:00"], "thursday": ["06:00-14:00"], "friday": ["06:00-14:00"]}', ARRAY['Residential Areas'], 35),
('550e8400-e29b-41d4-a716-446655440008', true, '{"monday": ["10:00-18:00"], "tuesday": ["10:00-18:00"], "wednesday": ["10:00-18:00"], "friday": ["10:00-18:00"]}', ARRAY['Commercial District'], 25)
ON CONFLICT DO NOTHING;

-- Insert sample matching preferences
INSERT INTO matching_preferences (user_id, preferred_skills, min_hourly_rate, max_hourly_rate, preferred_experience_years, max_distance_km, auto_match_enabled) VALUES 
-- Contractors looking for specific skills
('550e8400-e29b-41d4-a716-446655440001', ARRAY['carpenter', 'general_contractor'], 25.00, 50.00, 5, 30, true),
('550e8400-e29b-41d4-a716-446655440002', ARRAY['plumber'], 30.00, 60.00, 3, 25, false),
('550e8400-e29b-41d4-a716-446655440003', ARRAY['electrician'], 35.00, 70.00, 7, 40, true),
-- Workers advertising their skills  
('550e8400-e29b-41d4-a716-446655440004', ARRAY['carpenter'], 20.00, 45.00, 3, 30, true),
('550e8400-e29b-41d4-a716-446655440005', ARRAY['plumber'], 25.00, 55.00, 8, 40, true),
('550e8400-e29b-41d4-a716-446655440006', ARRAY['electrician'], 30.00, 65.00, 12, 20, false),
('550e8400-e29b-41d4-a716-446655440007', ARRAY['general_contractor'], 18.00, 40.00, 2, 35, true),
('550e8400-e29b-41d4-a716-446655440008', ARRAY['painter'], 15.00, 35.00, 4, 25, true)
ON CONFLICT DO NOTHING;