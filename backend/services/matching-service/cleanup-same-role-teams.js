/**
 * Clean up invalid same-role team members from database
 * This will remove the Ram-Manoj contractor-contractor relationship
 */

const { Pool } = require('pg');
require('dotenv').config({ path: '../../.env' });

const pool = new Pool({ connectionString: process.env.DATABASE_URL });

async function cleanupInvalidTeams() {
    console.log('\n╔════════════════════════════════════════════════════════════════╗');
    console.log('║  CLEANUP: Remove Same-Role Team Members                       ║');
    console.log('╚════════════════════════════════════════════════════════════════╝\n');

    try {
        // Step 1: Check what invalid relationships exist
        console.log('📋 Step 1: Checking for invalid same-role team relationships...\n');
        
        const checkQuery = `
            SELECT 
                tm.id as team_record_id,
                tm.user_id,
                tm.team_member_id,
                u1.name as user_name,
                u1.email as user_email,
                u1.role as user_role,
                u2.name as team_member_name,
                u2.email as team_member_email,
                u2.role as team_member_role,
                tm.relationship_type,
                tm.created_at
            FROM team_members tm
            JOIN users u1 ON tm.user_id = u1.id
            JOIN users u2 ON tm.team_member_id = u2.id
            WHERE u1.role = u2.role
            ORDER BY tm.created_at DESC
        `;
        
        const invalidTeams = await pool.query(checkQuery);
        
        if (invalidTeams.rows.length === 0) {
            console.log('✅ No invalid same-role team relationships found!');
            await pool.end();
            return;
        }
        
        console.log(`❌ Found ${invalidTeams.rows.length} invalid team relationship(s):\n`);
        
        invalidTeams.rows.forEach((row, index) => {
            console.log(`${index + 1}. ${row.user_name} (${row.user_role}) ↔ ${row.team_member_name} (${row.team_member_role})`);
            console.log(`   User Email: ${row.user_email}`);
            console.log(`   Member Email: ${row.team_member_email}`);
            console.log(`   Created: ${row.created_at}`);
            console.log(`   Record ID: ${row.team_record_id}`);
            console.log('');
        });
        
        // Step 2: Count by role
        console.log('📊 Breakdown by role:\n');
        
        const countQuery = `
            SELECT 
                u1.role as same_role,
                COUNT(*) as count
            FROM team_members tm
            JOIN users u1 ON tm.user_id = u1.id
            JOIN users u2 ON tm.team_member_id = u2.id
            WHERE u1.role = u2.role
            GROUP BY u1.role
        `;
        
        const counts = await pool.query(countQuery);
        counts.rows.forEach(row => {
            console.log(`   ${row.same_role}: ${row.count} invalid relationship(s)`);
        });
        
        // Step 3: Delete invalid team relationships
        console.log('\n🗑️  Step 2: Removing invalid team relationships...\n');
        
        const deleteQuery = `
            DELETE FROM team_members tm
            USING users u1, users u2
            WHERE tm.user_id = u1.id 
              AND tm.team_member_id = u2.id
              AND u1.role = u2.role
            RETURNING tm.id, u1.name as user_name, u2.name as member_name
        `;
        
        const deleteResult = await pool.query(deleteQuery);
        
        console.log(`✅ Deleted ${deleteResult.rows.length} invalid team relationship(s):`);
        deleteResult.rows.forEach((row, index) => {
            console.log(`   ${index + 1}. ${row.user_name} ↔ ${row.member_name}`);
        });
        
        // Step 4: Cancel pending invalid team requests
        console.log('\n🚫 Step 3: Cancelling pending same-role team requests...\n');
        
        const cancelQuery = `
            UPDATE team_requests tr
            SET status = 'cancelled', updated_at = CURRENT_TIMESTAMP
            FROM users u1, users u2
            WHERE tr.sender_id = u1.id 
              AND tr.receiver_id = u2.id
              AND u1.role = u2.role
              AND tr.status = 'pending'
            RETURNING tr.id, u1.name as sender_name, u2.name as receiver_name
        `;
        
        const cancelResult = await pool.query(cancelQuery);
        
        if (cancelResult.rows.length > 0) {
            console.log(`✅ Cancelled ${cancelResult.rows.length} pending request(s):`);
            cancelResult.rows.forEach((row, index) => {
                console.log(`   ${index + 1}. ${row.sender_name} → ${row.receiver_name}`);
            });
        } else {
            console.log('✅ No pending same-role requests to cancel');
        }
        
        // Step 5: Verify cleanup
        console.log('\n✅ Step 4: Verifying cleanup...\n');
        
        const verifyResult = await pool.query(checkQuery);
        
        if (verifyResult.rows.length === 0) {
            console.log('✅ SUCCESS! All invalid same-role team relationships have been removed!');
        } else {
            console.log(`⚠️  Warning: ${verifyResult.rows.length} invalid relationship(s) still exist`);
        }
        
        console.log('\n╔════════════════════════════════════════════════════════════════╗');
        console.log('║  CLEANUP COMPLETE                                              ║');
        console.log('╚════════════════════════════════════════════════════════════════╝\n');
        
        console.log('Next steps:');
        console.log('1. Refresh Ram\'s "My Team" page - Manoj should no longer appear');
        console.log('2. Try to send a team request from contractor to contractor - should be blocked');
        console.log('3. Apply database constraint: migrations/add_opposite_roles_constraint.sql\n');
        
    } catch (error) {
        console.error('\n❌ Error during cleanup:', error);
        throw error;
    } finally {
        await pool.end();
    }
}

// Run the cleanup
cleanupInvalidTeams().catch(error => {
    console.error('Fatal error:', error);
    process.exit(1);
});
