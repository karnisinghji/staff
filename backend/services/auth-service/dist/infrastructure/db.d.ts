import { Pool } from 'pg';
export declare const pool: Pool;
/**
 * Shuts down the shared database pool.
 * Call this during application shutdown to ensure clean exit.
 */
export declare function shutdownPool(): Promise<void>;
