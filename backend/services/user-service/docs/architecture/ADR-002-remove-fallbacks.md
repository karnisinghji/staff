# ADR-002: Remove Legacy Fallbacks in UserController

## Status
Proposed (2025-09-25)

## Context
Initially, controllers attempted hex use cases and fell back to the legacy `UserService` to reduce migration risk. With:
- Unit coverage of all use cases
- Integration tests for read and mutation paths
- Repository tests validating SQL mappings via `pg-mem`
The fallback paths now add complexity and duplicate logic without clear remaining benefit.

## Decision
Eliminate all fallback branches for profile, worker/contractor profile updates, and contact CRUD. Controllers now depend solely on hex use cases. Legacy `UserService` retained temporarily only for skills list & password reset pending migration.

## Consequences
Positive:
- Simpler controller code & logging
- Single source of truth for profile aggregation & updates
- Encourages earlier discovery of issues (no silent fallback masking bugs)
Negative:
- Reduced safety net; incidents rely on test coverage & observability

## Mitigations
- Coverage thresholds enforced in Jest config
- OpenAPI spec added for contract clarity
- Future: Add error classification & metrics per use case

## Follow-Up
1. Migrate skills + forgot password to use cases (create simple metadata + auth/token ports).
2. Delete legacy `UserService` and update README + architecture docs.
3. Introduce error taxonomy (domain vs infra) for better 5xx vs 4xx distinction.

## Alternatives Considered
- Keep fallbacks until >90% coverage: Delays simplification, prolongs dual maintenance.
- Remove legacy entirely now: Slightly higher risk until remaining endpoints migrated.

## References
- ADR-001 (Hex Migration)
