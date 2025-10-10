#!/usr/bin/env node

/**
 * Test script to debug auth service endpoints and CORS configuration
 */

const https = require('https');

const AUTH_BASE_URL = 'https://simple-auth-service-production.up.railway.app';
const GITHUB_ORIGIN = 'https://karnisinghji.github.io';

async function makeRequest(url, options = {}) {
    return new Promise((resolve, reject) => {
        const req = https.request(url, options, (res) => {
            let data = '';
            res.on('data', chunk => data += chunk);
            res.on('end', () => {
                resolve({
                    statusCode: res.statusCode,
                    headers: res.headers,
                    body: data
                });
            });
        });
        
        req.on('error', reject);
        
        if (options.body) {
            req.write(options.body);
        }
        
        req.end();
    });
}

async function testEndpoint(name, url, options = {}) {
    console.log(`\n=== Testing ${name} ===`);
    console.log(`URL: ${url}`);
    
    try {
        const response = await makeRequest(url, options);
        console.log(`Status: ${response.statusCode}`);
        console.log(`CORS Headers:`);
        console.log(`  Access-Control-Allow-Origin: ${response.headers['access-control-allow-origin'] || 'NOT SET'}`);
        console.log(`  Access-Control-Allow-Credentials: ${response.headers['access-control-allow-credentials'] || 'NOT SET'}`);
        console.log(`  Access-Control-Allow-Methods: ${response.headers['access-control-allow-methods'] || 'NOT SET'}`);
        console.log(`  Access-Control-Allow-Headers: ${response.headers['access-control-allow-headers'] || 'NOT SET'}`);
        console.log(`Response Body: ${response.body.substring(0, 200)}${response.body.length > 200 ? '...' : ''}`);
    } catch (error) {
        console.log(`Error: ${error.message}`);
    }
}

async function main() {
    console.log('🔍 Auth Service Debug Test');
    console.log('==========================');
    
    // Test 1: Root endpoint
    await testEndpoint('Root Endpoint', `${AUTH_BASE_URL}/`);
    
    // Test 2: Health endpoint
    await testEndpoint('Health Endpoint', `${AUTH_BASE_URL}/health`);
    
    // Test 3: Ready endpoint
    await testEndpoint('Ready Endpoint', `${AUTH_BASE_URL}/ready`);
    
    // Test 4: CORS preflight for /api/auth/register
    await testEndpoint('CORS Preflight - Register', `${AUTH_BASE_URL}/api/auth/register`, {
        method: 'OPTIONS',
        headers: {
            'Origin': GITHUB_ORIGIN,
            'Access-Control-Request-Method': 'POST',
            'Access-Control-Request-Headers': 'Content-Type,Authorization'
        }
    });
    
    // Test 5: Actual API endpoint
    await testEndpoint('API Register Endpoint', `${AUTH_BASE_URL}/api/auth/register`, {
        method: 'GET',
        headers: {
            'Origin': GITHUB_ORIGIN
        }
    });
    
    // Test 6: Non-existent API endpoint (should return 404)
    await testEndpoint('Non-existent API Endpoint', `${AUTH_BASE_URL}/api/auth/nonexistent`, {
        method: 'GET',
        headers: {
            'Origin': GITHUB_ORIGIN
        }
    });
    
    console.log('\n🏁 Test Complete');
}

main().catch(console.error);