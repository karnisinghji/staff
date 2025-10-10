export interface DomainHealth {
    [key: string]: any; // flexible extension for service-specific info
}

export interface HealthPayload {
    status: string;
    service: string;
    version: string;
    uptimeSeconds: number;
    timestamp: string;
    domain?: DomainHealth;
}

/**
 * Build a standardized health payload.
 * @param service canonical service name (machine readable, matches metrics label)
 * @param version optional semver string (defaults to process.env.npm_package_version or 'unknown')
 * @param domain optional nested object with domain/service specifics (db, queue, cache stats, etc.)
 */
export function buildHealthPayload(service: string, version?: string, domain?: DomainHealth): HealthPayload {
    const resolvedVersion = version || (process as any).env.npm_package_version || 'unknown';
    return {
        status: 'ok',
        service,
        version: resolvedVersion,
        uptimeSeconds: Math.round(process.uptime()),
        timestamp: new Date().toISOString(),
        ...(domain ? { domain } : {})
    };
}

export default buildHealthPayload;
