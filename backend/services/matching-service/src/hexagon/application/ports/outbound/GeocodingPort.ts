// Outbound port for geocoding / distance calculations
export interface GeocodingPort {
    forward(address: string): Promise<GeoPoint | null>;
    distanceKm(a: GeoPoint, b: GeoPoint): number; // pure or delegated
}

export interface GeoPoint { lat: number; lng: number; }
