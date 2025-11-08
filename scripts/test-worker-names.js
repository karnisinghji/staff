#!/usr/bin/env node
/**
 * Test script to verify worker names are returned correctly from matching API
 * Usage: node test-worker-names.js YOUR_JWT_TOKEN
 */

const API_URL = 'http://localhost:3003/api/matching/find-workers';

async function testWorkerNames(token) {
  if (!token) {
    console.error('❌ Please provide JWT token as argument');
    console.log('Usage: node test-worker-names.js YOUR_JWT_TOKEN');
    process.exit(1);
  }

  console.log('🔍 Testing worker name retrieval...\n');

  try {
    const response = await fetch(API_URL, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        location: 'Govindgarh, Rajasthan',
        maxDistance: 100,
        skillType: 'electrician',
        limit: 10
      })
    });

    if (!response.ok) {
      console.error(`❌ HTTP ${response.status}: ${response.statusText}`);
      const error = await response.text();
      console.error('Error:', error);
      process.exit(1);
    }

    const data = await response.json();
    
    console.log(`✅ API Response: ${data.success ? 'SUCCESS' : 'FAILED'}`);
    console.log(`📊 Total matches found: ${data.data?.matches?.length || 0}\n`);

    if (data.data?.matches?.length > 0) {
      console.log('👥 Worker Names:');
      data.data.matches.forEach((worker, index) => {
        const hasRealName = worker.name && !worker.name.startsWith('Worker ');
        const icon = hasRealName ? '✅' : '❌';
        console.log(`${icon} ${index + 1}. ${worker.name || 'NO NAME'}`);
        if (!hasRealName) {
          console.log(`   ⚠️  Showing fallback ID instead of real name`);
        }
        console.log(`   📍 Location: ${worker.location}`);
        console.log(`   ⭐ Rating: ${worker.rating}/5.0`);
        console.log(`   🔧 Skills: ${worker.skills?.join(', ') || 'None'}`);
        console.log('');
      });

      const realNames = data.data.matches.filter(w => w.name && !w.name.startsWith('Worker ')).length;
      const fallbackNames = data.data.matches.length - realNames;
      
      console.log(`\n📈 Summary:`);
      console.log(`   ✅ Real names: ${realNames}`);
      console.log(`   ❌ Fallback names: ${fallbackNames}`);
      
      if (fallbackNames > 0) {
        console.log('\n⚠️  Some workers showing "Worker [ID]" instead of real names!');
        console.log('   This means the backend is not returning the "name" field correctly.');
      } else {
        console.log('\n🎉 All workers have real names! Fix is working!');
      }
    } else {
      console.log('⚠️  No workers found in search results');
    }

  } catch (error) {
    console.error('❌ Error:', error.message);
    process.exit(1);
  }
}

// Get token from command line
const token = process.argv[2];
testWorkerNames(token);
