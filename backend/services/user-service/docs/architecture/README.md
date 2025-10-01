## Security Hardening Additions

The user-service now includes a baseline security middleware layer:

- Helmet (with custom CSP supplied manually to avoid over-restriction for an API).
- Custom headers: 
	- `X-Content-Type-Options: nosniff`
	- `Referrer-Policy: no-referrer`
	- `X-Frame-Options: DENY`
	- `Permissions-Policy: geolocation=()` (minimal; expand as features grow)
	- `Content-Security-Policy: default-src 'none'; frame-ancestors 'none'; base-uri 'none'` (API-only stance)
	- Optional HSTS (`Strict-Transport-Security`) when `ENABLE_HSTS=true` in env (disabled by default for local HTTP).

### Logging Redaction

Morgan stream now performs simple pattern-based redaction of potential credential / token material (e.g. `authorization=...`, `token=...`, JSON `password` fields). This is intentionally lightweight; migrating to structured logging with explicit field filtering is a recommended future enhancement.

### Future Security Backlog
## Performance Baseline

An initial performance harness (autocannon) lives under `perf/`. The baseline script exercises:
- `/api/health`
- `/metrics`
- `/api/skills`

Outputs a JSON summary (latency p95, average RPS, errors, timeouts). Future work will promote these baselines into CI with deviation alerts and add k6 soak tests.


- Add JWT audience / issuer validation centralization.
- Enforce rate limit abstraction (Redis) across additional mutation endpoints.
- Implement dependency vulnerability scanning in CI.
- Add input size limits per route (some global limit already present via `express.json({ limit: '10mb' })`).
- Provide a security.md describing threat model & mitigation layers.

# User Service Architecture

This document provides an overview of the User Service architecture after the incremental migration to a Hexagonal (Ports & Adapters) style while retaining a temporary legacy service layer for fallback.

## C4 Model (Textual Summary)

### Level 1: System Context
The Contractor/Worker Platform consists of multiple backend services (user, matching, notification, communication, API gateway) and a React frontend. The User Service is responsible for user identity, profile (worker/contractor), contacts, and skill metadata.

Primary external actors:
- End User (Worker / Contractor) – interacts through the Web Frontend.
- Other Services – read user/profile data via internal gateway in future (planned service-to-service API sharing or events).

### Level 2: Containers
- Web Frontend (React) – consumes `/api/users/*` endpoints via API Gateway.
- API Gateway – routes authenticated requests to User Service.
- User Service (this project) – exposes REST endpoints for profile CRUD and metadata.
- PostgreSQL – persistence for users, profiles, contacts.

### Level 3: Components (Within User Service)
- Controllers (Express) – HTTP layer, request validation and translation.
- Hexagon Application Layer – Use Cases implementing domain orchestration (GetCompleteProfile, UpdateUser, UpdateWorkerProfile, UpdateContractorProfile, Contacts CRUD). 
- Ports (Repository Interfaces) – `UserRepositoryPort`, `ProfileRepositoryPort`, `ContactRepositoryPort` define persistence contracts.
- Infrastructure Adapters – `PgUserRepository`, `PgProfileRepository`, `PgContactRepository` implement ports using SQL via `pg` Pool.
- Domain – `UserEntity` encapsulates core user invariants (currently thin but extension point for future rules).
// Legacy Service removed – `UserService` has been fully decommissioned after migration of skills listing and password reset flows to hexagonal use cases.
- Cross-Cutting – Auth middleware, logging (`winston`), metrics (Prometheus), environment loader (shared planned), completeness metric logic in use case.

### Level 4: Code / Key Flows
1. Profile Retrieval: Controller -> GetCompleteProfileUseCase -> (UserRepo + ProfileRepo + ContactRepo) -> Aggregated DTO -> Controller response.
2. Profile Mutation: Controller -> Update* UseCase -> Repo update -> (Optional) GetCompleteProfileUseCase for refreshed completeness meta.
3. Contacts CRUD: Controller -> Contact UseCase -> ContactRepo -> Return updated contact list/meta.

## Hexagonal Migration Strategy
1. Introduce parallel hex structure (domain, ports, use-cases, adapters) without touching existing controllers.
2. Implement read path (GetCompleteProfile) and wire controller to attempt hex first, fallback to legacy.
3. Migrate write paths (user, worker profile, contractor profile, contacts) similarly with fallback.
4. Add comprehensive unit tests (fakes) at use case level + targeted integration test hitting controller -> use case path.
5. Add completeness meta recalculation post-mutation to maintain consistent UX.
6. After sustained stability (and expanded integration coverage) remove fallback blocks and deprecate legacy file.

## Completeness Metric
Heuristic counts present vs. total required profile fields (role-specific) + presence of at least one primary contact. Output includes percentage and breakdown array of `{ field, present }` for UI highlighting.

## Decisions & Rationale
See ADRs in this directory for detailed justifications.

## Operational Concerns
- Observability: Add request + use case success/failure logging; metrics surface request counts and latencies (future extension to per-use-case counters).
- Testing Pyramid: Domain/use case unit tests (fast), integration tests for contract, optional repository tests via `pg-mem` to validate SQL, manual E2E smoke until broader automation.
- Backward Compatibility: Response DTOs retain legacy shape to avoid frontend churn; completeness breakdown normalized to expected array form.

## Future Enhancements
- Event emission on profile changes for downstream services.
- Replace completeness heuristic with weighted scoring or rule engine.
- (Done) Input validation using Zod at controller boundary.
// Legacy `UserService` removal complete: skills listing and password reset now provided by `ListSkillsUseCase` and `GeneratePasswordResetUseCase`.
### New Use Cases Added (Post-Migration)

| Use Case | Port Dependencies | Responsibility | Notes |
|----------|-------------------|----------------|-------|
| `ListSkillsUseCase` | `SkillRepositoryPort` | Return curated / repository-sourced list of available skill categories | Current PG adapter returns distinct `skill_type` values if table present; in-memory & test fakes return static lists. |
| `GeneratePasswordResetUseCase` | `PasswordResetRepositoryPort` | Validate email -> user lookup and issue a time-bound reset token | In-memory adapter issues pseudo-random token + 1h expiry; can later be swapped for persistent store + email send side-effect. |

#### Ports
```ts
interface SkillRepositoryPort { listSkillTypes(): Promise<string[]> }
interface PasswordResetRepositoryPort {
	findUserByEmail(email: string): Promise<{ id: string, email: string } | null>;
	generateToken(userId: string): Promise<{ token: string, expiresAt: Date }>; 
}
```

#### Adapters
- `PgSkillRepository`: Queries `worker_profiles` (or fallback distinct enumeration) to build de-duplicated sorted list.
- `InMemoryPasswordResetRepository`: Simple map-based token issuance; logs may be added for auditing. Replace with persistent implementation + email gateway adapter in future.

#### Controller Impact
- Removed all references to legacy `UserService`; controller now resolves `hex` container only.
- Added endpoints: `GET /api/users/skills`, `POST /api/auth/forgot-password` (the latter returns token inline until email infra is integrated).

#### OpenAPI / Documentation
- Added schemas: `PasswordResetRequest`, `PasswordResetResponse`.
- Added path `/api/auth/forgot-password` with 200/400/404/429/500 responses.

#### Future Enhancements
- Add rate limiting & audit logging for password reset requests.
- Persist password reset tokens (e.g., Redis / Postgres) with single-use semantics.
- Introduce email delivery adapter implementing a new `NotificationPort`.

### Password Reset Token Persistence (Implemented)
We introduced a dedicated `PasswordResetTokenRepositoryPort` to persist single-use, expiring tokens.

Flow:
1. User submits email to `/api/auth/forgot-password`.
2. `GeneratePasswordResetUseCase` looks up user (via legacy `PasswordResetRepositoryPort` – to be narrowed to a `UserLookupPort` later).
3. Generates cryptographically strong 32-byte hex token, sets 1h expiry.
4. Persists record to `password_reset_tokens` (or in-memory test adapter).
5. Returns token (temporary until email delivery is added).

Reference DDL:
```sql
CREATE TABLE password_reset_tokens (
	id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
	user_id uuid NOT NULL REFERENCES users(id) ON DELETE CASCADE,
	token text UNIQUE NOT NULL,
	expires_at timestamptz NOT NULL,
	consumed_at timestamptz NULL,
	created_at timestamptz NOT NULL DEFAULT now()
);
CREATE INDEX idx_prt_user_active ON password_reset_tokens(user_id) WHERE consumed_at IS NULL AND expires_at > now();
```

Planned next steps: add consumption use case (validate + mark consumed), integrate notification adapter, enforce rate limiting.

### Rate Limiting (Forgot Password Endpoint)
Implemented an in-memory rate limiter (5 requests/min per IP+email) to mitigate brute force enumeration and abuse. Middleware: `forgotPasswordRateLimit()` – easily swappable with a Redis-backed adapter later. Returns HTTP 429 with `{ code: 'RATE_LIMITED' }`. For horizontal scaling, replace with a shared store and jittered exponential backoff guidance in client messaging.

- (Done) OpenAPI spec + contract baseline; expand with contract tests (pending).

## Validation Layer
All mutating endpoints employ Zod schemas (`src/validation/schemas.ts`) enforced via a lightweight middleware (`validateBody`). Schemas intentionally use optional properties with a refinement to ensure at least one field is supplied for partial updates. Benefits:
- Centralized constraints surfaced in OpenAPI (min/max lengths, numeric bounds)
- Early rejection (400) with a structured error body (`VALIDATION_ERROR`)
- Simplifies controller logic—no manual empty-field checks

Guidelines:
- Prefer extending schemas rather than ad‑hoc conditionals in controllers.
- When adding new fields, update both schema and OpenAPI spec in the same PR.
- Consider future extraction to a shared package if reused across services.

## Error Taxonomy
Domain and infrastructure layers raise typed errors defined in `src/hexagon/domain/errors/DomainErrors.ts`:
- `NotFoundError` (404 / code: NOT_FOUND)
- `ValidationError` (400 / code: VALIDATION_ERROR)
- `ConflictError` (409 / code: CONFLICT)
- `UnauthorizedError` (401 / code: UNAUTHORIZED)
- `ForbiddenError` (403 / code: FORBIDDEN)

The global error handler (`index.ts`) maps these to a normalized payload:
```json
{ "success": false, "code": "<ERROR_CODE>", "message": "<human readable>", "details": { ...optional } }
```
Non-domain errors fall back to `INTERNAL_ERROR` (500). Repositories now emit `NotFoundError` instead of generic `Error`, reducing duplication in controllers.

Extension Rules:
- Introduce a new error class only when a distinct HTTP semantics or frontend handling path is required.
- Attach machine-friendly identifiers to `details` (e.g., `{ field: "name" }`) for granular UI messages.

## Updated Sequence (Request Lifecycle)
1. Express route receives request.
2. Auth middleware (if secured) attaches `req.user` or rejects (401/403).
3. Validation middleware parses & coerces body; on failure -> `ValidationError` JSON.
4. Controller delegates to use case (thin orchestration).
5. Use case invokes repositories; repositories may throw typed domain errors.
6. Controller returns success DTO (optionally fetching refreshed completeness meta) OR propagates error.
7. Global error handler serializes any uncaught domain/other errors.

## Testing Additions
- Validation is implicitly covered via existing integration tests; future enhancement: add negative tests asserting 400 with `VALIDATION_ERROR` for invalid payloads.
- Repository tests assert error throwing paths could be extended (e.g., update non-existent contact -> 404).

## OpenAPI Alignment
The spec (`docs/openapi/user-service.yaml`) now includes `ErrorResponse` schema and per-endpoint error responses (400/401/403/404/409/500). Keep spec changes atomic with code modifications.

---
Generated on: 2025-09-25

## API Versioning & Deprecation Strategy

### Versioning Approach
For this service we will adopt **URI-based versioning** (`/v1/...`) once a breaking change is introduced. Until then, current routes are considered part of an implicit `v1`.

Rationale:
- Clear, cache-friendly separation; no ambiguity for intermediaries.
- Simplifies rollback (old version can coexist while new version deployed).
- Avoids header negotiation complexities (clients—especially frontend—simpler to configure).

Alternative (header `Accept: application/vnd.user-service.v1+json`) rejected for early phase due to added client complexity and limited benefit while service surface is small.

### What Constitutes a Breaking Change
- Removing or renaming a field in a response.
- Changing semantic meaning or type of an existing field.
- Tightening validation beyond backward-compatible additive constraints (e.g., reducing max length below previously accepted inputs).
- Removing an endpoint or altering HTTP method/URL.

Non-breaking / Patch-Level:
- Adding optional response fields.
- Adding new endpoints.
- Broadening validation (e.g., allowing more characters previously rejected).

### Lifecycle
1. Mark endpoint/field as deprecated (announce in changelog + `Deprecation` header + README section).
2. Maintain for a minimum of 2 minor releases (or agreed period, e.g., 90 days) before removal.
3. Provide migration guidance referencing new endpoint/field alternatives.
4. Remove only after monitoring shows <5% traffic to deprecated path for 2 consecutive weeks.

### HTTP Headers
When deprecating:
- `Deprecation: true`
- `Link: <https://repo/docs/migration-guide>; rel="deprecation"`
- Optional: `Sunset: <RFC 1123 date>` to signal planned removal.

### Changelog Conventions
Use categories per release:
- Added, Changed, Deprecated, Removed, Fixed, Security.
Breaking changes must be prefixed with `BREAKING:` and include migration notes.

### Semantic Versioning Alignment
Service follows semver for NPM package tag or image label (if containerized). Breaking API changes -> major version bump. Internal refactors without surface impact -> patch/minor depending on feature presence.

### Example Future Transition
- Introduce `/v2/users/:id` with refined profile structure.
- Keep `/v1/users/:id` active; responses include `Deprecation` header.
- After migration window & traffic drop: remove v1 route handlers; update OpenAPI to drop schemas, archive prior spec under `docs/openapi/legacy/`.

### Tooling & Validation
- OpenAPI must carry `info.version` matching service semver minor/major alignment.
- Contract tests should pin versioned paths (`/v1/...`).
- CI to fail if `info.version` regresses or if removing endpoints without marking them deprecated in prior release branch.

### Pending Tasks
- Add automated header injection middleware for deprecated endpoints.
- Add changelog tooling (e.g., conventional commits + release notes generator).

## Metrics & Alerts

### Exposed Custom Metrics
| Metric | Type | Labels | Purpose |
|--------|------|--------|---------|
| `user_service_password_reset_requests_total` | Counter | `outcome` (success, not_found, rate_limited, error) | Track password reset flow health & abuse patterns |
| `user_service_skills_list_requests_total` | Counter | (none) | Monitor demand for skills metadata |
| `user_service_http_request_duration_seconds` | Histogram | `method`, `route`, `status` | Latency SLO tracking (p95/p99) |

### Alerting (Initial Suggestions)
- High Rate Limit Hits: `rate_limited / (success + not_found + error) > 0.3` over 5m.
- Error Spike: `sum by (outcome)(password_reset_requests_total{outcome="error"})` increase > threshold relative to success.
- Latency Degradation: p95 of `user_service_http_request_duration_seconds` for `/api/skills` > 250ms for 10m.

### SLO Draft
- Availability (password reset endpoint): <1% error results (outcome=error) monthly.
- Latency: 95% of skills list requests under 150ms, 99% under 500ms.

### Future Enhancements
- Add gauge for active password reset tokens.
- Add counter for consumed vs. generated reset tokens when consumption use case added.
- Per-use-case success/error counters if domain grows further.
- Export OpenMetrics format once multi-process clustering is introduced.



## CI Pipeline (Planned / Partial)

The `package.json` defines `ci:verify` which chains:

1. `typecheck` – TypeScript compile with `--noEmit`.
2. `lint` – ESLint (placeholder rules; expand security/performance rules later).
3. `test:ci` – Jest (serial in CI) collecting coverage.
4. `coverage:check` – Enforces ≥70% global thresholds (branches, funcs, lines, statements).
5. `openapi:validate` – Placeholder script ensuring spec presence (upgrade to full semantic validation with `@redocly/openapi-core`).

Recommended CI Workflow Steps:
```yaml
jobs:
	user-service-ci:
		runs-on: ubuntu-latest
		steps:
			- uses: actions/checkout@v4
			- uses: actions/setup-node@v4
				with:
					node-version: 20
					cache: npm
					cache-dependency-path: backend/services/user-service/package.json
			- name: Install deps
				run: npm ci
				working-directory: backend/services/user-service
			- name: Verify
				run: npm run ci:verify
				working-directory: backend/services/user-service
```

Planned Enhancements:
- Add vulnerability scan (`npm audit --production` or `osv-scanner`).
- Add license compliance check.
- Cache Jest results via `--cache` dir persisted between runs.
- Introduce short performance smoke (autocannon 5s) gated behind main branch merges.
- Add mutation testing (e.g., Stryker) as an optional nightly job.

