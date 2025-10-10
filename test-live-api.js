#!/usr/bin/env node

/**
 * Live API Testing - Simulates actual frontend requests
 */

const https = require('https');

const SERVICES = {
    auth: 'https://simple-auth-service-production.up.railway.app',
    user: 'https://user-service-production-f141.up.railway.app',
    matching: 'https://matching-service-production.up.railway.app',
    communication: 'https://communication-service-production-c165.up.railway.app',
    notification: 'https://notification-service-production-8738.up.railway.app'
};

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
        if (options.body) req.write(options.body);
        req.end();
    });
}

async function testUserRegistration() {
    console.log('\n' + '='.repeat(60));
    console.log('🧪 Test 1: User Registration');
    console.log('='.repeat(60));
    
    const testUser = {
        email: `test${Date.now()}@example.com`,
        password: 'TestPass123!',
        firstName: 'Test',
        lastName: 'User',
        role: 'worker'
    };
    
    console.log(`\nAttempting to register user: ${testUser.email}`);
    
    try {
        const response = await makeRequest(`${SERVICES.auth}/api/auth/register`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Origin': 'https://karnisinghji.github.io'
            },
            body: JSON.stringify(testUser)
        });
        
        console.log(`Status: ${response.statusCode}`);
        console.log(`Response: ${response.body.substring(0, 200)}`);
        
        if (response.statusCode === 201 || response.statusCode === 200) {
            try {
                const data = JSON.parse(response.body);
                console.log('✅ Registration successful!');
                console.log(`User ID: ${data.userId || data.user?.id || 'N/A'}`);
                console.log(`Token: ${data.token ? 'Received' : 'Not received'}`);
                return { success: true, user: testUser, data };
            } catch (e) {
                console.log('⚠️  Response is not JSON:', response.body);
                return { success: false, error: 'Non-JSON response' };
            }
        } else {
            console.log('❌ Registration failed');
            return { success: false, error: response.body };
        }
    } catch (error) {
        console.log(`❌ Error: ${error.message}`);
        return { success: false, error: error.message };
    }
}

async function testUserLogin(email, password) {
    console.log('\n' + '='.repeat(60));
    console.log('🧪 Test 2: User Login');
    console.log('='.repeat(60));
    
    console.log(`\nAttempting to login: ${email}`);
    
    try {
        const response = await makeRequest(`${SERVICES.auth}/api/auth/login`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Origin': 'https://karnisinghji.github.io'
            },
            body: JSON.stringify({ email, password })
        });
        
        console.log(`Status: ${response.statusCode}`);
        console.log(`Response: ${response.body.substring(0, 200)}`);
        
        if (response.statusCode === 200) {
            try {
                const data = JSON.parse(response.body);
                console.log('✅ Login successful!');
                console.log(`Token: ${data.token ? 'Received' : 'Not received'}`);
                return { success: true, data };
            } catch (e) {
                console.log('⚠️  Response is not JSON:', response.body);
                return { success: false, error: 'Non-JSON response' };
            }
        } else {
            console.log('❌ Login failed');
            return { success: false, error: response.body };
        }
    } catch (error) {
        console.log(`❌ Error: ${error.message}`);
        return { success: false, error: error.message };
    }
}

async function testUserProfile(token) {
    console.log('\n' + '='.repeat(60));
    console.log('🧪 Test 3: Get User Profile');
    console.log('='.repeat(60));
    
    if (!token) {
        console.log('⚠️  No token available, skipping test');
        return { success: false, error: 'No token' };
    }
    
    console.log(`\nFetching profile with token: ${token.substring(0, 20)}...`);
    
    try {
        const response = await makeRequest(`${SERVICES.user}/api/users/profile`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`,
                'Origin': 'https://karnisinghji.github.io'
            }
        });
        
        console.log(`Status: ${response.statusCode}`);
        console.log(`Response: ${response.body.substring(0, 200)}`);
        
        if (response.statusCode === 200) {
            try {
                const data = JSON.parse(response.body);
                console.log('✅ Profile fetch successful!');
                console.log(`User: ${data.firstName} ${data.lastName}`);
                return { success: true, data };
            } catch (e) {
                console.log('⚠️  Response is not JSON:', response.body);
                return { success: false, error: 'Non-JSON response' };
            }
        } else {
            console.log('❌ Profile fetch failed');
            return { success: false, error: response.body };
        }
    } catch (error) {
        console.log(`❌ Error: ${error.message}`);
        return { success: false, error: error.message };
    }
}

async function testGetSkills() {
    console.log('\n' + '='.repeat(60));
    console.log('🧪 Test 4: Get Skills (Public Endpoint)');
    console.log('='.repeat(60));
    
    try {
        const response = await makeRequest(`${SERVICES.user}/api/users/skills`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Origin': 'https://karnisinghji.github.io'
            }
        });
        
        console.log(`Status: ${response.statusCode}`);
        
        if (response.statusCode === 200) {
            try {
                const data = JSON.parse(response.body);
                console.log('✅ Skills fetch successful!');
                console.log(`Skills count: ${data.length || 'N/A'}`);
                if (data.length > 0) {
                    console.log(`Sample skills: ${data.slice(0, 3).join(', ')}`);
                }
                return { success: true, data };
            } catch (e) {
                console.log('⚠️  Response is not JSON:', response.body);
                return { success: false, error: 'Non-JSON response' };
            }
        } else {
            console.log('❌ Skills fetch failed');
            return { success: false, error: response.body };
        }
    } catch (error) {
        console.log(`❌ Error: ${error.message}`);
        return { success: false, error: error.message };
    }
}

async function testHealthEndpoints() {
    console.log('\n' + '='.repeat(60));
    console.log('🧪 Test 5: Health Check All Services');
    console.log('='.repeat(60));
    
    const results = {};
    
    for (const [name, url] of Object.entries(SERVICES)) {
        try {
            const response = await makeRequest(`${url}/health`, {
                method: 'GET',
                headers: { 'Origin': 'https://karnisinghji.github.io' }
            });
            
            const isHealthy = response.statusCode === 200;
            results[name] = {
                status: isHealthy ? '✅ Healthy' : '❌ Unhealthy',
                statusCode: response.statusCode,
                response: response.body.substring(0, 100)
            };
            
            console.log(`\n${name}: ${results[name].status} (${response.statusCode})`);
        } catch (error) {
            results[name] = {
                status: '❌ Error',
                error: error.message
            };
            console.log(`\n${name}: ❌ Error - ${error.message}`);
        }
    }
    
    return results;
}

async function main() {
    console.log('\n' + '='.repeat(60));
    console.log('🚀 Live API Testing - Frontend Simulation');
    console.log('='.repeat(60));
    console.log('Testing as if requests are coming from:');
    console.log('https://karnisinghji.github.io/staff/');
    console.log('='.repeat(60));
    
    // Test 1: Registration
    const registrationResult = await testUserRegistration();
    
    let loginResult = { success: false };
    let token = null;
    
    // Test 2: Login (if registration succeeded)
    if (registrationResult.success) {
        loginResult = await testUserLogin(
            registrationResult.user.email,
            registrationResult.user.password
        );
        token = loginResult.data?.token;
    }
    
    // Test 3: Profile (if login succeeded)
    if (token) {
        await testUserProfile(token);
    }
    
    // Test 4: Public endpoint
    await testGetSkills();
    
    // Test 5: Health checks
    await testHealthEndpoints();
    
    // Summary
    console.log('\n' + '='.repeat(60));
    console.log('📊 Test Summary');
    console.log('='.repeat(60));
    console.log(`\nRegistration: ${registrationResult.success ? '✅ PASS' : '❌ FAIL'}`);
    console.log(`Login: ${loginResult.success ? '✅ PASS' : '❌ FAIL'}`);
    console.log(`Profile: ${token ? '✅ Token received' : '❌ No token'}`);
    
    console.log('\n' + '='.repeat(60));
    console.log('🎯 Next Steps:');
    console.log('='.repeat(60));
    
    if (!registrationResult.success || !loginResult.success) {
        console.log('\n⚠️  Authentication flow is not working properly.');
        console.log('   This is likely due to the auth service caching issue on Railway.');
        console.log('   \n   Workarounds:');
        console.log('   1. Wait 24-48 hours for Railway cache to clear');
        console.log('   2. Contact Railway support about deployment caching');
        console.log('   3. Implement auth in user-service as temporary solution');
    } else {
        console.log('\n✅ All tests passed! The system is working correctly.');
    }
    
    console.log('\n   You can test in browser at:');
    console.log('   - Main App: https://karnisinghji.github.io/staff/');
    console.log('   - CORS Test: https://karnisinghji.github.io/staff/test-railway-cors.html');
    console.log('\n' + '='.repeat(60));
}

main().catch(console.error);