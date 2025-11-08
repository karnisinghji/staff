#!/usr/bin/env node

/**
 * CORS Test Script for Matching Service
 * Checks if the matching service has proper CORS configuration for the frontend domain
 */

const https = require('https');

// Configuration
const MATCHING_SERVICE_URL = 'https://matching-service-production.up.railway.app';
const FRONTEND_ORIGINS = [
  'https://karnisinghji.github.io',   // GitHub Pages origin (original)
  'https://comeondost.web.app',       // Firebase hosting origin (new)
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

async function testCorsConfiguration() {
  log('info', `\n=== Testing CORS Configuration for ${MATCHING_SERVICE_URL} ===`);
  
  // Test 1: Health endpoint - simple GET
  log('info', '\nHealth Endpoint Test:');
  
  try {
    const results = [];
    
    // Test each frontend origin
    for (const origin of FRONTEND_ORIGINS) {
      log('info', `\nTesting with Origin: ${origin}`);
      
      // GET request to health endpoint
      const getResponse = await makeRequest(`${MATCHING_SERVICE_URL}/health`, {
        method: 'GET',
        headers: {
          'Origin': origin,
        }
      });
      
      const allowOrigin = getResponse.headers['access-control-allow-origin'];
      const allowCredentials = getResponse.headers['access-control-allow-credentials'];
      
      log(allowOrigin ? 'success' : 'error', 'GET /health', 
        `Status: ${getResponse.statusCode}, Allow-Origin: ${allowOrigin || 'NOT SET'}`);
      
      // OPTIONS preflight request to /api/matching endpoint
      const preflightResponse = await makeRequest(`${MATCHING_SERVICE_URL}/api/matching/find-contractors`, {
        method: 'OPTIONS',
        headers: {
          'Origin': origin,
          'Access-Control-Request-Method': 'POST',
          'Access-Control-Request-Headers': 'Content-Type,Authorization'
        }
      });
      
      const preAllowOrigin = preflightResponse.headers['access-control-allow-origin'];
      const preAllowMethods = preflightResponse.headers['access-control-allow-methods'];
      const preAllowHeaders = preflightResponse.headers['access-control-allow-headers'];
      
      log(preAllowOrigin ? 'success' : 'error', 'OPTIONS /api/matching/find-contractors', 
          `Status: ${preflightResponse.statusCode}, Allow-Origin: ${preAllowOrigin || 'NOT SET'}`);
      
      if (preAllowMethods) {
        log('info', 'Allowed Methods', preAllowMethods);
      }
      
      if (preAllowHeaders) {
        log('info', 'Allowed Headers', preAllowHeaders);
      }
      
      // Record results for summary
      results.push({
        origin,
        getHealth: {
          status: getResponse.statusCode,
          corsEnabled: !!allowOrigin,
          corsOrigin: allowOrigin
        },
        preflight: {
          status: preflightResponse.statusCode,
          corsEnabled: !!preAllowOrigin,
          corsOrigin: preAllowOrigin,
          allowMethods: preAllowMethods,
          allowHeaders: preAllowHeaders
        }
      });
    }
    
    // Summary
    log('info', '\n=== CORS Configuration Summary ===');
    
    const missingOrigins = results
      .filter(r => !r.getHealth.corsEnabled || !r.preflight.corsEnabled)
      .map(r => r.origin);
    
    if (missingOrigins.length > 0) {
      log('error', 'The following origins are not correctly configured for CORS:');
      missingOrigins.forEach(origin => {
        log('error', `- ${origin}`);
      });
      
      log('info', '\nRecommendation:');
      console.log('  Add the following origins to your CORS configuration:');
      console.log(`  ALLOWED_ORIGINS="${missingOrigins.join(',')}""`);
      console.log('  CORS_ORIGIN="https://comeondost.web.app"');
    } else {
      log('success', 'All origins are correctly configured for CORS!');
    }
    
  } catch (error) {
    log('error', 'Test failed:', error.message);
  }
}

// Run the tests
testCorsConfiguration().catch(console.error);