// Simple test for frontend GitHub Pages deployment issues
const BACKEND_URLS = {
    AUTH_SERVICE: 'https://simple-auth-service-production.up.railway.app',
    USER_SERVICE: 'https://user-service-production-f141.up.railway.app',
    MATCHING_SERVICE: 'https://matching-service-production.up.railway.app'
};

async function testAuthFlow() {
    console.log('🔐 Testing authentication flow...');
    
    try {
        // Test 1: Health checks
        console.log('\n📊 Testing health endpoints:');
        for (const [service, url] of Object.entries(BACKEND_URLS)) {
            try {
                const response = await fetch(`${url}/health`);
                const data = await response.text();
                console.log(`✅ ${service}: ${response.status} - ${data.substring(0, 100)}`);
            } catch (error) {
                console.log(`❌ ${service}: ${error.message}`);
            }
        }

        // Test 2: CORS preflight
        console.log('\n🌐 Testing CORS from GitHub Pages origin:');
        try {
            const response = await fetch(`${BACKEND_URLS.AUTH_SERVICE}/api/auth/login`, {
                method: 'OPTIONS',
                headers: {
                    'Origin': 'https://karnisinghji.github.io',
                    'Access-Control-Request-Method': 'POST',
                    'Access-Control-Request-Headers': 'Content-Type'
                }
            });
            console.log(`✅ CORS preflight: ${response.status}`);
        } catch (error) {
            console.log(`❌ CORS preflight: ${error.message}`);
        }

        // Test 3: Register a test user
        console.log('\n👤 Testing user registration:');
        const testUser = {
            email: `test${Date.now()}@example.com`,
            password: 'TestPassword123!',
            role: 'worker'
        };

        try {
            const response = await fetch(`${BACKEND_URLS.AUTH_SERVICE}/api/auth/register`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Origin': 'https://karnisinghji.github.io'
                },
                body: JSON.stringify(testUser)
            });
            const data = await response.text();
            console.log(`📝 Register: ${response.status} - ${data.substring(0, 200)}`);
        } catch (error) {
            console.log(`❌ Register: ${error.message}`);
        }

        // Test 4: Login
        console.log('\n🔑 Testing login:');
        try {
            const response = await fetch(`${BACKEND_URLS.AUTH_SERVICE}/api/auth/login`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Origin': 'https://karnisinghji.github.io'
                },
                body: JSON.stringify({
                    email: testUser.email,
                    password: testUser.password
                })
            });
            const data = await response.text();
            console.log(`🔐 Login: ${response.status} - ${data.substring(0, 200)}`);
        } catch (error) {
            console.log(`❌ Login: ${error.message}`);
        }

    } catch (error) {
        console.error('❌ Test failed:', error);
    }
}

// Run tests
testAuthFlow();