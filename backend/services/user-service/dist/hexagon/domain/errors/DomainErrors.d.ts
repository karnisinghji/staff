export declare abstract class DomainError extends Error {
    readonly code: string;
    readonly status: number;
    readonly details?: any | undefined;
    constructor(message: string, code: string, status: number, details?: any | undefined);
}
export declare class NotFoundError extends DomainError {
    constructor(message?: string, details?: any);
}
export declare class ValidationError extends DomainError {
    constructor(message?: string, details?: any);
}
export declare class ConflictError extends DomainError {
    constructor(message?: string, details?: any);
}
export declare class UnauthorizedError extends DomainError {
    constructor(message?: string, details?: any);
}
export declare class ForbiddenError extends DomainError {
    constructor(message?: string, details?: any);
}
