const { Pool } = require('pg');
require('dotenv').config({ path: require('path').join(__dirname, 'backend', '.env') });

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: process.env.DATABASE_URL?.includes('neon.tech') ? { rejectUnauthorized: false } : false
});

async function checkWorkers() {
  try {
    const result = await pool.query(`
      SELECT 
        u.id,
        u.name,
        u.email,
        u.location,
        wp.skill_type,
        wp.is_available,
        u.is_active
      FROM users u
      LEFT JOIN worker_profiles wp ON u.id = wp.user_id
      WHERE u.role = 'worker'
      ORDER BY u.name
    `);

    console.log('\n=== ALL WORKERS IN DATABASE ===\n');
    console.log(`Total workers: ${result.rows.length}\n`);

    result.rows.forEach((worker, index) => {
      console.log(`${index + 1}. ${worker.name}`);
      console.log(`   Email: ${worker.email}`);
      console.log(`   Location: ${worker.location || 'Not set'}`);
      console.log(`   Skill: ${worker.skill_type || 'Not set'}`);
      console.log(`   Available: ${worker.is_available ? 'Yes' : 'No'}`);
      console.log(`   Active: ${worker.is_active ? 'Yes' : 'No'}`);
      console.log('');
    });

    // Check specifically for electricians
    const electricians = result.rows.filter(w => w.skill_type === 'electrician');
    console.log(`\n=== ELECTRICIANS (${electricians.length}) ===\n`);
    electricians.forEach((worker, index) => {
      console.log(`${index + 1}. ${worker.name} - ${worker.location}`);
    });

    // Check specifically for Govindgarh area
    const govindgarh = result.rows.filter(w => w.location?.toLowerCase().includes('govindgarh'));
    console.log(`\n=== WORKERS IN GOVINDGARH (${govindgarh.length}) ===\n`);
    govindgarh.forEach((worker, index) => {
      console.log(`${index + 1}. ${worker.name} - ${worker.skill_type} - ${worker.location}`);
    });

    await pool.end();
  } catch (error) {
    console.error('Error:', error.message);
    process.exit(1);
  }
}

checkWorkers();
