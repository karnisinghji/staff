import * as winston from 'winston';
export interface LoggerOptions {
    serviceName: string;
    level?: string;
}
export declare function createLogger({ serviceName, level }: LoggerOptions): winston.Logger;
export type Logger = ReturnType<typeof createLogger>;
