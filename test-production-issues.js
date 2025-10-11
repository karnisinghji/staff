#!/usr/bin/env node
/**
 * Production Issue Diagnostic Script
 * Tests the specific endpoints that are failing in production
 */

const SERVICES = {
  AUTH: 'https://auth-service-production-d5c8.up.railway.app',
  USER: 'https://user-service-production-f141.up.railway.app',
  MATCHING: 'https://matching-service-production.up.railway.app',
  COMMUNICATION: 'https://communication-service-production-c165.up.railway.app',
  NOTIFICATION: 'https://notification-service-production-8738.up.railway.app'
};

// Color codes for terminal output
const colors = {
  green: '\x1b[32m',
  red: '\x1b[31m',
  yellow: '\x1b[33m',
  blue: '\x1b[36m',
  reset: '\x1b[0m'
};

function log(type, message, details = '') {
  const timestamp = new Date().toISOString();
  const prefix = {
    'success': `${colors.green}✓${colors.reset}`,
    'error': `${colors.red}✗${colors.reset}`,
    'info': `${colors.blue}ℹ${colors.reset}`,
    'warn': `${colors.yellow}⚠${colors.reset}`
  }[type] || '';
  
  console.log(`${prefix} ${message}`);
  if (details) console.log(`  ${colors.yellow}→${colors.reset} ${details}`);
}

async function testHealthEndpoints() {
  log('info', '\n=== Testing Health Endpoints ===');
  
  for (const [name, url] of Object.entries(SERVICES)) {
    try {
      const response = await fetch(`${url}/health`);
      const data = await response.json();
      
      if (response.ok && data.status === 'ok') {
        log('success', `${name} Service`, `Status: ${data.status}, Uptime: ${Math.round(data.uptimeSeconds)}s`);
      } else {
        log('error', `${name} Service`, `Status: ${response.status}, ${JSON.stringify(data)}`);
      }
    } catch (error) {
      log('error', `${name} Service`, error.message);
    }
  }
}

async function testWebSocketConnection() {
  log('info', '\n=== Testing WebSocket Connection ===');
  
  // Test if the /ws endpoint exists
  try {
    const response = await fetch(`${SERVICES.NOTIFICATION}/ws`);
    const text = await response.text();
    
    if (response.status === 426) {
      log('warn', 'WebSocket endpoint exists but not implemented', 
        'Returns HTTP 426 Upgrade Required - WebSocket server not configured');
    } else {
      log('info', 'WebSocket endpoint response', `Status: ${response.status}, Body: ${text.substring(0, 100)}`);
    }
  } catch (error) {
    log('error', 'WebSocket test failed', error.message);
  }
}

async function testMatchingEndpoints(token) {
  log('info', '\n=== Testing Matching Service Endpoints ===');
  
  if (!token) {
    log('warn', 'No token provided', 'Skipping authenticated endpoint tests. Pass JWT token as argument.');
    return;
  }
  
  // Test 1: find-contractors (worker searching for contractors)
  log('info', 'Testing find-contractors endpoint...');
  try {
    const response = await fetch(`${SERVICES.MATCHING}/api/matching/find-contractors`, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        location: 'New York, NY',
        maxDistance: 50,
        skillType: 'electrician',
        limit: 10
      })
    });
    
    const data = await response.json();
    
    if (response.ok) {
      log('success', 'find-contractors', `Found ${data.data?.matches?.length || 0} matches`);
    } else {
      log('error', 'find-contractors failed', `Status: ${response.status}, Message: ${data.message || 'Unknown error'}`);
      console.log('  Full response:', JSON.stringify(data, null, 2));
    }
  } catch (error) {
    log('error', 'find-contractors request failed', error.message);
  }
  
  // Test 2: send-team-request
  log('info', '\nTesting send-team-request endpoint...');
  log('warn', 'Skipping actual team request', 'Requires valid receiverId UUID from database');
  log('info', 'Expected payload format:', JSON.stringify({
    receiverId: '123e4567-e89b-12d3-a456-426614174000',
    message: 'Join my team',
    matchContext: {
      skill: 'electrician',
      distance: '10 km',
      matchScore: 0.85
    }
  }, null, 2));
}

async function testAuthFlow() {
  log('info', '\n=== Testing Auth Flow ===');
  
  // Test login with demo credentials
  log('info', 'Attempting login with test credentials...');
  
  try {
    const response = await fetch(`${SERVICES.AUTH}/api/auth/login`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        email: 'test@example.com',
        password: 'test123'
      })
    });
    
    const data = await response.json();
    
    if (response.ok && data.token) {
      log('success', 'Login successful', 'Token received');
      return data.token;
    } else {
      log('warn', 'Test login failed (expected)', `Use real credentials or provide token as argument`);
      return null;
    }
  } catch (error) {
    log('error', 'Auth request failed', error.message);
    return null;
  }
}

async function main() {
  console.log(`${colors.blue}╔════════════════════════════════════════╗${colors.reset}`);
  console.log(`${colors.blue}║  Production Diagnostic Tool           ║${colors.reset}`);
  console.log(`${colors.blue}╚════════════════════════════════════════╝${colors.reset}`);
  
  // Get token from command line argument
  const token = process.argv[2];
  
  if (token) {
    log('info', 'Using provided JWT token');
  } else {
    log('warn', 'No JWT token provided', 'Some tests will be skipped. Usage: node test-production-issues.js YOUR_TOKEN');
  }
  
  // Run tests
  await testHealthEndpoints();
  await testWebSocketConnection();
  
  // Try to get token if not provided
  let authToken = token;
  if (!authToken) {
    authToken = await testAuthFlow();
  }
  
  await testMatchingEndpoints(authToken);
  
  // Summary
  log('info', '\n=== Summary ===');
  log('info', 'Known Issues:');
  console.log('  1. WebSocket server not implemented - frontend tries to connect but fails');
  console.log('  2. Matching endpoints may fail due to:');
  console.log('     - Missing required fields (location, maxDistance)');
  console.log('     - Field name mismatches (receiverId vs recipient_id)');
  console.log('     - Role requirements (worker role for find-contractors)');
  console.log('     - Database connectivity issues');
  
  log('info', '\nRecommended Actions:');
  console.log('  1. Comment out WebSocket connection in NotificationContext.tsx');
  console.log('  2. Check Railway logs: railway logs -s matching-service');
  console.log('  3. Verify JWT token contains correct user role');
  console.log('  4. Test locally: cd backend/services/matching-service && npm run dev');
}

main().catch(error => {
  log('error', 'Diagnostic script failed', error.message);
  process.exit(1);
});
