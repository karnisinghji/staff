export interface MatchContext {
    score?: number;
    notes?: string;
    matchType?: string;
    isFavorite?: boolean;
    [k: string]: unknown;
}

export class Match {
    constructor(
        public readonly id: string,
        public readonly userA: string,
        public readonly userB: string,
        public readonly createdAt: Date,
        public readonly context: MatchContext = {}
    ) { }
}
