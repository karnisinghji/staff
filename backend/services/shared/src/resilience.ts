/* Resilience Utilities Placeholder
 * --------------------------------
 * Central location for cross-cutting resilience helpers (timeouts, retries,
 * circuit breaking). Initial minimal implementations provided; can be replaced
 * with more advanced libs (e.g., p-retry, opossum) later without changing
 * service call sites.
 */

export interface TimeoutOptions {
    signal?: AbortSignal;
}

export async function withTimeout<T>(promise: Promise<T>, ms: number, message = 'Operation timed out', opts: TimeoutOptions = {}): Promise<T> {
    if (ms <= 0) return promise; // disabled
    let timer: NodeJS.Timeout;
    const timeoutPromise = new Promise<never>((_, reject) => {
        timer = setTimeout(() => reject(new Error(message)), ms).unref();
    });
    try {
        if (opts.signal) {
            if (opts.signal.aborted) throw new Error('Aborted');
            const abortPromise = new Promise<never>((_, reject) => {
                opts.signal!.addEventListener('abort', () => reject(new Error('Aborted')), { once: true });
            });
            return await Promise.race([promise, timeoutPromise, abortPromise]);
        }
        return await Promise.race([promise, timeoutPromise]);
    } finally {
        clearTimeout(timer!);
    }
}

export interface RetryOptions {
    retries?: number;               // max attempts (default 3)
    factor?: number;                // backoff factor (default 2)
    minTimeout?: number;            // initial delay (ms)
    maxTimeout?: number;            // max delay cap (ms)
    onRetry?: (err: any, attempt: number) => void;
}

export async function retry<T>(fn: () => Promise<T>, opts: RetryOptions = {}): Promise<T> {
    const {
        retries = 3,
        factor = 2,
        minTimeout = 100,
        maxTimeout = 2000,
        onRetry
    } = opts;
    let attempt = 0;
    let delay = minTimeout;
    // eslint-disable-next-line no-constant-condition
    while (true) {
        try {
            return await fn();
        } catch (err) {
            attempt++;
            if (attempt > retries) throw err;
            onRetry?.(err, attempt);
            await new Promise(r => setTimeout(r, delay));
            delay = Math.min(maxTimeout, delay * factor);
        }
    }
}

export interface CircuitBreakerOptions {
    failureThreshold?: number;  // consecutive failures to open
    resetTimeoutMs?: number;    // time before attempting half-open
}

export class CircuitBreaker {
    private failures = 0;
    private state: 'closed' | 'open' | 'half-open' = 'closed';
    private nextAttempt = 0;

    constructor(private readonly opts: CircuitBreakerOptions = {}) { }

    async exec<T>(fn: () => Promise<T>): Promise<T> {
        const failureThreshold = this.opts.failureThreshold ?? 5;
        const resetTimeoutMs = this.opts.resetTimeoutMs ?? 10000;
        const now = Date.now();

        if (this.state === 'open') {
            if (now >= this.nextAttempt) {
                this.state = 'half-open';
            } else {
                throw new Error('CircuitBreaker: open');
            }
        }
        try {
            const result = await fn();
            this.failures = 0;
            this.state = 'closed';
            return result;
        } catch (err) {
            this.failures++;
            if (this.failures >= failureThreshold) {
                this.state = 'open';
                this.nextAttempt = now + resetTimeoutMs;
            }
            throw err;
        }
    }
}

export function createCircuitBreaker(opts?: CircuitBreakerOptions) {
    return new CircuitBreaker(opts);
}
