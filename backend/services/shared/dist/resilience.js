"use strict";
/* Resilience Utilities Placeholder
 * --------------------------------
 * Central location for cross-cutting resilience helpers (timeouts, retries,
 * circuit breaking). Initial minimal implementations provided; can be replaced
 * with more advanced libs (e.g., p-retry, opossum) later without changing
 * service call sites.
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.CircuitBreaker = void 0;
exports.withTimeout = withTimeout;
exports.retry = retry;
exports.createCircuitBreaker = createCircuitBreaker;
async function withTimeout(promise, ms, message = 'Operation timed out', opts = {}) {
    if (ms <= 0)
        return promise; // disabled
    let timer;
    const timeoutPromise = new Promise((_, reject) => {
        timer = setTimeout(() => reject(new Error(message)), ms).unref();
    });
    try {
        if (opts.signal) {
            if (opts.signal.aborted)
                throw new Error('Aborted');
            const abortPromise = new Promise((_, reject) => {
                opts.signal.addEventListener('abort', () => reject(new Error('Aborted')), { once: true });
            });
            return await Promise.race([promise, timeoutPromise, abortPromise]);
        }
        return await Promise.race([promise, timeoutPromise]);
    }
    finally {
        clearTimeout(timer);
    }
}
async function retry(fn, opts = {}) {
    const { retries = 3, factor = 2, minTimeout = 100, maxTimeout = 2000, onRetry } = opts;
    let attempt = 0;
    let delay = minTimeout;
    // eslint-disable-next-line no-constant-condition
    while (true) {
        try {
            return await fn();
        }
        catch (err) {
            attempt++;
            if (attempt > retries)
                throw err;
            onRetry?.(err, attempt);
            await new Promise(r => setTimeout(r, delay));
            delay = Math.min(maxTimeout, delay * factor);
        }
    }
}
class CircuitBreaker {
    constructor(opts = {}) {
        this.opts = opts;
        this.failures = 0;
        this.state = 'closed';
        this.nextAttempt = 0;
    }
    async exec(fn) {
        const failureThreshold = this.opts.failureThreshold ?? 5;
        const resetTimeoutMs = this.opts.resetTimeoutMs ?? 10000;
        const now = Date.now();
        if (this.state === 'open') {
            if (now >= this.nextAttempt) {
                this.state = 'half-open';
            }
            else {
                throw new Error('CircuitBreaker: open');
            }
        }
        try {
            const result = await fn();
            this.failures = 0;
            this.state = 'closed';
            return result;
        }
        catch (err) {
            this.failures++;
            if (this.failures >= failureThreshold) {
                this.state = 'open';
                this.nextAttempt = now + resetTimeoutMs;
            }
            throw err;
        }
    }
}
exports.CircuitBreaker = CircuitBreaker;
function createCircuitBreaker(opts) {
    return new CircuitBreaker(opts);
}
//# sourceMappingURL=resilience.js.map