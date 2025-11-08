const fetch = require('node-fetch');

// Test token (replace with a valid token when running)
const token = process.argv[2]; // Pass token as command line argument

if (!token) {
  console.error('Usage: node test-matching-service.js YOUR_JWT_TOKEN');
  process.exit(1);
}

async function testContractorSearch() {
  console.log('Testing contractor search...');
  try {
    const response = await fetch('http://localhost:3003/api/matching/find-contractors', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        location: {
          lat: 26.9124,
          lng: 75.7873
        },
        maxDistanceKm: 100
      })
    });

    if (!response.ok) {
      console.error(`Error: ${response.status} ${response.statusText}`);
      console.error(await response.text());
      return;
    }

    const data = await response.json();
    console.log(`Found ${data.length} contractors`);
    console.log('First 3 contractors:');
    console.log(JSON.stringify(data.slice(0, 3), null, 2));

    // Check if any contractors with need_worker_status=false are included
    const nonNeedingWorkers = data.filter(c => c.needWorkerStatus === false);
    console.log(`\nContractors with needWorkerStatus=false: ${nonNeedingWorkers.length}`);
    if (nonNeedingWorkers.length > 0) {
      console.log('First non-needing contractor:');
      console.log(JSON.stringify(nonNeedingWorkers[0], null, 2));
    }
  } catch (error) {
    console.error('Error testing contractor search:', error);
  }
}

async function testWorkerSearch() {
  console.log('\nTesting worker search...');
  try {
    const response = await fetch('http://localhost:3003/api/matching/find-workers', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        location: {
          lat: 26.9124,
          lng: 75.7873
        },
        maxDistanceKm: 100
      })
    });

    if (!response.ok) {
      console.error(`Error: ${response.status} ${response.statusText}`);
      console.error(await response.text());
      return;
    }

    const data = await response.json();
    console.log(`Found ${data.length} workers`);
    console.log('First 3 workers:');
    console.log(JSON.stringify(data.slice(0, 3), null, 2));

    // Check if any workers with different availability statuses are included
    const availabilityStatuses = new Set(data.map(w => w.availabilityStatus));
    console.log('\nAvailability statuses found:');
    console.log([...availabilityStatuses]);
    
    // Check for non-available workers
    const nonAvailableWorkers = data.filter(w => w.availabilityStatus !== 'available');
    console.log(`\nWorkers with non-available status: ${nonAvailableWorkers.length}`);
    if (nonAvailableWorkers.length > 0) {
      console.log('First non-available worker:');
      console.log(JSON.stringify(nonAvailableWorkers[0], null, 2));
    }
  } catch (error) {
    console.error('Error testing worker search:', error);
  }
}

async function main() {
  await testContractorSearch();
  await testWorkerSearch();
}

main();