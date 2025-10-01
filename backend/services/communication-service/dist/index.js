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
const app_1 = require("./app");
const shared_1 = require("../../shared");
dotenv.config();
const PORT = process.env.PORT || 3004;
const app = (0, app_1.buildApp)(process.env.npm_package_version || '1.0.0');
const logger = (0, shared_1.createLogger)({ serviceName: 'communication-service' });
// Attach request context early
app.use(shared_1.requestContextMiddleware);
let server;
if (process.env.NODE_ENV !== 'test') {
    server = app.listen(PORT, () => {
        logger.info(`📞 Communication Service running on port ${PORT}`);
        logger.info(`🏥 Health check available at http://localhost:${PORT}/health`);
    });
    (0, shared_1.enableGracefulShutdown)(server, { logger });
}
exports.default = app;
//# sourceMappingURL=index.js.map