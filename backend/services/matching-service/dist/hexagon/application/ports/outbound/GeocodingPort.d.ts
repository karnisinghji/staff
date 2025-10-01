export interface GeocodingPort {
    forward(address: string): Promise<GeoPoint | null>;
    distanceKm(a: GeoPoint, b: GeoPoint): number;
}
export interface GeoPoint {
    lat: number;
    lng: number;
}
