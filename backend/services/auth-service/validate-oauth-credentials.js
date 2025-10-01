#!/usr/bin/env node

/**
 * OAuth Credentials Validator
 * 
 * This script checks if all required OAuth credentials are set in the .env file
 * Run this after adding your OAuth credentials to verify everything is configured.
 * 
 * Usage: node validate-oauth-credentials.js
 */

require('dotenv').config({ path: '.env' });

const chalk = {
  green: (str) => `\x1b[32m${str}\x1b[0m`,
  red: (str) => `\x1b[31m${str}\x1b[0m`,
  yellow: (str) => `\x1b[33m${str}\x1b[0m`,
  blue: (str) => `\x1b[34m${str}\x1b[0m`,
  bold: (str) => `\x1b[1m${str}\x1b[0m`,
};

console.log(chalk.bold('\n🔐 OAuth Credentials Validation\n'));
console.log('Checking environment variables...\n');

const credentials = [
  {
    provider: 'Google',
    emoji: '🔵',
    required: [
      'GOOGLE_CLIENT_ID',
      'GOOGLE_CLIENT_SECRET',
      'GOOGLE_CALLBACK_URL'
    ]
  },
  {
    provider: 'Facebook',
    emoji: '🔷',
    required: [
      'FACEBOOK_APP_ID',
      'FACEBOOK_APP_SECRET',
      'FACEBOOK_CALLBACK_URL'
    ]
  },
  {
    provider: 'Twitter',
    emoji: '⚫',
    required: [
      'TWITTER_CONSUMER_KEY',
      'TWITTER_CONSUMER_SECRET',
      'TWITTER_CALLBACK_URL'
    ]
  }
];

const otherRequired = [
  'SESSION_SECRET',
  'FRONTEND_URL',
  'JWT_SECRET',
  'JWT_REFRESH_SECRET'
];

let allValid = true;
let configuredProviders = 0;

// Check OAuth providers
credentials.forEach(({ provider, emoji, required }) => {
  console.log(chalk.bold(`${emoji} ${provider} OAuth`));
  
  const results = required.map(key => {
    const value = process.env[key];
    const isSet = value && !value.startsWith('your-');
    const status = isSet ? chalk.green('✓') : chalk.red('✗');
    const message = isSet ? 'Set' : 'Missing or placeholder';
    
    if (!isSet) allValid = false;
    
    console.log(`  ${status} ${key}: ${message}`);
    return isSet;
  });
  
  const providerConfigured = results.every(r => r);
  if (providerConfigured) configuredProviders++;
  
  console.log();
});

// Check other required variables
console.log(chalk.bold('🔧 Other Required Variables'));
otherRequired.forEach(key => {
  const value = process.env[key];
  const isSet = value && !value.startsWith('your-');
  const status = isSet ? chalk.green('✓') : chalk.red('✗');
  const message = isSet ? 'Set' : 'Missing or placeholder';
  
  if (!isSet) allValid = false;
  
  console.log(`  ${status} ${key}: ${message}`);
});

console.log('\n' + '='.repeat(50) + '\n');

// Summary
if (allValid) {
  console.log(chalk.green(chalk.bold('✅ All credentials configured!')));
  console.log(`${chalk.green('All 3 OAuth providers are ready.')}\n`);
  console.log('Next steps:');
  console.log('  1. Restart your auth service: npm run dev');
  console.log('  2. Test OAuth login at: http://localhost:5173/register');
} else if (configuredProviders > 0) {
  console.log(chalk.yellow(chalk.bold(`⚠️  Partial configuration (${configuredProviders}/3 providers)`)));
  console.log(`${chalk.yellow('Some OAuth providers are configured.')}\n`);
  console.log('You can test configured providers now.');
  console.log('Add remaining credentials to enable all providers.');
} else {
  console.log(chalk.red(chalk.bold('❌ No OAuth credentials configured')));
  console.log(chalk.red('Please add your OAuth credentials to .env file.\n'));
  console.log('Follow the setup guide:');
  console.log('  📖 backend/docs/OAUTH-CREDENTIALS-SETUP.md\n');
  console.log('Quick links:');
  console.log('  • Google: https://console.cloud.google.com/');
  console.log('  • Facebook: https://developers.facebook.com/');
  console.log('  • Twitter: https://developer.twitter.com/');
}

console.log('\n' + '='.repeat(50) + '\n');

// Exit with appropriate code
process.exit(allValid ? 0 : 1);
