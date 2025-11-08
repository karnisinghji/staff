// Axios configuration with optimizations
import axios from 'axios';

// Create axios instance with timeout
// Increased to 15s to accommodate backend query timeout (5s) + network latency
export const apiClient = axios.create({
    timeout: 15000, // 15 second timeout (backend has 5s query timeout)
    headers: {
        'Content-Type': 'application/json',
    },
});

// Request interceptor - add auth token
apiClient.interceptors.request.use(
    (config) => {
        const token = localStorage.getItem('token');
        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
    },
    (error) => Promise.reject(error)
);

// Response interceptor - handle errors
apiClient.interceptors.response.use(
    (response) => response,
    (error) => {
        if (error.code === 'ECONNABORTED') {
            console.error('Request timeout after 15s:', error.config?.url);
            console.error('Method:', error.config?.method?.toUpperCase());
            console.error('Backend may be overloaded or query is too slow');
        }
        if (error.response?.status === 401) {
            // Token expired or invalid
            localStorage.removeItem('token');
            window.location.href = '/login';
        }
        if (error.response?.status >= 500) {
            console.error('Server error:', error.response.status, error.config?.url);
        }
        return Promise.reject(error);
    }
);

// Simple in-memory cache for GET requests
const cache = new Map<string, { data: any; timestamp: number }>();
const CACHE_DURATION = 30000; // 30 seconds

export const cachedGet = async (url: string, config?: any) => {
    const cacheKey = `${url}${JSON.stringify(config)}`;
    const cached = cache.get(cacheKey);

    if (cached && Date.now() - cached.timestamp < CACHE_DURATION) {
        return { data: cached.data, fromCache: true };
    }

    const response = await apiClient.get(url, config);
    cache.set(cacheKey, { data: response.data, timestamp: Date.now() });

    return response;
};

// Clear cache manually if needed
export const clearCache = () => cache.clear();
