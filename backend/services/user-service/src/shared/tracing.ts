/* Tracing Scaffold (No-Op by default)
 * ------------------------------------
 * Provides an optional OpenTelemetry initialization that activates only when
 * TRACING_ENABLED=true. This avoids imposing startup costs or requiring
 * collector availability in local/dev unless explicitly enabled.
 */

// Tracing scaffold intentionally avoids importing @opentelemetry packages at module top-level
// so that services compile even if those optional dependencies are not installed yet.
// All dynamic requires are inside startTracing and guarded by TRACING_ENABLED.

interface TracingOptions {
    serviceName?: string;
    disableAutoInstrumentation?: boolean;
    exporter?: 'otlp-http' | 'console';
    // resource override is typed as any to avoid importing opentelemetry types
    resource?: any;
}

let started = false;
let shutdownFn: (() => Promise<void>) | null = null;

export async function startTracing(opts: TracingOptions = {}): Promise<void> {
    if (started) return;
    if (process.env.TRACING_ENABLED !== 'true') return;

    const serviceName = opts.serviceName || process.env.SERVICE_NAME || 'unknown-service';

    try {
        // eslint-disable-next-line @typescript-eslint/no-var-requires
        const { NodeSDK } = require('@opentelemetry/sdk-node');
        // eslint-disable-next-line @typescript-eslint/no-var-requires
        const { getNodeAutoInstrumentations } = require('@opentelemetry/auto-instrumentations-node');
        // eslint-disable-next-line @typescript-eslint/no-var-requires
        const { OTLPTraceExporter } = require('@opentelemetry/exporter-trace-otlp-http');
        // eslint-disable-next-line @typescript-eslint/no-var-requires
        const { Resource } = require('@opentelemetry/resources');
        // eslint-disable-next-line @typescript-eslint/no-var-requires
        const { SemanticResourceAttributes } = require('@opentelemetry/semantic-conventions');

        const resource = new Resource({
            [SemanticResourceAttributes.SERVICE_NAME]: serviceName,
            'deployment.environment': process.env.DEPLOY_ENV || process.env.NODE_ENV || 'development'
        });

        const exporter = new OTLPTraceExporter({
            url: process.env.OTEL_EXPORTER_OTLP_ENDPOINT || undefined
        });

        const sdk = new NodeSDK({
            resource: opts.resource ? resource.merge(opts.resource) : resource,
            traceExporter: exporter,
            instrumentations: opts.disableAutoInstrumentation ? [] : [getNodeAutoInstrumentations()]
        });

        await sdk.start();
        started = true;
        shutdownFn = async () => {
            await sdk.shutdown().catch(() => { });
            started = false;
        };
        // eslint-disable-next-line no-console
        console.log(`[tracing] OpenTelemetry tracing started for ${serviceName}`);
    } catch (err) {
        // eslint-disable-next-line no-console
        console.warn('[tracing] Failed to start tracing (dependencies installed?):', (err as any)?.message);
    }
}

export async function stopTracing(): Promise<void> {
    if (shutdownFn) {
        await shutdownFn();
        shutdownFn = null;
        // eslint-disable-next-line no-console
        console.log('[tracing] Tracing stopped');
    }
}

export function isTracingEnabled(): boolean {
    return started;
}
