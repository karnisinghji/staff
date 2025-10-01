import client from 'prom-client';
import { Request, Response } from 'express';

client.collectDefaultMetrics();

export const metricsMiddleware = (req: Request, res: Response) => {
    res.set('Content-Type', client.register.contentType);
    res.end(client.register.metrics());
};
