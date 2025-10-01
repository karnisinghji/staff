# User Service Testing Guide

## Overview
This document outlines how to run and manually verify the user service profile & update flows after the hexagonal refactor.

## Automated Tests
1. Install dependencies:
   npm install
2. Run all tests:
   npm test
3. Watch mode:
   npm run test:watch
4. CI mode with coverage:
   npm run test:ci

## Manual End-to-End Checklist

Prereqs: Service running with a seeded user (JWT token for that user), or use DB inserts + token generator.

1. Fetch Profile
   - Request: GET /api/users/profile with Authorization: Bearer <token>
   - Expect: 200, success true, data.user.id matches token subject, meta.completeness present.

2. Update Base User Fields
   - Request: PUT /api/users/profile { "name":"New Name", "location":"City", "phone":"123" }
   - Expect: 200, updated fields echoed, meta.completeness refreshed (should increase if previously blank).

3. Update Worker Profile (if role=worker)
   - PUT /api/users/worker-profile { "skillType":"plumbing", "experienceYears":5 }
   - Expect: 200, profile.skill_type updated, completeness breakdown includes worker_experience.

4. Add Primary Contact
   - POST /api/users/contacts { "type":"email", "value":"user@example.com", "isPrimary":true }
   - Expect: 201, contact.is_primary true, completeness meta includes contacts.

5. Add Second Primary of Same Type
   - POST /api/users/contacts { "type":"email", "value":"alt@example.com", "isPrimary":true }
   - Expect: Only newest email is_primary true; previous is_primary false.

6. Update Contact to Primary
   - PUT /api/users/contacts/:id { "isPrimary":true }
   - Expect: All other contacts of same type now is_primary false.

7. Delete Contact
   - DELETE /api/users/contacts/:id
   - Expect: 200 and meta recomputed.

8. Contractor Path (if role=contractor)
   - PUT /api/users/contractor-profile { "companyName":"Acme", "companyDescription":"Desc" }
   - Expect: completeness breakdown contains contractor_company.

9. Public Profile Access
   - GET /api/users/:id (different user token)
   - Expect: Sensitive fields absent, contacts filtered per rules.

10. Error Handling
   - Update with empty body -> 400
   - Access profile without token -> 401

## Troubleshooting
| Issue | Possible Cause | Resolution |
|-------|----------------|-----------|
| 401 Unauthorized | Missing/invalid JWT | Ensure JWT_SECRET set and token not expired |
| Completeness not changing | Fields already counted | Clear or adjust test data; re-check breakdown array |
| Duplicate primary contacts | Update logic regression | Verify is_primary switching queries/logic |

## Future Improvements
- Add snapshot tests for response shape
- Add contract tests across gateway
- Introduce an in-memory Postgres (pg-mem) for repository-level tests

---
Maintained as part of hexagonal refactor initiative.
