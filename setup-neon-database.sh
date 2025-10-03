#!/bin/bash

# 🚀 Setup Database Schema on Neon PostgreSQL
# This script applies the complete database schema to your Neon database

echo "🗄️ Setting up database schema on Neon PostgreSQL..."
echo "=================================================="

# Neon Database Connection String
DATABASE_URL="postgresql://neondb_owner:npg_AwN7nqtQOs8P@ep-proud-dew-adi1wdgd-pooler.c-2.us-east-1.aws.neon.tech/neondb?sslmode=require"

echo "📋 Step 1: Testing database connection..."
if psql "$DATABASE_URL" -c "SELECT version();" > /dev/null 2>&1; then
    echo "✅ Database connection successful!"
else
    echo "❌ Failed to connect to database. Installing psql..."
    # Install PostgreSQL client if not available
    if command -v brew >/dev/null 2>&1; then
        brew install postgresql
    else
        echo "Please install PostgreSQL client (psql) manually"
        exit 1
    fi
fi

echo ""
echo "📋 Step 2: Applying database schema..."
if psql "$DATABASE_URL" -f "database-schema.sql"; then
    echo "✅ Database schema applied successfully!"
else
    echo "❌ Failed to apply database schema"
    exit 1
fi

echo ""
echo "📋 Step 3: Verifying tables were created..."
TABLES_COUNT=$(psql "$DATABASE_URL" -t -c "SELECT COUNT(*) FROM information_schema.tables WHERE table_schema = 'public';")
echo "📊 Created $TABLES_COUNT tables in the database"

echo ""
echo "🧪 Step 4: Testing a simple query..."
if psql "$DATABASE_URL" -c "SELECT COUNT(*) as user_count FROM users;" > /dev/null 2>&1; then
    echo "✅ Database schema is working correctly!"
else
    echo "⚠️ Database schema applied but queries may need adjustment"
fi

echo ""
echo "🎉 Database setup complete!"
echo ""
echo "🔍 Next steps:"
echo "1. Test registration endpoint: curl -X POST https://staff-auth-service-gsg3.onrender.com/api/auth/register"
echo "2. Database is ready for your contractor-worker platform!"
echo ""