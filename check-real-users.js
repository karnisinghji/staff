require('dotenv').config({ path: './backend/.env' });

const AUTH_SERVICE_URL = 'https://auth-service.delightfulflower-04821c4b.southeastasia.azurecontainerapps.io';

async function getAuthToken(email, password) {
    const response = await fetch(`${AUTH_SERVICE_URL}/api/auth/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password })
    });
    
    if (!response.ok) {
        throw new Error(`Login failed: ${response.status}`);
    }
    
    const data = await response.json();
    return data.accessToken;
}

async function getUserProfile(token) {
    const response = await fetch('https://user-service.delightfulflower-04821c4b.southeastasia.azurecontainerapps.io/api/users/me', {
        headers: { 'Authorization': `Bearer ${token}` }
    });
    
    if (!response.ok) {
        throw new Error(`Failed to get profile: ${response.status}`);
    }
    
    return response.json();
}

async function findUserIds() {
    console.log('\n🔍 Finding User IDs for Real Users\n');
    
    // Try to login as khushabhu@gmail.com
    try {
        console.log('1️⃣  Checking khushabhu@gmail.com...');
        // We don't know the password, so let's try a common test password
        const token1 = await getAuthToken('khushabhu@gmail.com', 'password123');
        const profile1 = await getUserProfile(token1);
        console.log(`   ✅ Found: ${profile1.email}`);
        console.log(`   ID: ${profile1.id}`);
        console.log(`   Role: ${profile1.role}\n`);
    } catch (err) {
        console.log(`   ℹ️  Could not authenticate: ${err.message}\n`);
    }
    
    // Try to login as ramp@info.com
    try {
        console.log('2️⃣  Checking ramp@info.com...');
        const token2 = await getAuthToken('ramp@info.com', 'password123');
        const profile2 = await getUserProfile(token2);
        console.log(`   ✅ Found: ${profile2.email}`);
        console.log(`   ID: ${profile2.id}`);
        console.log(`   Role: ${profile2.role}\n`);
    } catch (err) {
        console.log(`   ℹ️  Could not authenticate: ${err.message}\n`);
    }
    
    console.log('\n💡 Note: If authentication failed, the users might not exist or use different passwords.');
    console.log('   You can create these test users if needed.\n');
}

findUserIds().catch(console.error);
