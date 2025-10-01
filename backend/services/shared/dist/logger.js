"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
exports.createLogger = createLogger;
const winston = __importStar(require("winston"));
const request_context_1 = require("./request-context");
function createLogger({ serviceName, level }) {
    const envLevel = process.env.LOG_LEVEL;
    const resolvedLevel = (level || envLevel || (process.env.NODE_ENV === 'production' ? 'info' : 'debug')).toLowerCase();
    const structured = (process.env.LOG_FORMAT || '').toLowerCase() === 'json';
    const baseFormat = winston.format.combine(winston.format.timestamp(), winston.format.errors({ stack: true }));
    const jsonPrinter = winston.format.printf(({ timestamp, level, message, service = serviceName, stack, ...meta }) => {
        const requestId = (0, request_context_1.getRequestId)();
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
        const requestId = (0, request_context_1.getRequestId)();
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
//# sourceMappingURL=logger.js.map