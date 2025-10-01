import express from 'express';
interface LoggerLike {
    info: (...args: any[]) => void;
    warn: (...args: any[]) => void;
    error: (...args: any[]) => void;
}
export interface BuildAppOptions {
    version?: string;
    serviceName?: string;
    metricsPath?: string;
    disableMetrics?: boolean;
    logger?: LoggerLike;
}
/**
 * Build the Notification Service Express app.
 * Supports two invocation forms for backward compatibility:
 *  - buildApp('1.0.0')
 *  - buildApp({ version: '1.0.0', serviceName: 'notification-service' })
 */
export declare function buildApp(versionOrOptions?: string | BuildAppOptions): express.Express;
export default buildApp;
