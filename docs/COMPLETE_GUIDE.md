# 📚 ComeOnDost - Complete Project Documentation

**Comprehensive guide for the contractor/worker matching platform**

Last Updated: October 11, 2025

---

## 📖 Table of Contents

1. [Project Overview](#project-overview)
2. [Quick Start](#quick-start)
3. [Architecture](#architecture)
4. [Deployment Guide](#deployment-guide)
5. [Database Setup](#database-setup)
6. [Authentication & OAuth](#authentication--oauth)
7. [Features & Configuration](#features--configuration)
8. [Troubleshooting](#troubleshooting)
9. [Mobile & PWA](#mobile--pwa)
10. [Performance & Security](#performance--security)

---

## 🎯 Project Overview

**ComeOnDost** is a full-stack microservices platform for connecting contractors with workers in India.

### Tech Stack

**Backend:**
- Node.js + TypeScript
- 5 Microservices (NPM workspace monorepo)
- PostgreSQL (Neon) database
- JWT authentication
- Hexagonal architecture (user-service)

**Frontend:**
- React + TypeScript
- Vite build system
- React Router
- Custom toast notifications
- Progressive Web App (PWA)

**Deployment:**
- Backend: Railway (5 services)
- Frontend: Netlify
- Database: Neon PostgreSQL

### Live URLs

- **Frontend**: https://comeondost.netlify.app
- **Auth Service**: https://auth-service-production-d5c8.up.railway.app
- **User Service**: https://user-service-production-f141.up.railway.app
- **Matching Service**: https://matching-service-production.up.railway.app
- **Communication Service**: https://communication-service-production-c165.up.railway.app
- **Notification Service**: https://notification-service-production-8738.up.railway.app

---

## 🚀 Quick Start

### Prerequisites

```bash
# Required
- Node.js 18+ 
- npm 9+
- PostgreSQL (or Neon account)
- Railway CLI
- Netlify CLI

# Install CLIs
npm install -g @railway/cli
npm install -g netlify-cli
```

### Local Development

```bash
# 1. Clone and install
git clone <repo-url>
cd staff

# 2. Install backend dependencies
cd backend
npm install

# 3. Install frontend dependencies
cd ../frontend
npm install

# 4. Setup environment variables
cp backend/.env.example backend/.env
cp frontend/.env.example frontend/.env
# Edit with your values

# 5. Start all backend services
cd backend
npm run dev
# Services start on ports 3001-3005

# 6. Start frontend (in new terminal)
cd frontend
npm run dev
# Opens at http://localhost:5173
```

### Environment Variables

**Backend (.env):**
```bash
# Database
DATABASE_URL=postgresql://user:pass@host/db?sslmode=require

# JWT
JWT_SECRET=your-256-bit-secret
JWT_EXPIRES_IN=24h

# CORS
CORS_ORIGINS=http://localhost:5173,https://comeondost.netlify.app

# OAuth (optional)
GOOGLE_CLIENT_ID=your-google-client-id
GOOGLE_CLIENT_SECRET=your-google-secret
FRONTEND_URL=https://comeondost.netlify.app

# Environment
NODE_ENV=development
LOG_LEVEL=info
```

**Frontend (.env):**
```bash
VITE_ENV=development
# API URLs configured in src/config/api.ts
```

---

## 🏗️ Architecture

### Microservices Overview

```
┌─────────────────────────────────────────┐
│         Frontend (React + Vite)         │
│      https://comeondost.netlify.app     │
└──────────────────┬──────────────────────┘
                   │
    ┌──────────────┼──────────────┐
    │              │              │
    ▼              ▼              ▼
┌─────────┐  ┌─────────┐  ┌─────────┐
│  Auth   │  │  User   │  │Matching │
│ Service │  │ Service │  │ Service │
│  :3001  │  │  :3002  │  │  :3003  │
└─────────┘  └─────────┘  └─────────┘
                   │
    ┌──────────────┼──────────────┐
    │              │              │
    ▼              ▼              ▼
┌─────────┐  ┌─────────┐  ┌─────────┐
│  Comm.  │  │ Notify  │  │Database │
│ Service │  │ Service │  │  Neon   │
│  :3004  │  │  :3005  │  │  SQL    │
└─────────┘  └─────────┘  └─────────┘
```

### Service Responsibilities

**1. Auth Service (3001)**
- User registration/login
- JWT token management
- OAuth (Google, Facebook, Twitter)
- Password reset

**2. User Service (3002)**
- User profiles (contractor/worker)
- Contacts management
- Skills & certifications
- Profile completeness calculation
- Hexagonal architecture implementation

**3. Matching Service (3003)**
- Find contractors/workers
- Location-based search (100+ Indian cities)
- Team requests
- Job postings & applications

**4. Communication Service (3004)**
- Direct messaging
- WebSocket support (planned)
- Message history

**5. Notification Service (3005)**
- Real-time notifications
- WebSocket support (planned)
- Email notifications (planned)

### Frontend Structure

```
frontend/
├── src/
│   ├── features/          # Feature modules
│   │   ├── auth/          # Login, Register, OAuth
│   │   ├── profile/       # User profiles
│   │   ├── matching/      # Search & match
│   │   ├── messaging/     # Chat
│   │   └── notifications/ # Alerts
│   ├── contexts/          # React contexts
│   │   ├── AuthContext    # Authentication state
│   │   ├── ToastContext   # Notifications
│   │   └── NotificationContext
│   ├── config/            # Configuration
│   │   └── api.ts         # API endpoints
│   ├── utils/             # Utilities
│   │   └── location.ts    # 100+ Indian cities
│   └── App.tsx            # Main app & routing
├── public/                # Static assets
└── dist/                  # Build output
```

---

## 🌐 Deployment Guide

### Deploy All Services

**Quick Deploy:**
```bash
# Deploy all backend services
cd backend
./deploy-to-railway.sh

# Deploy frontend
cd ../frontend
npm run build
netlify deploy --prod --dir=dist
```

### Individual Service Deployment

**Railway (Backend):**
```bash
# Deploy specific service
cd backend/services/auth-service
railway login
railway link  # Select your project
railway up    # Deploy

# Set environment variables
railway variables set KEY=value

# View logs
railway logs --tail
```

**Netlify (Frontend):**
```bash
cd frontend
netlify login
netlify link
netlify deploy --prod --dir=dist

# Environment variables set in Netlify UI
# or netlify.toml
```

### Health Checks

All services expose `/health` endpoint:

```bash
# Check all services
for service in auth user matching communication notification; do
  curl https://${service}-service-production.up.railway.app/health
done

# Expected response:
{"status":"ok","service":"auth-service","timestamp":"...","uptimeSeconds":123}
```

### Railway Environment Variables

Set these for each service:

```bash
# Shared variables
DATABASE_URL=postgresql://...
JWT_SECRET=your-secret
NODE_ENV=production
CORS_ORIGINS=https://comeondost.netlify.app

# Service-specific ports (Railway auto-assigns)
PORT=10000
```

### CI/CD

**GitHub Actions** (`.github/workflows/build-backend.yml`):
- Runs tests on push to `backend/**`
- Builds all services
- TypeScript type checking

**Auto-deployment:**
- Railway: Webhook triggers on GitHub push
- Netlify: Auto-deploys on main branch push

---

## 🗄️ Database Setup

### Neon PostgreSQL

**Setup Steps:**

1. **Create Neon account**: https://neon.tech
2. **Create project** named "ComeOnDost"
3. **Get connection string** from dashboard
4. **Run schema**:

```bash
# Using psql
psql "postgresql://user:pass@host/db?sslmode=require" < database-schema.sql

# Or using setup script
./setup-neon-database.sh
```

### Database Schema

**Core Tables:**
- `users` - Base user accounts
- `contractor_profiles` - Contractor details
- `worker_profiles` - Worker details
- `contacts` - Phone/email contacts
- `user_skills` - Skills mapping
- `job_postings` - Job listings
- `job_applications` - Applications
- `team_requests` - Team invitations
- `messages` - Direct messages
- `notifications` - User notifications

### Seed Data

```bash
# Load sample data
psql $DATABASE_URL < database-seed.sql

# Test users created:
# - john@example.com / password123 (contractor)
# - hanny@example.com / password456 (worker)
```

### Database Backup

```bash
# Backup
pg_dump $DATABASE_URL > backup-$(date +%Y%m%d).sql

# Restore
psql $DATABASE_URL < backup-20251011.sql
```

---

## 🔐 Authentication & OAuth

### Email/Password Auth

**Working out of the box** - no additional setup needed.

**Register:**
```bash
POST /api/auth/register
{
  "email": "user@example.com",
  "password": "securepass123",
  "name": "John Doe",
  "role": "contractor"
}
```

**Login:**
```bash
POST /api/auth/login
{
  "email": "user@example.com",
  "password": "securepass123"
}

# Returns:
{
  "success": true,
  "data": {
    "accessToken": "jwt-token",
    "refreshToken": "refresh-token",
    "user": { ... }
  }
}
```

### Google OAuth Setup

**Complete guide in `GOOGLE_OAUTH_SETUP_GUIDE.md`**

**Quick Setup:**

1. **Google Cloud Console**:
   - Create OAuth 2.0 credentials
   - Add redirect URI: `https://auth-service-production-d5c8.up.railway.app/api/auth/google/callback`

2. **Configure Railway**:
   ```bash
   cd backend/services/auth-service
   railway variables set GOOGLE_CLIENT_ID="your-id"
   railway variables set GOOGLE_CLIENT_SECRET="your-secret"
   railway variables set GOOGLE_CALLBACK_URL="https://auth-service-production-d5c8.up.railway.app/api/auth/google/callback"
   railway variables set FRONTEND_URL="https://comeondost.netlify.app"
   ```

3. **Test**: Visit https://comeondost.netlify.app → Register → "Continue with Google"

### OAuth Flow

```
User clicks "Continue with Google"
  ↓
Frontend → Backend /api/auth/google
  ↓
Backend → Google OAuth consent
  ↓
User authorizes
  ↓
Google → Backend /api/auth/google/callback
  ↓
Backend creates/finds user, generates JWT
  ↓
Backend → Frontend /auth/callback?access_token=...
  ↓
Frontend stores token & redirects to dashboard
```

### JWT Tokens

- **Access Token**: 15 minutes expiry
- **Refresh Token**: 7 days expiry
- Stored in localStorage
- Auto-refresh on expiry

---

## ⚙️ Features & Configuration

### Location-Based Search

**100+ Indian cities supported** with GPS auto-detection:

**Features:**
- Auto-detect location on page load
- Manual "Use My Location" button
- City name search ("Delhi", "Mumbai", "Bangalore")
- Coordinate input (27.2440, 75.6584)
- Radius-based search (5-100 km)
- Reverse geocoding (coordinates → city name)

**Supported Cities:**
- Tier 1: Delhi, Mumbai, Bangalore, Chennai, Kolkata, Hyderabad, Pune
- Tier 2: Ahmedabad, Jaipur, Surat, Lucknow, Kanpur, Nagpur, Indore
- 90+ more cities across India
- Default fallback: Jaipur

**Implementation:**
```typescript
// frontend/src/utils/location.ts
const INDIAN_CITIES = [
  { name: 'Delhi', state: 'Delhi', lat: 28.6139, lon: 77.2090 },
  { name: 'Mumbai', state: 'Maharashtra', lat: 19.0760, lon: 72.8777 },
  // ... 100+ cities
];

// Auto-detect
const position = await navigator.geolocation.getCurrentPosition();
const city = await reverseGeocode(position.coords.latitude, position.coords.longitude);
// Returns: "Jaipur, Rajasthan"
```

### Profile Completeness

User-service calculates profile completeness:

```typescript
// Completeness factors:
- Basic info (email, name, role): 20%
- Profile details: 30%
- Contact info: 20%
- Skills: 30%

// API: GET /api/users/me
{
  "meta": {
    "completeness": 85,
    "missingFields": ["certifications"]
  }
}
```

### Search & Matching

**Find Workers:**
```bash
POST /api/matching/find-contractors
{
  "skillType": "electrician",
  "location": "Jaipur",
  "maxDistance": 50,
  "limit": 12
}
```

**Send Team Request:**
```bash
POST /api/matching/send-team-request
{
  "receiverId": "uuid",
  "message": "Join my team!",
  "matchContext": { "skill": "electrician" }
}
```

### Messaging

```bash
# Send message
POST /api/communication/messages
{
  "receiverId": "uuid",
  "content": "Hello!"
}

# Get conversations
GET /api/communication/conversations

# Get messages
GET /api/communication/messages/:conversationId
```

---

## 🐛 Troubleshooting

### Common Issues

**1. CORS Errors**

```bash
# Add frontend URL to all services:
railway variables set CORS_ORIGINS="https://comeondost.netlify.app,http://localhost:5173"
```

**2. Database Connection Failed**

```bash
# Check DATABASE_URL format:
postgresql://user:pass@host/db?sslmode=require

# Test connection:
psql $DATABASE_URL -c "SELECT 1;"
```

**3. JWT Token Invalid**

```bash
# Ensure JWT_SECRET is same across all services
railway variables set JWT_SECRET="same-secret-everywhere"
```

**4. OAuth Not Working**

```bash
# Check credentials are set:
railway variables | grep GOOGLE

# Should show:
GOOGLE_CLIENT_ID=...apps.googleusercontent.com
GOOGLE_CLIENT_SECRET=GOCSPX-...
GOOGLE_CALLBACK_URL=https://...
```

**5. Service Not Responding**

```bash
# Check health:
curl https://service-url/health

# View logs:
cd backend/services/auth-service
railway logs --tail

# Restart service:
railway up --detach
```

**6. Frontend Shows Old Version**

```bash
# Hard refresh:
Ctrl+Shift+R (Windows) or Cmd+Shift+R (Mac)

# Or clear cache in DevTools
```

### Debug Commands

```bash
# Test backend connectivity
cd backend/services/auth-service
node test-production-issues.js YOUR_JWT_TOKEN

# Test database
psql $DATABASE_URL
\dt  # List tables
\d users  # Describe users table

# Test all services
for url in auth user matching communication notification; do
  echo "Testing $url..."
  curl -s https://${url}-service-production.up.railway.app/health | jq
done
```

### Logs & Monitoring

**Railway Logs:**
```bash
railway logs --tail          # Live logs
railway logs --tail -n 100   # Last 100 lines
```

**Netlify Logs:**
- Visit: https://app.netlify.com/projects/comeondost/deploys
- Click on deployment → View function logs

**Browser Console:**
- Open DevTools (F12)
- Network tab for API calls
- Console tab for errors

---

## 📱 Mobile & PWA

### Progressive Web App

**PWA features enabled:**
- Installable on mobile/desktop
- Offline support
- App icons (192x192, 512x512)
- Manifest.json configured
- Service worker for caching

**Install PWA:**
1. Visit https://comeondost.netlify.app on mobile
2. Tap "Add to Home Screen" (iOS) or banner prompt (Android)
3. App icon appears on home screen
4. Opens as standalone app

### Mobile APK (Android)

**Build APK using Capacitor:**

```bash
# 1. Install Capacitor
cd frontend
npm install @capacitor/core @capacitor/cli
npm install @capacitor/android

# 2. Initialize
npx cap init

# 3. Build web assets
npm run build

# 4. Add Android platform
npx cap add android

# 5. Copy web assets
npx cap copy android

# 6. Open in Android Studio
npx cap open android

# 7. Build APK in Android Studio:
# Build → Build Bundle(s) / APK(s) → Build APK(s)
```

**APK Location:**
```
frontend/android/app/build/outputs/apk/debug/app-debug.apk
```

### Mobile Icons

Icons already configured:
- `/public/icon-192x192.png` - PWA icon
- `/public/icon-512x512.png` - Splash screen
- `/public/favicon.png` - Browser icon

### GPS Location

**Mobile-optimized location detection:**
- High accuracy GPS on mobile
- Cell tower triangulation fallback
- 5-minute cache for auto-detect
- 1-minute cache for manual button

---

## ⚡ Performance & Security

### Performance Optimizations

**Frontend:**
- Code splitting (lazy loading for non-critical pages)
- Route-based chunking
- Main bundle: 87 KB gzipped
- Login/Dashboard: Instant load (no lazy loading)
- Other pages: 0.3-0.8s load time

**Backend:**
- Connection pooling (pg-pool)
- Health check caching
- Efficient database queries
- Indexed columns (email, oauth fields)

**CDN & Caching:**
- Netlify CDN for static assets
- Browser caching for chunks
- Service worker for offline

### Security Features

**Backend:**
- Helmet.js security headers
- CORS configured per service
- Rate limiting (express-rate-limit)
- SQL injection protection (parameterized queries)
- Password hashing (bcrypt)
- JWT token expiry
- Input validation

**Frontend:**
- XSS protection (React sanitization)
- HTTPS only in production
- Secure token storage
- CSP headers

**Environment:**
- Secrets in environment variables only
- Never commit credentials
- `.gitignore` for sensitive files
- Railway/Netlify secrets management

### Monitoring

**Health Endpoints:**
```bash
GET /health
{
  "status": "ok",
  "service": "auth-service",
  "timestamp": "2025-10-11T10:30:00Z",
  "uptimeSeconds": 3600,
  "checks": {
    "database": "healthy"
  },
  "version": "1.0.0"
}
```

**Metrics (Prometheus):**
```bash
GET /metrics
# Exports:
- http_requests_total
- http_request_duration_seconds
- process_cpu_usage
- process_memory_usage
```

---

## 📚 Additional Documentation

### In `/backend/docs/`:
- `HEALTH-METRICS.md` - Health endpoint specification
- `PROJECT-REFERENCES.md` - TypeScript project references
- `GOOGLE-OAUTH-WALKTHROUGH.md` - Detailed OAuth setup

### In `/backend/services/user-service/docs/`:
- `architecture/ADR-001-hex-migration.md` - Hexagonal architecture decision
- `architecture/ADR-002-remove-fallbacks.md` - Legacy code removal

### Service-Specific:
- `backend/services/auth-service/README.md`
- `backend/services/user-service/README.md`
- `backend/services/user-service/TESTING.md`
- `backend/services/shared/OBSERVABILITY.md`

### Root Documentation:
- `GOOGLE_OAUTH_SETUP_GUIDE.md` - Complete OAuth guide
- `database-schema.sql` - Full database schema
- `database-seed.sql` - Sample data
- `.github/copilot-instructions.md` - Development patterns

---

## 🎯 Next Steps & Roadmap

### Immediate (Optional):
- [ ] Enable Google OAuth (credentials setup)
- [ ] Set up email notifications
- [ ] Implement WebSocket for real-time features

### Short-term:
- [ ] Add job posting workflow
- [ ] Enhanced search filters
- [ ] Rating & review system
- [ ] Payment integration

### Long-term:
- [ ] Mobile apps (iOS/Android)
- [ ] AI-powered matching
- [ ] Multi-language support
- [ ] Analytics dashboard

---

## 📞 Support & Resources

### Quick Reference

**Commands:**
```bash
# Start all backend services
cd backend && npm run dev

# Start frontend
cd frontend && npm run dev

# Deploy to Railway
cd backend/services/[service] && railway up

# Deploy to Netlify
cd frontend && netlify deploy --prod --dir=dist

# Health checks
curl https://[service]-production.up.railway.app/health
```

**URLs:**
- Production: https://comeondost.netlify.app
- Railway Dashboard: https://railway.app/
- Netlify Dashboard: https://app.netlify.com/
- Neon Dashboard: https://console.neon.tech/

### Test Accounts

```
Contractor: john@example.com / password123
Worker: hanny@example.com / password456
```

---

**Last Updated**: October 11, 2025  
**Version**: 1.0.0  
**Status**: ✅ All systems operational
