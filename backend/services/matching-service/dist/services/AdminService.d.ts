import { MatchWeights } from '../types';
export declare class AdminService {
    private cache;
    private ttlMs;
    private listenClient;
    constructor();
    private startListener;
    /**
     * Shutdown the listener client if present. Does not end the shared pool.
     */
    shutdown(): Promise<void>;
    /**
     * Clear in-memory cache (useful for tests / immediate invalidation)
     */
    clearCache(): void;
    getDefaultWeights(): Promise<MatchWeights>;
    updateDefaultWeights(weights: MatchWeights): Promise<MatchWeights>;
}
export declare const adminService: AdminService;
