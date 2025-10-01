# Security & Scale Readiness

## JWT Secret Rotation & Management
- Store JWT secrets in environment variables or a secrets manager (e.g., HashiCorp Vault, AWS Secrets Manager).
- Rotate secrets periodically (e.g., quarterly) and document the rotation process.
- Use a key ID (`kid`) in JWT headers to support multiple active secrets during rotation.
- Update all services to reload secrets without downtime.
- Example rotation process:
  1. Add new secret to environment/secrets manager.
  2. Update services to accept both old and new secrets.
  3. Switch token signing to new secret.
  4. Remove old secret after all tokens expire.

## Database Indexes & Performance
- Add indexes to frequently queried columns (e.g., user_id, skill_type, location, match_score).
- Use EXPLAIN ANALYZE in Postgres to identify slow queries.
- Example index creation:
  ```sql
  CREATE INDEX idx_worker_skill_type ON worker_profiles(skill_type);
  CREATE INDEX idx_user_location ON users(location);
  CREATE INDEX idx_match_score ON saved_matches(match_score);
  ```
- Monitor query performance and tune as needed.

## Connection Pool Settings
- Use connection pooling for all services (e.g., pg.Pool for Node.js/Postgres).
- Recommended settings:
  - Pool size: 10–50 (adjust based on load and DB resources)
  - Idle timeout: 30s–2m
  - Connection timeout: 5–10s
- Example (Node.js):
  ```js
  const pool = new Pool({
    max: 20,
    idleTimeoutMillis: 60000,
    connectionTimeoutMillis: 10000,
  });
  ```

## Scaling Runbook
- Horizontal scaling: run multiple instances of stateless services behind a load balancer.
- Vertical scaling: increase resources for DB and cache as needed.
- Use health checks and readiness probes for rolling deployments.
- Monitor metrics (CPU, memory, DB connections, request rate).
- Document scaling steps and rollback procedures.

## Additional Recommendations
- Use HTTPS everywhere.
- Enable CORS with strict origin rules.
- Regularly audit dependencies for vulnerabilities.
- Document all security and scaling procedures in the runbook.
