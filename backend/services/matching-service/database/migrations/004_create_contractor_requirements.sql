-- Migration: Create contractor_requirements table for contractor worker requirements

CREATE TABLE IF NOT EXISTS contractor_requirements (
  id SERIAL PRIMARY KEY,
  contractor_id VARCHAR(64) NOT NULL,
  required_workers INTEGER NOT NULL,
  skills TEXT[],
  location TEXT,
  notes TEXT,
  created_at TIMESTAMP DEFAULT NOW()
);
