"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.metricsMiddleware = void 0;
const prom_client_1 = __importDefault(require("prom-client"));
prom_client_1.default.collectDefaultMetrics();
const metricsMiddleware = (_req, res) => {
    res.set('Content-Type', prom_client_1.default.register.contentType);
    res.end(prom_client_1.default.register.metrics());
};
exports.metricsMiddleware = metricsMiddleware;
//# sourceMappingURL=metrics.js.map