// Matching related types
export interface MatchCriteria {
    skillType: string;
    location: string;
    maxDistance: number; // in kilometers
    budgetRange?: {
        min: number;
        max: number;
    };
    urgency: 'low' | 'medium' | 'high';
    experienceLevel: 'beginner' | 'intermediate' | 'expert';
    // Advanced filtering
    rating?: number;
    availability?: string;
    // Pagination
    page?: number; // 1-based
    limit?: number;
    // Optional per-request weight configuration for scoring
    weights?: MatchWeights;
}

// Weights used by the scoring functions. Values should sum roughly to 100 but are normalized by the algorithm.
export interface MatchWeights {
    // Worker weights
    skill?: number;
    distance?: number;
    experience?: number;
    budget?: number;
    rating?: number;
    availability?: number;

    // Contractor-specific weights
    verification?: number;
    jobHistory?: number;
    // generic fallback
    [k: string]: number | undefined;
}

export interface PaginatedResult<T> {
    matches: T[];
    totalCount: number;
    page: number;
    limit: number;
    totalPages: number;
}

export interface WorkerMatch {
    workerId: string;
    workerName: string;
    skillType: string;
    experienceYears: number;
    hourlyRate: number;
    location: string;
    distance: number; // in kilometers
    rating: number;
    completedJobs: number;
    availability: string;
    isAvailable: boolean;
    matchScore: number; // 0-100
    profilePicture?: string;
    description: string;
}

export interface ContractorMatch {
    contractorId: string;
    contractorName: string;
    companyName: string;
    location: string;
    distance: number;
    rating: number;
    totalJobsPosted: number;
    verificationStatus: 'pending' | 'verified' | 'rejected';
    matchScore: number;
    companyDescription: string;
}

export interface MatchPreferences {
    id: string;
    userId: string;
    preferredSkillTypes: string[];
    preferredLocations: string[];
    maxDistance: number;
    budgetPreference?: {
        min: number;
        max: number;
    };
    experiencePreference: 'beginner' | 'intermediate' | 'expert' | 'any';
    urgencyPreference: 'low' | 'medium' | 'high' | 'any';
    workTypePreference: 'one-time' | 'recurring' | 'any';
    ratingThreshold: number;
    autoMatch: boolean;
    createdAt: Date;
    updatedAt: Date;
}

export interface MatchRequest {
    id: string;
    requesterId: string;
    requesterRole: 'contractor' | 'worker';
    criteria: MatchCriteria;
    status: 'pending' | 'completed' | 'expired';
    matches: WorkerMatch[] | ContractorMatch[];
    createdAt: Date;
    expiresAt: Date;
}

export interface SavedMatch {
    id: string;
    userId: string;
    matchedUserId: string;
    matchType: 'worker' | 'contractor';
    matchScore: number;
    notes?: string;
    isFavorite: boolean;
    createdAt: Date;
}

// Request/Response types
export interface CreateMatchRequest {
    criteria: MatchCriteria;
}

export interface UpdateMatchPreferencesRequest {
    preferredSkillTypes?: string[];
    preferredLocations?: string[];
    maxDistance?: number;
    budgetPreference?: {
        min: number;
        max: number;
    };
    experiencePreference?: 'beginner' | 'intermediate' | 'expert' | 'any';
    urgencyPreference?: 'low' | 'medium' | 'high' | 'any';
    workTypePreference?: 'one-time' | 'recurring' | 'any';
    ratingThreshold?: number;
    autoMatch?: boolean;
}

export interface SaveMatchRequest {
    matchedUserId: string;
    matchType: 'worker' | 'contractor';
    matchScore: number;
    notes?: string;
    isFavorite?: boolean;
}

export interface LocationCoordinates {
    latitude: number;
    longitude: number;
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