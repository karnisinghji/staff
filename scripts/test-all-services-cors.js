#!/usr/bin/env node

/**
 * CORS Test Script for All Services
 * Tests CORS configuration for each backend service with multiple frontend origins
 */

const https = require('https');

// Configuration
const SERVICES = {
  'Auth Service': 'https://auth-service-production-d5c8.up.railway.app',
  'User Service': 'https://user-service-production-f141.up.railway.app',
  'Matching Service': 'https://matching-service-production.up.railway.app',
  'Communication Service': 'https://communication-service-production-c165.up.railway.app',
  'Notification Service': 'https://notification-service-production-8738.up.railway.app'
};

const FRONTEND_ORIGINS = [
  'https://karnisinghji.github.io',   // GitHub Pages origin
  'https://comeondost.web.app',       // Firebase hosting origin
  'http://localhost:5173'             // Local development
];

// Color formatting for terminal output
const colors = {
  green: '\x1b[32m',
  red: '\x1b[31m',
  yellow: '\x1b[33m',
  blue: '\x1b[36m',
  reset: '\x1b[0m'
};

// Helper function to make HTTP requests
function makeRequest(url, options = {}) {
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

// Log function with color formatting
function log(type, message, details = '') {
  const prefix = {
    'success': `${colors.green}✓${colors.reset}`,
    'error': `${colors.red}✗${colors.reset}`,
    'info': `${colors.blue}ℹ${colors.reset}`,
    'warn': `${colors.yellow}⚠${colors.reset}`
  }[type] || '';
  
  console.log(`${prefix} ${message}`);
  if (details) console.log(`  ${colors.yellow}→${colors.reset} ${details}`);
}

async function testServiceEndpoints(serviceName, serviceUrl, origin) {
  const results = {
    name: serviceName,
    origin,
    healthEndpoint: { cors: false, headers: {} },
    apiEndpoint: { cors: false, headers: {} },
    preflightRequest: { cors: false, headers: {} }
  };
  
  try {
    // Test 1: Health endpoint
    const healthResponse = await makeRequest(`${serviceUrl}/health`, {
      headers: {
        'Origin': origin,
      }
    });
    
    results.healthEndpoint.statusCode = healthResponse.statusCode;
    results.healthEndpoint.corsHeaders = {
      allowOrigin: healthResponse.headers['access-control-allow-origin'],
      allowCredentials: healthResponse.headers['access-control-allow-credentials'],
      allowMethods: healthResponse.headers['access-control-allow-methods'],
      allowHeaders: healthResponse.headers['access-control-allow-headers'],
    };
    
    results.healthEndpoint.cors = !!healthResponse.headers['access-control-allow-origin'];
    
    // Test 2: API endpoint (non-preflight)
    const apiPath = serviceName === 'Auth Service' ? '/api/auth/status' :
                   serviceName === 'User Service' ? '/api/users/health' :
                   serviceName === 'Matching Service' ? '/api/matching/stats' :
                   serviceName === 'Communication Service' ? '/api/messages/status' :
                   '/api/notifications/status';
                   
    const apiResponse = await makeRequest(`${serviceUrl}${apiPath}`, {
      headers: {
        'Origin': origin,
      }
    });
    
    results.apiEndpoint.statusCode = apiResponse.statusCode;
    results.apiEndpoint.corsHeaders = {
      allowOrigin: apiResponse.headers['access-control-allow-origin'],
      allowCredentials: apiResponse.headers['access-control-allow-credentials'],
      allowMethods: apiResponse.headers['access-control-allow-methods'],
      allowHeaders: apiResponse.headers['access-control-allow-headers'],
    };
    
    results.apiEndpoint.cors = !!apiResponse.headers['access-control-allow-origin'];
    
    // Test 3: OPTIONS preflight request
    const preflightResponse = await makeRequest(`${serviceUrl}${apiPath}`, {
      method: 'OPTIONS',
      headers: {
        'Origin': origin,
        'Access-Control-Request-Method': 'POST',
        'Access-Control-Request-Headers': 'Content-Type,Authorization'
      }
    });
    
    results.preflightRequest.statusCode = preflightResponse.statusCode;
    results.preflightRequest.corsHeaders = {
      allowOrigin: preflightResponse.headers['access-control-allow-origin'],
      allowCredentials: preflightResponse.headers['access-control-allow-credentials'],
      allowMethods: preflightResponse.headers['access-control-allow-methods'],
      allowHeaders: preflightResponse.headers['access-control-allow-headers'],
    };
    
    results.preflightRequest.cors = !!preflightResponse.headers['access-control-allow-origin'];
    
    return results;
  } catch (error) {
    log('error', `Error testing ${serviceName} with origin ${origin}:`, error.message);
    results.error = error.message;
    return results;
  }
}

async function testAllServices() {
  console.log(`${colors.blue}╔════════════════════════════════════════════════╗${colors.reset}`);
  console.log(`${colors.blue}║  CORS Configuration Test for All Services      ║${colors.reset}`);
  console.log(`${colors.blue}╚════════════════════════════════════════════════╝${colors.reset}`);
  
  const allResults = [];
  
  for (const [serviceName, serviceUrl] of Object.entries(SERVICES)) {
    console.log(`\n${colors.blue}=== Testing ${serviceName} (${serviceUrl}) ===${colors.reset}`);
    
    for (const origin of FRONTEND_ORIGINS) {
      log('info', `Testing with Origin: ${origin}`);
      
      const results = await testServiceEndpoints(serviceName, serviceUrl, origin);
      allResults.push(results);
      
      // Log health endpoint results
      const healthCors = results.healthEndpoint.corsHeaders.allowOrigin;
      log(healthCors ? 'success' : 'error', 'Health Endpoint',
          `CORS: ${healthCors || 'NOT SET'}`);
          
      // Log preflight request results
      const preflightCors = results.preflightRequest.corsHeaders.allowOrigin;
      const preflightMethods = results.preflightRequest.corsHeaders.allowMethods;
      log(preflightCors ? 'success' : 'error', 'OPTIONS Preflight',
          `CORS: ${preflightCors || 'NOT SET'}, Methods: ${preflightMethods || 'NOT SET'}`);
    }
  }
  
  // Summary
  console.log(`\n${colors.blue}=== CORS Configuration Summary ===${colors.reset}`);
  
  const servicesSummary = {};
  for (const result of allResults) {
    if (!servicesSummary[result.name]) {
      servicesSummary[result.name] = {
        name: result.name,
        origins: {}
      };
    }
    
    servicesSummary[result.name].origins[result.origin] = {
      healthCors: result.healthEndpoint.cors,
      preflightCors: result.preflightRequest.cors
    };
  }
  
  // Display service-by-origin matrix
  console.log('\nCORS Support Matrix (✓ = supported, ✗ = not supported):');
  console.log('---------------------------------------------------------------');
  console.log('Service Name            | GitHub Pages | Firebase App | Localhost');
  console.log('---------------------------------------------------------------');
  
  for (const [name, data] of Object.entries(servicesSummary)) {
    const githubSupport = data.origins['https://karnisinghji.github.io']?.preflightCors;
    const firebaseSupport = data.origins['https://comeondost.web.app']?.preflightCors;
    const localSupport = data.origins['http://localhost:5173']?.preflightCors;
    
    const github = githubSupport ? `${colors.green}✓${colors.reset}` : `${colors.red}✗${colors.reset}`;
    const firebase = firebaseSupport ? `${colors.green}✓${colors.reset}` : `${colors.red}✗${colors.reset}`;
    const local = localSupport ? `${colors.green}✓${colors.reset}` : `${colors.red}✗${colors.reset}`;
    
    console.log(`${name.padEnd(22)} | ${github.padEnd(12)} | ${firebase.padEnd(12)} | ${local}`);
  }
  console.log('---------------------------------------------------------------');
  
  // Count services with issues
  const servicesWithIssues = Object.values(servicesSummary).filter(s => 
    !s.origins['https://comeondost.web.app']?.preflightCors
  ).map(s => s.name);
  
  if (servicesWithIssues.length > 0) {
    console.log(`\n${colors.red}The following services have CORS issues for https://comeondost.web.app:${colors.reset}`);
    servicesWithIssues.forEach(name => {
      console.log(`- ${name}`);
    });
    
    console.log(`\n${colors.yellow}Recommendations:${colors.reset}`);
    console.log('1. Check if these services correctly read the CORS environment variables');
    console.log('2. Verify their app.ts/app.js CORS middleware configuration');
    console.log('3. Check if any other middleware is overriding the CORS settings');
  } else {
    console.log(`\n${colors.green}All services correctly configured for CORS!${colors.reset}`);
  }
}

// Run the tests
testAllServices().catch(console.error);