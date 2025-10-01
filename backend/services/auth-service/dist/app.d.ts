import express from 'express';
interface LoggerLike {
    info: (...a: any[]) => void;
    warn: (...a: any[]) => void;
    error: (...a: any[]) => void;
}
export interface BuildAppOptions {
    logger?: LoggerLike;
    disableMetrics?: boolean;
    metricsPath?: string;
    serviceName?: string;
}
export declare function buildApp(opts?: BuildAppOptions): express.Express;
export default buildApp;
