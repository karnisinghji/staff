// User roles
export enum UserRole {
    CONTRACTOR = 'contractor',
    WORKER = 'worker'
}

// Skill types for workers
export enum SkillType {
    CARPENTER = 'carpenter',
    PLUMBER = 'plumber',
    ELECTRICIAN = 'electrician',
    LABORER = 'laborer',
    PAINTER = 'painter',
    MASON = 'mason',
    OTHER = 'other'
}

// Job status
export enum JobStatus {
    REQUESTED = 'requested',
    ACCEPTED = 'accepted',
    IN_PROGRESS = 'in_progress',
    COMPLETED = 'completed',
    CANCELLED = 'cancelled'
}

// Availability status
export enum AvailabilityStatus {
    AVAILABLE = 'available',
    UNAVAILABLE = 'unavailable',
    LOOKING_FOR_WORK = 'looking_for_work',
    LOOKING_FOR_WORKER = 'looking_for_worker'
}

// Base user interface
export interface BaseUser {
    id: string;
    role: UserRole;
    name: string;
    email: string;
    phone: string;
    location: string;
    createdAt: Date;
    updatedAt: Date;
}

// Worker profile
export interface WorkerProfile extends BaseUser {
    skillType: SkillType;
    experienceYears: number;
    availabilityStatus: AvailabilityStatus;
    hourlyRate?: number;
    bio?: string;
}

// Contractor profile
export interface ContractorProfile extends BaseUser {
    companyName?: string;
    needWorkerStatus: boolean;
    needWorkerUntil?: Date;
}

// Contact relationship
export interface Contact {
    id: string;
    ownerId: string;
    contactUserId: string;
    createdAt: Date;
}

// Job interface
export interface Job {
    id: string;
    contractorId: string;
    workerId: string;
    jobType: SkillType;
    status: JobStatus;
    description?: string;
    location?: string;
    estimatedDuration?: number;
    agreedPrice?: number;
    createdAt: Date;
    updatedAt: Date;
}

// API Response wrapper
export interface ApiResponse<T = any> {
    success: boolean;
    data?: T;
    message?: string;
    error?: string;
}

// Pagination
export interface PaginationParams {
    page: number;
    limit: number;
}

export interface PaginatedResponse<T> extends ApiResponse<T[]> {
    pagination: {
        page: number;
        limit: number;
        total: number;
        totalPages: number;
    };
}