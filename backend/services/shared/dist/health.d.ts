export interface DomainHealth {
    [key: string]: any;
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
export declare function buildHealthPayload(service: string, version?: string, domain?: DomainHealth): HealthPayload;
export default buildHealthPayload;
