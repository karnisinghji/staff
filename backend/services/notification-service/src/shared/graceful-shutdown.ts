import { Server } from 'http';
import { Logger } from './logger';

interface ShutdownOptions {
    logger: Logger | Console;
    signals?: string[];
    timeoutMs?: number;
    beforeClose?: () => Promise<void> | void;
    afterClose?: () => Promise<void> | void;
}

export function enableGracefulShutdown(server: Server, opts: ShutdownOptions) {
    const { logger, signals = ['SIGINT', 'SIGTERM'], timeoutMs = 10000, beforeClose, afterClose } = opts;
    let shuttingDown = false;

    async function shutdown(signal: string) {
        if (shuttingDown) return;
        shuttingDown = true;
        logger.info?.(`[shutdown] ${signal} received; beginning graceful shutdown`);
        const timer = setTimeout(() => {
            logger.error?.('[shutdown] Timeout exceeded, forcing exit');
            process.exit(1);
        }, timeoutMs).unref();

        try { await beforeClose?.(); } catch (e: any) { logger.error?.(`[shutdown] beforeClose error: ${e?.message}`); }
        server.close(async (err?: Error) => {
            if (err) logger.error?.(`[shutdown] server close error: ${err.message}`);
            try { await afterClose?.(); } catch (e: any) { logger.error?.(`[shutdown] afterClose error: ${e?.message}`); }
            clearTimeout(timer);
            logger.info?.('[shutdown] graceful shutdown complete');
            process.exit(0);
        });
    }

    signals.forEach(sig => process.on(sig, () => shutdown(sig)));
    return shutdown;
}
