#!/usr/bin/env node
/**
 * Check and fix worker names in database
 */

const { Pool } = require('pg');
require('dotenv').config();

const pool = new Pool({ 
  connectionString: process.env.DATABASE_URL,
  ssl: { rejectUnauthorized: false }
});

async function checkAndFixWorkerNames() {
  try {
    console.log('\n🔍 Checking worker names in database...\n');
    
    // Check current state
    const result = await pool.query(`
      SELECT u.id, u.name, u.email, u.role, wp.skill_type
      FROM users u
      LEFT JOIN worker_profiles wp ON u.id = wp.user_id
      WHERE u.role = 'worker' 
      AND u.is_active = true
      ORDER BY u.created_at DESC
      LIMIT 20
    `);
    
    console.log('📊 Current Worker Names:\n');
    const workersWithoutNames = [];
    
    result.rows.forEach((row, idx) => {
      const hasName = row.name && row.name.trim().length > 0;
      const icon = hasName ? '✅' : '❌';
      console.log(`${icon} ${idx + 1}. ID: ...${row.id.slice(-6)} | Name: "${row.name || 'NULL'}" | Email: ${row.email} | Skill: ${row.skill_type || 'N/A'}`);
      
      if (!hasName) {
        workersWithoutNames.push(row);
      }
    });
    
    console.log(`\n⚠️  Found ${workersWithoutNames.length} workers without names\n`);
    
    if (workersWithoutNames.length > 0) {
      console.log('🔧 Fixing by using email prefix as name...\n');
      
      for (const worker of workersWithoutNames) {
        const emailPrefix = worker.email ? worker.email.split('@')[0] : `Worker_${worker.id.slice(-6)}`;
        const newName = emailPrefix.charAt(0).toUpperCase() + emailPrefix.slice(1);
        
        await pool.query(
          'UPDATE users SET name = $1 WHERE id = $2',
          [newName, worker.id]
        );
        
        console.log(`  ✅ Updated ${worker.id.slice(-6)}: "${newName}" (from ${worker.email})`);
      }
      
      console.log(`\n✨ Fixed ${workersWithoutNames.length} worker names!\n`);
      
      // Show updated results
      const updatedResult = await pool.query(`
        SELECT u.id, u.name, u.email
        FROM users u
        WHERE u.id = ANY($1)
      `, [workersWithoutNames.map(w => w.id)]);
      
      console.log('📋 Updated Names:\n');
      updatedResult.rows.forEach((row, idx) => {
        console.log(`  ${idx + 1}. ...${row.id.slice(-6)}: "${row.name}"`);
      });
      
    } else {
      console.log('✅ All workers have names!\n');
    }
    
  } catch (err) {
    console.error('❌ Error:', err.message);
    process.exit(1);
  } finally {
    await pool.end();
  }
}

checkAndFixWorkerNames();
