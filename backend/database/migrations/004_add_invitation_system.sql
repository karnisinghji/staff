-- Invitation system database schema
-- Run this to add invitation functionality

-- Create invitations table
CREATE TABLE IF NOT EXISTS invitations (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    inviter_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    
    -- Invitation details
    invitation_code VARCHAR(32) UNIQUE NOT NULL, -- Unique code for the link
    invitation_type VARCHAR(20) DEFAULT 'general', -- 'general', 'worker', 'contractor'
    
    -- Recipient info (optional - can be filled when sent)
    recipient_name VARCHAR(100),
    recipient_email VARCHAR(255),
    recipient_phone VARCHAR(20),
    
    -- Invitation status and tracking
    status VARCHAR(20) DEFAULT 'sent', -- 'sent', 'clicked', 'registered', 'expired'
    clicks_count INTEGER DEFAULT 0,
    
    -- Registration tracking
    registered_user_id UUID REFERENCES users(id) ON DELETE SET NULL,
    registered_at TIMESTAMP,
    
    -- Metadata
    expires_at TIMESTAMP DEFAULT (NOW() + INTERVAL '30 days'),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    
    -- Optional: Custom message
    custom_message TEXT,
    
    -- Tracking
    last_clicked_at TIMESTAMP,
    user_agent TEXT,
    ip_address INET
);

-- Create indexes for performance
CREATE INDEX IF NOT EXISTS idx_invitations_inviter_id ON invitations(inviter_id);
CREATE INDEX IF NOT EXISTS idx_invitations_code ON invitations(invitation_code);
CREATE INDEX IF NOT EXISTS idx_invitations_status ON invitations(status);
CREATE INDEX IF NOT EXISTS idx_invitations_registered_user ON invitations(registered_user_id);

-- Create invitation_clicks table for detailed tracking
CREATE TABLE IF NOT EXISTS invitation_clicks (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    invitation_id UUID NOT NULL REFERENCES invitations(id) ON DELETE CASCADE,
    
    clicked_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    ip_address INET,
    user_agent TEXT,
    referrer TEXT
);

CREATE INDEX IF NOT EXISTS idx_invitation_clicks_invitation_id ON invitation_clicks(invitation_id);

-- Optional: Referral rewards tracking
CREATE TABLE IF NOT EXISTS referral_rewards (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    inviter_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    referee_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    invitation_id UUID NOT NULL REFERENCES invitations(id) ON DELETE CASCADE,
    
    reward_type VARCHAR(50), -- 'bonus_credits', 'discount', 'premium_days', etc.
    reward_value DECIMAL(10,2),
    reward_description TEXT,
    
    status VARCHAR(20) DEFAULT 'pending', -- 'pending', 'awarded', 'cancelled'
    awarded_at TIMESTAMP,
    
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX IF NOT EXISTS idx_referral_rewards_inviter ON referral_rewards(inviter_id);
CREATE INDEX IF NOT EXISTS idx_referral_rewards_referee ON referral_rewards(referee_id);