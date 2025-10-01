declare global {
    namespace Express {
        interface Request {
            user?: {
                sub: string;      // User ID from JWT 
                roles: string[];  // User roles array from JWT
                id: string;       // Mapped user ID for compatibility
                role: string;     // Primary role for compatibility
                iat?: number;     // Issued at timestamp
                exp?: number;     // Expiry timestamp
            };
        }
    }
}

export { };
