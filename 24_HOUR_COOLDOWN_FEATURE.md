# 24-Hour Contractor Submission Cooldown Feature

## ✅ Implementation Complete

This feature prevents contractors from spamming worker requirement submissions by enforcing a **24-hour cooldown period** between submissions.

---

## 🎯 Feature Overview

### What It Does:
- **Contractors** can only submit worker requirements **once every 24 hours**
- Beautiful **countdown timer** shows time remaining until next submission
- Submit button is **disabled during cooldown**
- Backend **validates** submissions and rejects requests during cooldown period
- Clear **user feedback** with success/error messages

### User Experience:
1. Contractor visits Status page
2. If no recent submission → Can submit immediately
3. After submission → Success message + 24-hour countdown starts
4. Submit button disabled with "Cooldown Active" text
5. Live timer shows hours, minutes, seconds remaining
6. After 24 hours → Button re-enables automatically

---

## 🔧 Technical Implementation

### Backend Changes

#### 1. Database Schema (`add-cooldown-column.sql`)
```sql
ALTER TABLE contractor_requirements 
ADD COLUMN IF NOT EXISTS last_submitted_at TIMESTAMP DEFAULT NOW();
```

**To apply this migration:**
```bash
# Connect to your Neon PostgreSQL database
psql "postgresql://your-connection-string"

# Run the migration
\i add-cooldown-column.sql
```

#### 2. Model Updates (`ContractorRequirement.ts`)

**New interface field:**
```typescript
export interface ContractorRequirement {
    // ... existing fields
    lastSubmittedAt?: Date;
}
```

**New functions:**
- `getLatestContractorRequirement(pool, contractorId)` - Get most recent submission
- `canContractorSubmit(pool, contractorId)` - Check if 24 hours have passed

**Logic:**
```typescript
const hoursSinceLastSubmit = (now - lastSubmittedAt) / (1000 * 60 * 60);
if (hoursSinceLastSubmit >= 24) {
    return { canSubmit: true };
}
```

#### 3. Controller Validation (`ContractorRequirementController.ts`)

**Before submission:**
```typescript
const submitCheck = await canContractorSubmit(pool, contractorId);
if (!submitCheck.canSubmit) {
    res.status(429).json({ 
        message: 'You can only submit once every 24 hours',
        nextSubmitAt: submitCheck.nextSubmitAt,
        hoursRemaining: submitCheck.hoursRemaining
    });
    return;
}
```

**New endpoint:**
```
GET /api/matching/contractor-requirements/can-submit
```
Returns:
```json
{
    "success": true,
    "canSubmit": false,
    "nextSubmitAt": "2025-10-20T03:30:00.000Z",
    "hoursRemaining": 18
}
```

#### 4. Route (`matchingRoutes.ts`)
```typescript
router.get('/api/matching/contractor-requirements/can-submit',
    authenticateToken,
    requireRole(['contractor']),
    (req, res) => contractorRequirementController.checkCanSubmit(req, res)
);
```

---

### Frontend Changes

#### StatusPage.tsx Updates

**New state:**
```typescript
const [canSubmit, setCanSubmit] = useState(true);
const [nextSubmitTime, setNextSubmitTime] = useState<Date | null>(null);
const [cooldownRemaining, setCooldownRemaining] = useState('');
```

**Fetch submission status on load:**
```typescript
useEffect(() => {
    const fetchSubmissionStatus = async () => {
        const res = await axios.get(
            `${API_CONFIG.MATCHING_SERVICE}/api/matching/contractor-requirements/can-submit`,
            { headers: { Authorization: `Bearer ${token}` } }
        );
        setCanSubmit(res.data.canSubmit);
        if (res.data.nextSubmitAt) {
            setNextSubmitTime(new Date(res.data.nextSubmitAt));
        }
    };
    fetchSubmissionStatus();
}, [token, profileData?.user?.role]);
```

**Live countdown timer:**
```typescript
useEffect(() => {
    if (!canSubmit && nextSubmitTime) {
        const interval = setInterval(() => {
            const difference = nextSubmitTime.getTime() - new Date().getTime();
            if (difference > 0) {
                const hours = Math.floor(difference / (1000 * 60 * 60));
                const minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
                const seconds = Math.floor((difference % (1000 * 60)) / 1000);
                setCooldownRemaining(`${hours}h ${minutes}m ${seconds}s`);
            } else {
                setCanSubmit(true); // Re-enable after cooldown
                setCooldownRemaining('');
            }
        }, 1000);
        return () => clearInterval(interval);
    }
}, [canSubmit, nextSubmitTime]);
```

**UI Components:**

1. **Cooldown Timer Card** (shown when cooldown active):
```tsx
<div style={{
    background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
    padding: '1.5rem',
    borderRadius: '12px',
    color: 'white'
}}>
    <div style={{ fontSize: '32px' }}>⏰</div>
    <h3>Next Submission Available In:</h3>
    <div style={{ fontSize: '28px', fontWeight: 'bold', fontFamily: 'monospace' }}>
        {cooldownRemaining}
    </div>
</div>
```

2. **Submit Button** (disabled during cooldown):
```tsx
<button
    disabled={!canSubmit || isSubmitting}
    style={{ 
        background: canSubmit ? '#2196F3' : '#ccc',
        cursor: canSubmit ? 'pointer' : 'not-allowed',
        opacity: canSubmit ? 1 : 0.6
    }}
>
    {isSubmitting ? 'Submitting...' : canSubmit ? 'Submit Requirement' : 'Cooldown Active'}
</button>
```

3. **Input Field** (disabled during cooldown):
```tsx
<input
    type="number"
    disabled={!canSubmit}
    // ... other props
/>
```

---

## 📋 Deployment Checklist

### ✅ Completed Steps:

1. **Backend Updated:**
   - ✅ Modified `ContractorRequirement.ts` model
   - ✅ Updated `ContractorRequirementController.ts` with validation
   - ✅ Added new route `/can-submit`
   - ✅ Built matching service: `npm run build`
   - ✅ Deployed to Railway: `railway up`

2. **Frontend Updated:**
   - ✅ Modified `StatusPage.tsx` with countdown timer
   - ✅ Added cooldown check on mount
   - ✅ Implemented live countdown with `setInterval`
   - ✅ Styled cooldown card and disabled button
   - ✅ Built frontend: `npm run build`
   - ✅ Deployed to Firebase: `firebase deploy --only hosting`

### 🔄 Remaining Step:

**Database Migration** (Run this manually):

```bash
# Method 1: Using psql command line
psql "postgresql://your-neon-connection-string" < add-cooldown-column.sql

# Method 2: Using Neon Console
# 1. Go to https://console.neon.tech
# 2. Select your project
# 3. Go to SQL Editor
# 4. Paste contents of add-cooldown-column.sql
# 5. Click "Run"
```

The migration SQL file is saved at:
```
/Users/shouryaveersingh/Desktop/old data/staff/add-cooldown-column.sql
```

---

## 🧪 Testing Instructions

### Test Case 1: First Submission (No Cooldown)
1. Login as contractor
2. Navigate to Status page
3. Enter number of workers (e.g., 5)
4. Click "Submit Requirement"
5. **Expected:** Success message + countdown timer appears
6. **Expected:** Submit button disabled with "Cooldown Active"

### Test Case 2: Cooldown Period
1. After submitting, refresh the page
2. **Expected:** Countdown timer still visible
3. **Expected:** Submit button disabled
4. **Expected:** Timer counting down in real-time
5. Try to submit via API directly (will get HTTP 429 error)

### Test Case 3: After 24 Hours
1. Wait 24 hours (or manually update `last_submitted_at` in database for testing)
2. Refresh the page
3. **Expected:** Countdown timer disappears
4. **Expected:** Submit button enabled
5. **Expected:** Can submit successfully again

### Quick Test (Modify Cooldown Duration)

For testing purposes, you can temporarily change the cooldown from 24 hours to 2 minutes:

**In `ContractorRequirement.ts`:**
```typescript
// Change this line:
if (hoursSinceLastSubmit >= 24) {

// To this (for testing):
if (hoursSinceLastSubmit >= 0.033) { // 2 minutes
```

**Don't forget to revert after testing!**

---

## 🎨 UI Screenshots Description

### When Cooldown Active:
```
┌─────────────────────────────────────────┐
│         Status Management               │
│                                         │
│  ╭─────────────────────────────────╮   │
│  │         ⏰                       │   │
│  │  Next Submission Available In:  │   │
│  │      18h 45m 32s                │   │
│  │  You can submit once every 24h  │   │
│  ╰─────────────────────────────────╯   │
│                                         │
│  Number of workers required:            │
│  ┌─────────────────────┐                │
│  │         5           │ (disabled)     │
│  └─────────────────────┘                │
│                                         │
│  ┌─────────────────────────┐            │
│  │   Cooldown Active       │ (disabled) │
│  └─────────────────────────┘            │
└─────────────────────────────────────────┘
```

### When Can Submit:
```
┌─────────────────────────────────────────┐
│         Status Management               │
│                                         │
│  As a contractor, you can specify how   │
│  many workers you require.              │
│                                         │
│  Number of workers required:            │
│  ┌─────────────────────┐                │
│  │         5           │                │
│  └─────────────────────┘                │
│                                         │
│  ┌─────────────────────────┐            │
│  │  Submit Requirement     │ (enabled)  │
│  └─────────────────────────┘            │
└─────────────────────────────────────────┘
```

---

## 🔍 API Endpoints Reference

### POST `/api/matching/contractor-requirements`
Submit new worker requirement (with cooldown validation)

**Request:**
```json
{
    "requiredWorkers": 5,
    "skills": ["electrician", "plumber"],
    "location": "New York",
    "notes": "Urgent project"
}
```

**Success Response (201):**
```json
{
    "success": true,
    "data": {
        "id": 123,
        "contractor_id": "uuid",
        "required_workers": 5,
        "last_submitted_at": "2025-10-19T03:30:00.000Z"
    }
}
```

**Cooldown Error (429):**
```json
{
    "success": false,
    "message": "You can only submit once every 24 hours",
    "nextSubmitAt": "2025-10-20T03:30:00.000Z",
    "hoursRemaining": 18
}
```

### GET `/api/matching/contractor-requirements/can-submit`
Check if contractor can submit

**Success Response (200):**
```json
{
    "success": true,
    "canSubmit": false,
    "nextSubmitAt": "2025-10-20T03:30:00.000Z",
    "hoursRemaining": 18
}
```

---

## 🚀 Production URLs

- **Frontend:** https://comeondost.web.app
- **Matching Service:** https://matching-service-production.up.railway.app
- **Status Page:** https://comeondost.web.app/status

---

## 📝 Files Modified

### Backend:
1. `backend/services/matching-service/src/models/ContractorRequirement.ts`
2. `backend/services/matching-service/src/controllers/ContractorRequirementController.ts`
3. `backend/services/matching-service/src/routes/matchingRoutes.ts`

### Frontend:
1. `frontend/src/features/status/StatusPage.tsx`

### Database:
1. `add-cooldown-column.sql` (migration script)

---

## 💡 Future Enhancements

1. **Admin Override:** Allow admins to reset cooldowns
2. **Configurable Duration:** Make cooldown period configurable (12h, 24h, 48h)
3. **Email Notification:** Notify contractor when cooldown expires
4. **History View:** Show submission history with timestamps
5. **Premium Feature:** Reduce cooldown for premium contractors

---

## 🐛 Troubleshooting

### Issue: Timer not appearing
**Solution:** Run database migration to add `last_submitted_at` column

### Issue: Button always disabled
**Solution:** Check browser console for API errors, verify JWT token is valid

### Issue: Countdown shows negative time
**Solution:** Refresh the page - frontend will auto-enable after detecting expiry

### Issue: Can submit despite cooldown
**Solution:** Backend validation is primary - check Railway logs for errors

---

## ✅ Summary

✅ **Backend:** 24-hour cooldown validation implemented and deployed
✅ **Frontend:** Beautiful countdown timer UI deployed
✅ **Database:** Migration script created (needs manual execution)
✅ **Testing:** Ready for testing after database migration
✅ **UX:** Clear feedback with timer, disabled states, and messages

**Next Step:** Run the database migration using the `add-cooldown-column.sql` file!
