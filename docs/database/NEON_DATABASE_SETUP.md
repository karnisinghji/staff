# 🚀 Real Database Setup Guide - Neon PostgreSQL

## Step-by-Step Database Setup

### Step 1: Create Neon Account & Database

1. **Go to Neon**: https://neon.tech
2. **Sign Up**: Use your GitHub account for easy integration
3. **Create Project**: 
   - Project Name: `contractor-worker-platform`
   - Region: Choose closest to your users (US East recommended)
   - PostgreSQL Version: 15 (latest)

### Step 2: Get Connection Details

After creating your project, you'll get:
```
Database URL: postgresql://[username]:[password]@[host]/[database]?sslmode=require
Direct Connection: Available in Neon dashboard
```

### Step 3: Import Database Schema

**Option A: Via Neon Console (Recommended)**
1. Go to your Neon project dashboard
2. Click "SQL Editor" 
3. Copy and paste the content from `database-schema.sql`
4. Click "Run"

**Option B: Via Command Line**
```bash
# Install PostgreSQL client if not already installed
# macOS:
brew install postgresql

# Import schema
psql "your_neon_connection_string" < database-schema.sql
```

### Step 4: Verify Database Setup

Run this query in Neon SQL Editor to verify:
```sql
-- Check if all tables were created
SELECT table_name 
FROM information_schema.tables 
WHERE table_schema = 'public' 
ORDER BY table_name;

-- Should show: applications, contractor_profiles, jobs, matches, 
-- messages, notifications, reviews, teams, user_skills, 
-- users, worker_profiles
```

### Step 5: Create Initial Admin User

```sql
-- Insert admin user for testing
INSERT INTO users (id, role, name, email, phone, is_admin, is_verified, is_active) 
VALUES (
    uuid_generate_v4(),
    'admin',
    'Admin User',
    'admin@yourapp.com',
    '+1234567890',
    true,
    true,
    true
);
```

### Step 6: Add Sample Data (Optional)

```sql
-- Add sample contractor
INSERT INTO users (id, role, name, email, phone, location, is_verified, is_active) 
VALUES (
    uuid_generate_v4(),
    'contractor',
    'John Construction Co',
    'john@construction.com',
    '+1555000001',
    'New York, NY',
    true,
    true
);

-- Add sample worker
INSERT INTO users (id, role, name, email, phone, location, is_verified, is_active) 
VALUES (
    uuid_generate_v4(),
    'worker',
    'Mike Electrician',
    'mike@electrical.com',
    '+1555000002',
    'Brooklyn, NY',
    true,
    true
);
```

## Next Steps After Database Setup

1. **Update Backend Services**: Configure connection strings
2. **Environment Variables**: Set up production database URL
3. **Switch from Demo Mode**: Update frontend configuration
4. **Test Connections**: Verify all services can connect
5. **Deploy Backend**: Deploy real API services
6. **Update Frontend**: Switch to real API endpoints

## Connection String Format

Your Neon connection string will look like:
```
postgresql://username:password@ep-cool-name-123456.us-east-1.aws.neon.tech/neondb?sslmode=require
```

## Environment Variables Needed

Create these environment variables for your backend services:

```bash
# Database
NEON_DATABASE_URL=postgresql://username:password@host/database?sslmode=require
DB_HOST=ep-cool-name-123456.us-east-1.aws.neon.tech
DB_NAME=neondb
DB_USER=username
DB_PASSWORD=password
DB_PORT=5432

# JWT
JWT_SECRET=your-super-secret-jwt-key-here
JWT_EXPIRES_IN=24h

# API
PORT=3001
NODE_ENV=production
CORS_ORIGIN=https://staff-frontend-3cnn.vercel.app
```

## Benefits of Real Database

✅ **Persistent Data**: User accounts, profiles, jobs saved permanently
✅ **Real Authentication**: Secure login with password hashing
✅ **Full Features**: Team management, job posting, messaging
✅ **Scalability**: Handle multiple users simultaneously  
✅ **Backup & Recovery**: Automatic backups with point-in-time recovery
✅ **Analytics**: Real usage data and user behavior insights

## Security Features Included

- 🔐 Password hashing with bcrypt
- 🛡️ JWT token authentication
- 🔒 Row Level Security (RLS) ready
- 📧 Email verification system
- 👥 Role-based access control
- 🚫 SQL injection prevention

## Database Monitoring

Neon provides:
- **Usage Metrics**: Connection count, query performance
- **Storage Stats**: Database size, growth tracking  
- **Backup Status**: Automatic backup scheduling
- **Connection Pooling**: Optimized for serverless functions

Ready to proceed? Let me know when you've created your Neon account and I'll help you with the next steps!