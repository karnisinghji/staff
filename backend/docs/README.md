# Backend Documentation

This directory houses architecture decision records, design documents, and other backend-focused documentation.

## 📚 Documentation Index

### Setup & Configuration
- **[OAuth Quick Start](OAUTH-QUICK-START.md)** - Fast track to adding OAuth credentials ⭐
- **[OAuth Credentials Setup](OAUTH-CREDENTIALS-SETUP.md)** - Detailed OAuth app creation guide
- **[OAuth Implementation](OAUTH-SETUP.md)** - Complete OAuth architecture documentation

### Architecture & Design
- **[Design Document](Design-Document.pdf)** - Original design artifacts
- **[Production Readiness](PRODUCTION-READINESS.md)** - Production deployment checklist
- **[Health Metrics](HEALTH-METRICS.md)** - System monitoring and health checks
- **[Observability](../services/shared/OBSERVABILITY.md)** - Logging and monitoring setup

### Deprecations & Changes
- **[API Gateway Deprecated](API-GATEWAY-DEPRECATED.md)** - Migration notes
- **[Deprecations](DEPRECATIONS.md)** - Deprecated features and alternatives
- **[Root Cleanup](ROOT-CLEANUP.md)** - Project structure changes

### Project References
- **[Project References](PROJECT-REFERENCES.md)** - External resources and links

## 🚀 Quick Start with OAuth

Want to add Google, Facebook, or Twitter login? Start here:

```bash
# 1. Read the quick start guide
cat docs/OAUTH-QUICK-START.md

# 2. Run interactive setup
cd services/auth-service
bash setup-oauth-credentials.sh

# 3. Validate credentials
node validate-oauth-credentials.js

# 4. Restart and test
cd ../.. && npm run dev
```

## 📖 Additional Resources

- **Service-specific docs**: Check each service's README in `services/` directory
- **Legacy documentation**: See `legacy/` directory for historical context
- **Workspace structure**: See `WORKSPACES.md` in backend root
