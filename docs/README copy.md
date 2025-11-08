# 🚀 ComeOnDost - Contractor/Worker Matching Platform

**Full-stack microservices platform connecting contractors with workers across India**

[![Production](https://img.shields.io/badge/status-live-brightgreen)](https://comeondost.web.app)
[![Railway](https://img.shields.io/badge/backend-railway-blueviolet)](https://railway.app/)
[![Firebase](https://img.shields.io/badge/frontend-firebase-orange)](https://comeondost.web.app)

---

## 🌐 Live Application

**Production URL**: https://comeondost.web.app  
**Alternative URL**: https://comeondost.firebaseapp.com

**Backend Services**:
- Auth: https://auth-service-production-d5c8.up.railway.app
- User: https://user-service-production-f141.up.railway.app
- Matching: https://matching-service-production.up.railway.app
- Communication: https://communication-service-production-c165.up.railway.app
- Notification: https://notification-service-production-8738.up.railway.app

---

## 📚 Documentation

### 👉 **Start Here**
**[Complete Project Guide](./docs/COMPLETE_GUIDE.md)** - Comprehensive documentation covering everything

### 📂 **Organized by Topic**
- **[Deployment](./docs/deployment/)** - Railway & Netlify deployment guides
- **[Database](./docs/database/)** - PostgreSQL/Neon setup & backup
- **[OAuth](./docs/oauth/)** - Google OAuth configuration
- **[Features](./docs/features/)** - GPS location, notifications, etc.
- **[Mobile](./docs/mobile/)** - APK build & PWA installation
- **[Troubleshooting](./docs/troubleshooting/)** - Debug guides

See **[docs/README.md](./docs/README.md)** for complete documentation index.

---

## 🏗️ Tech Stack

### Backend
- **Runtime**: Node.js 18+ with TypeScript
- **Architecture**: Microservices (5 services)
- **Database**: PostgreSQL (Neon)
- **Auth**: JWT + OAuth (Google)
- **Deployment**: Railway

### Frontend
- **Framework**: React 18 + TypeScript
- **Build**: Vite
- **Routing**: React Router
- **PWA**: Service Worker + Manifest
- **Deployment**: Netlify

---

## 🚀 Quick Start

### Prerequisites
```bash
node >= 18
npm >= 9
postgresql
```

### Local Development

```bash
# 1. Clone repository
git clone <repo-url>
cd staff

# 2. Install dependencies
cd backend && npm install
cd ../frontend && npm install

# 3. Setup environment
cp backend/.env.example backend/.env
# Edit backend/.env with your DATABASE_URL and JWT_SECRET

# 4. Start backend (all 5 services)
cd backend
npm run dev
# Services run on ports 3001-3005

# 5. Start frontend (new terminal)
cd frontend
npm run dev
# Opens at http://localhost:5173
```

### Environment Variables

**Required for backend**:
```bash
DATABASE_URL=postgresql://user:pass@host/db?sslmode=require
JWT_SECRET=your-256-bit-secret-key
```

**Optional for OAuth**:
```bash
GOOGLE_CLIENT_ID=your-google-client-id
GOOGLE_CLIENT_SECRET=your-google-client-secret
```

See [docs/COMPLETE_GUIDE.md](./docs/COMPLETE_GUIDE.md#environment-variables) for full list.

---

## 📦 Project Structure

```
staff/
├── backend/                  # Monorepo for all backend services
│   ├── services/
│   │   ├── auth-service/     # Authentication (port 3001)
│   │   ├── user-service/     # User profiles (port 3002)
│   │   ├── matching-service/ # Job matching (port 3003)
│   │   ├── communication-service/ # Messaging (port 3004)
│   │   ├── notification-service/  # Notifications (port 3005)
│   │   └── shared/           # Shared utilities
│   ├── docs/                 # Backend documentation
│   └── package.json          # Workspace root
├── frontend/                 # React frontend
│   ├── src/
│   │   ├── features/         # Feature modules
│   │   ├── contexts/         # React contexts
│   │   ├── utils/            # Utilities (location, etc.)
│   │   └── App.tsx           # Main app
│   └── dist/                 # Build output
├── docs/                     # 📚 Project documentation
│   ├── COMPLETE_GUIDE.md     # 👈 START HERE
│   ├── deployment/           # Deployment guides
│   ├── database/             # Database guides
│   ├── oauth/                # OAuth setup
│   ├── features/             # Feature guides
│   ├── mobile/               # Mobile/PWA guides
│   ├── troubleshooting/      # Debug guides
│   └── archive/              # Historical docs
├── database-schema.sql       # PostgreSQL schema
├── database-seed.sql         # Sample data
└── scripts/                  # Utility scripts
```

---

## ✨ Key Features

### 🔍 **Smart Matching**
- Location-based search (100+ Indian cities)
- GPS auto-detection on mobile
- Skill-based filtering
- Team request system

### 📱 **Mobile-First**
- Progressive Web App (PWA)
- Installable on mobile/desktop
- Responsive design
- GPS location detection

### 🔐 **Authentication**
- Email/password registration ✅
- Google OAuth ✅
- JWT tokens (15min access, 7 day refresh)
- Secure password hashing

### 🗺️ **Location Features**
- 100+ Indian cities database
- Auto-detect via GPS
- Manual location selection
- Radius-based search (5-100km)
- Shows city names (not coordinates)

### 💬 **Communication**
- Direct messaging
- Real-time notifications (planned)
- Team invitations
- Job applications

---

## 🧪 Testing

### Run Tests
```bash
# All backend tests
cd backend
npm test

# Specific service
cd backend/services/user-service
npm test

# Frontend tests
cd frontend
npm test
```

### Test Accounts
```
Contractor: john@example.com / password123
Worker: hanny@example.com / password456
```

---

## 🚢 Deployment

### Deploy Everything
```bash
# Backend to Railway
cd backend
./deploy-to-railway.sh

# Frontend to Netlify
cd frontend
npm run build
netlify deploy --prod --dir=dist
```

See **[docs/deployment/](./docs/deployment/)** for detailed guides.

---

## 🐛 Troubleshooting

### Health Checks
```bash
# Check all services
for service in auth user matching communication notification; do
  curl https://${service}-service-production.up.railway.app/health
done
```

### Common Issues
- **CORS errors**: Check `CORS_ORIGINS` in Railway
- **JWT invalid**: Ensure `JWT_SECRET` is same across services
- **DB connection**: Verify `DATABASE_URL` format
- **OAuth 500**: Set Google credentials in Railway

See **[docs/troubleshooting/](./docs/troubleshooting/)** for more help.

---

## 📊 Service Health

All services expose `/health` endpoint:

```json
{
  "status": "ok",
  "service": "auth-service",
  "timestamp": "2025-10-11T10:30:00Z",
  "uptimeSeconds": 3600,
  "checks": {
    "database": "healthy"
  }
}
```

---

## 🎯 Development Commands

### Backend
```bash
# Start all services with colored output
cd backend && npm run dev

# Start specific service
cd backend/services/auth-service && npm run dev

# Build all
cd backend && npm run build:all

# Run tests
cd backend && npm test
```

### Frontend
```bash
# Development server
cd frontend && npm run dev

# Build for production
cd frontend && npm run build

# Preview build
cd frontend && npm run preview
```

---

## 🔒 Security

- ✅ JWT authentication
- ✅ Password hashing (bcrypt)
- ✅ CORS configured
- ✅ Rate limiting
- ✅ SQL injection protection
- ✅ XSS protection
- ✅ Helmet security headers
- ✅ HTTPS in production

See **[docs/troubleshooting/SECURITY_VULNERABILITIES.md](./docs/troubleshooting/SECURITY_VULNERABILITIES.md)** for best practices.

---

## 📈 Performance

### Frontend
- Main bundle: 87 KB gzipped
- Login/Dashboard: Instant load
- Other pages: 0.3-0.8s
- PWA offline support

### Backend
- Response time: 0.4-0.7s
- Connection pooling
- Indexed database queries
- Health check caching

---

## 🤝 Contributing

1. Fork the repository
2. Create feature branch (`git checkout -b feature/amazing-feature`)
3. Commit changes (`git commit -m 'Add amazing feature'`)
4. Push to branch (`git push origin feature/amazing-feature`)
5. Open Pull Request

---

## 📝 License

This project is proprietary. All rights reserved.

---

## 📞 Support

### Documentation
- **Main Guide**: [docs/COMPLETE_GUIDE.md](./docs/COMPLETE_GUIDE.md)
- **All Docs**: [docs/README.md](./docs/README.md)

### External Links
- **Railway Dashboard**: https://railway.app/
- **Netlify Dashboard**: https://app.netlify.com/
- **Neon Database**: https://console.neon.tech/

---

## 🎉 Status

✅ **All systems operational**

- Backend: 5/5 services healthy
- Frontend: Live on Netlify
- Database: Neon PostgreSQL connected
- OAuth: Email/password working, Google OAuth ready
- Features: Location search, matching, messaging

**Version**: 1.0.0  
**Last Updated**: October 11, 2025

---

**Built with ❤️ for Indian contractors and workers**
