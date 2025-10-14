#!/usr/bin/env node
/**
 * Test script to verify the contact-contractor endpoint
 * Usage: node test-contact-contractor.js YOUR_JWT_TOKEN CONTRACTOR_ID
 */

const https = require('https');

const MATCHING_SERVICE = 'https://matching-service-production.up.railway.app';

// Get token and contractor ID from command line
const token = process.argv[2];
const contractorId = process.argv[3];

if (!token) {
    console.error('❌ Please provide a JWT token as the first argument');
    console.log('Usage: node test-contact-contractor.js YOUR_JWT_TOKEN CONTRACTOR_ID');
    process.exit(1);
}

if (!contractorId) {
    console.error('❌ Please provide a contractor ID as the second argument');
    console.log('Usage: node test-contact-contractor.js YOUR_JWT_TOKEN CONTRACTOR_ID');
    process.exit(1);
}

console.log('\n🔍 Testing contact-contractor endpoint...\n');

// Test contact-contractor endpoint
const contactData = JSON.stringify({
    contractorId: contractorId,
    message: 'Test message from worker'
});

const contactOptions = {
    hostname: new URL(MATCHING_SERVICE).hostname,
    path: '/api/matching/contact-contractor',
    method: 'POST',
    headers: {
        'Content-Type': 'application/json',
        'Content-Length': contactData.length,
        'Authorization': `Bearer ${token}`
    }
};

console.log(`📤 POST ${MATCHING_SERVICE}/api/matching/contact-contractor`);
console.log(`   Body: { contractorId: "${contractorId}", message: "Test message from worker" }`);

const req = https.request(contactOptions, (res) => {
    let data = '';

    res.on('data', (chunk) => {
        data += chunk;
    });

    res.on('end', () => {
        console.log(`\n📥 Response Status: ${res.statusCode}`);
        
        try {
            const parsed = JSON.parse(data);
            console.log('📄 Response Body:', JSON.stringify(parsed, null, 2));
            
            if (res.statusCode === 200 && parsed.success) {
                console.log('\n✅ SUCCESS! Contact request sent successfully');
            } else {
                console.log('\n❌ FAILED:', parsed.message || 'Unknown error');
            }
        } catch (e) {
            console.log('📄 Response Body (raw):', data);
            console.log('\n❌ Failed to parse JSON response');
        }
    });
});

req.on('error', (error) => {
    console.error('\n❌ Request failed:', error.message);
    process.exit(1);
});

req.write(contactData);
req.end();
