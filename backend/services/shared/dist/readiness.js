"use strict";
/* Readiness Helper
 * -----------------
 * Provides a simple aggregation mechanism for critical dependency checks.
 * Each service can register async check functions returning a ReadinessCheckResult.
 * The aggregated result determines /ready status code.
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.ReadinessRegistry = void 0;
exports.createReadinessRegistry = createReadinessRegistry;
exports.runReadiness = runReadiness;
class ReadinessRegistry {
    constructor() {
        this.checks = new Map();
    }
    register(name, fn) {
        this.checks.set(name, fn);
    }
    list() { return [...this.checks.keys()]; }
    async runAll(service) {
        const results = [];
        for (const [name, fn] of this.checks.entries()) {
            const started = Date.now();
            try {
                const r = await fn();
                const latency = r.latencyMs ?? (Date.now() - started);
                results.push({ ...r, name, latencyMs: latency });
            }
            catch (e) {
                results.push({ name, status: 'failed', error: e?.message || 'error', latencyMs: Date.now() - started });
            }
        }
        const overall = deriveOverall(results.map(r => r.status));
        return {
            service,
            overall,
            uptimeSeconds: Math.round(process.uptime()),
            timestamp: new Date().toISOString(),
            checks: results
        };
    }
}
exports.ReadinessRegistry = ReadinessRegistry;
function deriveOverall(statuses) {
    if (statuses.includes('failed'))
        return 'failed';
    if (statuses.includes('degraded'))
        return 'degraded';
    return 'ok';
}
function createReadinessRegistry() {
    return new ReadinessRegistry();
}
async function runReadiness(registry, service) {
    return registry.runAll(service);
}
//# sourceMappingURL=readiness.js.map