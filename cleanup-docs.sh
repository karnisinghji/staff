#!/bin/bash

# 📚 Documentation Cleanup & Organization Script
# Consolidates 81+ markdown files into organized structure

echo "📚 ComeOnDost Documentation Cleanup"
echo "===================================="
echo ""

# Create docs directory structure
echo "📁 Creating organized docs structure..."
mkdir -p docs/{deployment,database,oauth,features,mobile,troubleshooting}
mkdir -p docs/archive

# Keep these essential guides (move to docs/)
echo "✅ Organizing essential documentation..."

# Deployment guides
[ -f "RAILWAY_DEPLOYMENT_GUIDE.md" ] && mv "RAILWAY_DEPLOYMENT_GUIDE.md" docs/deployment/
[ -f "NETLIFY_DEPLOYMENT.md" ] && mv "NETLIFY_DEPLOYMENT.md" docs/deployment/
[ -f "COMPLETE_DEPLOYMENT_SUCCESS.md" ] && mv "COMPLETE_DEPLOYMENT_SUCCESS.md" docs/deployment/

# Database guides
[ -f "DATABASE_SETUP.md" ] && mv "DATABASE_SETUP.md" docs/database/
[ -f "NEON_DATABASE_SETUP.md" ] && mv "NEON_DATABASE_SETUP.md" docs/database/
[ -f "DATABASE_BACKUP_GUIDE.md" ] && mv "DATABASE_BACKUP_GUIDE.md" docs/database/

# OAuth guides
[ -f "GOOGLE_OAUTH_SETUP_GUIDE.md" ] && mv "GOOGLE_OAUTH_SETUP_GUIDE.md" docs/oauth/
[ -f "OAUTH_CONFIGURATION_GUIDE.md" ] && mv "OAUTH_CONFIGURATION_GUIDE.md" docs/oauth/

# Mobile guides
[ -f "APK_BUILD_GUIDE.md" ] && mv "APK_BUILD_GUIDE.md" docs/mobile/
[ -f "PWA_INSTALLATION_GUIDE.md" ] && mv "PWA_INSTALLATION_GUIDE.md" docs/mobile/
[ -f "MOBILE_APK_GUIDE.md" ] && mv "MOBILE_APK_GUIDE.md" docs/mobile/
[ -f "PLAY_STORE_SUBMISSION.md" ] && mv "PLAY_STORE_SUBMISSION.md" docs/mobile/

# Feature guides
[ -f "MOBILE_GPS_LOCATION_GUIDE.md" ] && mv "MOBILE_GPS_LOCATION_GUIDE.md" docs/features/
[ -f "TOAST-NOTIFICATIONS-GUIDE.md" ] && mv "TOAST-NOTIFICATIONS-GUIDE.md" docs/features/
[ -f "DUPLICATE-DETECTION-IMPLEMENTATION.md" ] && mv "DUPLICATE-DETECTION-IMPLEMENTATION.md" docs/features/

# Troubleshooting
[ -f "RAILWAY_DEBUG_GUIDE.md" ] && mv "RAILWAY_DEBUG_GUIDE.md" docs/troubleshooting/
[ -f "CACHE_CLEARING_GUIDE.md" ] && mv "CACHE_CLEARING_GUIDE.md" docs/troubleshooting/
[ -f "SECURITY_VULNERABILITIES.md" ] && mv "SECURITY_VULNERABILITIES.md" docs/troubleshooting/

echo "✅ Essential docs organized!"
echo ""

# Archive session summaries and status reports (don't delete, may have valuable info)
echo "📦 Archiving session summaries and status reports..."

# Session summaries
for file in *SESSION*.md *SUMMARY*.md *STATUS*.md *COMPLETE*.md *SUCCESS*.md; do
  [ -f "$file" ] && mv "$file" docs/archive/ 2>/dev/null
done

# Testing reports
for file in *TEST*.md *TESTING*.md *LIVE*.md; do
  [ -f "$file" ] && mv "$file" docs/archive/ 2>/dev/null
done

# Fix/Debug reports
for file in *FIX*.md *FIXED*.md *DEBUG*.md *FIXES*.md *ISSUES*.md; do
  [ -f "$file" ] && mv "$file" docs/archive/ 2>/dev/null
done

# Implementation reports
for file in *IMPLEMENTATION*.md *ACCOMPLISHED*.md; do
  [ -f "$file" ] && mv "$file" docs/archive/ 2>/dev/null
done

# Responsive design docs
for file in RESPONSIVE*.md; do
  [ -f "$file" ] && mv "$file" docs/archive/ 2>/dev/null
done

# Performance docs
for file in PERFORMANCE*.md; do
  [ -f "$file" ] && mv "$file" docs/archive/ 2>/dev/null
done

# Deployment status docs
for file in DEPLOYMENT*.md DEPLOY*.md; do
  [ -f "$file" ] && mv "$file" docs/archive/ 2>/dev/null
done

# Notification docs
for file in NOTIFICATION*.md; do
  [ -f "$file" ] && mv "$file" docs/archive/ 2>/dev/null
done

# CORS, CDN, etc
for file in CORS*.md CDN*.md; do
  [ -f "$file" ] && mv "$file" docs/archive/ 2>/dev/null
done

# Location/city updates
for file in *LOCATION*.md *CITIES*.md *CITY*.md; do
  [ -f "$file" ] && mv "$file" docs/archive/ 2>/dev/null
done

# Docker fixes
for file in DOCKERFILE*.md; do
  [ -f "$file" ] && mv "$file" docs/archive/ 2>/dev/null
done

# Frontend errors
for file in FRONTEND*.md; do
  [ -f "$file" ] && mv "$file" docs/archive/ 2>/dev/null
done

# Matching service
for file in MATCHING*.md; do
  [ -f "$file" ] && mv "$file" docs/archive/ 2>/dev/null
done

# Connection fixes
for file in CONNECTION*.md; do
  [ -f "$file" ] && mv "$file" docs/archive/ 2>/dev/null
done

# Hosting options
for file in HOSTING*.md; do
  [ -f "$file" ] && mv "$file" docs/archive/ 2>/dev/null
done

# OAuth re-enabled
for file in OAUTH_RE*.md; do
  [ -f "$file" ] && mv "$file" docs/archive/ 2>/dev/null
done

# Visual testing
for file in VISUAL*.md; do
  [ -f "$file" ] && mv "$file" docs/archive/ 2>/dev/null
done

# Quick reference/fix
for file in QUICK*.md; do
  [ -f "$file" ] && mv "$file" docs/archive/ 2>/dev/null
done

# Console errors
for file in CONSOLE*.md; do
  [ -f "$file" ] && mv "$file" docs/archive/ 2>/dev/null
done

# Capacitor
for file in CAPACITOR*.md; do
  [ -f "$file" ] && mv "$file" docs/archive/ 2>/dev/null
done

# Mobile distribution
for file in *DISTRIBUTION*.md; do
  [ -f "$file" ] && mv "$file" docs/archive/ 2>/dev/null
done

# Mobile icons
for file in *ICONS*.md; do
  [ -f "$file" ] && mv "$file" docs/archive/ 2>/dev/null
done

# Database-related already moved
for file in DATABASE*.md URGENT_DATABASE*.md REAL_DATABASE*.md; do
  [ -f "$file" ] && mv "$file" docs/archive/ 2>/dev/null
done

# Railway-related already moved
for file in RAILWAY*.md MANUAL_RAILWAY*.md; do
  [ -f "$file" ] && mv "$file" docs/archive/ 2>/dev/null
done

# Netlify already moved
for file in NETLIFY*.md; do
  [ -f "$file" ] && mv "$file" docs/archive/ 2>/dev/null
done

# Next steps
for file in NEXT_STEPS*.md; do
  [ -f "$file" ] && mv "$file" docs/archive/ 2>/dev/null
done

# GitHub Actions
for file in GITHUB*.md; do
  [ -f "$file" ] && mv "$file" docs/archive/ 2>/dev/null
done

# Production issues
for file in PRODUCTION*.md; do
  [ -f "$file" ] && mv "$file" docs/archive/ 2>/dev/null
done

# Cell tower
for file in CELL*.md; do
  [ -f "$file" ] && mv "$file" docs/archive/ 2>/dev/null
done

# Search formats
for file in *SEARCH*.md; do
  [ -f "$file" ] && mv "$file" docs/archive/ 2>/dev/null
done

echo "✅ Archived session documents!"
echo ""

# Count remaining files
REMAINING=$(ls *.md 2>/dev/null | wc -l | tr -d ' ')
ARCHIVED=$(ls docs/archive/*.md 2>/dev/null | wc -l | tr -d ' ')
ORGANIZED=$(find docs -name "*.md" ! -path "docs/archive/*" | wc -l | tr -d ' ')

echo "📊 Cleanup Summary:"
echo "==================="
echo "✅ Organized guides: $ORGANIZED files"
echo "📦 Archived reports: $ARCHIVED files"
echo "📄 Remaining in root: $REMAINING files"
echo ""

# Show organized structure
echo "📁 New Documentation Structure:"
echo "==============================="
tree docs -L 2 2>/dev/null || find docs -type f -name "*.md" | sed 's|^|  |'
echo ""

echo "✅ Cleanup complete!"
echo ""
echo "📚 Main documentation: docs/COMPLETE_GUIDE.md"
echo "📁 Organized by topic: docs/deployment/, docs/database/, docs/oauth/, etc."
echo "📦 Historical records: docs/archive/"
echo ""
echo "🗑️  To delete archived files later (if not needed):"
echo "    rm -rf docs/archive/"
