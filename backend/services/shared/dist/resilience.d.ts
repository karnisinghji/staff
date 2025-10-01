export interface TimeoutOptions {
    signal?: AbortSignal;
}
export declare function withTimeout<T>(promise: Promise<T>, ms: number, message?: string, opts?: TimeoutOptions): Promise<T>;
export interface RetryOptions {
    retries?: number;
    factor?: number;
    minTimeout?: number;
    maxTimeout?: number;
    onRetry?: (err: any, attempt: number) => void;
}
export declare function retry<T>(fn: () => Promise<T>, opts?: RetryOptions): Promise<T>;
export interface CircuitBreakerOptions {
    failureThreshold?: number;
    resetTimeoutMs?: number;
}
export declare class CircuitBreaker {
    private readonly opts;
    private failures;
    private state;
    private nextAttempt;
    constructor(opts?: CircuitBreakerOptions);
    exec<T>(fn: () => Promise<T>): Promise<T>;
}
export declare function createCircuitBreaker(opts?: CircuitBreakerOptions): CircuitBreaker;
