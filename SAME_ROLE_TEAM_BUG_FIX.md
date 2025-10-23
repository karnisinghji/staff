# Critical Bug Fix: Same-Role Team Members Prevention

## 🐛 Bug Report

**Reported By**: User  
**Date**: 20 October 2025  
**Severity**: **CRITICAL**  
**Status**: ✅ **FIXED**

### Issue Description
The platform is designed so that:
- ✅ Contractors can see and team with Workers
- ✅ Workers can see and team with Contractors
- ❌ But the bug allowed: **Contractors teaming with other Contractors**

### Example Case
```sql
-- Both Ram and Manoj are contractors
SELECT * FROM public.users WHERE id = 'ac6df5a0-c8a6-449c-bc8c-a9df4d19e3bf'; -- Ram (contractor)
SELECT * FROM public.users WHERE email = 'ramp@info.com'; -- Ram (contractor)

-- Bug: Ram's "My Team" page shows Manoj (another contractor)
-- Expected: Should only show workers
```

### Root Cause Analysis

#### Missing Validation #1: `sendTeamRequest()` Function
**Location**: `backend/services/matching-service/src/controllers/MatchingController.ts:439`

**Problem**: No validation to check if sender and receiver have opposite roles.

```typescript
// ❌ BEFORE: Missing role validation
sendTeamRequest = async (req: Request, res: Response): Promise<void> => {
    const { receiverId, message } = req.body;
    const senderId = req.user.id;
    
    // Validates self-request
    if (senderId === receiverId) {
        return error;
    }
    
    // ❌ Missing: No check if both users have same role
    
    // Creates team request without role validation
    await pool.query(
        'INSERT INTO team_requests (sender_id, receiver_id, ...) ...'
    );
}
```

#### Missing Validation #2: `updateTeamRequest()` Function (Accept)
**Location**: `backend/services/matching-service/src/controllers/MatchingController.ts:727`

**Problem**: When accepting team requests, no validation that roles are opposite.

```typescript
// ❌ BEFORE: Missing role validation on accept
if (status === 'accepted') {
    // Gets roles but doesn't validate they're different
    const senderRole = await pool.query('SELECT role FROM users WHERE id = $1', [sender_id]);
    const receiverRole = await pool.query('SELECT role FROM users WHERE id = $1', [receiver_id]);
    
    // ❌ Missing: No check if senderRole === receiverRole
    
    // Creates team relationships anyway
    await pool.query('INSERT INTO team_members ...');
}
```

#### Missing Protection #3: Database Level
**Location**: Database schema

**Problem**: No database constraint to prevent same-role team members.

```sql
-- ❌ BEFORE: No constraint on team_members table
CREATE TABLE team_members (
    id UUID PRIMARY KEY,
    user_id UUID REFERENCES users(id),
    team_member_id UUID REFERENCES users(id),
    -- ❌ Missing: No check that users have opposite roles
);
```

## ✅ Solution Implemented

### Fix #1: Application-Level Validation in `sendTeamRequest()`

**File**: `backend/services/matching-service/src/controllers/MatchingController.ts`

```typescript
// ✅ AFTER: Added role validation
sendTeamRequest = async (req: Request, res: Response): Promise<void> => {
    const { receiverId, message } = req.body;
    const senderId = req.user.id;
    
    // Existing self-request validation
    if (senderId === receiverId) {
        return error;
    }
    
    // ✅ NEW: Validate opposite roles
    const senderRoleResult = await pool.query('SELECT role FROM users WHERE id = $1', [senderId]);
    const receiverRoleResult = await pool.query('SELECT role FROM users WHERE id = $1', [receiverId]);
    
    if (senderRoleResult.rows.length === 0 || receiverRoleResult.rows.length === 0) {
        res.status(404).json({ success: false, message: 'User not found' });
        return;
    }
    
    const senderRole = senderRoleResult.rows[0].role;
    const receiverRole = receiverRoleResult.rows[0].role;
    
    // ✅ Prevent same-role team requests
    if (senderRole === receiverRole) {
        if (senderRole === 'contractor') {
            res.status(400).json({ 
                success: false, 
                message: 'Contractors can only send team requests to workers, not other contractors' 
            });
        } else if (senderRole === 'worker') {
            res.status(400).json({ 
                success: false, 
                message: 'Workers can only send team requests to contractors, not other workers' 
            });
        } else {
            res.status(400).json({ 
                success: false, 
                message: 'Cannot send team request to users with the same role' 
            });
        }
        return;
    }
    
    // Proceeds only if roles are opposite
    await pool.query('INSERT INTO team_requests ...');
}
```

### Fix #2: Accept Request Validation in `updateTeamRequest()`

```typescript
// ✅ AFTER: Added role validation on accept
if (status === 'accepted') {
    const senderRole = await pool.query('SELECT role FROM users WHERE id = $1', [request.sender_id]);
    const receiverRole = await pool.query('SELECT role FROM users WHERE id = $1', [request.receiver_id]);
    
    // ✅ NEW: Validate users exist
    if (senderRole.rows.length === 0 || receiverRole.rows.length === 0) {
        await pool.query('ROLLBACK');
        res.status(404).json({ success: false, message: 'User not found' });
        return;
    }
    
    const senderRoleValue = senderRole.rows[0].role;
    const receiverRoleValue = receiverRole.rows[0].role;
    
    // ✅ NEW: Prevent same-role team acceptance
    if (senderRoleValue === receiverRoleValue) {
        await pool.query('ROLLBACK');
        if (senderRoleValue === 'contractor') {
            res.status(400).json({ 
                success: false, 
                message: 'Cannot accept team request: Contractors can only team with workers' 
            });
        } else if (senderRoleValue === 'worker') {
            res.status(400).json({ 
                success: false, 
                message: 'Cannot accept team request: Workers can only team with contractors' 
            });
        } else {
            res.status(400).json({ 
                success: false, 
                message: 'Cannot accept team request: Users must have opposite roles' 
            });
        }
        return;
    }
    
    // Proceeds only if roles are opposite
    await pool.query('INSERT INTO team_members ...');
}
```

### Fix #3: Database-Level Constraint (Extra Safety)

**File**: `backend/services/matching-service/migrations/add_opposite_roles_constraint.sql`

```sql
-- ✅ NEW: Database function to validate opposite roles
CREATE OR REPLACE FUNCTION check_opposite_roles()
RETURNS TRIGGER AS $$
DECLARE
    user_role TEXT;
    member_role TEXT;
BEGIN
    -- Get roles
    SELECT role INTO user_role FROM users WHERE id = NEW.user_id;
    SELECT role INTO member_role FROM users WHERE id = NEW.team_member_id;
    
    -- Block if roles are the same
    IF user_role = member_role THEN
        IF user_role = 'contractor' THEN
            RAISE EXCEPTION 'Contractors cannot team with other contractors';
        ELSIF user_role = 'worker' THEN
            RAISE EXCEPTION 'Workers cannot team with other workers';
        ELSE
            RAISE EXCEPTION 'Users must have opposite roles to form a team';
        END IF;
    END IF;
    
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- ✅ NEW: Trigger on team_members table
CREATE TRIGGER enforce_opposite_roles_trigger
    BEFORE INSERT OR UPDATE ON team_members
    FOR EACH ROW
    EXECUTE FUNCTION check_opposite_roles();
```

## 🧹 Cleanup Script

**File**: `backend/services/matching-service/migrations/cleanup_invalid_teams.sql`

### Step 1: Identify Invalid Relationships
```sql
-- Find all same-role team members
SELECT 
    tm.id,
    u1.name as user_name,
    u1.role as user_role,
    u2.name as team_member_name,
    u2.role as team_member_role
FROM team_members tm
JOIN users u1 ON tm.user_id = u1.id
JOIN users u2 ON tm.team_member_id = u2.id
WHERE u1.role = u2.role;
```

### Step 2: Remove Invalid Relationships
```sql
-- Delete invalid team_members records
DELETE FROM team_members tm
USING users u1, users u2
WHERE tm.user_id = u1.id 
  AND tm.team_member_id = u2.id
  AND u1.role = u2.role;
```

### Step 3: Cancel Invalid Pending Requests
```sql
-- Cancel pending team requests between same roles
UPDATE team_requests tr
SET status = 'cancelled', updated_at = CURRENT_TIMESTAMP
FROM users u1, users u2
WHERE tr.sender_id = u1.id 
  AND tr.receiver_id = u2.id
  AND u1.role = u2.role
  AND tr.status = 'pending';
```

## 🧪 Testing

**File**: `test-same-role-team-bug.js`

### Test Cases
1. ✅ **Test 1**: Contractor tries to send request to contractor (should be blocked)
2. ✅ **Test 2**: Contractor sends request to worker (should succeed)
3. ✅ **Test 3**: Accepting invalid request (should be blocked)
4. ✅ **Test 4**: Check for existing invalid teams in database

### How to Run Tests
```bash
# Update tokens in test-same-role-team-bug.js first
node test-same-role-team-bug.js
```

## 📋 Deployment Checklist

### Backend Changes
- [x] Add role validation in `sendTeamRequest()`
- [x] Add role validation in `updateTeamRequest()` (accept)
- [x] Build matching service successfully: `npm run build`
- [ ] Deploy to Railway
- [ ] Run database migrations
  - [ ] Apply `add_opposite_roles_constraint.sql`
  - [ ] Run `cleanup_invalid_teams.sql` to remove existing invalid data
- [ ] Test on production

### Database Cleanup
```bash
# 1. Check for invalid relationships
psql $DATABASE_URL -f backend/services/matching-service/migrations/cleanup_invalid_teams.sql

# 2. Review the results (don't run DELETE yet)

# 3. If you see invalid relationships like Ram-Manoj:
#    - Uncomment the DELETE statement in cleanup_invalid_teams.sql
#    - Run again to clean up

# 4. Apply the database constraint
psql $DATABASE_URL -f backend/services/matching-service/migrations/add_opposite_roles_constraint.sql
```

## 📊 Expected Behavior After Fix

### ✅ Valid Scenarios (Allowed)
| Sender Role | Receiver Role | Result |
|-------------|---------------|--------|
| Contractor  | Worker        | ✅ Team request created |
| Worker      | Contractor    | ✅ Team request created |

### ❌ Invalid Scenarios (Blocked)
| Sender Role | Receiver Role | Error Message |
|-------------|---------------|---------------|
| Contractor  | Contractor    | ❌ "Contractors can only send team requests to workers, not other contractors" |
| Worker      | Worker        | ❌ "Workers can only send team requests to contractors, not other workers" |

## 🔍 Verification Steps

### 1. Check Your Database Now
```sql
-- Run this to see if Ram-Manoj invalid relationship exists
SELECT 
    tm.id as team_record_id,
    u1.name as user_name,
    u1.email as user_email,
    u1.role as user_role,
    u2.name as team_member_name,
    u2.email as team_member_email,
    u2.role as team_member_role
FROM team_members tm
JOIN users u1 ON tm.user_id = u1.id
JOIN users u2 ON tm.team_member_id = u2.id
WHERE (u1.email = 'ramp@info.com' AND u2.name = 'Manoj')
   OR (u2.email = 'ramp@info.com' AND u1.name = 'Manoj');
```

### 2. Test Team Request Creation
```bash
# As Ram (contractor), try to send request to Manoj (contractor)
curl -X POST https://matching-service-production.up.railway.app/api/matching/send-team-request \
  -H "Authorization: Bearer RAM_TOKEN" \
  -H "Content-Type: application/json" \
  -d '{"receiverId": "MANOJ_USER_ID", "message": "Test"}'

# Expected: 400 error with message about contractors only teaming with workers
```

### 3. Verify Frontend Display
- Log in as Ram (contractor)
- Check "My Team" page
- Should only show workers, no contractors

## 🎯 Impact Assessment

### Before Fix
- ❌ Contractors could see other contractors in their team
- ❌ Workers could see other workers in their team
- ❌ Platform design violated (contractor-worker pairing broken)
- ❌ Potential for incorrect job matching
- ❌ User confusion

### After Fix
- ✅ Contractors can only team with workers
- ✅ Workers can only team with contractors
- ✅ Platform design enforced at 3 layers:
  1. Application logic (sendTeamRequest)
  2. Application logic (updateTeamRequest)
  3. Database constraint (trigger)
- ✅ Clear error messages for users
- ✅ Existing invalid data can be cleaned up

## 📈 Performance Impact
- **Minimal**: Added 2 extra SELECT queries per team request (role checks)
- **Offset by**: Prevention of invalid data reduces query complexity later
- **Database trigger**: Only fires on INSERT/UPDATE to team_members (rare operation)

## 🔐 Security Considerations
- ✅ Prevents unauthorized role-based relationships
- ✅ Three-layer validation (defense in depth)
- ✅ Transaction rollback on validation failure
- ✅ Clear audit trail in database

## 📝 Related Files Modified
1. ✅ `backend/services/matching-service/src/controllers/MatchingController.ts`
2. ✅ `backend/services/matching-service/migrations/add_opposite_roles_constraint.sql`
3. ✅ `backend/services/matching-service/migrations/cleanup_invalid_teams.sql`
4. ✅ `test-same-role-team-bug.js`

## ✅ Summary
**Bug**: Contractors could team with contractors (Ram and Manoj case)  
**Root Cause**: Missing role validation in team request creation and acceptance  
**Fix**: Three-layer validation (2 application + 1 database)  
**Status**: Code fixed ✅, awaiting deployment and database cleanup  
**Next Steps**: Deploy to Railway, run migrations, test in production
