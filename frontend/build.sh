#!/bin/bash

# Set environment variables explicitly
export NODE_ENV=production
export VITE_BASE_URL=/staff
export VITE_DEMO_MODE=false

# Remove old build artifacts
rm -rf dist node_modules/.vite

# Run vite build directly
node_modules/.bin/vite build