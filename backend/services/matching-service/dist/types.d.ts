export interface MatchCriteria {
    skillType: string;
    location: string;
    maxDistance: number;
    budgetRange?: {
        min: number;
        max: number;
    };
    urgency: 'low' | 'medium' | 'high';
    experienceLevel: 'beginner' | 'intermediate' | 'expert';
    rating?: number;
    availability?: string;
    page?: number;
    limit?: number;
    weights?: MatchWeights;
}
export interface MatchWeights {
    skill?: number;
    distance?: number;
    experience?: number;
    budget?: number;
    rating?: number;
    availability?: number;
    verification?: number;
    jobHistory?: number;
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
    distance: number;
    rating: number;
    completedJobs: number;
    availability: string;
    isAvailable: boolean;
    matchScore: number;
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
    matchedUserName?: string;
    matchedUserRole?: string;
    isAvailable?: boolean;
}
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
