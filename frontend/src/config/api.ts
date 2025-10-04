// API Configuration
const isDevelopment = import.meta.env.MODE === 'development';
const isProduction = import.meta.env.MODE === 'production';

// Base API URLs for production and development
export const API_CONFIG = {
    AUTH_SERVICE: isProduction 
        ? 'https://simple-auth-service-production.up.railway.app/api/auth'
        : 'http://localhost:3001/api/auth',

    USER_SERVICE: isProduction
        ? 'https://user-service-production.up.railway.app/api/users'
        : 'http://localhost:3002/api/users',

    MATCHING_SERVICE: isProduction
        ? 'https://matching-service-production.up.railway.app/api/matching'
        : 'http://localhost:3003/api/matching',

    COMMUNICATION_SERVICE: isProduction
        ? 'https://communication-service-production.up.railway.app/api/communication'
        : 'http://localhost:3004/api/communication',

    NOTIFICATION_SERVICE: isProduction
        ? 'https://notification-service-production.up.railway.app/api/notification'
        : 'http://localhost:3005/api/notification'
};

// WebSocket URLs for real-time features
export const WS_CONFIG = {
    COMMUNICATION: isProduction
        ? import.meta.env.VITE_WS_COMMUNICATION_URL || 'wss://communication-service-production.up.railway.app/ws'
        : 'ws://localhost:3004/ws',

    NOTIFICATION: isProduction
        ? import.meta.env.VITE_WS_NOTIFICATION_URL || 'wss://notification-service-production.up.railway.app/ws'
        : 'ws://localhost:3005/ws'
};

// Demo mode - set to false to use real backend
// Set to true if you want to test with mock data (no backend needed)
export const DEMO_MODE = import.meta.env.VITE_DEMO_MODE === 'true' || false;

// Demo fetch function that returns mock data in production
export const demoFetch = async (url: string, options: RequestInit = {}): Promise<Response> => {
    // In production, return mock responses
    if (DEMO_MODE) {
        console.log('Demo mode: Simulating API call to', url);

        // Mock successful responses based on URL patterns
        let mockData: any = { success: true, message: 'Demo mode - operation successful' };

        if (url.includes('/signup')) {
            mockData = { success: true, message: 'Demo: Account created successfully! You can now explore the app.' };
        } else if (url.includes('/login')) {
            // Create a valid JWT-like token for demo (header.payload.signature)
            const demoPayload = {
                id: 1,
                email: 'demo@example.com',
                role: 'contractor',
                exp: Math.floor(Date.now() / 1000) + (24 * 60 * 60) // expires in 24 hours
            };
            const demoToken = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.' +
                btoa(JSON.stringify(demoPayload)) +
                '.demo-signature';
            mockData = {
                success: true,
                accessToken: demoToken,
                user: { id: 1, email: 'demo@example.com', role: 'contractor', name: 'Demo User' }
            };
        } else if (url.includes('/profile')) {
            mockData = { success: true, user: { id: 1, name: 'Demo User', email: 'demo@example.com', role: 'contractor' } };
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

        // Simulate network delay
        await new Promise(resolve => setTimeout(resolve, 800));

        return new Response(JSON.stringify(mockData), {
            status: 200,
            statusText: 'OK',
            headers: { 'Content-Type': 'application/json' }
        });
    }

    // In development, use regular fetch
    return fetch(url, options);
};

console.log('API Config:', { isDevelopment, isProduction, API_CONFIG, DEMO_MODE });