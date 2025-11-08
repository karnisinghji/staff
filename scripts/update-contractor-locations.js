const { Pool } = require('pg');
const fs = require('fs');
const path = require('path');

const pool = new Pool({ 
    connectionString: process.env.DATABASE_URL,
    ssl: { rejectUnauthorized: false }
});

(async () => {
    try {
        console.log('🔧 Updating contractor locations from Canada to India...\n');
        
        const sqlPath = path.join(__dirname, 'fix-contractor-locations.sql');
        const sql = fs.readFileSync(sqlPath, 'utf8');
        
        await pool.query(sql);
        
        console.log('✅ Contractor locations updated!\n');
        
        // Count contractors by location
        const countResult = await pool.query(`
            SELECT location, COUNT(*) as count
            FROM users
            WHERE role = 'contractor' AND is_active = true
            GROUP BY location
            ORDER BY count DESC;
        `);
        
        console.log('📊 Contractors by location:');
        countResult.rows.forEach(row => {
            console.log(`  ${row.location}: ${row.count} contractors`);
        });
        
        await pool.end();
        console.log('\n✅ Done! Workers can now find contractors in Rajasthan.');
        process.exit(0);
    } catch (error) {
        console.error('❌ Error:', error.message);
        console.error(error.stack);
        process.exit(1);
    }
})();
