# Observability & Platform Telemetry

This document defines the common baseline for metrics, logs, traces (scaffold), and health/readiness across all backend services. It supplements inline code comments and should be kept current whenever cross‑cutting observability changes ship.

---
## Pillars
- Metrics: Prometheus exposition via shared helper (service + HTTP + domain metrics)
- Logging: Structured logger (Winston) with consistent JSON schema + human option
- Tracing: (Planned) OpenTelemetry scaffold (no-op unless enabled)
- Health vs Readiness: Lightweight liveness (`/health`) vs dependency-enriched readiness (`/ready`)
- Correlation: Request ID propagation (log + metrics labels; future trace/span IDs)

---
## Metrics
### Layers
1. Shared module (`services/shared/src/metrics.ts`)
   - `createHttpMetrics(serviceName)` -> `{ registry, httpRequestsTotal, httpRequestDurationMs }`
   - `metricsMiddleware(bundle)` attaches counters + histograms
   - `exposeMetricsEndpoint(app, bundle, path='/metrics')`
2. Service adapter (e.g. `user-service/src/observability/metrics.ts`)
   - Adds domain counters/histograms & exports helper functions
3. Fallback
   - Minimal local implementation when shared import fails (path or packaging issues)

### Standard Metric Names
| Purpose | Metric | Labels |
|---------|--------|--------|
| Request volume | `http_requests_total` | method, route, status_code, service |
| Request latency | `http_request_duration_ms` (histogram) | method, route, service |
| Password reset (example) | `user_service_password_reset_requests_total` | outcome, service |

Conventions:
- Prefix: `<service>_service_...`
- Units: prefer `_seconds` for durations if high-res; legacy `_ms` maintained for existing histogram until deprecation window passes.
- Counters always end with `_total`.

### Adding a Metric (Checklist)
1. Open service metrics adapter.
2. Register counter/histogram with registry from bundle.
3. Export a function (e.g. `recordFoo()`).
4. Call helper inside controller/use-case.
5. (Optional) Add an integration test asserting metric presence.

### Smoke Test Pattern
```
GET /metrics  => 200 & body contains 'http_requests_total'
```
Add one per service (already present for core services).

### Future Metric Enhancements
- `service_info` gauge with version & git SHA
- Exemplars (trace & request IDs) once tracing live
- Per-route error rate SLI queries baked into docs

---
## Logging
### Logger Source
Shared logger (`services/shared/src/logger.ts`) wraps Winston with environment-driven formatting.

### Environment Variables
| Variable | Purpose | Values |
|----------|---------|--------|
| `LOG_LEVEL` | Minimum level | debug, info, warn, error (default info) |
| `LOG_FORMAT` | Output format | `json` (default) or `human` |
| `SERVICE_NAME` | Overrides detected service label | any |

### JSON Log Schema
```
{
  ts: "2025-09-30T12:34:56.789Z",   // ISO timestamp
  level: "info",                    // winston level
  service: "user-service",          // derived or SERVICE_NAME
  msg: "User created",              // message
  requestId: "ab12cd...",           // (if in request scope)
  ...contextFields                  // structured meta (safe primitives only)
}
```

### Usage Guidelines
- Prefer structured fields over string concatenation.
- DO NOT log secrets, tokens, PII (emails hashed if required).
- Error logging: include `err.stack` under `stack` only at `warn` or `error` levels.
- Use request-scoped logger (middleware injects) instead of global when handling HTTP.

### Future Logging Enhancements
- Redaction helper for known sensitive keys
- Correlation with tracing span IDs
- Log sampling for high-volume noisy endpoints

---
## Tracing (Scaffold / Planned)
A shared initializer (to be added: `services/shared/src/tracing.ts`) will:
- Initialize OpenTelemetry SDK only if `TRACING_ENABLED=true`.
- Export `startTracing(serviceName, options?)` returning shutdown handle.
- Configure propagators: W3C TraceContext + Baggage.
- Auto-instrument HTTP + Express + (optionally) database.

Planned Environment Variables:
| Variable | Description |
|----------|-------------|
| `TRACING_ENABLED` | Enables tracing bootstrap |
| `OTEL_EXPORTER_OTLP_ENDPOINT` | Collector endpoint |
| `OTEL_RESOURCE_ATTRIBUTES` | Additional resource attrs (env, region) |

Span Naming Conventions:
- HTTP inbound: `HTTP <METHOD> <normalized_route>`
- Domain operations: `<bounded_context>.<entity>.<action>` (e.g. `users.profile.update`)

---
## Health vs Readiness
### /health (Liveness)
Lightweight, always fast, no deep dependency checks.
Shape via shared `buildHealthPayload(service, version?, domain?)`:
```
{
  status: "ok",
  service: "user-service",
  version: "1.2.3",
  uptimeSeconds: 1234,
  timestamp: "2025-09-30T12:34:56.789Z",
  domain: { /* optional */ }
}
```

### /ready (Readiness) [Planned]
Will include dependency probes (DB, external APIs, queue). Returns:
- 200 when all critical deps healthy.
- 503 when any critical dep fails.

Proposed Shape Additions:
```
{
  ...healthPayload,
  checks: {
     postgres: { status: "ok", latencyMs: 12 },
     redis: { status: "degraded", error: "timeout" }
  },
  overall: "degraded" // ok | degraded | failed
}
```

Deployment Hint: Kubernetes readinessProbe targets `/ready`; livenessProbe targets `/health`.

---
## Correlation & Context
- Request ID middleware injects `requestId` into logs & (planned) trace context.
- Future: Propagate `requestId` as Prometheus exemplar or an additional label (avoid label cardinality explosion—exemplars preferred).

---
## Service Implementation Status (Snapshot)
| Service | Metrics | buildApp pattern | Shared health helper | Smoke test |
|---------|---------|------------------|----------------------|------------|
| auth-service | Yes (fallback capable) | Adopted | Yes | Yes |
| user-service | Yes | Adopted | Yes | Yes |
| communication-service | Yes | Adopted | Yes | Yes |
| notification-service | Yes | Adopted | Yes | Yes |
| matching-service | Yes | Adopted | Yes | Yes |

---
## SLIs & Example Queries
| SLI | PromQL (Example) | Notes |
|-----|------------------|-------|
| Request success rate | `sum(rate(http_requests_total{service="user-service",status_code=~"2.."}[5m])) / sum(rate(http_requests_total{service="user-service"}[5m]))` | Target >= 99% |
| P95 latency | `histogram_quantile(0.95, sum(rate(http_request_duration_ms_bucket{service="user-service"}[5m])) by (le))` | Consider migrating to seconds |
| Error rate (5xx) | `sum(rate(http_requests_total{service="user-service",status_code=~"5.."}[5m]))` | Alert if > threshold |
| Traffic (RPS) | `sum(rate(http_requests_total{service="user-service"}[1m]))` | Capacity planning |
| Password reset success ratio | `sum(rate(user_service_password_reset_requests_total{outcome="success"}[15m])) / sum(rate(user_service_password_reset_requests_total[15m]))` | Domain KPI |

Alerting Draft Thresholds (Tunable):
- 5xx rate > 1% for 10m (page)
- P95 latency > 800ms for 15m (page)
- Success rate < 99% for 30m (ticket)

---
## Extending Observability (Playbook)
1. Add new metric: follow checklist; update table if cross-service.
2. Add dependency readiness check: implement probe function, aggregate in `/ready` handler.
3. Add tracing: implement shared tracing initializer; wrap `buildApp()` bootstrap.
4. Add structured log field globally: extend logger factory; document field here.
5. Add new SLI: define query + target; update runbook/alerts.

---
## Troubleshooting
| Symptom | Likely Cause | Resolution |
|---------|--------------|------------|
| 404 /metrics | Adapter not imported or endpoint registration skipped | Ensure metrics adapter imported before route wiring |
| Duplicate metric registration error | Hot reload re-import | Guard with registry lookup or clear on reload in dev |
| Missing requestId in logs | Middleware order issue | Ensure request context middleware precedes logger usage |
| High cardinality warning | Overly granular labels | Remove unique IDs from label sets; use exemplars |
| JSON logs unreadable locally | LOG_FORMAT unset | Export `LOG_FORMAT=human` for dev session |

---
## Roadmap (Prioritized)
1. Introduce `/ready` endpoint with dependency probes.
2. Add OpenTelemetry tracing scaffold + OTLP exporter.
3. Migrate latency histogram to `_seconds` naming (provide alias period).
4. Add `service_info` gauge + git SHA embed.
5. Implement central alert rules + runbook links.
6. Introduce redaction & sampling utilities in logger.

---
Maintainers: update this file with each platform-level observability change (schema, SLI, endpoint, or tracing capability).
