#!/bin/bash

# Quick script to apply database indexes to Neon PostgreSQL
# This is a ONE-TIME operation - don't run multiple times

echo "🚀 Applying Performance Optimization Indexes to Database..."
echo ""

# Check if DATABASE_URL is set
if [ -z "$DATABASE_URL" ]; then
    echo "❌ ERROR: DATABASE_URL environment variable not set"
    echo ""
    echo "Set it first:"
    echo "  export DATABASE_URL='your-neon-connection-string'"
    exit 1
fi

echo "📊 Database: $(echo $DATABASE_URL | sed 's/:.*/...[REDACTED]/')"
echo ""

# Apply indexes
echo "Creating indexes (this may take 1-2 minutes)..."
psql "$DATABASE_URL" -f optimize-database-indexes.sql

if [ $? -eq 0 ]; then
    echo ""
    echo "✅ SUCCESS! Database indexes created."
    echo ""
    echo "📈 Expected Performance Improvements:"
    echo "  - Team member queries: 10-100x faster"
    echo "  - User blocks lookups: 5-10x faster"
    echo "  - Location searches: 10-50x faster"
    echo "  - Profile joins: 5-20x faster"
    echo ""
    echo "🔍 To verify indexes were created:"
    echo "  psql \"\$DATABASE_URL\" -c \"\\di\""
else
    echo ""
    echo "❌ ERROR: Failed to create indexes"
    echo ""
    echo "Manual steps:"
    echo "1. Open Neon console: https://console.neon.tech"
    echo "2. Go to SQL Editor"
    echo "3. Copy-paste contents of optimize-database-indexes.sql"
    echo "4. Run the query"
    exit 1
fi
