"use strict";
/* Tracing Scaffold (No-Op by default)
 * ------------------------------------
 * Provides an optional OpenTelemetry initialization that activates only when
 * TRACING_ENABLED=true. This avoids imposing startup costs or requiring
 * collector availability in local/dev unless explicitly enabled.
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.startTracing = startTracing;
exports.stopTracing = stopTracing;
exports.isTracingEnabled = isTracingEnabled;
let started = false;
let shutdownFn = null;
async function startTracing(opts = {}) {
    if (started)
        return;
    if (process.env.TRACING_ENABLED !== 'true')
        return;
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
    }
    catch (err) {
        // eslint-disable-next-line no-console
        console.warn('[tracing] Failed to start tracing (dependencies installed?):', err?.message);
    }
}
async function stopTracing() {
    if (shutdownFn) {
        await shutdownFn();
        shutdownFn = null;
        // eslint-disable-next-line no-console
        console.log('[tracing] Tracing stopped');
    }
}
function isTracingEnabled() {
    return started;
}
//# sourceMappingURL=tracing.js.map