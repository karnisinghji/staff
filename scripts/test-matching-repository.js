const { PgMatchingRepositoryAdapter } = require('./backend/services/matching-service/dist/hexagon/infrastructure/persistence/PgMatchingRepositoryAdapter');

// Mock a location in Canada to match the test data
const testLocation = {
  lat: 43.6532,
  lng: -79.3832  // Toronto coordinates
};

// Create an instance of the repository adapter
const matchingRepo = new PgMatchingRepositoryAdapter();

// Test findContractors
async function testFindContractors() {
  console.log('\n===== Testing findContractors =====');
  try {
    const contractors = await matchingRepo.findContractors({
      location: testLocation,
      maxDistanceKm: 2000 // Set a large distance to find all contractors
    });
    
    console.log(`Found ${contractors.length} contractors`);
    
    if (contractors.length > 0) {
      console.log('\nSample contractors:');
      contractors.slice(0, 3).forEach(c => {
        console.log(`- ${c.contractorName} (${c.companyName}), Need worker: ${c.needWorkerStatus}`);
      });
      
      // Check if we get contractors with different needWorkerStatus values
      const needingWorkers = contractors.filter(c => c.needWorkerStatus === true);
      const notNeedingWorkers = contractors.filter(c => c.needWorkerStatus === false);
      
      console.log(`\nContractors needing workers: ${needingWorkers.length}`);
      console.log(`Contractors NOT needing workers: ${notNeedingWorkers.length}`);
      
      if (notNeedingWorkers.length > 0) {
        console.log('\nSuccess: Found contractors NOT needing workers!');
      } else {
        console.log('\nNo contractors with needWorkerStatus=false found. Check if data exists.');
      }
    } else {
      console.log('No contractors found. Check database connection or data.');
    }
  } catch (error) {
    console.error('Error in findContractors test:', error);
  }
}

// Run tests
async function runTests() {
  try {
    console.log('Starting repository tests...');
    await testFindContractors();
    console.log('\nTests completed!');
    process.exit(0);
  } catch (error) {
    console.error('Test error:', error);
    process.exit(1);
  }
}

runTests();