# Copilot Instructions for Contractor/Worker Platform

## Quick Reference - Common Issues

**WebSocket errors?** → WebSocket not implemented yet. Frontend disabled in `NotificationContext.tsx`.

**Matching service 400/500?** → Check required fields: `location` and `maxDistance` for searches, `receiverId` (UUID) for team requests.

**Auth issues?** → Verify JWT_SECRET consistency, check token expiry, ensure user role matches endpoint requirements.

**Need to debug?** → Run `node test-production-issues.js YOUR_TOKEN` for full diagnostic.

**Mobile location search?** → GPS/geolocation already supported. Auto-detects on page load, manual button available.

---

## Architecture Overview

This is a **microservices-based contractor/worker matching platform** with:
- **Backend**: 5 Node.js/TypeScript services in NPM workspace monorepo (`backend/services/*`)
  - auth-service (port 3001) - JWT authentication & refresh tokens
  - user-service (port 3002) - User profiles, contacts, skills
  - matching-service (port 3003) - Job matching & team requests
  - communication-service (port 3004) - Messaging & WebSocket
  - notification-service (port 3005) - Real-time notifications & WebSocket
- **Frontend**: React + TypeScript + Vite SPA (`frontend/`)
- **Database**: PostgreSQL (Neon) with shared connection via `DATABASE_URL`
- **Deployment**: Railway (backend services), Netlify (frontend)

## Critical Development Commands

```bash
# Start ALL backend services with colored output
cd backend && npm run dev
# Or filter: node scripts/dev-all.mjs --filter matching

# Start individual service
cd backend/services/auth-service && npm run dev

# Frontend
cd frontend && npm run dev

# TypeScript composite build (all services)
cd backend && npm run build:all

# Run tests
cd backend && npm test  # All services
cd backend/services/user-service && npm test  # Single service
```

**Important**: The `backend/scripts/dev-all.mjs` orchestrator automatically kills processes on ports 3001-3005 before spawning services. Each service uses nodemon/ts-node-dev for hot reload.

## Hexagonal Architecture in User Service

**User-service** uses Ports & Adapters pattern with temporary legacy fallback:

```
src/hexagon/
  domain/        - Entities (UserEntity, ContactEntity)
  application/
    use-cases/   - GetCompleteProfile, UpdateUser, Contacts CRUD
    ports/       - Repository interfaces
  infrastructure/
    db/          - PgUserRepository, PgContactRepository
  bootstrap/     - Dependency injection container
```

**Pattern**: Controllers invoke use cases via `getHexContainer()`. Tests use in-memory fakes (`FakeUserRepo`) and `pg-mem` for SQL validation. See `docs/architecture/ADR-001-hex-migration.md`.

**When adding new use case**:
1. Define port interface in `application/ports/`
2. Implement use case in `application/use-cases/`
3. Wire in `bootstrap/container.ts`
4. Add controller route
5. Write tests with fakes

## NPM Workspaces & Shared Library

**All dependencies are hoisted** to `backend/package.json` to prevent version drift. Services only declare unique deps in their own package.json.

**Shared library** (`backend/services/shared/src/`) exports:
- `logger` - Winston with request context & redaction
- `createHttpMetrics`, `metricsMiddleware` - Prometheus metrics
- `securityMiddleware` - Helmet + CSP headers
- `gracefulShutdown` - SIGTERM/SIGINT handler
- `healthCheckEndpoint`, `readinessEndpoint` - Standard `/health` format

Services import via: `import { logger, createHttpMetrics } from 'shared'`

## Service Conventions

**Port allocation**: 
- Auth: 3001, User: 3002, Matching: 3003, Communication: 3004, Notification: 3005
- Each service reads `PORT` env var with these defaults

**Standard endpoints**:
- `GET /health` - Returns `{ service, status, timestamp, uptimeSeconds, checks, version }` (see `backend/docs/HEALTH-METRICS.md`)
- `GET /metrics` - Prometheus exposition format

**Security**: All services use:
- Helmet with custom CSP (`Content-Security-Policy: default-src 'none'` for APIs)
- Morgan logging with credential redaction (passwords, tokens)
- Rate limiting via `express-rate-limit`
- CORS configured via `CORS_ORIGINS` or `ALLOWED_ORIGINS` env vars

## Frontend Architecture

**Config**: `frontend/src/config/api.ts` switches between dev (localhost) and production (Railway URLs) based on `import.meta.env.MODE`

**State Management**:
- `AuthContext` (`features/auth/AuthContext.tsx`) - JWT token & user state in localStorage, auto-logout on expiry
- `NotificationContext` - WebSocket notifications
- `ToastContext` - Custom toast system (not react-toastify), used via `useToast()` hook

**Routing**: React Router with `ProtectedRoute` wrapper requiring `token` from `useAuth()`

**Feature structure**: `src/features/[domain]/` (auth, profile, matching, messaging, etc.)

## Location & Mobile GPS Features

**Location Detection**: Integrated into search page with auto-detect on page load and manual "Use My Location" button.

**Supported Cities**: **100+ Indian cities only** (US/Canadian cities removed)
- Tier 1: Delhi, Mumbai, Bangalore, Chennai, Kolkata, Hyderabad, Pune
- Tier 2: Ahmedabad, Jaipur, Surat, Lucknow, Kanpur, Nagpur, Indore, etc.
- State capitals & major cities across India
- Alternative names supported (Bengaluru/Bangalore, Trivandrum/Thiruvananthapuram, etc.)
- Default fallback: **Jaipur** (if city not found)

**Capabilities**:
- Auto-detects user location on first visit (non-intrusive)
- Browser Geolocation API (`navigator.geolocation`) with configurable accuracy
- Reverse geocoding (coordinates → city name) via OpenStreetMap Nominatim
- Manual detection button with high-accuracy GPS
- Supports coordinate input and Indian city names (`"Delhi"`, `"Mumbai"`, `"Bangalore"`)
- Works on mobile devices using GPS/cell tower triangulation
- Smart caching (5 min auto, 1 min manual)
- Cell tower triangulation automatic fallback (when GPS unavailable)

**Backend Support**: `backend/services/matching-service/src/utils/location.ts`
- Accepts coordinate pairs or city names
- 100+ predefined Indian cities (Tier 1, Tier 2, state capitals)
- Alternative city names supported (Bengaluru/Bangalore, Trivandrum/Thiruvananthapuram, Gurugram/Gurgaon)
- Haversine distance calculation for radius searches
- Geocoding for major cities (fallback to Jaipur for unknown locations)
- **Note**: US and Canadian cities removed (Indian market only)

**Implementation**: `EnhancedMatchSearchPage.tsx`
- Auto-detect useEffect runs on mount
- Manual button for re-detection
- Graceful fallback to manual entry
- Toast notifications for status

## Environment Variables

**Backend** (`.env` at `backend/` root):
```bash
DATABASE_URL=postgresql://user:pass@host/db?sslmode=require
JWT_SECRET=your-secret-256bit
JWT_EXPIRES_IN=24h
CORS_ORIGINS=http://localhost:5173
LOG_LEVEL=info
```

**Frontend** (`.env` at `frontend/` root):
```bash
VITE_API_BASE_URL=http://localhost:3000  # Not currently used; see api.ts
VITE_ENV=development
```

**Production**: Each Railway service has `DATABASE_URL`, `JWT_SECRET`, `NODE_ENV=production`, `PORT=10000`

## Database Schema

Schema lives in `database-schema.sql` (root). Key tables:
- `users` - Base user with email, password_hash, role (admin/contractor/worker)
- `contractor_profiles` / `worker_profiles` - Role-specific attributes
- `contacts` - Phone/email with primary flags
- `user_skills` - Many-to-many with skills table
- `job_postings`, `job_applications`, `team_requests` - Matching domain

Seed data: `database-seed.sql`

## Testing Patterns

**User-service tests**:
- Use cases tested with in-memory fakes (no DB)
- Repository tests use `pg-mem` for SQL verification
- Integration tests use `__setHexContainerForTests()` to inject test doubles

**CI**: `.github/workflows/build-backend.yml` runs tests & builds for all services on push to `backend/**`

## Deployment Notes

**Railway**: Each service is deployed independently. Use `railway up --detach` from service directory or let GitHub webhook trigger deploys.

**Netlify**: Frontend auto-deploys from GitHub. Build config:
- Base directory: `frontend`
- Build command: `npm run build`
- Publish directory: `frontend/dist`

**CORS**: Production frontend (`https://karnisinghji.github.io`) must be in each service's `ALLOWED_ORIGINS`

## Known Patterns & Gotchas

- **JWT validation**: Auth-service signs tokens; other services validate via shared `JWT_SECRET` (no introspection endpoint yet)
- **Profile completeness**: User-service calculates `meta.completeness` percentage based on presence of profile fields + contacts
- **WebSocket**: Communication & notification services expose `/ws` endpoints (not fully implemented in all features)
- **Legacy code**: `backend/legacy/` contains old monolith; ignore unless migrating remaining features
- **TypeScript project references**: `backend/tsconfig.json` uses composite build with references to all services

## Common Tasks

**Add new backend service**:
1. Create `backend/services/new-service/` with own `tsconfig.json` (composite: true)
2. Add workspace to `backend/package.json` and tsconfig reference
3. Import shared lib: `"shared": "workspace:*"` in service package.json
4. Use standard port pattern, health/metrics endpoints

**Add new API endpoint**:
1. Define route in `src/routes/`
2. Create controller in `src/controllers/`
3. For user-service: implement use case in hexagon structure
4. Add integration test
5. Update OpenAPI spec if exists (`docs/openapi/*.yaml`)

**Debugging auth issues**:
- Check JWT_SECRET consistency across services
- Verify token expiry with `JWT_EXPIRES_IN` env var
- Frontend auto-logout triggers on expired tokens (see AuthContext useEffect)
- Test with `test-token-debug.js` in root

## Troubleshooting Common Production Issues

### WebSocket Connection Failures

**Symptom**: `WebSocket connection to 'wss://notification-service-production-8738.up.railway.app/ws' failed`

**Root Cause**: The notification service WebSocket endpoint is not fully implemented - it returns HTTP 426 (Upgrade Required) instead of upgrading the connection.

**Check**: `backend/services/notification-service/src/app.ts` has placeholder WebSocket route that doesn't actually upgrade connections.

**Fix**:
1. Frontend (`NotificationContext.tsx`) tries to connect on mount - temporarily disable or add error handling
2. Backend needs actual WebSocket server implementation using `ws` library
3. Alternative: Remove WebSocket initialization from frontend until backend ready

### Matching Service 400/500 Errors

**Symptom**: 
- `/api/matching/find-contractors` returns 400
- `/api/matching/send-team-request` returns 500

**Common Causes**:

1. **Missing required fields** - Check validation schemas in `backend/services/matching-service/src/routes/matchingRoutes.ts`:
   - `find-contractors` requires: `location` and `maxDistance`
   - `send-team-request` requires: `receiverId` (UUID), optional `message` and `matchContext`

2. **Frontend/Backend field mismatch**:
   - Frontend sends `recipient_id` but backend expects `receiverId`
   - Frontend sends to `/api/matching/team-requests` but backend route is `/api/matching/send-team-request`

3. **Database query failures** - Check Railway logs for SQL errors:
   ```bash
   railway logs -s matching-service
   ```

4. **Authentication issues** - Verify JWT token is valid and user role matches endpoint requirements:
   - `find-contractors` requires `worker` role
   - `find-workers` requires `contractor` role

**Debug Steps**:
1. Check browser Network tab for exact request payload
2. Verify `req.user` is populated (JWT decoded correctly)
3. Check Railway service logs for stack traces
4. Test locally with same payload: `cd backend/services/matching-service && npm run dev`

### Frontend API Request Patterns

**Correct patterns** from `frontend/src/features/matching/EnhancedMatchSearchPage.tsx`:

```typescript
// Search endpoint
const response = await fetch(`${API_CONFIG.MATCHING_SERVICE}/api/matching/find-contractors`, {
  method: 'POST',
  headers: {
    'Authorization': `Bearer ${token}`,
    'Content-Type': 'application/json',
  },
  body: JSON.stringify({
    skillType: 'electrician',
    location: 'New York',
    maxDistance: 50,
    limit: 12
  })
});

// Team request endpoint
const response = await fetch(`${API_CONFIG.MATCHING_SERVICE}/api/matching/send-team-request`, {
  method: 'POST',
  headers: {
    'Authorization': `Bearer ${token}`,
    'Content-Type': 'application/json',
  },
  body: JSON.stringify({
    receiverId: '123e4567-e89b-12d3-a456-426614174000', // Must be UUID
    message: 'Join my team',
    matchContext: { skill: 'electrician' }
  })
});
```

### Quick Production Health Check

```bash
# Check all services are responding
curl https://auth-service-production-d5c8.up.railway.app/health
curl https://user-service-production-f141.up.railway.app/health
curl https://matching-service-production.up.railway.app/health
curl https://communication-service-production-c165.up.railway.app/health
curl https://notification-service-production-8738.up.railway.app/health

# Check database connectivity (requires valid JWT)
curl -H "Authorization: Bearer YOUR_TOKEN" \
  https://user-service-production-f141.up.railway.app/api/users/me
```

## Documentation References

- `backend/README.md` - Monorepo dev guide
- `backend/WORKSPACES.md` - NPM workspaces rationale
- `backend/docs/HEALTH-METRICS.md` - Health endpoint contract
- `backend/services/user-service/docs/architecture/` - Hexagonal architecture ADRs
- `DATABASE_SETUP.md` - Neon PostgreSQL setup
- `RAILWAY_DEPLOYMENT_GUIDE.md` - Deployment instructions
