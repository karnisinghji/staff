# Backend Monorepo

## Development
Run all backend services in watch mode:
```bash
npm run dev
```
Options:
```bash
# List which services will start
node scripts/dev-all.mjs --list

# Run only matching & auth services
node scripts/dev-all.mjs --filter matching
```
Press Ctrl+C once to gracefully stop all spawned processes.

## Frontend Development
From `frontend/` directory:
```bash
npm run dev
```
Vite dev server will start (default: http://localhost:5173 or configured port).

## Composite Build
```bash
npm run build:all
```
Generates `dist/` outputs per service using TypeScript project references.

## Structure
- `services/*` individual microservices (each with its own `dev` script)
- `shared/` shared library consumed by services
- `scripts/dev-all.mjs` orchestrates concurrent service development

## Environment Variables
See `.env.example` for baseline variables. Supply sensitive values (e.g., JWT_SECRET) locally via `.env` or shell export.

## Docker
Build & run production-style stack:
```bash
docker compose -f ../docker-compose.prod.yml up --build
```

## Metrics & Health
Each service exposes `/health` and `/metrics`. See `docs/HEALTH-METRICS.md`.
