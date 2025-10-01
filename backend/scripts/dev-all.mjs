#!/usr/bin/env node
import { spawn } from 'node:child_process';
import { readdirSync, readFileSync } from 'node:fs';
import { join } from 'node:path';

const servicesDir = join(process.cwd(), 'services');
const filter = process.argv.includes('--filter') ? process.argv[process.argv.indexOf('--filter') + 1] : null;
const listOnly = process.argv.includes('--list');

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
        return pkg.scripts && pkg.scripts.dev;
      } catch { return false; }
    });
}

const services = findServices();

// Proactively free known service ports (macOS lsof based) before spawning
const candidatePorts = [3001,3002,3003,3004,3005];
for (const p of candidatePorts) {
  try {
    const killer = spawn('bash', ['-c', `lsof -ti tcp:${p} | xargs -r kill -9`]);
    killer.on('exit', () => {/* noop */});
  } catch {/* ignore */}
}

if (listOnly) {
  console.log(JSON.stringify(services, null, 2));
  process.exit(0);
}

if (!services.length) {
  console.error('No services with a dev script found.');
  process.exit(1);
}

console.log(`Starting dev for services: ${services.join(', ')}`);

const procs = [];
services.forEach((svc, idx) => {
  const c = color(idx);
  const proc = spawn('npm', ['run', 'dev'], {
    cwd: join(servicesDir, svc),
    stdio: ['ignore', 'pipe', 'pipe'],
    env: { ...process.env, SERVICE_NAME: svc }
  });
  procs.push(proc);
  const prefix = c(`[${svc}]`);
  proc.stdout.on('data', d => process.stdout.write(`${prefix} ${d}`));
  proc.stderr.on('data', d => process.stderr.write(`${prefix} ${d}`));
  proc.on('exit', code => {
    console.log(c(`[${svc}] exited with code ${code}`));
  });
});

function shutdown() {
  console.log('\nShutting down services...');
  procs.forEach(p => p.kill('SIGINT'));
  setTimeout(()=>process.exit(0), 500);
}
process.on('SIGINT', shutdown);
process.on('SIGTERM', shutdown);
