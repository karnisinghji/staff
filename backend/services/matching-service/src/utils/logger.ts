// Delegates to shared logging factory with fallback minimal console logger if shared not resolvable
let loggerImpl: any;
try {
    // eslint-disable-next-line @typescript-eslint/no-var-requires
    const { createLogger } = require('../shared/logger');
    loggerImpl = createLogger({ serviceName: 'matching-service' });
} catch (e) {
    const fallback = (level: string, message: string, meta?: any) => {
        // basic structured line
        // eslint-disable-next-line no-console
        console.log(JSON.stringify({ level, message, service: 'matching-service', ...(meta || {}) }));
    };
    loggerImpl = {
        info: (m: string, meta?: any) => fallback('info', m, meta),
        debug: (m: string, meta?: any) => fallback('debug', m, meta),
        warn: (m: string, meta?: any) => fallback('warn', m, meta),
        error: (m: string, meta?: any) => fallback('error', m, meta)
    };
}

export const logger = loggerImpl;