import client from 'prom-client';

client.collectDefaultMetrics();

export const metricsMiddleware = (req, res) => {
    res.set('Content-Type', client.register.contentType);
    res.end(client.register.metrics());
};
