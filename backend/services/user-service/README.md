# User Service

Provides user profile, role-specific (worker / contractor) profile management, contacts CRUD, skills metadata, and completeness scoring.

## Key Features
- Hexagonal architecture (use cases + ports + adapters)
- Profile completeness metric with breakdown
- Contacts primary management (one primary per type)
- Separate worker vs contractor profile models
- Integration + unit tests (Jest, supertest, pg-mem for repository tests)
- OpenAPI spec (`docs/openapi/user-service.yaml`)

## Project Structure
```
src/
  controllers/            # Express controllers
  hexagon/
    application/
      use-cases/          # GetCompleteProfile, updates, contacts
      ports/              # Repository interfaces
    domain/               # Entities
    infrastructure/db/    # Pg repository implementations + pg-mem tests
  services/               # Legacy UserService (deprecated)
  routes/                 # Express route definitions
```

## Legacy Status
`UserService` is deprecated for profile & contact paths. Controllers now invoke hex use cases directly. Remaining legacy usage: skills list & password reset flows (to migrate next).

## Running
```bash
npm install
npm run dev
```
Service expects Postgres env vars (`DB_HOST`, `DB_USER`, etc.).

## Testing
```bash
npm test           # run all tests
npm run test:ci    # run with coverage & thresholds
```
Repository tests use `pg-mem` and require no external DB.

## CI
GitHub Actions workflow at `.github/workflows/ci.yml` runs tests and uploads coverage artifact.

## OpenAPI
See `docs/openapi/user-service.yaml`. Consider generating types via `openapi-typescript` in future.

## Adding a New Use Case
1. Define a port (if persistence shape changes).
2. Implement use case in `hexagon/application/use-cases`.
3. Wire in container (bootstrap).
4. Add controller route + test (unit + integration).

## Completeness Metric
Heuristic presence check of key fields + role specific attributes and contact presence. Returned under `meta`.

## Deprecation Plan
- Remove remaining legacy endpoints (forgot password, skills) after use case equivalents.
- Delete `UserService` and update docs/ADR once no references remain.

## Documentation
- Architecture: `docs/architecture/README.md`
- ADRs: `docs/architecture/ADR-001-hex-migration.md` (and forthcoming ADR-002 for fallback removal)

## Future Enhancements
- Cache layer for read-heavy endpoints
- Event emission on profile changes
- Strong validation (Zod/Joi) at controller boundary
- OpenAPI-driven contract tests

---
Generated on 2025-09-25
