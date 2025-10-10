// API Configuration
const isDevelopment = import.meta.env.MODE === 'development';
const isProduction = import.meta.env.MODE === 'production';

// Base API URLs for production and development
export const API_CONFIG = {
    AUTH_SERVICE: isProduction
        ? 'https://simple-auth-service-production.up.railway.app'
        : 'http://localhost:3001',

    USER_SERVICE: isProduction
        ? 'https://user-service-production-f141.up.railway.app'
        : 'http://localhost:3002',

    MATCHING_SERVICE: isProduction
        ? 'https://matching-service-production.up.railway.app'
        : 'http://localhost:3003',

    COMMUNICATION_SERVICE: isProduction
        ? 'https://communication-service-production-c165.up.railway.app'
        : 'http://localhost:3004',

    NOTIFICATION_SERVICE: isProduction
        ? 'https://notification-service-production-8738.up.railway.app'
        : 'http://localhost:3005'
};

// WebSocket URLs for real-time features
export const WS_CONFIG = {
    COMMUNICATION: isProduction
        ? import.meta.env.VITE_WS_COMMUNICATION_URL || 'wss://communication-service-production-c165.up.railway.app/ws'
        : 'ws://localhost:3004/ws',

    NOTIFICATION: isProduction
        ? import.meta.env.VITE_WS_NOTIFICATION_URL || 'wss://notification-service-production-8738.up.railway.app/ws'
        : 'ws://localhost:3005/ws'
};

// Demo mode - set to false to use real backend
// Demo mode removed. All API calls use real backend endpoints.
console.log('API Config:', { isDevelopment, isProduction, API_CONFIG });
