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
const dotenv = __importStar(require("dotenv"));
const logger_1 = require("./utils/logger");
const app_1 = require("./app");
const shared_1 = require("../../shared");
dotenv.config();
const app = (0, app_1.buildApp)();
// Attach request context (cast to any to avoid differing Express type versions)
// eslint-disable-next-line @typescript-eslint/no-explicit-any
app.use(shared_1.requestContextMiddleware);
const PORT = process.env.PORT || 3003;
let server;
if (process.env.NODE_ENV !== 'test') {
    server = app.listen(PORT, () => {
        logger_1.logger.info(`🔍 Matching Service running on port ${PORT}`);
        logger_1.logger.info(`🏥 Health check available at http://localhost:${PORT}/health`);
        logger_1.logger.info(`🔧 Max matching distance: ${process.env.MAX_MATCHING_DISTANCE_KM || 50}km`);
        logger_1.logger.info(`🎯 Default search radius: ${process.env.DEFAULT_SEARCH_RADIUS_KM || 25}km`);
    });
    (0, shared_1.enableGracefulShutdown)(server, { logger: logger_1.logger });
}
else {
    logger_1.logger.info('Matching Service initialized in test mode (no listen)');
}
exports.default = app;
//# sourceMappingURL=index.js.map