export interface MatchStats {
    totalMatches: number;
    workers: number;
    contractors: number;
}

export interface SavedMatchPage {
    matches: import('./Match').Match[];
    page: number;
    pageSize: number;
    total: number;
}
