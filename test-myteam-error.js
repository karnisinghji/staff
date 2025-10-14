#!/usr/bin/env node
// Test script to reproduce the MyTeam 500 error

const API_URL = 'https://matching-service-production.up.railway.app/api/matching/my-team';

// You'll need to get a real token from the browser
// 1. Go to https://comeondost.web.app
// 2. Open DevTools > Application > Local Storage
// 3. Find 'token' and copy its value
// 4. Run: node test-myteam-error.js YOUR_TOKEN_HERE

const token = process.argv[2];

if (!token) {
    console.error('Usage: node test-myteam-error.js YOUR_TOKEN_HERE');
    console.error('\nTo get your token:');
    console.error('1. Go to https://comeondost.web.app');
    console.error('2. Open DevTools > Application > Local Storage');
    console.error('3. Find "token" and copy its value');
    console.error('4. Run: node test-myteam-error.js YOUR_TOKEN_HERE');
    process.exit(1);
}

async function testMyTeam() {
    console.log('Testing MyTeam endpoint...');
    console.log(`URL: ${API_URL}`);
    console.log(`Token: ${token.substring(0, 20)}...`);
    console.log('');

    try {
        const response = await fetch(API_URL, {
            method: 'GET',
            headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json'
            }
        });

        console.log('Status:', response.status, response.statusText);
        console.log('Headers:', Object.fromEntries(response.headers));
        console.log('');

        const text = await response.text();
        console.log('Raw Response:');
        console.log(text);
        console.log('');

        try {
            const json = JSON.parse(text);
            console.log('Parsed JSON:');
            console.log(JSON.stringify(json, null, 2));
        } catch (e) {
            console.log('(Not valid JSON)');
        }

    } catch (error) {
        console.error('Error:', error);
        console.error('Stack:', error.stack);
    }
}

testMyTeam();
