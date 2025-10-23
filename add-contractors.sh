#!/bin/bash
# Quick script to add contractor users to the database

echo "🔧 Adding contractor users to database..."

cd "$(dirname "$0")/backend/services/matching-service"

# Check if Railway CLI is available
if ! command -v railway &> /dev/null; then
    echo "❌ Railway CLI not found. Please install it first:"
    echo "   npm install -g @railway/cli"
    exit 1
fi

# Run the SQL script
railway run node << 'EOF'
const { Pool } = require('pg');
const pool = new Pool({ 
    connectionString: process.env.DATABASE_URL,
    ssl: { rejectUnauthorized: false }
});

(async () => {
    try {
        console.log('📊 Adding contractor users...\n');
        
        // Insert contractors
        const insertUsers = `
            INSERT INTO users (id, role, name, email, password_hash, location, is_verified, is_active, created_at, updated_at)
            VALUES
                (gen_random_uuid(), 'contractor', 'Rajesh Construction Co', 'rajesh.construction@example.com', '$2b$10$N9qo8uLOickgx2ZMRZoMyeIjZAgcfl7p92ldGxad68LJZdL17lhWy', 'Jaipur, Rajasthan, India', true, true, NOW(), NOW()),
                (gen_random_uuid(), 'contractor', 'Sharma Builders', 'sharma.builders@example.com', '$2b$10$N9qo8uLOickgx2ZMRZoMyeIjZAgcfl7p92ldGxad68LJZdL17lhWy', 'Govindgarh, Rajasthan, India', true, true, NOW(), NOW()),
                (gen_random_uuid(), 'contractor', 'Singh Infrastructure', 'singh.infra@example.com', '$2b$10$N9qo8uLOickgx2ZMRZoMyeIjZAgcfl7p92ldGxad68LJZdL17lhWy', 'गोविन्दगढ, Rajasthan, India', true, true, NOW(), NOW()),
                (gen_random_uuid(), 'contractor', 'Modern Constructions', 'modern.construct@example.com', '$2b$10$N9qo8uLOickgx2ZMRZoMyeIjZAgcfl7p92ldGxad68LJZdL17lhWy', 'Jaipur, Rajasthan, India', true, true, NOW(), NOW()),
                (gen_random_uuid(), 'contractor', 'Patel Engineering', 'patel.engineering@example.com', '$2b$10$N9qo8uLOickgx2ZMRZoMyeIjZAgcfl7p92ldGxad68LJZdL17lhWy', 'Govindgarh, Rajasthan, India', true, true, NOW(), NOW())
            ON CONFLICT (email) DO NOTHING
            RETURNING id, name, email;
        `;
        
        const userResult = await pool.query(insertUsers);
        console.log(`✅ Added ${userResult.rowCount} contractor users`);
        
        if (userResult.rows.length > 0) {
            console.log('\nNew contractors:');
            userResult.rows.forEach(row => {
                console.log(`  - ${row.name} (${row.email})`);
            });
        }
        
        // Create contractor profiles
        const createProfiles = `
            INSERT INTO contractor_profiles (id, company_name, rating, total_projects, need_worker_status)
            SELECT 
                u.id,
                u.name,
                4.0 + (random() * 1.0),
                floor(random() * 50)::int,
                true
            FROM users u
            WHERE u.email IN (
                'rajesh.construction@example.com',
                'sharma.builders@example.com',
                'singh.infra@example.com',
                'modern.construct@example.com',
                'patel.engineering@example.com'
            )
            ON CONFLICT (id) DO NOTHING
            RETURNING id, company_name, rating, total_projects;
        `;
        
        const profileResult = await pool.query(createProfiles);
        console.log(`\n✅ Created ${profileResult.rowCount} contractor profiles`);
        
        // Verify
        const verify = `
            SELECT u.name, u.email, u.location, cp.company_name, cp.rating, cp.total_projects
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
        `;
        
        const verifyResult = await pool.query(verify);
        console.log('\n📋 Verification:');
        verifyResult.rows.forEach(row => {
            console.log(`  ✓ ${row.name} | ${row.location} | Rating: ${parseFloat(row.rating).toFixed(1)} | Projects: ${row.total_projects}`);
        });
        
        console.log('\n✅ All done! Workers can now find these contractors in search.');
        
        await pool.end();
    } catch (error) {
        console.error('❌ Error:', error.message);
        process.exit(1);
    }
})();
EOF

echo ""
echo "🎉 Contractors added successfully!"
echo "   Test by logging in as a worker and searching for contractors."
