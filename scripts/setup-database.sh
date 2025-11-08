#!/bin/bash

# 🚀 Database Setup Script for Contractor-Worker Platform
# This script sets up your Neon PostgreSQL database with the complete schema

echo "🗄️ Setting up Contractor-Worker Platform Database..."
echo "=================================================="

# Check if connection string is provided
if [ -z "$1" ]; then
    echo "❌ Error: Please provide your Neon database connection string"
    echo ""
    echo "Usage: ./setup-database.sh 'postgresql://username:password@host/database?sslmode=require'"
    echo ""
    echo "Get your connection string from:"
    echo "1. Go to https://neon.tech"
    echo "2. Create project: 'contractor-worker-platform'"
    echo "3. Copy connection string from dashboard"
    exit 1
fi

DATABASE_URL="$1"

echo "📋 Step 1: Testing database connection..."
if psql "$DATABASE_URL" -c "SELECT version();"; then
    echo "✅ Database connection successful!"
else
    echo "❌ Failed to connect to database. Please check your connection string."
    exit 1
fi

echo ""
echo "📋 Step 2: Creating database schema..."
if psql "$DATABASE_URL" < database-schema.sql; then
    echo "✅ Database schema created successfully!"
else
    echo "❌ Failed to create database schema."
    exit 1
fi

echo ""
echo "📋 Step 3: Verifying table creation..."
TABLE_COUNT=$(psql "$DATABASE_URL" -t -c "SELECT COUNT(*) FROM information_schema.tables WHERE table_schema = 'public';")
echo "📊 Created $TABLE_COUNT tables"

echo ""
echo "📋 Step 4: Creating admin user..."
psql "$DATABASE_URL" -c "
INSERT INTO users (role, name, email, phone, is_admin, is_verified, is_active) 
VALUES (
    'admin',
    'Platform Admin',
    'admin@contractorplatform.com',
    '+1234567890',
    true,
    true,
    true
) ON CONFLICT (email) DO NOTHING;
"

echo ""
echo "📋 Step 5: Adding sample data..."
psql "$DATABASE_URL" -c "
-- Sample contractor
INSERT INTO users (role, name, email, phone, location, is_verified, is_active) 
VALUES (
    'contractor',
    'ABC Construction LLC',
    'info@abcconstruction.com',
    '+1555001001',
    'New York, NY',
    true,
    true
) ON CONFLICT (email) DO NOTHING;

-- Sample worker
INSERT INTO users (role, name, email, phone, location, is_verified, is_active) 
VALUES (
    'worker',
    'John Electrician',
    'john@electrical.pro',
    '+1555001002',
    'Brooklyn, NY',
    true,
    true
) ON CONFLICT (email) DO NOTHING;
"

echo ""
echo "🎉 Database setup completed successfully!"
echo "============================================="
echo ""
echo "📊 Database Summary:"
echo "• Host: $(echo $DATABASE_URL | sed 's/.*@\([^/]*\).*/\1/')"
echo "• Tables: $TABLE_COUNT created"
echo "• Sample users: 3 added (admin, contractor, worker)"
echo "• Features: Authentication, profiles, jobs, messaging, teams"
echo ""
echo "🔗 Next Steps:"
echo "1. Update your backend services with this connection string"
echo "2. Set environment variables in your deployment platform"
echo "3. Deploy backend services to connect to real database"
echo "4. Update frontend to use real API endpoints"
echo ""
echo "🔐 Admin Login (for testing):"
echo "Email: admin@contractorplatform.com"
echo "Password: Set up through your authentication system"
echo ""
echo "📚 Documentation:"
echo "• Setup Guide: NEON_DATABASE_SETUP.md"
echo "• Environment Variables: .env.production.example"
echo "• Schema Reference: database-schema.sql"