# API Gateway Deprecation Notice

The previous Node-based API Gateway has been deprecated and removed from the active code path.

## Why It Was Deprecated

- Added latency and operational surface area without providing unique business logic.
- Duplicated concerns (rate limiting, logging, metrics) now standardized within each microservice.
- Modern ingress and service mesh / reverse proxy layers (e.g., NGINX, Traefik, Envoy, API Gateway services) provide more robust routing, TLS, and resilience.

## Replacement Strategy

| Concern | New Approach |
|---------|--------------|
| Routing / aggregation | Direct ingress routes per service |
| Metrics | Per-service Prometheus metrics via shared module |
| Health | Standard `/health` endpoint in each service |
| Security headers | Applied per service via middleware (helmet) |
| Rate limiting | Implemented directly where required (auth endpoints) or via ingress rate limits |

## Removal Steps

1. Archive or delete `backend/api-gateway/` (stale stub).
2. Keep legacy implementation (if needed) in `backend/legacy/contractor-worker-platform/backend/api-gateway/` for historical reference until fully purged.
3. Remove any remaining docker-compose references outside legacy (none found in modern tree).
4. Ensure ingress / deployment manifests expose only required service endpoints.

## Validation Checklist

- [ ] All modern services respond on `/health` with standardized payload.
- [ ] Metrics exposed at `/metrics` per service (shared or fallback working).
- [ ] No build/test step refers to `api-gateway`.
- [ ] CI scripts (if any) omit gateway target.

## Next Hardening Ideas

- Introduce an edge auth layer if future cross-service session management emerges.
- Evaluate API schema aggregation via an OpenAPI aggregator or GraphQL federation instead of a custom gateway.

---
Last updated: ${new Date().toISOString()}
