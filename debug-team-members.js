#!/usr/bin/env node
/**
 * Debug script to check team_members table data
 * Usage: node debug-team-members.js YOUR_JWT_TOKEN
 */

const https = require('https');

const MATCHING_SERVICE = 'https://matching-service-production.up.railway.app';

const token = process.argv[2];

if (!token) {
    console.error('❌ Please provide a JWT token as the first argument');
    console.log('Usage: node debug-team-members.js YOUR_JWT_TOKEN');
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
console.log(`\n🔍 Fetching your team members...`);

const options = {
    hostname: new URL(MATCHING_SERVICE).hostname,
    path: '/api/matching/my-team',
    method: 'GET',
    headers: {
        'Authorization': `Bearer ${token}`
    }
};

const req = https.request(options, (res) => {
    let data = '';

    res.on('data', (chunk) => {
        data += chunk;
    });

    res.on('end', () => {
        console.log(`\n📥 Response Status: ${res.statusCode}`);
        
        try {
            const parsed = JSON.parse(data);
            console.log('\n📄 Full Response:');
            console.log(JSON.stringify(parsed, null, 2));
            
            if (parsed.success && parsed.data) {
                const teamMembers = Array.isArray(parsed.data) ? parsed.data : 
                                   (parsed.data.teamMembers || []);
                
                console.log(`\n👥 Team Members Found: ${teamMembers.length}`);
                
                if (teamMembers.length > 0) {
                    console.log('\n📋 Team Member Details:');
                    teamMembers.forEach((member, i) => {
                        console.log(`\n  ${i + 1}. ${member.name || 'Unknown'}`);
                        console.log(`     User ID: ${member.team_member_id}`);
                        console.log(`     Email: ${member.email}`);
                        console.log(`     Role: ${member.role}`);
                        console.log(`     Location: ${member.location || 'N/A'}`);
                        
                        // Check if this is yourself
                        if (decoded && member.team_member_id === decoded.id) {
                            console.log(`     ⚠️  WARNING: This is YOU! (Your ID: ${decoded.id})`);
                        }
                    });
                }
            }
        } catch (e) {
            console.log('📄 Response Body (raw):', data);
            console.log('\n❌ Failed to parse JSON response:', e.message);
        }
    });
});

req.on('error', (error) => {
    console.error('\n❌ Request failed:', error.message);
    process.exit(1);
});

req.end();
