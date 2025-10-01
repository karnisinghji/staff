"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ForbiddenError = exports.UnauthorizedError = exports.ConflictError = exports.ValidationError = exports.NotFoundError = exports.DomainError = void 0;
class DomainError extends Error {
    constructor(message, code, status, details) {
        super(message);
        this.code = code;
        this.status = status;
        this.details = details;
        Object.setPrototypeOf(this, new.target.prototype);
    }
}
exports.DomainError = DomainError;
class NotFoundError extends DomainError {
    constructor(message = 'Resource not found', details) { super(message, 'NOT_FOUND', 404, details); }
}
exports.NotFoundError = NotFoundError;
class ValidationError extends DomainError {
    constructor(message = 'Validation failed', details) { super(message, 'VALIDATION_ERROR', 400, details); }
}
exports.ValidationError = ValidationError;
class ConflictError extends DomainError {
    constructor(message = 'Conflict', details) { super(message, 'CONFLICT', 409, details); }
}
exports.ConflictError = ConflictError;
class UnauthorizedError extends DomainError {
    constructor(message = 'Unauthorized', details) { super(message, 'UNAUTHORIZED', 401, details); }
}
exports.UnauthorizedError = UnauthorizedError;
class ForbiddenError extends DomainError {
    constructor(message = 'Forbidden', details) { super(message, 'FORBIDDEN', 403, details); }
}
exports.ForbiddenError = ForbiddenError;
//# sourceMappingURL=DomainErrors.js.map