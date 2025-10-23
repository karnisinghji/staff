-- Add real contractor users to the database
-- These are contractors who need workers for construction projects

-- 1. Insert contractor users
INSERT INTO users (id, role, name, email, password_hash, location, is_verified, is_active, created_at, updated_at)
VALUES
    (gen_random_uuid(), 'contractor', 'Rajesh Construction Co', 'rajesh.construction@example.com', '$2b$10$example_hash', 'Jaipur, Rajasthan, India', true, true, NOW(), NOW()),
    (gen_random_uuid(), 'contractor', 'Sharma Builders', 'sharma.builders@example.com', '$2b$10$example_hash', 'Govindgarh, Rajasthan, India', true, true, NOW(), NOW()),
    (gen_random_uuid(), 'contractor', 'Singh Infrastructure', 'singh.infra@example.com', '$2b$10$example_hash', 'गोविन्दगढ, Rajasthan, India', true, true, NOW(), NOW()),
    (gen_random_uuid(), 'contractor', 'Modern Constructions', 'modern.construct@example.com', '$2b$10$example_hash', 'Jaipur, Rajasthan, India', true, true, NOW(), NOW()),
    (gen_random_uuid(), 'contractor', 'Patel Engineering', 'patel.engineering@example.com', '$2b$10$example_hash', 'Govindgarh, Rajasthan, India', true, true, NOW(), NOW())
ON CONFLICT (email) DO NOTHING;

-- 2. Create contractor profiles
-- Get the IDs of the contractors we just created
DO $$
DECLARE
    contractor_record RECORD;
BEGIN
    FOR contractor_record IN 
        SELECT id, name FROM users 
        WHERE email IN (
            'rajesh.construction@example.com',
            'sharma.builders@example.com',
            'singh.infra@example.com',
            'modern.construct@example.com',
            'patel.engineering@example.com'
        )
    LOOP
        INSERT INTO contractor_profiles (id, company_name, rating, total_projects, need_worker_status)
        VALUES (
            contractor_record.id,
            contractor_record.name,
            4.0 + (random() * 1.0),  -- Random rating between 4.0-5.0
            floor(random() * 50)::int,  -- Random projects 0-50
            true  -- All need workers
        )
        ON CONFLICT (id) DO NOTHING;
    END LOOP;
END $$;

-- 3. Verify the new contractors
SELECT u.id, u.name, u.email, u.role, u.location, cp.company_name, cp.rating, cp.total_projects, cp.need_worker_status
FROM users u
INNER JOIN contractor_profiles cp ON u.id = cp.id
WHERE u.email IN (
    'rajesh.construction@example.com',
    'sharma.builders@example.com',
    'singh.infra@example.com',
    'modern.construct@example.com',
    'patel.engineering@example.com'
)
ORDER BY u.name;
