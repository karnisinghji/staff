import * as dotenv from 'dotenv';
import path from 'path';

interface Options {
    required?: string[];
    serviceName: string;
}

export function initEnv({ required = [], serviceName }: Options) {
    // Try service-local .env
    const envPath = path.resolve(__dirname, '..', '..', '.env');
    dotenv.config({ path: envPath });
    dotenv.config();
    const missing = required.filter(k => !process.env[k]);
    if (missing.length) {
        throw new Error(`[${serviceName}] Missing required environment variables: ${missing.join(', ')}`);
    }
    return envPath;
}

export function getRequired(name: string, serviceName: string) {
    const v = process.env[name];
    if (!v) throw new Error(`[${serviceName}] Required env var ${name} not set`);
    return v;
}