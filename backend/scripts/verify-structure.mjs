#!/usr/bin/env node
import { readdirSync, statSync } from 'fs';
import { join } from 'path';

const root = join(process.cwd(), '..'); // backend/ -> go up to repo root
const allowed = new Set(['backend', 'frontend']);

function main() {
  const entries = readdirSync(root).filter(name => !name.startsWith('.'));
  const unexpected = [];
  for (const name of entries) {
    if (!allowed.has(name)) {
      const full = join(root, name);
      // Ignore common artifact types we don't want to block on yet
      if (statSync(full).isFile()) continue; // skip stray files (docs) until moved
      unexpected.push(name);
    }
  }

  if (unexpected.length) {
    console.error('\n[verify-structure] Unexpected root directories found:', unexpected.join(', '));
    console.error('Allowed root directories are: backend, frontend');
    process.exitCode = 1;
  } else {
    console.log('[verify-structure] Root directory structure OK (only backend/ & frontend/)');
  }
}

main();
