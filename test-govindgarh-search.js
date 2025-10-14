#!/usr/bin/env node
/**
 * Test search functionality from Govindgarh
 * Usage: node test-govindgarh-search.js YOUR_JWT_TOKEN
 */

const https = require('https');

const MATCHING_SERVICE = 'https://matching-service-production.up.railway.app';

const token = process.argv[2];

if (!token) {
    console.error('❌ Please provide a JWT token as the first argument');
    console.log('Usage: node test-govindgarh-search.js YOUR_JWT_TOKEN');
    process.exit(1);
}

// Decode JWT to see user info
function decodeJWT(token) {
    try {
        const parts = token.split('.');
        if (parts.length !== 3) return null;
        const payload = Buffer.from(parts[1], 'base64').toString('utf8');
        return JSON.parse(payload);
    } catch (e) {
        return null;
    }
}

const decoded = decodeJWT(token);
console.log('\n👤 Your User Info (from JWT):');
console.log(JSON.stringify(decoded, null, 2));

if (decoded && decoded.role !== 'contractor') {
    console.log('\n⚠️  WARNING: You are logged in as:', decoded.role);
    console.log('   Contractors should use /find-workers endpoint');
    console.log('   Workers should use /find-contractors endpoint');
}

console.log('\n🔍 Testing Search from Govindgarh...\n');

// Test 1: Search workers from Govindgarh
const searchData = JSON.stringify({
    skillType: 'electrician',
    location: 'Govindgarh',
    maxDistance: 50,
    limit: 12
});

const searchOptions = {
    hostname: new URL(MATCHING_SERVICE).hostname,
    path: '/api/matching/find-workers',
    method: 'POST',
    headers: {
        'Content-Type': 'application/json',
        'Content-Length': searchData.length,
        'Authorization': `Bearer ${token}`
    }
};

console.log('📤 POST /api/matching/find-workers');
console.log('   Location: "Govindgarh"');
console.log('   Max Distance: 50 km');
console.log('   Skill: "electrician"');
console.log('');

const req = https.request(searchOptions, (res) => {
    let data = '';

    res.on('data', (chunk) => {
        data += chunk;
    });

    res.on('end', () => {
        console.log(`📥 Response Status: ${res.statusCode}\n`);
        
        try {
            const parsed = JSON.parse(data);
            
            if (res.statusCode === 200 && parsed.success) {
                const matches = parsed.data?.matches || [];
                console.log(`✅ SUCCESS! Found ${matches.length} workers\n`);
                
                if (matches.length > 0) {
                    console.log('📋 Worker Details:\n');
                    matches.forEach((worker, i) => {
                        console.log(`${i + 1}. ${worker.name || worker.workerName || 'Unknown'}`);
                        console.log(`   Location: ${worker.location || 'N/A'}`);
                        console.log(`   Distance: ${worker.distanceKm?.toFixed(2) || '?'} km`);
                        console.log(`   Skills: ${(worker.skills || []).join(', ') || worker.skillType || 'N/A'}`);
                        console.log(`   Rating: ${worker.rating || 0}/5`);
                        console.log(`   Experience: ${worker.experienceYears || 0} years`);
                        console.log(`   Available: ${worker.isAvailable ? 'Yes' : 'No'}`);
                        console.log('');
                    });
                    
                    // Check if workers are actually within distance
                    const tooFar = matches.filter(w => (w.distanceKm || 0) > 50);
                    if (tooFar.length > 0) {
                        console.log(`⚠️  WARNING: ${tooFar.length} workers exceed 50km filter!`);
                        tooFar.forEach(w => {
                            console.log(`   - ${w.name}: ${w.distanceKm}km from ${w.location}`);
                        });
                    } else {
                        console.log('✅ All workers are within 50km radius');
                    }
                    
                } else {
                    console.log('ℹ️  No workers found matching criteria');
                    console.log('   This could mean:');
                    console.log('   - No workers with "electrician" skill in Govindgarh area');
                    console.log('   - All workers are > 50km away');
                    console.log('   - Workers exist but are not active/available');
                }
                
            } else {
                console.log('❌ FAILED:', parsed.message || 'Unknown error');
                if (parsed.error) {
                    console.log('   Error:', parsed.error);
                }
            }
            
            console.log('\n📄 Full Response:');
            console.log(JSON.stringify(parsed, null, 2));
            
        } catch (e) {
            console.log('❌ Failed to parse JSON response');
            console.log('📄 Response Body (raw):', data);
        }
    });
});

req.on('error', (error) => {
    console.error('\n❌ Request failed:', error.message);
    process.exit(1);
});

req.write(searchData);
req.end();
