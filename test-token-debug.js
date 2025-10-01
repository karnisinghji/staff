#!/usr/bin/env node

const API_BASE = 'http://localhost:3001';

async function debugToken() {
    const phoneNumber = `+15559999888`;
    const password = 'TestPassword123!';

    try {
        // Register
        const registerRes = await fetch(`${API_BASE}/api/auth/register`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ username: phoneNumber, password, role: 'worker' })
        });
        const registerData = await registerRes.json();
        console.log('Registration response:', JSON.stringify(registerData, null, 2));

        // Login
        const loginRes = await fetch(`${API_BASE}/api/auth/login`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ username: phoneNumber, password })
        });
        const loginData = await loginRes.json();
        console.log('\nLogin response:', JSON.stringify(loginData, null, 2));

        // Decode token (just base64 decode the payload)
        const token = loginData.accessToken;
        const parts = token.split('.');
        if (parts.length === 3) {
            const payload = Buffer.from(parts[1], 'base64').toString();
            console.log('\nDecoded token payload:', JSON.parse(payload));
        }

    } catch (err) {
        console.error('Error:', err.message);
    }
}

debugToken();
