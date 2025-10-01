import client from 'prom-client';
import type { Request, Response } from 'express';
export declare const passwordResetRequestsTotal: client.Counter<"outcome">;
export declare const skillsListRequestsTotal: client.Counter<string>;
export declare const httpRequestDuration: client.Histogram<"route" | "status" | "method">;
export declare function timingMiddleware(req: Request, res: Response, next: Function): void;
export declare function recordPasswordReset(outcome: 'success' | 'not_found' | 'rate_limited' | 'error'): void;
export declare function recordSkillsList(): void;
export declare const metricsMiddleware: (_req: Request, res: Response) => void;
