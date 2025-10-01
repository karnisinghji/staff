-- Create team_requests table for handling team invitation requests
-- This replaces the "Save for Later" functionality with a proper request system

CREATE TABLE team_requests (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    sender_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    receiver_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    status VARCHAR(20) NOT NULL DEFAULT 'pending' CHECK (status IN ('pending', 'accepted', 'rejected', 'cancelled')),
    message TEXT,
    match_context JSONB, -- Store details like skill, distance, match score for context
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    expires_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP + INTERVAL '30 days',
    
    -- Prevent duplicate requests between same users
    UNIQUE(sender_id, receiver_id)
);

-- Create team_members table for accepted team relationships
CREATE TABLE team_members (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    team_member_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    relationship_type VARCHAR(20) NOT NULL DEFAULT 'teammate' CHECK (relationship_type IN ('teammate', 'preferred_contractor', 'preferred_worker')),
    formed_from_request_id UUID REFERENCES team_requests(id) ON DELETE SET NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    notes TEXT,
    
    -- Ensure bidirectional relationship (if A is teammate of B, then B is teammate of A)
    UNIQUE(user_id, team_member_id)
);

-- Create indexes for better performance
CREATE INDEX idx_team_requests_sender_id ON team_requests(sender_id);
CREATE INDEX idx_team_requests_receiver_id ON team_requests(receiver_id);
CREATE INDEX idx_team_requests_status ON team_requests(status);
CREATE INDEX idx_team_requests_created_at ON team_requests(created_at);
CREATE INDEX idx_team_requests_expires_at ON team_requests(expires_at);

CREATE INDEX idx_team_members_user_id ON team_members(user_id);
CREATE INDEX idx_team_members_team_member_id ON team_members(team_member_id);
CREATE INDEX idx_team_members_relationship_type ON team_members(relationship_type);

-- Create trigger to update updated_at timestamp
CREATE OR REPLACE FUNCTION update_team_requests_updated_at()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = CURRENT_TIMESTAMP;
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER update_team_requests_updated_at
    BEFORE UPDATE ON team_requests
    FOR EACH ROW
    EXECUTE FUNCTION update_team_requests_updated_at();

-- Function to automatically create bidirectional team member relationship
CREATE OR REPLACE FUNCTION create_bidirectional_team_relationship()
RETURNS TRIGGER AS $$
BEGIN
    -- Insert the reverse relationship if it doesn't exist
    INSERT INTO team_members (user_id, team_member_id, relationship_type, formed_from_request_id, notes)
    VALUES (NEW.team_member_id, NEW.user_id, NEW.relationship_type, NEW.formed_from_request_id, 'Auto-created reverse relationship')
    ON CONFLICT (user_id, team_member_id) DO NOTHING;
    
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER create_bidirectional_team_relationship
    AFTER INSERT ON team_members
    FOR EACH ROW
    EXECUTE FUNCTION create_bidirectional_team_relationship();