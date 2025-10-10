// 📦 Real Database Configuration
// Switch from demo mode to real Neon PostgreSQL database

// Environment detection
const isDevelopment = import.meta.env.MODE === 'development';
const isProduction = import.meta.env.MODE === 'production';

// Real API endpoints (update these with your deployed backend URLs)
export const API_CONFIG = {
    AUTH_SERVICE: isDevelopment
        ? 'http://localhost:3001/api/auth'
        : 'https://simple-auth-service-production.up.railway.app/api/auth',

    USER_SERVICE: isDevelopment
        ? 'http://localhost:3002/api/users'
        : 'https://user-service-production-f141.up.railway.app/api/users',

    MATCHING_SERVICE: isDevelopment
        ? 'http://localhost:3003/api/matching'
        : 'https://matching-service-production.up.railway.app/api/matching',

    COMMUNICATION_SERVICE: isDevelopment
        ? 'http://localhost:3004/api/communication'
        : 'https://communication-service-production-c165.up.railway.app/api/communication',

    NOTIFICATION_SERVICE: isDevelopment
        ? 'http://localhost:3005/api/notification'
        : 'https://notification-service-production-8738.up.railway.app/api/notification'
};

// Demo API configuration (current)
// Real fetch function for production database
export const apiFetch = async (url: string, options: RequestInit = {}): Promise<Response> => {
    const token = localStorage.getItem('token');
    const headers = {
        'Content-Type': 'application/json',
        ...(token && { 'Authorization': `Bearer ${token}` }),
        ...options.headers,
    };
    return fetch(url, {
        ...options,
        headers,
    });
};

console.log('API Configuration:', {
    isDevelopment,
    isProduction,
    API_CONFIG
});