#!/usr/bin/env node
/**
 * Test Real-Time GPS Tracking Implementation
 * Tests the new live location tracking endpoints
 */

const API_BASE = 'http://localhost:3003';

// Test with a valid token - replace with actual token from login
const TEST_TOKEN = process.argv[2] || process.env.TEST_TOKEN;

if (!TEST_TOKEN) {
  console.error('❌ Usage: node test-gps-tracking.js <YOUR_JWT_TOKEN>');
  console.error('   Get token by logging in at http://localhost:5173/login');
  process.exit(1);
}

async function testGPSTracking() {
  console.log('🧪 Testing Real-Time GPS Tracking Implementation\n');
  
  // Test 1: Update live location
  console.log('📍 Test 1: POST /api/matching/update-location-live');
  try {
    const response = await fetch(`${API_BASE}/api/matching/update-location-live`, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${TEST_TOKEN}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        latitude: 26.6866,  // Govindgarh coordinates
        longitude: 75.8203,
        accuracy: 15,
        source: 'gps',
        location: 'Govindgarh, Rajasthan'
      })
    });
    
    const data = await response.json();
    
    if (response.ok) {
      console.log('✅ Location updated successfully');
      console.log('   Latitude:', data.data.latitude);
      console.log('   Longitude:', data.data.longitude);
      console.log('   Accuracy:', data.data.accuracy + 'm');
      console.log('   Source:', data.data.source);
      console.log('   Last Update:', data.data.lastUpdate);
      console.log('   Is Tracking:', data.data.isTracking);
    } else {
      console.log('❌ Failed:', data.message);
      console.log('   Response:', JSON.stringify(data, null, 2));
    }
  } catch (error) {
    console.log('❌ Error:', error.message);
  }
  
  console.log('\n⏳ Waiting 2 seconds...\n');
  await new Promise(resolve => setTimeout(resolve, 2000));
  
  // Test 2: Get team members with live status
  console.log('👥 Test 2: GET /api/matching/my-team (check live status)');
  try {
    const response = await fetch(`${API_BASE}/api/matching/my-team`, {
      headers: {
        'Authorization': `Bearer ${TEST_TOKEN}`
      }
    });
    
    const data = await response.json();
    
    if (response.ok && data.data?.teamMembers) {
      console.log(`✅ Found ${data.data.teamMembers.length} team members\n`);
      
      data.data.teamMembers.slice(0, 3).forEach((member, idx) => {
        console.log(`   Member ${idx + 1}: ${member.name}`);
        console.log('   Location Status:', member.location_status || 'N/A');
        console.log('   Status Text:', member.location_status_text || 'N/A');
        console.log('   Is Tracking Live:', member.is_tracking_live || false);
        console.log('   Last Update:', member.location_last_update || 'N/A');
        console.log('   Distance:', member.distance_formatted || 'N/A');
        console.log('');
      });
      
      // Check if any members have live status
      const liveMembers = data.data.teamMembers.filter(m => m.location_status === 'live');
      const recentMembers = data.data.teamMembers.filter(m => m.location_status === 'recent');
      
      console.log(`   📊 Status Summary:`);
      console.log(`      🟢 Live (< 2 min): ${liveMembers.length}`);
      console.log(`      🟡 Recent (2-5 min): ${recentMembers.length}`);
      console.log(`      📍 Total with location: ${data.data.teamMembers.filter(m => m.latitude).length}`);
    } else {
      console.log('❌ Failed:', data.message);
    }
  } catch (error) {
    console.log('❌ Error:', error.message);
  }
  
  console.log('\n⏳ Waiting 2 seconds...\n');
  await new Promise(resolve => setTimeout(resolve, 2000));
  
  // Test 3: Update location again (simulate GPS update)
  console.log('📍 Test 3: POST /api/matching/update-location-live (2nd update)');
  try {
    const response = await fetch(`${API_BASE}/api/matching/update-location-live`, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${TEST_TOKEN}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        latitude: 26.6870,  // Slightly different coordinates (user moved)
        longitude: 75.8210,
        accuracy: 12,
        source: 'gps'
      })
    });
    
    const data = await response.json();
    
    if (response.ok) {
      console.log('✅ Location updated (simulated GPS movement)');
      console.log('   New Latitude:', data.data.latitude);
      console.log('   New Longitude:', data.data.longitude);
      console.log('   Accuracy improved to:', data.data.accuracy + 'm');
    } else {
      console.log('❌ Failed:', data.message);
    }
  } catch (error) {
    console.log('❌ Error:', error.message);
  }
  
  console.log('\n⏳ Waiting 2 seconds...\n');
  await new Promise(resolve => setTimeout(resolve, 2000));
  
  // Test 4: Stop tracking
  console.log('🛑 Test 4: POST /api/matching/stop-location-tracking');
  try {
    const response = await fetch(`${API_BASE}/api/matching/stop-location-tracking`, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${TEST_TOKEN}`
      }
    });
    
    const data = await response.json();
    
    if (response.ok) {
      console.log('✅ Tracking stopped successfully');
      console.log('   Message:', data.message);
    } else {
      console.log('❌ Failed:', data.message);
    }
  } catch (error) {
    console.log('❌ Error:', error.message);
  }
  
  console.log('\n✅ All tests completed!');
  console.log('\n📱 Next Steps:');
  console.log('   1. Open http://localhost:5173 in your browser');
  console.log('   2. Login and go to "My Team" page');
  console.log('   3. Click "Start" on the GPS tracking panel');
  console.log('   4. Watch for live status badges: 🟢 Live Now, 🟡 X min ago, etc.');
  console.log('   5. Open in another browser/incognito to see from team member perspective');
}

// Run tests
testGPSTracking().catch(console.error);
