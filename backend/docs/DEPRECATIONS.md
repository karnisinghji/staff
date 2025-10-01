# Deprecations

This file tracks components that have been deprecated in the modernized backend architecture.

## API Gateway (legacy)

- Path (legacy implementation): `legacy/contractor-worker-platform/backend/api-gateway/`
- Stub previously at: `backend/api-gateway/` (now slated for removal / archival)
- Reason: Each microservice now exposes its own Express app with standardized metrics & health. Cross-cutting concerns (rate limiting, CORS, security headers) are handled per service or will be delegated to infrastructure (ingress / API management) rather than a Node gateway layer.
- Replaced By: Direct service routing via deployment platform (e.g., Kubernetes Ingress / reverse proxy). Shared concerns consolidated through `shared` utilities (metrics, health, logging) to keep behavior uniform without a gateway hop.
- Migration Status: No modern service imports or depends on the gateway. Safe to remove.
- Action Items:
  1. Physically move `backend/api-gateway/` into `backend/legacy/api-gateway/` (if still present) or delete.
  2. Remove any obsolete CI references or docker-compose entries pointing to the gateway (found only under legacy compose files).
  3. Update deployment manifests to route externally via ingress directly to services.

## Future Candidates

- Legacy docker-compose environment under `legacy/contractor-worker-platform/` once remaining configuration deltas (if any) are documented.

---
Last updated: ${new Date().toISOString()}
