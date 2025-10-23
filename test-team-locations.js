#!/usr/bin/env node
/**
 * Test script to check team member location data
 * Usage: node test-team-locations.js YOUR_JWT_TOKEN
 */

const API_URL = 'http://localhost:3002/api/users/my-team';

async function checkTeamLocations(token) {
  if (!token) {
    console.error('❌ Please provide JWT token as argument');
    console.log('Usage: node test-team-locations.js YOUR_JWT_TOKEN');
    process.exit(1);
  }

  console.log('🔍 Checking team member locations...\n');

  try {
    const response = await fetch(API_URL, {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json'
      }
    });

    if (!response.ok) {
      console.error(`❌ HTTP ${response.status}: ${response.statusText}`);
      const error = await response.text();
      console.error('Error:', error);
      process.exit(1);
    }

    const data = await response.json();
    
    console.log(`✅ API Response: ${data.success ? 'SUCCESS' : 'FAILED'}`);
    
    const members = data.data?.teamMembers || data.teamMembers || [];
    console.log(`📊 Total team members: ${members.length}\n`);

    if (members.length > 0) {
      console.log('👥 Team Member Locations:\n');
      
      let withLocation = 0;
      let withoutLocation = 0;
      
      members.forEach((member, index) => {
        const hasLat = member.latitude && String(member.latitude) !== 'null' && String(member.latitude) !== '0';
        const hasLng = member.longitude && String(member.longitude) !== 'null' && String(member.longitude) !== '0';
        const hasValidLocation = hasLat && hasLng;
        
        if (hasValidLocation) {
          withLocation++;
        } else {
          withoutLocation++;
        }
        
        const icon = hasValidLocation ? '✅ 🗺️' : '❌ 📍';
        console.log(`${icon} ${index + 1}. ${member.name || 'Unknown'}`);
        console.log(`   📧 Email: ${member.email || 'N/A'}`);
        console.log(`   🔧 Skill: ${member.skill_type || 'N/A'}`);
        console.log(`   📍 Location string: ${member.location || 'None'}`);
        console.log(`   🌐 Coordinates: lat=${member.latitude || 'NULL'}, lng=${member.longitude || 'NULL'}`);
        
        if (!hasValidLocation) {
          console.log(`   ⚠️  MISSING VALID GPS COORDINATES - Won't show on map!`);
          console.log(`   💡 User needs to click "📍 Update My Location" button`);
        }
        console.log('');
      });

      console.log(`\n📈 Summary:`);
      console.log(`   ✅ Members with valid GPS coordinates: ${withLocation}`);
      console.log(`   ❌ Members without GPS coordinates: ${withoutLocation}`);
      
      if (withoutLocation > 0) {
        console.log('\n⚠️  Members without GPS coordinates need to:');
        console.log('   1. Open the app on their mobile device');
        console.log('   2. Go to "My Team" page');
        console.log('   3. Click "📍 Update My Location" button');
        console.log('   4. Allow browser to access their location');
        console.log('   5. Wait for "Location updated successfully" message');
      }
    } else {
      console.log('⚠️  No team members found');
    }

  } catch (error) {
    console.error('❌ Error:', error.message);
    process.exit(1);
  }
}

// Get token from command line
const token = process.argv[2];
checkTeamLocations(token);
