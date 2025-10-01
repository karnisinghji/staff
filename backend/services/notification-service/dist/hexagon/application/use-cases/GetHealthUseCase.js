"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.GetHealthUseCase = void 0;
class GetHealthUseCase {
    constructor(version) {
        this.version = version;
    }
    execute() { return { service: 'Notification Service', status: 'healthy', timestamp: new Date().toISOString(), version: this.version }; }
}
exports.GetHealthUseCase = GetHealthUseCase;
//# sourceMappingURL=GetHealthUseCase.js.map