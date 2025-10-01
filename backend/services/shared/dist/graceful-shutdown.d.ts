import { Server } from 'http';
import { Logger } from './logger';
interface ShutdownOptions {
    logger: Logger | Console;
    signals?: string[];
    timeoutMs?: number;
    beforeClose?: () => Promise<void> | void;
    afterClose?: () => Promise<void> | void;
}
export declare function enableGracefulShutdown(server: Server, opts: ShutdownOptions): (signal: string) => Promise<void>;
export {};
