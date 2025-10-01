# Health & Metrics Contract
Date: 2025-09-29

## Overview
All backend services expose two operational endpoints:
- `GET /health` – Quick JSON health probe consumed by load balancers, orchestrators, synthetic checks.
- `GET /metrics` – Prometheus exposition format for scraping by monitoring systems.

## /health Endpoint
### Request
```
GET /health
Accept: application/json
```
### Response (200 OK)
```json
{
  "service": "auth-service",
  "status": "ok",
  "timestamp": "2025-09-29T12:34:56.789Z",
  "uptimeSeconds": 12345.678,
  "checks": {
    "process": "ok",
    "dependencies": "ok"
  },
  "version": "0.1.0"
}
```
### Fields
| Field | Type | Description |
|-------|------|-------------|
| service | string | Service identifier (env or package.json name). |
| status | string | Overall aggregate status: `ok`, `degraded`, or `error`. |
| timestamp | ISO-8601 string | Generation time of payload. |
| uptimeSeconds | number | Process uptime from `process.uptime()`. |
| checks.process | string | Always `ok` if process alive. |
| checks.dependencies | string | Composite state of downstream/resource checks (expandable). |
| version | string | Service version (fallback to `0.0.0`). |

### Non-200 Responses
| Code | Usage | Payload |
|------|-------|---------|
| 503 | Critical dependency failure / startup incomplete | `{ "status": "error", ... }` |

### Implementation Notes
- Keep execution under 5ms; avoid network calls in the hot path (cache external check results asynchronously if required).
- Do not include secrets, credentials, or large nested objects.

## /metrics Endpoint
### Format
Prometheus exposition (text/plain; version=0.0.4). Scraped typically every 15s.

### Core Standard Metrics
| Metric | Type | Labels | Description |
|--------|------|--------|-------------|
| process_start_time_seconds | gauge | - | Provided by prom-client default metrics. |
| process_cpu_user_seconds_total | counter | - | Default process metric. |
| http_requests_total | counter | method, route, status_code, service | Total HTTP requests. |
| http_request_duration_ms | histogram | method, route, service | Request latency distribution in ms. |
| nodejs_eventloop_lag_seconds | gauge | - | Event loop lag. |

### Histogram Buckets (Latency)
Default (example): 5, 10, 25, 50, 100, 250, 500, 1000, 2000 (ms). Choose SLO-aligned buckets; adjust if p95 saturates top bucket.

### Usage Guidelines
- Always label with `service` to disambiguate multi-target scraping.
- Avoid high-cardinality labels (no user IDs, emails, dynamic UUIDs).
- Prefer counters + histogram combination for RED metrics (Rate, Errors, Duration).

## Service-Level Objectives (Draft)
| Metric | Target | Window |
|--------|--------|--------|
| Availability (health status ok) | 99.5% | 30 days |
| HTTP p95 latency | < 300ms | 30 days |
| Error rate (5xx / total) | < 1% | 30 days |

## Alerting Suggestions
| Condition | Threshold | Duration |
|-----------|-----------|----------|
| Health status != ok | Any | 5m |
| Error rate > 2% | 2% | 10m |
| p95 latency > 600ms | 600ms | 15m |
| Event loop lag > 150ms | 150ms | 5m |

## Extension Points
| Area | Approach |
|------|----------|
| Database checks | Populate `checks.dependencies` from periodic async probe. |
| External API | Keep separate counters `external_api_requests_total` by provider. |
| Queue metrics | Add gauge for queue depth, counter for processed messages. |

## Implementation Checklist
- [x] Prometheus client initialized once per process.
- [x] Default metrics collection enabled.
- [x] HTTP middleware increments counters & observes histogram.
- [ ] Graceful shutdown flush (add before production launch).

## Anti-Patterns
| Anti-Pattern | Risk |
|-------------|------|
| Performing live DB query in /health path | Latency spikes; cascading failures |
| High-cardinality labels (userId) | Memory growth & cardinality limits |
| Measuring business metrics in same registry | Mixes operational & domain metrics (use separate registry or naming) |

## Quick Local Test
```
# Build & run one service
docker build -t test-auth ./backend/services/auth-service
docker run --rm -p 3001:3000 test-auth
curl -s localhost:3001/health | jq .
curl -s localhost:3001/metrics | grep http_requests_total
```

## Future Roadmap
1. Add OpenTelemetry tracing exporter & span -> metrics bridge.
2. Introduce RED dashboard (Grafana) as code (JSON provisioning).
3. Add anomaly detection (p95 > 2x baseline) alerts.

Maintainer: Platform Engineering
