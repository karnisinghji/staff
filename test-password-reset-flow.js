#!/usr/bin/env node

/**
 * Test Password Reset Flow
 * 
 * This script tests the complete password reset flow:
 * 1. Request password reset
 * 2. Use reset token to set new password
 * 3. Login with new password
 */

const API_BASE = 'https://auth-service-production-d5c8.up.railway.app/api/auth';
const TEST_EMAIL = 'khushabhu@gmail.com';
const NEW_PASSWORD = 'p@ss1234'; // 8 characters minimum

async function testPasswordResetFlow(resetToken) {
    console.log('🔄 Testing Password Reset Flow\n');
    console.log('═'.repeat(60));

    try {
        // Step 1: Request Password Reset
        console.log('\n📧 Step 1: Requesting password reset email...');
        const forgotResponse = await fetch(`${API_BASE}/forgot-password`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ email: TEST_EMAIL })
        });
        const forgotData = await forgotResponse.json();
        console.log('Response:', JSON.stringify(forgotData, null, 2));

        if (!forgotData.success) {
            console.log('❌ Failed to send reset email');
            return;
        }
        console.log('✅ Reset email sent successfully');

        // Step 2: Use reset token (if provided)
        if (!resetToken) {
            console.log('\n⚠️  No reset token provided. Please:');
            console.log('   1. Check email inbox for khushabhu@gmail.com');
            console.log('   2. Copy the reset token from the email link');
            console.log('   3. Run: node test-password-reset-flow.js YOUR_TOKEN');
            return;
        }

        console.log('\n🔐 Step 2: Validating reset token...');
        const validateResponse = await fetch(`${API_BASE}/validate-reset-token/${resetToken}`);
        const validateData = await validateResponse.json();
        console.log('Response:', JSON.stringify(validateData, null, 2));

        if (!validateData.valid) {
            console.log('❌ Invalid or expired reset token');
            return;
        }
        console.log('✅ Token is valid');

        console.log('\n🔄 Step 3: Resetting password to:', NEW_PASSWORD);
        const resetResponse = await fetch(`${API_BASE}/reset-password`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                token: resetToken,
                newPassword: NEW_PASSWORD
            })
        });
        const resetData = await resetResponse.json();
        console.log('Response:', JSON.stringify(resetData, null, 2));

        if (!resetData.success) {
            console.log('❌ Failed to reset password');
            return;
        }
        console.log('✅ Password reset successfully');

        // Step 4: Test login with new password
        console.log('\n🔑 Step 4: Testing login with new password...');
        const loginResponse = await fetch(`${API_BASE}/login`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                email: TEST_EMAIL,
                password: NEW_PASSWORD
            })
        });
        const loginData = await loginResponse.json();

        if (loginResponse.ok && loginData.accessToken) {
            console.log('✅ Login successful!');
            console.log('User:', JSON.stringify(loginData.user, null, 2));
            console.log('Access Token:', loginData.accessToken.substring(0, 50) + '...');
        } else {
            console.log('❌ Login failed');
            console.log('Response:', JSON.stringify(loginData, null, 2));
        }

        console.log('\n' + '═'.repeat(60));
        console.log('✅ Password Reset Flow Test Complete!\n');

    } catch (error) {
        console.error('❌ Error:', error.message);
    }
}

// Get reset token from command line argument
const resetToken = process.argv[2];

if (!resetToken) {
    console.log('📋 Usage:');
    console.log('   Step 1 (Request reset): node test-password-reset-flow.js');
    console.log('   Step 2 (Complete reset): node test-password-reset-flow.js YOUR_RESET_TOKEN\n');
}

testPasswordResetFlow(resetToken);
