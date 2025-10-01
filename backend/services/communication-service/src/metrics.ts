import client from 'prom-client';
import type { Request, Response } from 'express';

client.collectDefaultMetrics();

export const metricsMiddleware = (_req: Request, res: Response) => {
    res.set('Content-Type', client.register.contentType);
    res.end(client.register.metrics());
};
