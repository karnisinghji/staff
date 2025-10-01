# Project Phases — Contractor & Worker Matching Platform

This document captures the phased plan for the project. Each Phase is small, actionable, and includes acceptance criteria, an estimated effort, and next steps.

---

## Phase 1 — Automated tests (unit + integration) [IN-PROGRESS]

Goal
- Add automated tests to ensure correctness of the matching algorithm and the JWT-protected endpoints.

Acceptance criteria
- Unit tests for `src/utils/matching.ts` (happy path + 1-2 edge cases) exist and pass.
- Integration tests (using Jest + Supertest or similar) that:
  - Generate a test JWT for roles `contractor` and `worker`.
  - Call `/api/matching/find-workers` using a contractor token and assert HTTP 200 and expected response shape.
  - Call `/api/matching/find-contractors` using a worker token and assert HTTP 200 and expected response shape.
- `npm test` runs tests locally and in CI.

Estimated effort
- 1–2 days

Tasks
- Add `jest`, `ts-jest` (or use `vitest`) and `supertest` as devDependencies.
- Add `jest.config.js` / `vitest` config and `test` script in `package.json`.
- Implement unit tests for scoring utils in `tests/unit/matching.test.ts`.
- Implement integration tests in `tests/integration/matching.int.test.ts`.
- Add a small helper to generate JWTs using the service `JWT_SECRET` for test tokens.

Next steps to start
- I can implement tests now and run them locally. Confirm and I will proceed.

---

## Phase 2 — Matching algorithm improvements [NOT STARTED]

Goal
- Improve scoring, expose configurable weights, add paging & filtering, and handle edge cases.

Acceptance criteria
- Configurable weights (via environment or config file) for scoring components.
- Pagination (`page`, `limit`) supported for `find-workers` and `find-contractors` endpoints.
- Unit tests cover new logic and edge cases (e.g., missing profile fields, no geocode results).

Estimated effort
- 1–3 days

Tasks
- Refactor `src/utils/matching.ts` to accept a configurable weights object.
- Update controllers and services to accept pagination params and return `totalCount` and `page` metadata.
- Add unit tests and integration tests for pagination.

---

## Phase 3 — API Gateway hardening [NOT STARTED]

Goal
- Harden the API Gateway: forward auth, propagate tracing headers, add rate limiting and circuit-breaker.

Acceptance criteria
- Gateway forwards `Authorization` header and a correlation/tracing header to services.
- Rate limiting applied per IP/API key with a fallback response.
- Smoke tests validate trace propagation and auth forwarding.

Estimated effort
- 2–4 days

Tasks
- Implement forwarding of auth and `x-request-id` headers.
- Add rate limiter (e.g., `express-rate-limit`) with environment-configurable limits.
- Add retry/circuit breaker for upstream service failures (e.g., `opossum` or simple retry logic).

---

## Phase 4 — Deployment & CI [NOT STARTED]

Goal
- Prepare the services for reproducible deployment and CI.

Acceptance criteria
- `Dockerfile` per service and a `docker-compose.yml` to run Postgres + services locally.
- GitHub Actions CI that builds, lints, runs tests, and optionally publishes images.
- Local `make` or scripts to bring up the environment for dev.

Estimated effort
- 2–4 days

Tasks
- Add `Dockerfile` for `matching-service` and other services.
- Create `docker-compose.yml` with Postgres and all services (optional: a mock user service).
- Add `./.github/workflows/ci.yml` to run build + tests on PRs.

---

## Phase 5 — Monitoring, metrics & alerts [NOT STARTED]

Goal
- Add metrics (Prometheus), logging aggregation, health checks, and dashboards.

Acceptance criteria
- Service exposes Prometheus metrics endpoint (e.g., `/metrics`).
- Logs are structured and can be aggregated.
- A basic Grafana dashboard and alert rules are documented.

Estimated effort
- 2–3 days

Tasks
- Add `prom-client` instrumentation to services.
- Add structured logs and example `docker-compose` stack for Grafana+Prometheus+Alertmanager.

---

## Phase 6 — Frontend MVP [NOT STARTED]

Goal
- Build a small React frontend that allows contractors and workers to log in, search, view, and save matches.

Acceptance criteria
- Basic flows implemented (login with JWT, search matches, save match) and connected to API Gateway.

Estimated effort
- 3–7 days

Tasks
- Seed a minimal React app (Vite or CRA) with login and search pages.
- Implement local storage of JWT and API calls to the gateway.

---

## Phase 7 — Security & scale readiness [NOT STARTED]

Goal
- Complete security hardening and scale preparations.

Acceptance criteria
- JWT secret rotation/docs, secret management notes (Vault or environment), DB indexes and connection tuning, and runbook for scaling.

Estimated effort
- 2–5 days

Tasks
- Document secret rotation strategy, add DB indexes for query performance, and recommend connection pool settings.

---

## Phase 8 — Docs & handoff [NOT STARTED]

Goal
- Deliver developer and operator documentation for handoff.

Acceptance criteria
- README includes local dev, tests, deploy steps, and API examples (OpenAPI/Swagger).

Estimated effort
- 1–2 days

Tasks
- Create `README.md` / `docs/` with instructions, add OpenAPI spec for key endpoints, and include runbook.

---

# How to use this file
- This file is the single source of truth for project phases. Use it to track progress and acceptance.
- When we finish a Phase, update the todo list and this file.


# Contact / Ownership
- Owner: Platform Team (repo contributors)
- For each Phase we can assign specific owners and due dates as needed.
