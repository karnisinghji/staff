import { AsyncLocalStorage } from 'node:async_hooks';
import { randomUUID } from 'crypto';
import { Request, Response, NextFunction, RequestHandler } from 'express';

interface ContextValue {
    requestId: string;
    startTime: number;
}

const storage = new AsyncLocalStorage<ContextValue>();

export const requestContextMiddleware: RequestHandler = (req: Request, _res: Response, next: NextFunction) => {
    const ctx: ContextValue = { requestId: (req.headers['x-request-id'] as string) || randomUUID(), startTime: Date.now() };
    storage.run(ctx, () => next());
};

export function getRequestId(): string | undefined {
    return storage.getStore()?.requestId;
}

export function getRequestDurationMs(): number | undefined {
    const store = storage.getStore();
    return store ? Date.now() - store.startTime : undefined;
}
