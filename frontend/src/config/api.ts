// API Configuration
const isDevelopment = import.meta.env.MODE === 'development';
const isProduction = import.meta.env.MODE === 'production';

// Base API URLs for production and development
export const API_CONFIG = {
    AUTH_SERVICE: isProduction
        ? 'https://auth-service.delightfulflower-04821c4b.southeastasia.azurecontainerapps.io/api/auth'
        : 'http://localhost:3001/api/auth',

    USER_SERVICE: isProduction
        ? 'https://user-service.delightfulflower-04821c4b.southeastasia.azurecontainerapps.io/api/users'
        : 'http://localhost:3002/api/users',

    MATCHING_SERVICE: isProduction
        ? 'https://matching-service.delightfulflower-04821c4b.southeastasia.azurecontainerapps.io/api/matching'
        : 'http://localhost:3003/api/matching',

    COMMUNICATION_SERVICE: isProduction
        ? 'https://communication-service.delightfulflower-04821c4b.southeastasia.azurecontainerapps.io/api/communication'
        : 'http://localhost:3004/api/communication',

    NOTIFICATION_SERVICE: isProduction
        ? 'https://notification-service.delightfulflower-04821c4b.southeastasia.azurecontainerapps.io'
        : 'http://localhost:3005'
};

// WebSocket URLs for real-time features
export const WS_CONFIG = {
    COMMUNICATION: isProduction
        ? 'wss://communication-service.delightfulflower-04821c4b.southeastasia.azurecontainerapps.io/ws'
        : 'ws://localhost:3004/ws',

    NOTIFICATION: isProduction
        ? 'wss://notification-service.delightfulflower-04821c4b.southeastasia.azurecontainerapps.io/ws'
        : 'ws://localhost:3005/ws'
};

// Demo mode - set to false to use real backend
// Demo mode removed. All API calls use real backend endpoints.
console.log('API Config:', { isDevelopment, isProduction, API_CONFIG });
