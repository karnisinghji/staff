#!/bin/bash

# Ensure we're in the frontend directory
cd "$(dirname "$0")"

# Install pnpm globally
curl -fsSL https://get.pnpm.io/install.sh | sh -

# Add pnpm to PATH for this session
export PNPM_HOME="/Users/shouryaveersingh/Library/pnpm"
export PATH="$PNPM_HOME:$PATH"

# Clean install dependencies including react-toastify
pnpm install
pnpm add react-toastify

# Create production build
NODE_ENV=production VITE_BASE_URL=/staff pnpm vite build --base=/staff/

# Create 404.html for GitHub Pages SPA routing
cp dist/index.html dist/404.html