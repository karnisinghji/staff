export interface MatchContext {
    score?: number;
    notes?: string;
    matchType?: string;
    isFavorite?: boolean;
    [k: string]: unknown;
}
export declare class Match {
    readonly id: string;
    readonly userA: string;
    readonly userB: string;
    readonly createdAt: Date;
    readonly context: MatchContext;
    constructor(id: string, userA: string, userB: string, createdAt: Date, context?: MatchContext);
}
