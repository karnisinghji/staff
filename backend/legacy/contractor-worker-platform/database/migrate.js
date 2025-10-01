const { Client } = require('pg');
const fs = require('fs');
const path = require('path');
require('dotenv').config({ path: '../.env' });

const client = new Client({
  host: process.env.DB_HOST || 'localhost',
  port: process.env.DB_PORT || 5432,
  database: process.env.DB_NAME || 'contractor_worker_platform',
  user: process.env.DB_USER || 'platform_user',
  password: process.env.DB_PASSWORD || 'platform_password',
});

async function runMigrations() {
  try {
    await client.connect();
    console.log('Connected to database');

    const migrationsDir = path.join(__dirname, 'migrations');
    const migrationFiles = fs.readdirSync(migrationsDir)
      .filter(file => file.endsWith('.sql'))
      .sort();

    for (const file of migrationFiles) {
      console.log(`Running migration: ${file}`);
      const migrationSQL = fs.readFileSync(path.join(migrationsDir, file), 'utf8');
      await client.query(migrationSQL);
      console.log(`✅ Migration ${file} completed`);
    }

    console.log('All migrations completed successfully!');
  } catch (error) {
    console.error('Migration failed:', error);
    process.exit(1);
  } finally {
    await client.end();
  }
}

runMigrations();