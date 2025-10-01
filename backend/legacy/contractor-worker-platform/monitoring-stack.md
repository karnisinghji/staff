# Monitoring & Dashboards Setup

## Prometheus & Grafana Stack (docker-compose)

![Fort 1](./monitoring/images/fort1.png)
![Fort 2](./monitoring/images/fort2.png)

Add the following services to your `docker-compose.yml`:

```yaml
  prometheus:
    image: prom/prometheus:latest
    container_name: platform-prometheus
    volumes:
      - ./monitoring/prometheus.yml:/etc/prometheus/prometheus.yml
    ports:
      - "9090:9090"
    networks:
      - platform-network

  grafana:
    image: grafana/grafana:latest
    container_name: platform-grafana
    ports:
      - "3008:3000"
    depends_on:
      - prometheus
    networks:
      - platform-network
```

## Example Prometheus config (`monitoring/prometheus.yml`):

```yaml
scrape_configs:
  - job_name: 'api-gateway'
    static_configs:
      - targets: ['api-gateway:3000']
  - job_name: 'matching-service'
    static_configs:
      - targets: ['matching-service:3003']
  - job_name: 'user-service'
    static_configs:
      - targets: ['user-service:3002']
  - job_name: 'auth-service'
    static_configs:
      - targets: ['auth-service:3001']
```

## Grafana Dashboard & Alerts
- Import Prometheus as a data source in Grafana (URL: `http://prometheus:9090`).
- Create dashboards for service metrics (request rate, error rate, latency, etc.).
- Example alert rule:
  - Alert if error rate > 5% for any service for 5 minutes.

## Logging Aggregation
- Use Winston for structured logs in all services.
- Ship logs to a central location (e.g., ELK stack, Loki, or cloud logging).
- Example Winston config:
```js
const winston = require('winston');
const logger = winston.createLogger({
  level: 'info',
  format: winston.format.json(),
  transports: [
    new winston.transports.Console(),
    // Add file or remote transport here
  ],
});
module.exports = logger;
```

## Health Checks
- Each service should expose `/health` endpoint returning status and timestamp.
- Prometheus can scrape health endpoints for up/down status.
