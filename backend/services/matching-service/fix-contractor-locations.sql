-- Update Canadian contractors to Indian locations near Govindgarh/Jaipur
-- This will make them visible to workers searching in Rajasthan

-- Update locations to Indian cities near Govindgarh
UPDATE users SET 
    location = 'Jaipur, Rajasthan, India',
    address = 'Jaipur City Center',
    updated_at = NOW()
WHERE id = '48663846-a1ce-4dbd-9196-24718ad5ae05' AND role = 'contractor';

UPDATE users SET 
    location = 'Govindgarh, Rajasthan, India',
    address = 'Main Market, Govindgarh',
    updated_at = NOW()
WHERE id = '550e8400-e29b-41d4-a716-446655440001' AND role = 'contractor';

UPDATE users SET 
    location = 'गोविन्दगढ, Rajasthan, India',
    address = 'Station Road',
    updated_at = NOW()
WHERE id = '13c92da2-a3ce-4832-9ecd-b5d2b5c39dc3' AND role = 'contractor';

UPDATE users SET 
    location = 'Jaipur, Rajasthan, India',
    address = 'Pink City',
    updated_at = NOW()
WHERE id = '550e8400-e29b-41d4-a716-446655440002' AND role = 'contractor';

UPDATE users SET 
    location = 'Govindgarh, Rajasthan, India',
    address = 'Near Bus Stand',
    updated_at = NOW()
WHERE id = '550e8400-e29b-41d4-a716-446655440003' AND role = 'contractor';

UPDATE users SET 
    location = 'Jaipur, Rajasthan, India',
    address = 'Malviya Nagar',
    updated_at = NOW()
WHERE id = '730a0844-7977-403b-8bc3-ba6d6ed9589c' AND role = 'contractor';

UPDATE users SET 
    location = 'गोविन्दगढ, Rajasthan, India',
    address = 'Railway Station Road',
    updated_at = NOW()
WHERE id = '84aff925-2ebd-4d03-a0ef-dd3c0c3c3df7' AND role = 'contractor';

UPDATE users SET 
    location = 'Jaipur, Rajasthan, India',
    address = 'Vaishali Nagar',
    updated_at = NOW()
WHERE id = '8bcdef90-b1c9-4df1-b602-1dccc05aea46' AND role = 'contractor';

UPDATE users SET 
    location = 'Govindgarh, Rajasthan, India',
    address = 'Market Area',
    updated_at = NOW()
WHERE id = '2e7622dc-d7d5-490a-a4b5-c5f41ba3d998' AND role = 'contractor';

UPDATE users SET 
    location = 'Jaipur, Rajasthan, India',
    address = 'Mansarovar',
    updated_at = NOW()
WHERE id = '97cb56cc-6b1d-4e49-b991-01a5abb57ebe' AND role = 'contractor';

UPDATE users SET 
    location = 'गोविन्दगढ, Rajasthan, India',
    address = 'Main Road',
    updated_at = NOW()
WHERE id = '8ded2596-c8c8-4400-9c9c-409e1220183b' AND role = 'contractor';

UPDATE users SET 
    location = 'Govindgarh, Rajasthan, India',
    address = 'Town Center',
    updated_at = NOW()
WHERE id = 'f419c01a-2892-4d67-ac7d-f881d7cd0bcf' AND role = 'contractor';

UPDATE users SET 
    location = 'Jaipur, Rajasthan, India',
    address = 'Civil Lines',
    updated_at = NOW()
WHERE id = '046a4522-e25c-4c34-a8f4-d94c7213f805' AND role = 'contractor';

UPDATE users SET 
    location = 'Govindgarh, Rajasthan, India',
    address = 'Industrial Area',
    updated_at = NOW()
WHERE id = 'ca6940a7-8678-4e82-be6c-feee0f219da4' AND role = 'contractor';

-- Now ensure all have contractor_profiles
INSERT INTO contractor_profiles (id, company_name, rating, total_projects, need_worker_status)
SELECT 
    u.id,
    COALESCE(u.name, 'Construction Company'),
    4.0 + (random() * 1.0),
    floor(random() * 50)::int,
    true
FROM users u
WHERE u.role = 'contractor' 
AND NOT EXISTS (SELECT 1 FROM contractor_profiles WHERE id = u.id)
ON CONFLICT (id) DO NOTHING;

-- Verify the updates
SELECT u.id, u.name, u.email, u.location, u.address, cp.company_name, cp.rating
FROM users u
LEFT JOIN contractor_profiles cp ON u.id = cp.id
WHERE u.role = 'contractor'
ORDER BY u.location, u.name
LIMIT 20;
