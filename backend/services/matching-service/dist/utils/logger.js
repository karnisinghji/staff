"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.logger = void 0;
// Delegates to shared logging factory with fallback minimal console logger if shared not resolvable
let loggerImpl;
try {
    // eslint-disable-next-line @typescript-eslint/no-var-requires
    // Three levels up: utils -> src -> matching-service -> (services) then shared
    const { createLogger } = require('../../../shared/src/logger');
    loggerImpl = createLogger({ serviceName: 'matching-service' });
}
catch (e) {
    const fallback = (level, message, meta) => {
        // basic structured line
        // eslint-disable-next-line no-console
        console.log(JSON.stringify({ level, message, service: 'matching-service', ...(meta || {}) }));
    };
    loggerImpl = {
        info: (m, meta) => fallback('info', m, meta),
        debug: (m, meta) => fallback('debug', m, meta),
        warn: (m, meta) => fallback('warn', m, meta),
        error: (m, meta) => fallback('error', m, meta)
    };
}
exports.logger = loggerImpl;
//# sourceMappingURL=logger.js.map