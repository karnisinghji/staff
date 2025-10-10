/* Readiness Helper
 * -----------------
 * Provides a simple aggregation mechanism for critical dependency checks.
 * Each service can register async check functions returning a ReadinessCheckResult.
 * The aggregated result determines /ready status code.
 */

export type CheckStatus = 'ok' | 'degraded' | 'failed';

export interface ReadinessCheckResult {
    name: string;
    status: CheckStatus;
    latencyMs?: number;
    error?: string;
    details?: Record<string, any>;
}

export interface AggregatedReadiness {
    service: string;
    overall: CheckStatus; // derived: failed > degraded > ok
    uptimeSeconds: number;
    timestamp: string;
    checks: ReadinessCheckResult[];
}

export type ReadinessCheck = () => Promise<ReadinessCheckResult> | ReadinessCheckResult;

export class ReadinessRegistry {
    private checks: Map<string, ReadinessCheck> = new Map();
    register(name: string, fn: ReadinessCheck) {
        this.checks.set(name, fn);
    }
    list(): string[] { return [...this.checks.keys()]; }
    async runAll(service: string): Promise<AggregatedReadiness> {
        const results: ReadinessCheckResult[] = [];
        for (const [name, fn] of this.checks.entries()) {
            const started = Date.now();
            try {
                const r = await fn();
                const latency = r.latencyMs ?? (Date.now() - started);
                results.push({ ...r, name, latencyMs: latency });
            } catch (e: any) {
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

function deriveOverall(statuses: CheckStatus[]): CheckStatus {
    if (statuses.includes('failed')) return 'failed';
    if (statuses.includes('degraded')) return 'degraded';
    return 'ok';
}

export function createReadinessRegistry(): ReadinessRegistry {
    return new ReadinessRegistry();
}

export async function runReadiness(registry: ReadinessRegistry, service: string) {
    return registry.runAll(service);
}
