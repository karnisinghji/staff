import { RequestHandler } from 'express';
export declare const requestContextMiddleware: RequestHandler;
export declare function getRequestId(): string | undefined;
export declare function getRequestDurationMs(): number | undefined;
