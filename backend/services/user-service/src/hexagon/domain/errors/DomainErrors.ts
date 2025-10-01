export abstract class DomainError extends Error {
    constructor(message: string, public readonly code: string, public readonly status: number, public readonly details?: any) {
        super(message);
        Object.setPrototypeOf(this, new.target.prototype);
    }
}

export class NotFoundError extends DomainError {
    constructor(message = 'Resource not found', details?: any) { super(message, 'NOT_FOUND', 404, details); }
}
export class ValidationError extends DomainError {
    constructor(message = 'Validation failed', details?: any) { super(message, 'VALIDATION_ERROR', 400, details); }
}
export class ConflictError extends DomainError {
    constructor(message = 'Conflict', details?: any) { super(message, 'CONFLICT', 409, details); }
}
export class UnauthorizedError extends DomainError {
    constructor(message = 'Unauthorized', details?: any) { super(message, 'UNAUTHORIZED', 401, details); }
}
export class ForbiddenError extends DomainError {
    constructor(message = 'Forbidden', details?: any) { super(message, 'FORBIDDEN', 403, details); }
}