# Database Setup Instructions - Neon PostgreSQL

## Step 1: Create Neon Account
1. Go to [https://neon.tech](https://neon.tech)
2. Click "Sign Up" and use your GitHub account (recommended)
3. Choose the **Free Plan** (10GB database, no credit card required)

## Step 2: Create Database Project
1. After signup, click "Create Project"
2. **Project Name**: `contractor-worker-platform`
3. **Database Name**: `contractor_worker_db` 
4. **Region**: Choose closest to your users (US East for best performance)
5. Click "Create Project"

## Step 3: Get Connection Details
After project creation, you'll see:
- **Host**: `ep-xxx-xxx.us-east-1.aws.neon.tech`
- **Database**: `contractor_worker_db`
- **Username**: `contractor_worker_db_owner`
- **Password**: `[auto-generated]`

**Save these details!** You'll need them for deployment.

## Step 4: Run Database Schema
1. In Neon dashboard, click "SQL Editor"
2. Copy the entire contents of `database-schema.sql` 
3. Paste into SQL Editor and click "Run"
4. You should see "Query executed successfully"

## Step 5: Add Sample Data (Optional)
1. Copy the contents of `database-seed.sql`
2. Paste into SQL Editor and click "Run"
3. This adds sample contractors and workers for testing

## Step 6: Connection String Format
Your connection string will look like:
```
postgresql://contractor_worker_db_owner:PASSWORD@ep-xxx-xxx.us-east-1.aws.neon.tech/contractor_worker_db?sslmode=require
```

## Database Features Included:
✅ **5 User Types**: Admin, Contractor, Worker with profiles
✅ **Skills System**: 7 trade skills (electrician, plumber, carpenter, etc.)
✅ **Job Matching**: Job postings and applications
✅ **Team Requests**: Contractors can invite workers
✅ **Reviews & Ratings**: User feedback system
✅ **Admin Panel**: User management and system controls
✅ **OAuth Support**: Google sign-in ready
✅ **Security**: Password reset, user blocks, data validation

## Next Steps:
Once your database is set up, we'll:
1. Deploy backend to Azure, frontend to Firebase
2. Connect frontend and backend services
3. Test on mobile devices
4. Enable PWA features

**Ready to deploy to Azure and Firebase?**