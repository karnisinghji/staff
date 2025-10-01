## NPM Workspaces

This repository uses npm workspaces to hoist shared dependencies and tooling.

### Layout
```
backend/
  package.json (declares workspaces: services/*)
  services/
    auth-service/
    user-service/
    communication-service/
    matching-service/
    notification-service/
    shared/ (shared library consumed by services)
```

### Commands
- Install & build all: `npm run bootstrap`
- Typecheck all: `npm run typecheck`
- Clean build artifacts: `npm run clean:all`

### Service Package Simplification
Service `package.json` files now omit dependencies that are provided by the root. Add ONLY service‑specific libraries uniquely needed.

### Adding a New Dependency
Add to the root `package.json` under `dependencies` (or `devDependencies` for tooling) then run `npm install`.

### Rationale
- Eliminates version drift (e.g. multiple express versions)
- Faster CI installs via single lockfile
- Centralized upgrade path (Dependabot / Renovate friendly)

### Notes
- Auth service previously required `bcryptjs`; it is hoisted and still available.
- User service keeps `joi` locally (not currently used elsewhere). Move it to root if adopted broadly.

### Optional Future Enhancements
- Add `npm run test:all` aggregator script
- Introduce per-service `eslint.config.js` extending a root base config
- Consider moving to `pnpm` for stricter hoisting and workspace performance if needed.
