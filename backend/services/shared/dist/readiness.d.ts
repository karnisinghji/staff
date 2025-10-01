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
    overall: CheckStatus;
    uptimeSeconds: number;
    timestamp: string;
    checks: ReadinessCheckResult[];
}
export type ReadinessCheck = () => Promise<ReadinessCheckResult> | ReadinessCheckResult;
export declare class ReadinessRegistry {
    private checks;
    register(name: string, fn: ReadinessCheck): void;
    list(): string[];
    runAll(service: string): Promise<AggregatedReadiness>;
}
export declare function createReadinessRegistry(): ReadinessRegistry;
export declare function runReadiness(registry: ReadinessRegistry, service: string): Promise<AggregatedReadiness>;
