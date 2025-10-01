-- Create database schema for Contractor & Worker Matching Platform
-- Based on the design document

-- Create ENUM types
CREATE TYPE user_role AS ENUM ('contractor', 'worker');
CREATE TYPE skill_type AS ENUM ('carpenter', 'plumber', 'electrician', 'laborer', 'painter', 'mason', 'other');
CREATE TYPE job_status AS ENUM ('requested', 'accepted', 'in_progress', 'completed', 'cancelled');
CREATE TYPE availability_status AS ENUM ('available', 'unavailable', 'looking_for_work', 'looking_for_worker');

-- Extensions
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";
CREATE EXTENSION IF NOT EXISTS "pgcrypto";

-- Users table (main table for all users)
CREATE TABLE users (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    role user_role NOT NULL,
    name VARCHAR(100) NOT NULL,
    email VARCHAR(255) UNIQUE NOT NULL,
    phone VARCHAR(20) NOT NULL,
    password_hash VARCHAR(255) NOT NULL,
    location VARCHAR(200) NOT NULL,
    is_verified BOOLEAN DEFAULT FALSE,
    is_active BOOLEAN DEFAULT TRUE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Worker profiles (additional data for workers)
CREATE TABLE worker_profiles (
    id UUID PRIMARY KEY REFERENCES users(id) ON DELETE CASCADE,
    skill_type skill_type NOT NULL,
    experience_years INTEGER DEFAULT 0 CHECK (experience_years >= 0),
    availability_status availability_status DEFAULT 'available',
    hourly_rate DECIMAL(10,2),
    bio TEXT,
    rating DECIMAL(3,2) DEFAULT 0.0 CHECK (rating >= 0 AND rating <= 5),
    total_jobs INTEGER DEFAULT 0,
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

-- Contacts (saved connections between users)
CREATE TABLE contacts (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    owner_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    contact_user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    UNIQUE(owner_id, contact_user_id),
    CHECK (owner_id != contact_user_id)
);

-- Jobs (work requests and assignments)
CREATE TABLE jobs (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    contractor_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    worker_id UUID REFERENCES users(id) ON DELETE SET NULL,
    job_type skill_type NOT NULL,
    status job_status DEFAULT 'requested',
    title VARCHAR(200) NOT NULL,
    description TEXT,
    location VARCHAR(300),
    estimated_duration INTEGER, -- in hours
    agreed_price DECIMAL(12,2),
    actual_duration INTEGER, -- in hours
    start_date TIMESTAMP WITH TIME ZONE,
    end_date TIMESTAMP WITH TIME ZONE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Job applications (workers applying for jobs)
CREATE TABLE job_applications (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    job_id UUID NOT NULL REFERENCES jobs(id) ON DELETE CASCADE,
    worker_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    message TEXT,
    proposed_price DECIMAL(12,2),
    status VARCHAR(20) DEFAULT 'pending' CHECK (status IN ('pending', 'accepted', 'rejected')),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    UNIQUE(job_id, worker_id)
);

-- Reviews and ratings
CREATE TABLE reviews (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    job_id UUID NOT NULL REFERENCES jobs(id) ON DELETE CASCADE,
    reviewer_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    reviewee_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    rating INTEGER NOT NULL CHECK (rating >= 1 AND rating <= 5),
    comment TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    UNIQUE(job_id, reviewer_id)
);

-- Messages (communication between users)
CREATE TABLE messages (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    sender_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    recipient_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    job_id UUID REFERENCES jobs(id) ON DELETE SET NULL,
    content TEXT NOT NULL,
    is_read BOOLEAN DEFAULT FALSE,
    message_type VARCHAR(20) DEFAULT 'text' CHECK (message_type IN ('text', 'image', 'file')),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Notifications
CREATE TABLE notifications (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    title VARCHAR(200) NOT NULL,
    message TEXT NOT NULL,
    type VARCHAR(50) NOT NULL,
    is_read BOOLEAN DEFAULT FALSE,
    data JSONB, -- Additional data for the notification
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- System logs
CREATE TABLE logs (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    service VARCHAR(100) NOT NULL,
    level VARCHAR(20) NOT NULL CHECK (level IN ('info', 'warn', 'error', 'debug')),
    message TEXT NOT NULL,
    user_id UUID REFERENCES users(id) ON DELETE SET NULL,
    request_id VARCHAR(100),
    data JSONB,
    timestamp TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Create indexes for better performance
CREATE INDEX idx_users_email ON users(email);
CREATE INDEX idx_users_role ON users(role);
CREATE INDEX idx_users_location ON users(location);
CREATE INDEX idx_worker_profiles_skill_type ON worker_profiles(skill_type);
CREATE INDEX idx_worker_profiles_availability ON worker_profiles(availability_status);
CREATE INDEX idx_contacts_owner_id ON contacts(owner_id);
CREATE INDEX idx_contacts_contact_user_id ON contacts(contact_user_id);
CREATE INDEX idx_jobs_contractor_id ON jobs(contractor_id);
CREATE INDEX idx_jobs_worker_id ON jobs(worker_id);
CREATE INDEX idx_jobs_status ON jobs(status);
CREATE INDEX idx_jobs_job_type ON jobs(job_type);
CREATE INDEX idx_jobs_created_at ON jobs(created_at);
CREATE INDEX idx_job_applications_job_id ON job_applications(job_id);
CREATE INDEX idx_job_applications_worker_id ON job_applications(worker_id);
CREATE INDEX idx_messages_sender_id ON messages(sender_id);
CREATE INDEX idx_messages_recipient_id ON messages(recipient_id);
CREATE INDEX idx_messages_created_at ON messages(created_at);
CREATE INDEX idx_notifications_user_id ON notifications(user_id);
CREATE INDEX idx_notifications_is_read ON notifications(is_read);
CREATE INDEX idx_logs_timestamp ON logs(timestamp);
CREATE INDEX idx_logs_service ON logs(service);
CREATE INDEX idx_logs_level ON logs(level);

-- Functions for updating timestamps
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = CURRENT_TIMESTAMP;
    RETURN NEW;
END;
$$ language 'plpgsql';

-- Triggers to automatically update updated_at
CREATE TRIGGER update_users_updated_at BEFORE UPDATE ON users
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_worker_profiles_updated_at BEFORE UPDATE ON worker_profiles
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_contractor_profiles_updated_at BEFORE UPDATE ON contractor_profiles
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_jobs_updated_at BEFORE UPDATE ON jobs
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

-- Function to automatically update user ratings
CREATE OR REPLACE FUNCTION update_user_rating()
RETURNS TRIGGER AS $$
BEGIN
    -- Update worker rating
    IF NEW.reviewee_id IN (SELECT id FROM users WHERE role = 'worker') THEN
        UPDATE worker_profiles 
        SET rating = (
            SELECT COALESCE(AVG(rating), 0.0) 
            FROM reviews 
            WHERE reviewee_id = NEW.reviewee_id
        )
        WHERE id = NEW.reviewee_id;
    END IF;
    
    -- Update contractor rating
    IF NEW.reviewee_id IN (SELECT id FROM users WHERE role = 'contractor') THEN
        UPDATE contractor_profiles 
        SET rating = (
            SELECT COALESCE(AVG(rating), 0.0) 
            FROM reviews 
            WHERE reviewee_id = NEW.reviewee_id
        )
        WHERE id = NEW.reviewee_id;
    END IF;
    
    RETURN NEW;
END;
$$ language 'plpgsql';

-- Trigger to update ratings when reviews are added
CREATE TRIGGER update_rating_on_review AFTER INSERT ON reviews
    FOR EACH ROW EXECUTE FUNCTION update_user_rating();

-- Function to clean up expired "need worker" status
CREATE OR REPLACE FUNCTION cleanup_expired_need_worker_status()
RETURNS void AS $$
BEGIN
    UPDATE contractor_profiles 
    SET need_worker_status = FALSE, 
        need_worker_until = NULL
    WHERE need_worker_status = TRUE 
    AND need_worker_until < CURRENT_TIMESTAMP;
END;
$$ language 'plpgsql';