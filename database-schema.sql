-- Complete Database Schema for Contractor-Worker Platform
-- Consolidated from all migrations for production deployment

-- Extensions
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";
CREATE EXTENSION IF NOT EXISTS "pgcrypto";

-- Create ENUM types
CREATE TYPE user_role AS ENUM ('contractor', 'worker', 'admin');
CREATE TYPE skill_type AS ENUM ('carpenter', 'plumber', 'electrician', 'laborer', 'painter', 'mason', 'other');
CREATE TYPE job_status AS ENUM ('requested', 'accepted', 'in_progress', 'completed', 'cancelled');
CREATE TYPE availability_status AS ENUM ('available', 'unavailable', 'looking_for_work', 'looking_for_worker');
CREATE TYPE invitation_status AS ENUM ('pending', 'accepted', 'declined', 'expired');

-- Users table (main table for all users)
CREATE TABLE users (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    role user_role NOT NULL,
    name VARCHAR(100) NOT NULL,
    email VARCHAR(255) UNIQUE NOT NULL,
    phone VARCHAR(20),
    password_hash VARCHAR(255),
    location VARCHAR(200),
    is_verified BOOLEAN DEFAULT FALSE,
    is_active BOOLEAN DEFAULT TRUE,
    -- OAuth support
    google_id VARCHAR(255) UNIQUE,
    profile_picture_url TEXT,
    -- Admin support
    is_admin BOOLEAN DEFAULT FALSE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Worker profiles (additional data for workers)
CREATE TABLE worker_profiles (
    id UUID PRIMARY KEY REFERENCES users(id) ON DELETE CASCADE,
    user_id UUID UNIQUE NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    skill_type skill_type NOT NULL,
    experience_years INTEGER DEFAULT 0 CHECK (experience_years >= 0),
    availability_status availability_status DEFAULT 'available',
    -- Availability expiry tracking
    availability_expires_at TIMESTAMP WITH TIME ZONE,
    is_available BOOLEAN DEFAULT TRUE,
    hourly_rate DECIMAL(10,2),
    bio TEXT,
    rating DECIMAL(3,2) DEFAULT 0.0 CHECK (rating >= 0 AND rating <= 5),
    total_jobs INTEGER DEFAULT 0,
    -- Profile completion tracking
    profile_completion_percentage INTEGER DEFAULT 0 CHECK (profile_completion_percentage >= 0 AND profile_completion_percentage <= 100),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Contractor profiles (additional data for contractors)
CREATE TABLE contractor_profiles (
    id UUID PRIMARY KEY REFERENCES users(id) ON DELETE CASCADE,
    company_name VARCHAR(200),
    need_worker_status BOOLEAN DEFAULT FALSE,
    need_worker_until TIMESTAMP WITH TIME ZONE,
    rating DECIMAL(3,2) DEFAULT 0.0 CHECK (rating >= 0 AND rating <= 5),
    total_projects INTEGER DEFAULT 0,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Job postings
CREATE TABLE job_postings (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    contractor_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    title VARCHAR(200) NOT NULL,
    description TEXT NOT NULL,
    skill_required skill_type NOT NULL,
    location VARCHAR(200) NOT NULL,
    budget_min DECIMAL(10,2),
    budget_max DECIMAL(10,2),
    status job_status DEFAULT 'requested',
    start_date DATE,
    end_date DATE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Job applications (workers applying to jobs)
CREATE TABLE job_applications (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    job_id UUID NOT NULL REFERENCES job_postings(id) ON DELETE CASCADE,
    worker_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    proposed_rate DECIMAL(10,2),
    message TEXT,
    status invitation_status DEFAULT 'pending',
    applied_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    UNIQUE(job_id, worker_id)
);

-- Team requests (contractors inviting workers to teams)
CREATE TABLE team_requests (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    sender_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    recipient_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    message TEXT,
    status invitation_status DEFAULT 'pending',
    expires_at TIMESTAMP WITH TIME ZONE DEFAULT (CURRENT_TIMESTAMP + INTERVAL '7 days'),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    UNIQUE(sender_id, recipient_id)
);

-- Contractor requirements (specific skills/requirements contractors are looking for)
CREATE TABLE contractor_requirements (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    contractor_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    skill_type skill_type NOT NULL,
    min_experience_years INTEGER DEFAULT 0,
    max_hourly_rate DECIMAL(10,2),
    location VARCHAR(200),
    description TEXT,
    is_active BOOLEAN DEFAULT TRUE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Password reset tokens
CREATE TABLE password_reset_tokens (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    token VARCHAR(255) NOT NULL UNIQUE,
    expires_at TIMESTAMP WITH TIME ZONE NOT NULL,
    used BOOLEAN DEFAULT FALSE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- User blocks (for blocking/unblocking users)
CREATE TABLE user_blocks (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    blocker_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    blocked_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    reason TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    UNIQUE(blocker_id, blocked_id)
);

-- Reviews and ratings
CREATE TABLE reviews (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    reviewer_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    reviewee_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    job_id UUID REFERENCES job_postings(id) ON DELETE SET NULL,
    rating INTEGER NOT NULL CHECK (rating >= 1 AND rating <= 5),
    comment TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    UNIQUE(reviewer_id, reviewee_id, job_id)
);

-- Create indexes for better performance
CREATE INDEX idx_users_email ON users(email);
CREATE INDEX idx_users_role ON users(role);
CREATE INDEX idx_users_is_active ON users(is_active);
CREATE INDEX idx_worker_profiles_skill_type ON worker_profiles(skill_type);
CREATE INDEX idx_worker_profiles_availability ON worker_profiles(availability_status);
CREATE INDEX idx_worker_profiles_is_available ON worker_profiles(is_available);
CREATE INDEX idx_job_postings_contractor_id ON job_postings(contractor_id);
CREATE INDEX idx_job_postings_skill_required ON job_postings(skill_required);
CREATE INDEX idx_job_postings_status ON job_postings(status);
CREATE INDEX idx_job_applications_job_id ON job_applications(job_id);
CREATE INDEX idx_job_applications_worker_id ON job_applications(worker_id);
CREATE INDEX idx_team_requests_sender ON team_requests(sender_id);
CREATE INDEX idx_team_requests_recipient ON team_requests(recipient_id);
CREATE INDEX idx_team_requests_status ON team_requests(status);
CREATE INDEX idx_contractor_requirements_contractor_id ON contractor_requirements(contractor_id);
CREATE INDEX idx_contractor_requirements_skill_type ON contractor_requirements(skill_type);
CREATE INDEX idx_password_reset_tokens_token ON password_reset_tokens(token);
CREATE INDEX idx_password_reset_tokens_user_id ON password_reset_tokens(user_id);
CREATE INDEX idx_user_blocks_blocker ON user_blocks(blocker_id);
CREATE INDEX idx_user_blocks_blocked ON user_blocks(blocked_id);
CREATE INDEX idx_reviews_reviewee ON reviews(reviewee_id);
CREATE INDEX idx_reviews_reviewer ON reviews(reviewer_id);

-- Insert initial admin user
INSERT INTO users (id, role, name, email, phone, password_hash, location, is_verified, is_active, is_admin)
VALUES (
    'f47ac10b-58cc-4372-a567-0e02b2c3d479',
    'admin',
    'System Admin',
    'admin@contractorworker.com',
    '+1-555-0123',
    '$2b$10$K5RzpWHGfxz5qGnO7Ky8sOYJN.oPMrLd7nRaWxF5aXrF7F6RiS.2q',
    'System',
    TRUE,
    TRUE,
    TRUE
) ON CONFLICT (email) DO NOTHING;