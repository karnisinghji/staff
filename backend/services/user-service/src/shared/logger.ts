import * as winston from 'winston';
import { getRequestId } from './request-context';

export interface LoggerOptions {
    serviceName: string;
    level?: string;
}

export function createLogger({ serviceName, level }: LoggerOptions) {
    const envLevel = process.env.LOG_LEVEL;
    const resolvedLevel = (level || envLevel || (process.env.NODE_ENV === 'production' ? 'info' : 'debug')).toLowerCase();
    const structured = (process.env.LOG_FORMAT || '').toLowerCase() === 'json';
    const baseFormat = winston.format.combine(
        winston.format.timestamp(),
        winston.format.errors({ stack: true })
    );

    const jsonPrinter = winston.format.printf(({ timestamp, level, message, service = serviceName, stack, ...meta }) => {
        const requestId = getRequestId();
        return JSON.stringify({
            ts: timestamp,
            level,
            service,
            msg: message,
            ...(requestId ? { requestId } : {}),
            ...(stack ? { stack } : {}),
            ...meta
        });
    });

    const humanPrinter = winston.format.printf(({ timestamp, level, message, service = serviceName, ...meta }) => {
        const requestId = getRequestId();
        const metaStr = Object.keys(meta).length ? ` ${JSON.stringify(meta)}` : '';
        return `${timestamp} ${service} [${level}]${requestId ? ' (' + requestId + ')' : ''} ${message}${metaStr}`;
    });

    const format = structured
        ? winston.format.combine(baseFormat, jsonPrinter)
        : winston.format.combine(baseFormat, winston.format.colorize(), humanPrinter);

    const logger = winston.createLogger({
        level: resolvedLevel,
        format,
        transports: [new winston.transports.Console()]
    });

    if (process.env.NODE_ENV === 'production') {
        logger.add(new winston.transports.File({ filename: `logs/${serviceName}-error.log`, level: 'error' }));
        logger.add(new winston.transports.File({ filename: `logs/${serviceName}-combined.log` }));
    }
    return logger;
}

export type Logger = ReturnType<typeof createLogger>;
