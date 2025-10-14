// Direct database test
const { pool } = require('./backend/services/matching-service/dist/utils/db');

async function testContractorQuery() {
  console.log('Testing contractor query without availability restriction...');
  
  try {
    // Run the original query with need_worker_status = true
    const restrictedQuery = `
      SELECT u.id as contractor_id, u.name as contractor_name, u.location, u.email,
             cp.company_name, cp.need_worker_status, cp.rating, cp.total_projects
      FROM users u
      INNER JOIN contractor_profiles cp ON u.id = cp.user_id
      WHERE u.role = 'contractor' AND u.is_active = true AND cp.need_worker_status = true
      ORDER BY cp.rating DESC, cp.total_projects DESC
      LIMIT 20
    `;
    
    const restrictedRes = await pool.query(restrictedQuery);
    console.log(`Query WITH need_worker_status=true returned ${restrictedRes.rowCount} rows`);
    
    // Run the updated query without the need_worker_status filter
    const updatedQuery = `
      SELECT u.id as contractor_id, u.name as contractor_name, u.location, u.email,
             cp.company_name, cp.need_worker_status, cp.rating, cp.total_projects
      FROM users u
      INNER JOIN contractor_profiles cp ON u.id = cp.user_id
      WHERE u.role = 'contractor' AND u.is_active = true
      ORDER BY cp.rating DESC, cp.total_projects DESC
      LIMIT 20
    `;
    
    const updatedRes = await pool.query(updatedQuery);
    console.log(`Query WITHOUT need_worker_status=true returned ${updatedRes.rowCount} rows`);
    
    // Check how many additional contractors we're now getting
    const additionalCount = updatedRes.rowCount - restrictedRes.rowCount;
    console.log(`Additional contractors found: ${additionalCount}`);
    
    if (additionalCount > 0) {
      console.log('\nNew contractors that would previously have been filtered out:');
      
      // Find contractors with need_worker_status = false
      const nonNeedingWorkers = updatedRes.rows.filter(r => r.need_worker_status === false);
      
      console.log(`Contractors with need_worker_status=false: ${nonNeedingWorkers.length}`);
      
      nonNeedingWorkers.forEach((contractor, i) => {
        console.log(`${i+1}. ${contractor.contractor_name} - ${contractor.company_name}`);
      });
      
      console.log('\nQuery successfully returns MORE results after removing the restriction!');
    } else {
      console.log('\nNo difference in results. There may not be any contractors with need_worker_status=false in the database.');
    }
    
  } catch (error) {
    console.error('Error running test:', error);
  } finally {
    await pool.end();
  }
}

testContractorQuery();