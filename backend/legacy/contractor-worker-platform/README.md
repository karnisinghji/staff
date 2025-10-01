# Contractor & Worker Matching Platform

A microservices-based platform that connects contractors with workers (carpenters, plumbers, laborers) for mutual discovery, contact management, and direct communication.

## 🏗️ Architecture

This project follows a microservices architecture with the following components:

### Backend Services
- **Auth Service** - JWT authentication & role management
- **User Service** - Profile & contact management
- **Matching Service** - Location & skill-based recommendations
- **Communication Service** - Messaging & calling functionality
- **Notification Service** - Push notifications & reminders
- **API Gateway** - Request routing & load balancing

### Frontend
- **React Native** - Cross-platform mobile & web application

### Database
- **PostgreSQL** - Primary database with pgAdmin

## 📁 Project Structure

```
contractor-worker-platform/
├── backend/
│   ├── services/
│   │   ├── auth-service/
│   │   ├── user-service/
│   │   ├── matching-service/
│   │   ├── communication-service/
│   │   └── notification-service/
│   ├── shared/
│   └── api-gateway/
├── frontend/
├── database/
├── docker/
└── docs/
```

## 🚀 Getting Started

### Prerequisites
- Node.js (v18+)
- PostgreSQL
- Docker & Docker Compose
- React Native CLI
- Expo CLI (optional)

### Installation

1. Clone the repository
2. Install dependencies for each service
3. Set up environment variables
4. Run database migrations
5. Start services with Docker Compose

## How to Run

### 1. Prerequisites
- Node.js (v18+)
- Docker & Docker Compose
- PostgreSQL

### 2. Clone the Repository
```sh
git clone <your-repo-url>
cd contractor-worker-platform
```

### 3. Install Dependencies
```sh
npm install
```
For frontend:
```sh
cd frontend
npm install
```

### 4. Set Up Environment Variables
- Copy `.env.example` to `.env` and fill in required values.

### 5. Start Services with Docker Compose
```sh
docker-compose up --build
```

### 6. Run Frontend (Development)
```sh
cd frontend
npm run dev
```
Visit `http://localhost:5173` (or your configured port).

### 7. Run Tests
- Backend: `npm test` in each service directory
- Frontend: `npm test` in the `frontend` directory

### 8. Access Services
- API Gateway: `http://localhost:3000/api`
- Frontend: `http://localhost:5173`
- Database: `localhost:5432` (Postgres)
- Monitoring: `http://localhost:9090` (Prometheus), `http://localhost:3008` (Grafana)

## 👥 User Roles

### Contractors
- Search and find workers
- Maintain contact lists
- Activate "need worker" status (3-hour window)
- Direct communication with workers

### Workers
- Search and find contractors
- Maintain contact lists
- Activate "need job" status
- Direct communication with contractors

## 📋 Core Features

- ✅ JWT-based authentication
- ✅ Location & skill-based matching
- ✅ Contact management
- ✅ Availability status tracking
- ✅ In-app communication
- ✅ Comprehensive logging & error handling

## 🔮 Future Enhancements

- Ratings & reviews system
- Payment gateway integration
- AI-powered matching algorithms
- Offline mode capabilities

## 📄 Documentation

Detailed documentation is available in the `docs/` directory:
- API Documentation
- Database Schema
- Deployment Guide
- Development Guidelines

## 📝 Handoff & Runbook
- All phases, scaling, and security procedures are documented in `PHASES.md` and `SECURITY-SCALING.md`.
- For monitoring and dashboards, see `monitoring-stack.md`.
- For API specification, see `docs/openapi.yaml` (to be completed).
- For questions, see the owner/contact section in `PHASES.md`.

## 🤝 Contributing

Please read our contributing guidelines before submitting pull requests.

## 📜 License

This project is licensed under the MIT License.