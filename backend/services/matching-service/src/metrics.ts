import client from 'prom-client';

client.collectDefaultMetrics();

import { Request, Response } from 'express';

export const metricsMiddleware = (req: Request, res: Response) => {
    res.set('Content-Type', client.register.contentType);
    res.end(client.register.metrics());
};
