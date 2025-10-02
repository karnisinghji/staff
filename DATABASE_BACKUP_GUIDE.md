# 🗄️ Database Setup & Backup Guide

## Current Status: Demo Mode
Your app is currently running in **demo mode** with mock data. No real data is being stored.

## Database Options for Real Data Storage

### Option 1: Neon PostgreSQL (Recommended - FREE)
- **Free Tier**: 3GB storage, 1 database
- **Automatic Backups**: Point-in-time recovery up to 7 days
- **Dashboard**: Web-based SQL editor and monitoring

**Setup Steps:**
1. Go to https://neon.tech
2. Sign up with GitHub account
3. Create new project: "staff-platform"
4. Copy connection string
5. Update backend services with connection string

**Backup Method:**
- Automatic: Built-in point-in-time recovery (7 days)
- Manual: Export via SQL dump through dashboard
- API: Backup via CLI tools

### Option 2: Supabase (FREE)
- **Free Tier**: 500MB storage, 2 projects
- **Built-in Backup**: Automatic daily backups
- **Real-time**: WebSocket subscriptions
- **Dashboard**: Table editor, API explorer

**Setup Steps:**
1. Go to https://supabase.com
2. Create new project: "contractor-platform"
3. Import database schema from database-schema.sql
4. Enable Row Level Security (RLS)
5. Generate API keys for frontend

**Backup Method:**
- Automatic: Daily backups (retained 7 days)
- Manual: Export via SQL dumps
- API: Backup via REST API

### Option 3: PlanetScale (FREE)
- **Free Tier**: 1GB storage, 1 database
- **Branching**: Git-like database branching
- **Scaling**: Automatic horizontal scaling

## Current Demo Data Structure

Your app currently generates these mock responses:

```typescript
// Login Demo Data
{
  accessToken: "valid-jwt-token",
  user: { id: 1, email: "demo@example.com", role: "contractor" }
}

// Skills Demo Data  
{
  success: true,
  skills: ["plumbing", "electrical", "carpentry", "painting", "construction"]
}

// Team Requests Demo Data
{
  success: true,
  requests: [
    { id: 1, senderName: "John Doe", projectTitle: "Home Renovation" },
    { id: 2, senderName: "Jane Smith", projectTitle: "Kitchen Remodel" }
  ]
}

// Profile Demo Data
{
  success: true,
  user: { 
    id: 1, name: "Demo User", email: "demo@example.com", 
    role: "contractor", phoneNumber: "+1234567890" 
  }
}
```

## How to Enable Real Database (When Ready)

### Step 1: Choose Database Provider
Pick one of the options above and create account

### Step 2: Create Database
Import the complete schema from `database-schema.sql`

### Step 3: Update API Configuration
In `frontend/src/config/api.ts`:
```typescript
// Change from demo mode to real API
export const DEMO_MODE = false; // Set to false
export const API_CONFIG = {
  AUTH_SERVICE: 'https://your-backend.railway.app/api/auth',
  USER_SERVICE: 'https://your-backend.railway.app/api/users',
  // ... etc
};
```

### Step 4: Deploy Backend Services
Deploy your 5 microservices to connect to the real database

## Database Schema Overview

Your platform has these main tables:
- **users**: Main user accounts (contractors & workers)
- **worker_profiles**: Additional worker-specific data
- **contractor_profiles**: Business/contractor information  
- **jobs**: Project listings and job postings
- **applications**: Worker applications to jobs
- **matches**: Contractor-worker matches
- **messages**: Communication between users
- **notifications**: System notifications
- **user_skills**: Skills mapping
- **reviews**: Rating and review system
- **teams**: Team collaboration data
- **admin_users**: Admin access control

## Backup Strategies

### Automated Backups (Recommended)
- **Neon**: 7-day point-in-time recovery
- **Supabase**: Daily automatic backups
- **Custom**: Set up cron jobs for regular exports

### Manual Backup Process
1. **Export SQL Dump**:
   ```bash
   pg_dump "postgres://user:pass@host:5432/dbname" > backup_$(date +%Y%m%d).sql
   ```

2. **Export Specific Tables**:
   ```bash
   pg_dump -t users -t worker_profiles "connection_string" > users_backup.sql
   ```

3. **Backup to Cloud Storage**:
   - AWS S3
   - Google Cloud Storage  
   - Dropbox/Google Drive

### Recovery Process
1. **Point-in-Time Recovery** (Neon/Supabase):
   - Use dashboard to restore to specific timestamp
   
2. **SQL Dump Restore**:
   ```bash
   psql "connection_string" < backup_20251003.sql
   ```

## Current File Locations

Your database-related files are stored in:
```
/Users/shouryaveersingh/Desktop/old data/staff/
├── database-schema.sql              # Complete production schema
├── backend/database/migrations/     # Migration files
├── backend/database/seeds/         # Seed data
└── frontend/src/config/api.ts      # API configuration (demo mode)
```

## Next Steps

1. **Keep Demo Mode**: Continue with current setup for showcasing
2. **Add Real Database**: When ready for real users, follow setup guide above
3. **Hybrid Approach**: Use demo for public showcase, real DB for internal testing

Your current demo setup is perfect for:
- ✅ Portfolio demonstration  
- ✅ Investor presentations
- ✅ User experience testing
- ✅ Feature showcasing

Let me know when you're ready to set up a real database!