// Outbound port for retrieving minimal profile info (avoid tight coupling to user-service internals)
export interface ProfileRepositoryPort {
    getBasicProfile(userId: string): Promise<BasicProfile | null>;
    getBulkBasicProfiles(userIds: string[]): Promise<BasicProfile[]>;
}

export interface BasicProfile { id: string; skills: string[]; location?: { lat: number; lng: number }; type?: 'worker' | 'contractor'; }
