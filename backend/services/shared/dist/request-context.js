"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.requestContextMiddleware = void 0;
exports.getRequestId = getRequestId;
exports.getRequestDurationMs = getRequestDurationMs;
const node_async_hooks_1 = require("node:async_hooks");
const crypto_1 = require("crypto");
const storage = new node_async_hooks_1.AsyncLocalStorage();
const requestContextMiddleware = (req, _res, next) => {
    const ctx = { requestId: req.headers['x-request-id'] || (0, crypto_1.randomUUID)(), startTime: Date.now() };
    storage.run(ctx, () => next());
};
exports.requestContextMiddleware = requestContextMiddleware;
function getRequestId() {
    return storage.getStore()?.requestId;
}
function getRequestDurationMs() {
    const store = storage.getStore();
    return store ? Date.now() - store.startTime : undefined;
}
//# sourceMappingURL=request-context.js.map