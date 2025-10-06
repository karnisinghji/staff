#!/bin/bash

# Set environment variables explicitly
export NODE_ENV=production
export VITE_BASE_URL=/staff
export VITE_DEMO_MODE=false

# Install dependencies in a clean state
rm -rf node_modules package-lock.json
npm install --no-package-lock

# Run build using npx
npx vite build --base=/staff/