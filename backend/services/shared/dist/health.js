"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.buildHealthPayload = buildHealthPayload;
/**
 * Build a standardized health payload.
 * @param service canonical service name (machine readable, matches metrics label)
 * @param version optional semver string (defaults to process.env.npm_package_version or 'unknown')
 * @param domain optional nested object with domain/service specifics (db, queue, cache stats, etc.)
 */
function buildHealthPayload(service, version, domain) {
    const resolvedVersion = version || process.env.npm_package_version || 'unknown';
    return {
        status: 'ok',
        service,
        version: resolvedVersion,
        uptimeSeconds: Math.round(process.uptime()),
        timestamp: new Date().toISOString(),
        ...(domain ? { domain } : {})
    };
}
exports.default = buildHealthPayload;
//# sourceMappingURL=health.js.map