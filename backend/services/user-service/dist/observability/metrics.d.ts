import client from 'prom-client';
export declare const userMetricsBundle: any;
declare const passwordResetRequestsTotal: client.Counter<"outcome">;
declare const skillsListRequestsTotal: client.Counter<string>;
declare const httpRequestDuration: client.Histogram<"method" | "route" | "status">;
export declare function recordPasswordReset(outcome: 'success' | 'not_found' | 'rate_limited' | 'error'): void;
export declare function recordSkillsList(): void;
export declare function timingMiddleware(req: any, res: any, next: any): void;
export { passwordResetRequestsTotal, skillsListRequestsTotal, httpRequestDuration };
