#!/bin/bash
set -euo pipefail

# Prepare pnpm in this environment (idempotent)
if ! command -v pnpm >/dev/null 2>&1; then
  curl -fsSL https://get.pnpm.io/install.sh | sh -
  export PNPM_HOME="$HOME/Library/pnpm"
  export PATH="$PNPM_HOME:$PATH"
fi

cd "$(dirname "$0")"

# Install dependencies (pnpm will reuse lockfile if present)
pnpm install

# Ensure react-toastify present
pnpm add -w --filter ./ react-toastify@^11.0.5 || true

# Build with demo mode enabled so the frontend runs without backend
export VITE_DEMO_MODE=true
export NODE_ENV=production
pnpm vite build --base=/staff/ --mode production

# Ensure 404 fallback for GitHub Pages
cp -f dist/index.html dist/404.html

echo "Demo build complete: dist/ (VITE_DEMO_MODE=$VITE_DEMO_MODE)"