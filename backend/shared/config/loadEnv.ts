import path from 'path';
import * as dotenv from 'dotenv';

interface EnvRequirements {
    required?: string[];
    serviceName: string;
    silent?: boolean; // if true, don't throw on missing; just log
}

export function loadEnv({ required = [], serviceName, silent = false }: EnvRequirements) {
    const serviceRoot = path.resolve(__dirname, '..', '..');
    // Attempt local .env in calling service directory (two levels up usually ../services/<name>/.env)
    const explicit = path.resolve(process.cwd(), 'backend', 'services');
    // Fallback: just run dotenv with default CWD, then with relative .env near compiled file
    dotenv.config();

    const missing = required.filter(k => !process.env[k]);
    if (missing.length && !silent) {
        throw new Error(`[${serviceName}] Missing required environment vars: ${missing.join(', ')}`);
    }
    return {
        get(key: string, def?: string) {
            const val = process.env[key];
            if (val === undefined) return def;
            return val;
        }
    };
}

export function requireSecret(name: string, serviceName: string) {
    const v = process.env[name];
    if (!v) {
        throw new Error(`[${serviceName}] Required secret ${name} not set`);
    }
    return v;
}