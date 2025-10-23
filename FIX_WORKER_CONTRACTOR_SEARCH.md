# Fix: Workers Cannot Find Contractors in Search

## Problem

When logged in as a **worker** and searching for contractors, no results are shown (or only 1 result: "Worker 19e3bf"). However, when logged in as a **contractor** searching for workers, many results appear (Chanchal, Narendra, Shyam, Hari, Karni).

## Root Cause

The users showing up in contractor searches (Chanchal, Narendra, Shyam, Hari, Karni) are actually **workers** in the database, not contractors. That's why:
- ✅ They appear when contractors search for workers (correct)
- ❌ They DON'T appear when workers search for contractors (correct behavior, but not what you want)

The backend query for finding contractors is:
```sql
SELECT * FROM users u
INNER JOIN contractor_profiles cp ON u.id = cp.id
WHERE u.role = 'contractor' AND u.is_active = true
```

## Solution Options

### Option 1: Convert Existing Workers to Contractors (Quick Fix)

If you want Chanchal, Narendra, Shyam, Hari, and Karni to be contractors instead of workers:

**Steps:**
1. Open your database (Neon Console)
2. Run the SQL script: `convert-workers-to-contractors.sql`
3. This will:
   - Change their `role` from 'worker' to 'contractor'
   - Create `contractor_profiles` for them
   - Delete their `worker_profiles`

**Pros:**
- Quick fix
- Uses existing users

**Cons:**
- These users lose their worker status
- They can no longer be found when contractors search for workers

---

### Option 2: Add New Contractor Users (Recommended)

Create separate contractor accounts that workers can find:

**Steps:**
1. Open your database (Neon Console)
2. Run the SQL script: `add-contractor-users.sql`
3. This will create 5 new contractors:
   - Rajesh Construction Co (Jaipur)
   - Sharma Builders (Govindgarh)
   - Singh Infrastructure (गोविन्दगढ)
   - Modern Constructions (Jaipur)
   - Patel Engineering (Govindgarh)

**Pros:**
- Keeps existing workers as workers
- Adds real contractors for testing
- Better represents real-world usage

**Cons:**
- Need to run SQL manually

---

## How to Run SQL Scripts

### Method 1: Neon Console (Recommended)

1. Go to https://console.neon.tech/
2. Select your `comeondost` project
3. Click **SQL Editor** in left sidebar
4. Copy contents of either:
   - `convert-workers-to-contractors.sql` (Option 1)
   - `add-contractor-users.sql` (Option 2)
5. Paste into SQL Editor
6. Click **Run**
7. Verify results in the output

### Method 2: Railway CLI

```bash
# Connect to database
cd backend/services/matching-service

# Option 1: Convert workers to contractors
railway run node -e "
const { Pool } = require('pg');
const fs = require('fs');
const pool = new Pool({ connectionString: process.env.DATABASE_URL });
(async () => {
  const sql = fs.readFileSync('../../convert-workers-to-contractors.sql', 'utf8');
  await pool.query(sql);
  console.log('✅ Conversion complete!');
  await pool.end();
})();
"

# Option 2: Add new contractors
railway run node -e "
const { Pool } = require('pg');
const fs = require('fs');
const pool = new Pool({ connectionString: process.env.DATABASE_URL });
(async () => {
  const sql = fs.readFileSync('../../add-contractor-users.sql', 'utf8');
  await pool.query(sql);
  console.log('✅ New contractors added!');
  await pool.end();
})();
"
```

---

## Testing After Fix

### Test as Worker (searching for contractors)

1. **Login** as worker (Karni or any worker account)
2. **Go to Search** → Should see "Find Job Opportunities"
3. **Enter**:
   - Skill: "electrician"
   - Location: "Govindgarh"
   - Max Distance: 50 km
4. **Click Search**
5. **Expected Results**:
   - Should see 3-5 contractors near Govindgarh
   - Each labeled "Individual Contractor" or company name
   - Button says "✅ Request to Join"

### Test as Contractor (searching for workers)

1. **Login** as contractor (Ram)
2. **Go to Search** → Should see "Find Skilled Workers"
3. **Enter**:
   - Skill: "electrician"
   - Location: "Govindgarh"
   - Max Distance: 50 km
4. **Click Search**
5. **Expected Results**:
   - Should see workers: Chanchal, Narendra, Shyam, Hari, Karni (if using Option 2)
   - Each labeled "Individual Worker"
   - Button says "📤 Send Team Request"

---

## My Recommendation

Use **Option 2** (add new contractors) because:
1. It keeps the existing worker accounts functional
2. It better represents real-world usage (separate contractors and workers)
3. It allows testing both directions of the marketplace
4. Workers can search for and join contractor teams
5. Contractors can search for and invite workers

---

## Quick Reference

**Files Created:**
- `convert-workers-to-contractors.sql` - Option 1 script
- `add-contractor-users.sql` - Option 2 script
- `FIX_WORKER_CONTRACTOR_SEARCH.md` - This guide

**Backend Fixed:**
- ✅ `PgMatchingRepositoryAdapter.ts` - Fixed contractor_profiles join (cp.id instead of cp.user_id)
- ✅ Query correctly filters by `u.role = 'contractor'`

**Frontend Fixed:**
- ✅ Role-specific labels ("Individual Worker" vs "Individual Contractor")
- ✅ Role-specific titles and buttons
- ✅ Deployed to https://comeondost.web.app

**Remaining:**
- ⏳ Add contractor users to database (run `add-contractor-users.sql`)
