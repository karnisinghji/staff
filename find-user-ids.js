const { Pool } = require('pg');
require('dotenv').config({ path: './backend/.env' });

const pool = new Pool({
    connectionString: process.env.DATABASE_URL
});

async function findUsers() {
    try {
        console.log('\n🔍 Finding user IDs...\n');
        
        const result = await pool.query(
            `SELECT id, email, role, name 
             FROM users 
             WHERE email IN ($1, $2)
             ORDER BY email`,
            ['khushabhu@gmail.com', 'ramp@info.com']
        );
        
        if (result.rows.length === 0) {
            console.log('❌ No users found with those emails');
        } else {
            console.log('✅ Found users:\n');
            result.rows.forEach(user => {
                console.log(`Email: ${user.email}`);
                console.log(`ID: ${user.id}`);
                console.log(`Role: ${user.role}`);
                console.log(`Name: ${user.name || 'N/A'}`);
                console.log('---');
            });
        }
        
        await pool.end();
    } catch (error) {
        console.error('❌ Error:', error.message);
        process.exit(1);
    }
}

findUsers();
