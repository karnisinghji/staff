// User related types
export interface User {
    id: string;
    name: string;
    email: string;
    role: 'contractor' | 'worker';
    phone: string;
    location: string;
    isActive: boolean;
    createdAt: Date;
    updatedAt: Date;
}

export interface WorkerProfile {
    id: string;
    userId: string;
    skillType: string;
    experienceYears: number;
    hourlyRate: number;
    availability: string;
    description: string;
    isAvailable: boolean;
    rating: number;
    completedJobs: number;
    createdAt: Date;
    updatedAt: Date;
}

export interface ContractorProfile {
    id: string;
    userId: string;
    companyName: string;
    companyDescription: string;
    verificationStatus: 'pending' | 'verified' | 'rejected';
    rating: number;
    totalJobsPosted: number;
    createdAt: Date;
    updatedAt: Date;
}

export interface Contact {
    id: string;
    userId: string;
    type: 'email' | 'phone' | 'website' | 'linkedin';
    value: string;
    isPrimary: boolean;
    isVerified: boolean;
    createdAt: Date;
}

// Request/Response types
export interface UpdateUserRequest {
    name?: string;
    phone?: string;
    location?: string;
}

export interface UpdateWorkerProfileRequest {
    skillType?: string;
    experienceYears?: number;
    hourlyRate?: number;
    availability?: string;
    description?: string;
    isAvailable?: boolean;
}

export interface UpdateContractorProfileRequest {
    companyName?: string;
    companyDescription?: string;
}

export interface CreateContactRequest {
    type: 'email' | 'phone' | 'website' | 'linkedin';
    value: string;
    isPrimary?: boolean;
}

export interface ApiResponse<T = any> {
    success: boolean;
    message: string;
    data?: T;
    error?: string;
}

export interface AuthUser {
    id: string;
    email: string;
    role: string;
}