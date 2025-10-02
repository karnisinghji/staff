-- Seed data for development and testing
-- Sample contractors and workers for demonstration

-- Sample contractors
INSERT INTO users (id, role, name, email, phone, password_hash, location, is_verified, is_active) VALUES
('550e8400-e29b-41d4-a716-446655440001', 'contractor', 'ABC Construction', 'contractor1@example.com', '+1-555-0101', '$2b$10$example_hash_1', 'New York, NY', TRUE, TRUE),
('550e8400-e29b-41d4-a716-446655440002', 'contractor', 'BuildRight LLC', 'contractor2@example.com', '+1-555-0102', '$2b$10$example_hash_2', 'Los Angeles, CA', TRUE, TRUE),
('550e8400-e29b-41d4-a716-446655440003', 'contractor', 'Prime Builders', 'contractor3@example.com', '+1-555-0103', '$2b$10$example_hash_3', 'Chicago, IL', TRUE, TRUE)
ON CONFLICT (email) DO NOTHING;

-- Sample workers
INSERT INTO users (id, role, name, email, phone, password_hash, location, is_verified, is_active) VALUES
('550e8400-e29b-41d4-a716-446655440011', 'worker', 'John Smith', 'john.smith@example.com', '+1-555-0201', '$2b$10$example_hash_11', 'New York, NY', TRUE, TRUE),
('550e8400-e29b-41d4-a716-446655440012', 'worker', 'Maria Garcia', 'maria.garcia@example.com', '+1-555-0202', '$2b$10$example_hash_12', 'Los Angeles, CA', TRUE, TRUE),
('550e8400-e29b-41d4-a716-446655440013', 'worker', 'David Johnson', 'david.johnson@example.com', '+1-555-0203', '$2b$10$example_hash_13', 'Chicago, IL', TRUE, TRUE),
('550e8400-e29b-41d4-a716-446655440014', 'worker', 'Sarah Brown', 'sarah.brown@example.com', '+1-555-0204', '$2b$10$example_hash_14', 'Houston, TX', TRUE, TRUE),
('550e8400-e29b-41d4-a716-446655440015', 'worker', 'Mike Wilson', 'mike.wilson@example.com', '+1-555-0205', '$2b$10$example_hash_15', 'Phoenix, AZ', TRUE, TRUE),
('550e8400-e29b-41d4-a716-446655440016', 'worker', 'Lisa Davis', 'lisa.davis@example.com', '+1-555-0206', '$2b$10$example_hash_16', 'Philadelphia, PA', TRUE, TRUE)
ON CONFLICT (email) DO NOTHING;

-- Contractor profiles
INSERT INTO contractor_profiles (id, company_name, rating, total_projects) VALUES
('550e8400-e29b-41d4-a716-446655440001', 'ABC Construction', 4.5, 25),
('550e8400-e29b-41d4-a716-446655440002', 'BuildRight LLC', 4.2, 18),
('550e8400-e29b-41d4-a716-446655440003', 'Prime Builders', 4.8, 32)
ON CONFLICT (id) DO NOTHING;

-- Worker profiles
INSERT INTO worker_profiles (id, user_id, skill_type, experience_years, hourly_rate, bio, rating, total_jobs, is_available, profile_completion_percentage) VALUES
('550e8400-e29b-41d4-a716-446655440011', '550e8400-e29b-41d4-a716-446655440011', 'electrician', 8, 45.00, 'Experienced electrician specializing in residential and commercial wiring. Licensed and insured.', 4.7, 156, TRUE, 95),
('550e8400-e29b-41d4-a716-446655440012', '550e8400-e29b-41d4-a716-446655440012', 'plumber', 12, 50.00, 'Master plumber with expertise in bathroom and kitchen renovations. Emergency services available.', 4.9, 203, TRUE, 100),
('550e8400-e29b-41d4-a716-446655440013', '550e8400-e29b-41d4-a716-446655440013', 'carpenter', 15, 42.00, 'Skilled carpenter with experience in custom furniture, cabinetry, and home renovations.', 4.6, 178, TRUE, 90),
('550e8400-e29b-41d4-a716-446655440014', '550e8400-e29b-41d4-a716-446655440014', 'painter', 6, 35.00, 'Professional painter specializing in interior and exterior painting. Attention to detail guaranteed.', 4.3, 89, TRUE, 85),
('550e8400-e29b-41d4-a716-446655440015', '550e8400-e29b-41d4-a716-446655440015', 'mason', 10, 48.00, 'Experienced mason skilled in brickwork, stonework, and concrete. Quality craftsmanship.', 4.5, 134, TRUE, 92),
('550e8400-e29b-41d4-a716-446655440016', '550e8400-e29b-41d4-a716-446655440016', 'laborer', 3, 28.00, 'Hardworking general laborer ready to assist with various construction tasks. Reliable and punctual.', 4.1, 67, TRUE, 75)
ON CONFLICT (id) DO NOTHING;

-- Sample job postings
INSERT INTO job_postings (id, contractor_id, title, description, skill_required, location, budget_min, budget_max, start_date, end_date) VALUES
('660e8400-e29b-41d4-a716-446655440001', '550e8400-e29b-41d4-a716-446655440001', 'Kitchen Renovation Electrician', 'Need experienced electrician for kitchen renovation. Installing new outlets, lighting, and electrical panel upgrade.', 'electrician', 'New York, NY', 2000.00, 3500.00, '2025-10-15', '2025-10-25'),
('660e8400-e29b-41d4-a716-446655440002', '550e8400-e29b-41d4-a716-446655440002', 'Bathroom Plumbing Installation', 'Complete bathroom plumbing for new construction. Rough-in and finish work required.', 'plumber', 'Los Angeles, CA', 3000.00, 4500.00, '2025-10-20', '2025-11-05'),
('660e8400-e29b-41d4-a716-446655440003', '550e8400-e29b-41d4-a716-446655440003', 'Custom Cabinet Installation', 'Install custom kitchen cabinets in luxury home. Precision work required.', 'carpenter', 'Chicago, IL', 4000.00, 6000.00, '2025-11-01', '2025-11-15')
ON CONFLICT (id) DO NOTHING;

-- Sample contractor requirements
INSERT INTO contractor_requirements (id, contractor_id, skill_type, min_experience_years, max_hourly_rate, location, description, is_active) VALUES
('770e8400-e29b-41d4-a716-446655440001', '550e8400-e29b-41d4-a716-446655440001', 'electrician', 5, 50.00, 'New York, NY', 'Looking for licensed electricians for ongoing residential projects', TRUE),
('770e8400-e29b-41d4-a716-446655440002', '550e8400-e29b-41d4-a716-446655440002', 'plumber', 3, 55.00, 'Los Angeles, CA', 'Need reliable plumbers for commercial and residential work', TRUE),
('770e8400-e29b-41d4-a716-446655440003', '550e8400-e29b-41d4-a716-446655440003', 'carpenter', 8, 45.00, 'Chicago, IL', 'Seeking skilled carpenters for custom home building projects', TRUE)
ON CONFLICT (id) DO NOTHING;