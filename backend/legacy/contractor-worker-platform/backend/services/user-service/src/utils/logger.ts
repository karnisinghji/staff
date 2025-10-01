// Attempt to use shared logger; fallback to inline winston if path resolution fails at runtime.
let sharedCreate: any;
try {
    // eslint-disable-next-line @typescript-eslint/no-var-requires
    sharedCreate = require('../../../shared/src/logger').createLogger;
} catch {
    try {
        sharedCreate = require('../../../../shared/src/logger').createLogger; // alternative relative
    } catch {
        sharedCreate = null;
    }
}
import winston from 'winston';
function localCreateLogger() {
    return winston.createLogger({
        level: process.env.NODE_ENV === 'production' ? 'info' : 'debug',
        transports: [new winston.transports.Console({ format: winston.format.simple() })]
    });
}
export const logger = sharedCreate ? sharedCreate({ serviceName: 'user-service' }) : localCreateLogger();