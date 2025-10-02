// API Configuration
const isDevelopment = import.meta.env.MODE === 'development';
const isProduction = import.meta.env.MODE === 'production';

// Base API URLs
export const API_CONFIG = {
    // For development - use localhost
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

// For production demo, we'll create mock responses
export const DEMO_MODE = isProduction;

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
            mockData = { success: true, token: 'demo-token-12345', user: { id: 1, email: 'demo@example.com', role: 'contractor' } };
        } else if (url.includes('/profile')) {
            mockData = { success: true, user: { id: 1, name: 'Demo User', email: 'demo@example.com', role: 'contractor' } };
        } else if (url.includes('/skills')) {
            mockData = { success: true, skills: ['plumbing', 'electrical', 'carpentry', 'painting', 'construction'] };
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