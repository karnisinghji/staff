import { API_CONFIG } from '../config/api';

/**
 * Reverse geocode coordinates to address using backend proxy
 * This avoids CORS issues with Nominatim
 */
export async function reverseGeocode(lat: number, lon: number): Promise<any> {
    try {
        const response = await fetch(
            `${API_CONFIG.MATCHING_SERVICE}/api/matching/reverse-geocode?lat=${lat}&lon=${lon}`
        );

        if (!response.ok) {
            throw new Error(`Geocoding failed: ${response.statusText}`);
        }

        return await response.json();
    } catch (error) {
        console.error('Reverse geocoding error:', error);
        throw error;
    }
}

/**
 * Extract city name from Nominatim response
 */
export function getCityFromNominatimResponse(data: any): string | null {
    const address = data?.address;
    if (!address) return null;

    return (
        address.city ||
        address.town ||
        address.village ||
        address.municipality ||
        address.county ||
        address.state ||
        null
    );
}
