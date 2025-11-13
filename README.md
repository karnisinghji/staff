# ComeOnDost - Contractor/Worker Matching Platform

A full-stack contractor and worker matching platform with real-time messaging, team management, and mobile app support.

## 🌐 Live Application

**Web App**: [https://comeondost.web.app](https://comeondost.web.app)

## 📱 Download Android App

Get the full mobile experience with our native Android app!

<div align="center">
  
### [📥 Download APK (14 MB)](https://github.com/karnisinghji/staff/releases/download/v1.0.0/comeondost-v1.0.apk)

</div>

### 📥 How to Install:

1. **Click "Download APK" button above**
2. File will download directly (14 MB)
3. Open the downloaded APK file (check Downloads folder)
4. **Enable "Install from Unknown Sources"** if prompted:
   - Go to: **Settings → Security → Unknown Sources → ON**
   - Or: **Settings → Apps → Special Access → Install Unknown Apps** (Android 8+)
5. Tap **"Install"** and follow prompts

> **Note**: This is safe - the app is built by us and scanned. Enable unknown sources only for this installation.

### ✨ Mobile App Features:

- 🔔 **Push Notifications** - Get instant alerts for new messages and team requests
- 📍 **GPS Location** - Auto-detect your location for nearby worker/contractor search
- 💬 **Real-time Messaging** - Chat with potential team members
- 👥 **Team Management** - Send and receive team invitations
- 📊 **Profile Management** - Manage skills, contacts, and availability
- 🔒 **Secure Authentication** - OAuth login with Google/Facebook/Twitter

## 🏗️ Architecture

This is a **microservices-based platform** with:

### Backend Services (Node.js/TypeScript on Azure Container Apps)
- **auth-service** (port 3001) - JWT authentication & OAuth
- **user-service** (port 3002) - User profiles, contacts, skills
- **matching-service** (port 3003) - Job matching & team requests
- **communication-service** (port 3004) - Messaging & notifications
- **notification-service** (port 3005) - Push notifications via FCM

### Frontend
- **Web**: React + TypeScript + Vite (Firebase Hosting)
- **Mobile**: Capacitor + Android native (APK available above)

### Database
- **PostgreSQL** (Neon) - Shared across all services

## 🚀 Quick Start

### Prerequisites
- Node.js 18+
- PostgreSQL
- Firebase account (for push notifications)
- Azure account (for deployment)

### Backend Development

```bash
# Install dependencies
cd backend
npm install

# Set up environment variables
cp .env.example .env
# Edit .env with your DATABASE_URL, JWT_SECRET, etc.

# Run all services
npm run dev

# Run individual service
cd backend/services/auth-service
npm run dev
```

### Frontend Development

```bash
# Install dependencies
cd frontend
npm install

# Set up environment variables
cp .env.example .env

# Run development server
npm run dev

# Build for production
npm run build
```

### Mobile Development

```bash
cd frontend

# Build web assets
npm run build

# Sync with Android
npx cap sync android

# Open in Android Studio
npx cap open android

# Or build APK directly
cd android
./gradlew assembleDebug
```

## 📚 Documentation

- [Architecture Overview](docs/README.md)
- [API Documentation](docs/features/)
- [Deployment Guide](AZURE_DEPLOYMENT_SUCCESS.md)
- [Android Troubleshooting](ANDROID_NOTIFICATION_TROUBLESHOOTING.md)
- [Push Notifications Guide](PUSH_NOTIFICATIONS_GUIDE.md)

## 🧪 Testing

```bash
# Test all backend services
cd backend
npm test

# Test specific service
cd backend/services/user-service
npm test

# Test push notification flow
node test-push-notification-flow.js YOUR_AUTH_TOKEN
```

## 🔧 Key Features

### For Contractors
- Post job requirements
- Search for skilled workers by location
- Send team invitations
- Manage worker profiles and ratings

### For Workers
- Browse available jobs
- Showcase skills and experience
- Receive team invitations
- View job details and locations

### Matching Algorithm
- Location-based search (100+ Indian cities)
- GPS/geolocation support
- Skill-based filtering
- Distance calculation (radius search)

## 🌍 Supported Locations

**100+ Indian Cities** including:
- **Tier 1**: Delhi, Mumbai, Bangalore, Chennai, Kolkata, Hyderabad, Pune
- **Tier 2**: Ahmedabad, Jaipur, Surat, Lucknow, Kanpur, Nagpur, Indore
- **State Capitals** and major cities across India
- Alternative names supported (Bengaluru/Bangalore, etc.)

## 🔐 Security Features

- JWT authentication with refresh tokens
- OAuth 2.0 (Google, Facebook, Twitter)
- Rate limiting (500 requests/15 minutes)
- Helmet security headers
- Password hashing with bcrypt
- CORS protection
- SQL injection prevention

## 📊 Technology Stack

### Backend
- Node.js + TypeScript
- Express.js
- PostgreSQL (Neon)
- Firebase Admin SDK (FCM)
- JWT + bcrypt
- Winston (logging)
- Prometheus (metrics)

### Frontend
- React 18
- TypeScript
- Vite
- TailwindCSS
- React Router
- Axios
- Capacitor (mobile)

### Infrastructure
- Azure Container Apps (backend)
- Firebase Hosting (frontend)
- GitHub Actions (CI/CD)
- Neon PostgreSQL (database)

## 📝 Environment Variables

### Backend (.env)
```bash
DATABASE_URL=postgresql://user:pass@host/db
JWT_SECRET=your-secret-256bit
JWT_EXPIRES_IN=24h
CORS_ORIGINS=http://localhost:5173,https://comeondost.web.app
FIREBASE_SERVICE_ACCOUNT_JSON_B64=base64_encoded_json
LOG_LEVEL=info
```

### Frontend (.env)
```bash
VITE_ENV=development
```

## 🤝 Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License.

## 👥 Support

For issues and questions:
- 📧 Email: support@comeondost.com
- 🐛 Issues: [GitHub Issues](https://github.com/karnisinghji/staff/issues)
- 📚 Docs: [Documentation](docs/README.md)

## 🔄 Latest Updates

### Version 1.0 (November 2025)
- ✅ Push notifications with FCM
- ✅ GPS location detection
- ✅ Android 13+ notification permissions
- ✅ OAuth login (Google/Facebook/Twitter)
- ✅ Real-time messaging
- ✅ Team management features
- ✅ 100+ Indian cities support
- ✅ Enhanced mobile UI with bottom navigation

---

Made with ❤️ by the ComeOnDost Team
