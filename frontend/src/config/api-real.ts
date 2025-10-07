// 📦 Real Database Configuration
// Switch from demo mode to real Neon PostgreSQL database

// Environment detection
const isDevelopment = import.meta.env.MODE === 'development';
const isProduction = import.meta.env.MODE === 'production';

// Real API endpoints (update these with your deployed backend URLs)
export const REAL_API_CONFIG = {
    // Update these URLs when you deploy your backend services
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
export const DEMO_API_CONFIG = {
    AUTH_SERVICE: isDevelopment
        ? 'http://localhost:3001/api/auth'
        : '/api/auth',

    USER_SERVICE: isDevelopment
        ? 'http://localhost:3002/api/users'
        : '/api/users',

    MATCHING_SERVICE: isDevelopment
        ? 'http://localhost:3003/api/matching'
        : '/api/matching',

    COMMUNICATION_SERVICE: isDevelopment
        ? 'http://localhost:3004/api/communication'
        : '/api/communication',

    NOTIFICATION_SERVICE: isDevelopment
        ? 'http://localhost:3005/api/notification'
        : '/api/notification'
};

// 🎛️ TOGGLE BETWEEN DEMO AND REAL DATABASE
// Set to true for demo mode, false for real database
export const USE_DEMO_MODE = false; // 👈 Demo mode disabled, use real APIs

// Use appropriate configuration based on mode
export const API_CONFIG = USE_DEMO_MODE ? DEMO_API_CONFIG : REAL_API_CONFIG;

// Demo mode flag for components
export const DEMO_MODE = USE_DEMO_MODE && isProduction;

// Real fetch function for production database
export const realFetch = async (url: string, options: RequestInit = {}): Promise<Response> => {
    // Add authentication headers if token exists
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

// Demo fetch function (current implementation)
export const demoFetch = async (url: string, options: RequestInit = {}): Promise<Response> => {
    if (DEMO_MODE) {
        console.log('Demo mode: Simulating API call to', url);

        let mockData: any = { success: true, message: 'Demo mode - operation successful' };

        if (url.includes('/signup')) {
            mockData = { success: true, message: 'Demo: Account created successfully! You can now explore the app.' };
        } else if (url.includes('/login')) {
            const demoPayload = {
                id: 1,
                email: 'demo@example.com',
                role: 'contractor',
                exp: Math.floor(Date.now() / 1000) + (24 * 60 * 60)
            };
            const demoToken = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.' +
                btoa(JSON.stringify(demoPayload)) +
                '.demo-signature';
            mockData = {
                success: true,
                accessToken: demoToken,
                user: { id: 1, email: 'demo@example.com', role: 'contractor', name: 'Demo User' }
            };
        } else if (url.includes('/skills')) {
            mockData = { success: true, skills: ['plumbing', 'electrical', 'carpentry', 'painting', 'construction'] };
        } else if (url.includes('/team-requests/received')) {
            mockData = {
                success: true, requests: [
                    { id: 1, senderName: 'John Doe', projectTitle: 'Home Renovation', message: 'Need plumbing expert', date: '2025-10-01' },
                    { id: 2, senderName: 'Jane Smith', projectTitle: 'Kitchen Remodel', message: 'Looking for electrician', date: '2025-10-02' }
                ]
            };
        } else if (url.includes('/my-team')) {
            mockData = {
                success: true, team: [
                    { id: 1, name: 'Mike Wilson', role: 'Electrician', status: 'active' },
                    { id: 2, name: 'Sarah Johnson', role: 'Plumber', status: 'active' }
                ]
            };
        } else if (url.includes('/profile')) {
            mockData = {
                success: true, user: {
                    id: 1, name: 'Demo User', email: 'demo@example.com', role: 'contractor',
                    phoneNumber: '+1234567890', location: 'New York, NY'
                }
            };
        }

        await new Promise(resolve => setTimeout(resolve, 800));

        return new Response(JSON.stringify(mockData), {
            status: 200,
            statusText: 'OK',
            headers: { 'Content-Type': 'application/json' }
        });
    }

    // Fallback to real fetch if not in demo mode
    return realFetch(url, options);
};

// Main fetch function - automatically chooses demo or real based on USE_DEMO_MODE
export { demoFetch as apiFetch };

console.log('API Configuration:', {
    USE_DEMO_MODE,
    DEMO_MODE,
    isDevelopment,
    isProduction,
    API_CONFIG
});