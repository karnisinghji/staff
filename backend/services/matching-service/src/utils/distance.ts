/**
 * Geolocation utilities for distance calculations
 * Uses Haversine formula for calculating distance between two points on Earth
 */

export interface Coordinates {
    latitude: number;
    longitude: number;
}

/**
 * Calculate distance between two points using Haversine formula
 * @param point1 First coordinate point
 * @param point2 Second coordinate point
 * @returns Distance in kilometers
 */
export function calculateDistance(point1: Coordinates, point2: Coordinates): number {
    const R = 6371; // Earth's radius in kilometers

    const lat1Rad = toRadians(point1.latitude);
    const lat2Rad = toRadians(point2.latitude);
    const deltaLat = toRadians(point2.latitude - point1.latitude);
    const deltaLon = toRadians(point2.longitude - point1.longitude);

    const a = Math.sin(deltaLat / 2) * Math.sin(deltaLat / 2) +
        Math.cos(lat1Rad) * Math.cos(lat2Rad) *
        Math.sin(deltaLon / 2) * Math.sin(deltaLon / 2);

    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));

    const distance = R * c;
    return Math.round(distance * 10) / 10; // Round to 1 decimal place
}

/**
 * Convert degrees to radians
 */
function toRadians(degrees: number): number {
    return degrees * (Math.PI / 180);
}

/**
 * Format distance for display
 * @param distanceKm Distance in kilometers
 * @returns Formatted string (e.g., "5.2 km" or "850 m")
 */
export function formatDistance(distanceKm: number): string {
    if (distanceKm < 1) {
        const meters = Math.round(distanceKm * 1000);
        return `${meters} m`;
    }
    return `${distanceKm.toFixed(1)} km`;
}

/**
 * Check if coordinates are valid
 */
export function areCoordinatesValid(coords: Partial<Coordinates>): boolean {
    if (!coords.latitude || !coords.longitude) return false;

    const lat = coords.latitude;
    const lon = coords.longitude;

    return lat >= -90 && lat <= 90 && lon >= -180 && lon <= 180;
}

/**
 * Calculate distance between user and team member with validation
 * Returns null if either coordinates are missing or invalid
 */
export function calculateTeamMemberDistance(
    userCoords: Partial<Coordinates> | null,
    memberCoords: Partial<Coordinates> | null
): number | null {
    if (!userCoords || !memberCoords) return null;
    if (!areCoordinatesValid(userCoords) || !areCoordinatesValid(memberCoords)) return null;

    return calculateDistance(
        { latitude: userCoords.latitude!, longitude: userCoords.longitude! },
        { latitude: memberCoords.latitude!, longitude: memberCoords.longitude! }
    );
}
