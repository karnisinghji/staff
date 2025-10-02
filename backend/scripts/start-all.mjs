#!/usr/bin/env node
import { spawn } from 'node:child_process';
import { readdirSync, readFileSync } from 'node:fs';
import { join } from 'node:path';

const servicesDir = join(process.cwd(), 'services');
const filter = process.argv.includes('--filter') ? process.argv[process.argv.indexOf('--filter') + 1] : null;

function color(i) {
  const codes = [31,32,33,34,35,36,91,92,93,94,95,96];
  return (str) => `\u001b[${codes[i % codes.length]}m${str}\u001b[0m`;
}

function findServices() {
  return readdirSync(servicesDir, { withFileTypes: true })
    .filter(d => d.isDirectory())
    .map(d => d.name)
    .filter(name => !['shared','legacy'].includes(name))
    .filter(name => !filter || name.includes(filter))
    .filter(name => {
      try {
        const pkg = JSON.parse(readFileSync(join(servicesDir, name, 'package.json'), 'utf8'));
        return pkg.scripts && (pkg.scripts.start || pkg.scripts.dev);
      } catch { return false; }
    });
}

const services = findServices();

if (services.length === 0) {
  console.log('No services found to start');
  process.exit(1);
}

console.log(`🚀 Starting production services: ${services.join(', ')}`);

const children = services.map((serviceName, i) => {
  const coloredName = color(i)(serviceName);
  const cwd = join(servicesDir, serviceName);
  
  // Try start script first, then dev script
  const pkg = JSON.parse(readFileSync(join(cwd, 'package.json'), 'utf8'));
  const script = pkg.scripts.start || pkg.scripts.dev;
  const scriptName = pkg.scripts.start ? 'start' : 'dev';
  
  console.log(`[${coloredName}] Starting with npm run ${scriptName}`);
  
  const child = spawn('npm', ['run', scriptName], {
    cwd,
    stdio: ['ignore', 'pipe', 'pipe']
  });

  child.stdout.on('data', (data) => {
    process.stdout.write(`[${coloredName}] ${data}`);
  });

  child.stderr.on('data', (data) => {
    process.stderr.write(`[${coloredName}] ${data}`);
  });

  child.on('close', (code) => {
    console.log(`[${coloredName}] exited with code ${code}`);
  });

  return child;
});

// Handle shutdown
process.on('SIGINT', () => {
  console.log('\\n🛑 Shutting down all services...');
  children.forEach(child => child.kill('SIGINT'));
  process.exit(0);
});

process.on('SIGTERM', () => {
  console.log('\\n🛑 Received SIGTERM, shutting down...');
  children.forEach(child => child.kill('SIGTERM'));
  process.exit(0);
});