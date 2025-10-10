#!/usr/bin/env node
/**
 * stamp-html.js
 * Injects build metadata (SHA, timestamp, asset hashes) into index.html
 * This ensures index.html changes on every deploy, forcing CDN cache refresh
 */

const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

// Get build metadata
const getShortSha = () => {
  try {
    return execSync('git rev-parse --short HEAD').toString().trim();
  } catch {
    return 'unknown';
  }
};

const getBuildTime = () => {
  return new Date().toISOString();
};

const getBranch = () => {
  try {
    return execSync('git rev-parse --abbrev-ref HEAD').toString().trim();
  } catch {
    return 'unknown';
  }
};

// Paths
const distPath = path.join(__dirname, '..', 'frontend', 'dist');
const indexPath = path.join(distPath, 'index.html');

console.log('🏷️  Stamping HTML with build metadata...');
console.log(`   📁 Target: ${indexPath}`);

// Check if index.html exists
if (!fs.existsSync(indexPath)) {
  console.error('❌ Error: index.html not found at', indexPath);
  console.error('   Make sure to run "npm run build" first!');
  process.exit(1);
}

// Read index.html
let html = fs.readFileSync(indexPath, 'utf-8');

// Collect metadata
const metadata = {
  sha: getShortSha(),
  branch: getBranch(),
  buildTime: getBuildTime(),
  buildNumber: process.env.GITHUB_RUN_NUMBER || 'local',
  workflow: process.env.GITHUB_WORKFLOW || 'local',
};

console.log('   📊 Metadata:', JSON.stringify(metadata, null, 2));

// Create stamp comment
const stampComment = `<!-- 
  🏗️  Build Info:
  SHA: ${metadata.sha}
  Branch: ${metadata.branch}
  Time: ${metadata.buildTime}
  Build #: ${metadata.buildNumber}
  Workflow: ${metadata.workflow}
-->`;

// Inject stamp right after <head> tag
html = html.replace(
  /(<head[^>]*>)/i,
  `$1\n${stampComment}\n    <meta name="build-sha" content="${metadata.sha}">\n    <meta name="build-time" content="${metadata.buildTime}">\n    <meta name="build-number" content="${metadata.buildNumber}">`
);

// Also add a unique comment at the end to ensure HTML body changes
const uniqueMarker = `\n<!-- Build: ${metadata.buildTime} | SHA: ${metadata.sha} | #${metadata.buildNumber} -->\n`;
html = html.replace(/(<\/body>)/i, `${uniqueMarker}$1`);

// Write back
fs.writeFileSync(indexPath, html, 'utf-8');

console.log('✅ Successfully stamped index.html');
console.log(`   🔍 Unique markers added: ${metadata.sha} @ ${metadata.buildTime}`);
console.log('   💡 This ensures CDN sees a new file on every deploy');

// Verify the stamp was added
const stampedHtml = fs.readFileSync(indexPath, 'utf-8');
if (stampedHtml.includes(metadata.sha) && stampedHtml.includes(metadata.buildTime)) {
  console.log('✅ Verification passed: Build stamp found in HTML');
} else {
  console.error('❌ Verification failed: Build stamp not found in HTML');
  process.exit(1);
}
