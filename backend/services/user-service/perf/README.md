# Performance Baseline

This folder contains lightweight tooling to establish a baseline for key endpoint latency & throughput.

## Targets
- Health endpoint (`/api/health`) – liveness check
- Metrics endpoint (`/metrics`) – instrumentation surface
- Skills listing (`/api/skills`) – representative read path

## Autocannon Script
`autocannon-baseline.js` runs a mixed request scenario for 15 seconds with 20 concurrent connections.

### Run
```bash
node perf/autocannon-baseline.js
```
Environment variable `TARGET` can override default base URL (default `http://localhost:3002`).

### Expected Output (example structure)
```
Baseline Summary: {
  "latencyP95": 42,
  "rpsAvg": 820,
  "errors": 0,
  "timeouts": 0
}
```
(Values above are illustrative; capture real numbers locally and store in version control as a reference.)

## Next Steps
- Add a k6 script for longer soak tests & thresholds.
- Integrate baseline regression check in CI (flag >30% deviation in p95 or error rate >1%).
- Add write-path test (profile update) once stabilized.
