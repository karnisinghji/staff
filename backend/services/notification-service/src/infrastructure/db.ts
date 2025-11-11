import { Pool } from 'pg';

let ensured = false;

export const pool = new Pool(
    process.env.DATABASE_URL
        ? {
            connectionString: process.env.DATABASE_URL,
            ssl: process.env.NODE_ENV === 'production' ? { rejectUnauthorized: false } : false,
            max: 10,
        }
        : {
            host: process.env.DB_HOST || 'localhost',
            port: parseInt(process.env.DB_PORT || '5432', 10),
            database: process.env.DB_NAME || 'contractor_worker_platform',
            user: process.env.DB_USER || 'postgres',
            password: process.env.DB_PASSWORD || 'PostgresNewMasterPassword!',
            max: 10,
        }
);

export async function ensureDeviceTokensTable(): Promise<void> {
    if (ensured) return;
    const sql = `
    CREATE TABLE IF NOT EXISTS device_tokens (
      user_id UUID NOT NULL,
      fcm_token TEXT NOT NULL,
      platform TEXT NOT NULL CHECK (platform IN ('android','ios')),
      device_info JSONB,
      created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
      updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
      PRIMARY KEY (user_id, platform)
    );
    CREATE INDEX IF NOT EXISTS idx_device_tokens_user ON device_tokens(user_id);
    CREATE INDEX IF NOT EXISTS idx_device_tokens_platform ON device_tokens(platform);
  `;
    await pool.query(sql);
    ensured = true;
}
