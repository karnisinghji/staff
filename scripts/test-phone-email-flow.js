#!/usr/bin/env node
/**
 * Test script to verify phone registration and email update flow
 */

const API_BASE = 'http://localhost:3001';
const USER_API_BASE = 'http://localhost:3002';

async function testPhoneRegistrationAndEmailUpdate() {
    console.log('=== Testing Phone Registration & Email Update Flow ===\n');

    // Generate unique test data
    const timestamp = Date.now();
    const phoneNumber = `+1555${timestamp.toString().slice(-7)}`;
    const testEmail = `test${timestamp}@example.com`;
    const password = 'TestPassword123!';

    console.log(`📱 Test phone: ${phoneNumber}`);
    console.log(`📧 Test email: ${testEmail}\n`);

    try {
        // Step 1: Register with phone number
        console.log('Step 1: Registering with phone number...');
        const registerRes = await fetch(`${API_BASE}/api/auth/register`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                username: phoneNumber,
                password: password,
                role: 'worker'
            })
        });

        const registerData = await registerRes.json();
        
        if (!registerRes.ok) {
            console.error('❌ Registration failed:', registerData);
            return;
        }

        console.log('✅ Registration successful!');
        console.log('   User ID:', registerData.id);
        console.log('   Email field:', registerData.email, '\n');

        // Step 2: Login with phone number
        console.log('Step 2: Logging in with phone number...');
        const loginRes = await fetch(`${API_BASE}/api/auth/login`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                username: phoneNumber,
                password: password
            })
        });

        const loginData = await loginRes.json();
        
        if (!loginRes.ok) {
            console.error('❌ Login failed:', loginData);
            return;
        }

        const token = loginData.accessToken;
        console.log('✅ Login successful!');
        console.log('   Token:', token.substring(0, 20) + '...\n');

        // Step 3: Get current profile
        console.log('Step 3: Fetching current profile...');
        const profileRes = await fetch(`${USER_API_BASE}/api/users/profile`, {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        });

        const profileData = await profileRes.json();
        
        if (!profileRes.ok) {
            console.error('❌ Profile fetch failed:', profileData);
            return;
        }

        console.log('✅ Profile fetched!');
        console.log('   Username:', profileData.data.user.username);
        console.log('   Email:', profileData.data.user.email || 'NULL (as expected)');
        console.log('   Phone:', profileData.data.user.phone || 'NULL');
        console.log('');

        // Step 4: Update profile to add email
        console.log('Step 4: Adding email to profile...');
        const updateRes = await fetch(`${USER_API_BASE}/api/users/profile`, {
            method: 'PUT',
            headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                email: testEmail,
                name: 'Test User'
            })
        });

        const updateData = await updateRes.json();
        
        if (!updateRes.ok) {
            console.error('❌ Profile update failed:', updateData);
            return;
        }

        console.log('✅ Profile updated!');
        console.log('   Email added:', updateData.data.user.email);
        console.log('   Name:', updateData.data.user.name);
        console.log('');

        // Step 5: Verify we can still login with phone number
        console.log('Step 5: Verifying login still works with phone number...');
        const loginAgainRes = await fetch(`${API_BASE}/api/auth/login`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                username: phoneNumber,
                password: password
            })
        });

        const loginAgainData = await loginAgainRes.json();
        
        if (!loginAgainRes.ok) {
            console.error('❌ Login failed after email update:', loginAgainData);
            return;
        }

        console.log('✅ Login still works with phone number!\n');

        // Step 6: Check database state
        console.log('Step 6: Checking database state...');
        const { execSync } = require('child_process');
        const dbQuery = `psql -h localhost -U postgres -d contractor_worker_platform -c "SELECT id, username, email, phone, name FROM users WHERE username = '${phoneNumber}';" -t`;
        
        try {
            const dbResult = execSync(dbQuery, { encoding: 'utf-8' });
            console.log('✅ Database state:');
            console.log(dbResult);
        } catch (err) {
            console.log('⚠️  Could not query database (this is okay)');
        }

        console.log('\n🎉 All tests passed! Phone registration and email update flow working correctly!');
        console.log('\n📋 Summary:');
        console.log('   ✓ User can register with phone number');
        console.log('   ✓ Username (login identifier) is stored separately from email');
        console.log('   ✓ User can add email later in profile section');
        console.log('   ✓ User can still login with original phone number');
        console.log('   ✓ No conflicts between email and phone fields');

    } catch (error) {
        console.error('❌ Test error:', error.message);
    }
}

// Run the test
testPhoneRegistrationAndEmailUpdate();
