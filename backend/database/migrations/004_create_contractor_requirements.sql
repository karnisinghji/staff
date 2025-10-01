-- Migration: Create contractor_requirements table
CREATE TABLE contractor_requirements (
    id SERIAL PRIMARY KEY,
    contractor_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    required_workers INTEGER NOT NULL,
    notes TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Index for faster lookup by contractor
CREATE INDEX idx_contractor_requirements_contractor_id ON contractor_requirements(contractor_id);