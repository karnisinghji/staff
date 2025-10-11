// Location utilities for converting coordinates to city names

// Comprehensive Indian cities database with coordinates
export const INDIAN_CITIES = [
    // Tier 1 Cities
    { name: "Delhi", lat: 28.6139, lon: 77.2090, state: "Delhi" },
    { name: "New Delhi", lat: 28.6139, lon: 77.2090, state: "Delhi" },
    { name: "Mumbai", lat: 19.0760, lon: 72.8777, state: "Maharashtra" },
    { name: "Bengaluru", lat: 12.9716, lon: 77.5946, state: "Karnataka" },
    { name: "Bangalore", lat: 12.9716, lon: 77.5946, state: "Karnataka" },
    { name: "Chennai", lat: 13.0827, lon: 80.2707, state: "Tamil Nadu" },
    { name: "Kolkata", lat: 22.5726, lon: 88.3639, state: "West Bengal" },
    { name: "Hyderabad", lat: 17.3850, lon: 78.4867, state: "Telangana" },
    { name: "Pune", lat: 18.5204, lon: 73.8567, state: "Maharashtra" },

    // Tier 2 Cities
    { name: "Ahmedabad", lat: 23.0225, lon: 72.5714, state: "Gujarat" },
    { name: "Surat", lat: 21.1702, lon: 72.8311, state: "Gujarat" },
    { name: "Jaipur", lat: 26.9124, lon: 75.7873, state: "Rajasthan" },
    { name: "Lucknow", lat: 26.8467, lon: 80.9462, state: "Uttar Pradesh" },
    { name: "Kanpur", lat: 26.4499, lon: 80.3319, state: "Uttar Pradesh" },
    { name: "Nagpur", lat: 21.1458, lon: 79.0882, state: "Maharashtra" },
    { name: "Indore", lat: 22.7196, lon: 75.8577, state: "Madhya Pradesh" },
    { name: "Thane", lat: 19.2183, lon: 72.9781, state: "Maharashtra" },
    { name: "Bhopal", lat: 23.2599, lon: 77.4126, state: "Madhya Pradesh" },
    { name: "Visakhapatnam", lat: 17.6868, lon: 83.2185, state: "Andhra Pradesh" },
    { name: "Pimpri-Chinchwad", lat: 18.6298, lon: 73.7997, state: "Maharashtra" },
    { name: "Patna", lat: 25.5941, lon: 85.1376, state: "Bihar" },
    { name: "Vadodara", lat: 22.3072, lon: 73.1812, state: "Gujarat" },
    { name: "Ghaziabad", lat: 28.6692, lon: 77.4538, state: "Uttar Pradesh" },
    { name: "Ludhiana", lat: 30.9010, lon: 75.8573, state: "Punjab" },
    { name: "Agra", lat: 27.1767, lon: 78.0081, state: "Uttar Pradesh" },
    { name: "Nashik", lat: 19.9975, lon: 73.7898, state: "Maharashtra" },
    { name: "Faridabad", lat: 28.4089, lon: 77.3178, state: "Haryana" },
    { name: "Meerut", lat: 28.9845, lon: 77.7064, state: "Uttar Pradesh" },
    { name: "Rajkot", lat: 22.3039, lon: 70.8022, state: "Gujarat" },
    { name: "Varanasi", lat: 25.3176, lon: 82.9739, state: "Uttar Pradesh" },
    { name: "Srinagar", lat: 34.0837, lon: 74.7973, state: "Jammu and Kashmir" },
    { name: "Aurangabad", lat: 19.8762, lon: 75.3433, state: "Maharashtra" },
    { name: "Dhanbad", lat: 23.7957, lon: 86.4304, state: "Jharkhand" },
    { name: "Amritsar", lat: 31.6340, lon: 74.8723, state: "Punjab" },
    { name: "Navi Mumbai", lat: 19.0330, lon: 73.0297, state: "Maharashtra" },
    { name: "Allahabad", lat: 25.4358, lon: 81.8463, state: "Uttar Pradesh" },
    { name: "Prayagraj", lat: 25.4358, lon: 81.8463, state: "Uttar Pradesh" },
    { name: "Ranchi", lat: 23.3441, lon: 85.3096, state: "Jharkhand" },
    { name: "Howrah", lat: 22.5958, lon: 88.2636, state: "West Bengal" },
    { name: "Coimbatore", lat: 11.0168, lon: 76.9558, state: "Tamil Nadu" },
    { name: "Jabalpur", lat: 23.1815, lon: 79.9864, state: "Madhya Pradesh" },
    { name: "Gwalior", lat: 26.2183, lon: 78.1828, state: "Madhya Pradesh" },
    { name: "Vijayawada", lat: 16.5062, lon: 80.6480, state: "Andhra Pradesh" },
    { name: "Jodhpur", lat: 26.2389, lon: 73.0243, state: "Rajasthan" },
    { name: "Madurai", lat: 9.9252, lon: 78.1198, state: "Tamil Nadu" },
    { name: "Raipur", lat: 21.2514, lon: 81.6296, state: "Chhattisgarh" },
    { name: "Kota", lat: 25.2138, lon: 75.8648, state: "Rajasthan" },
    { name: "Chandigarh", lat: 30.7333, lon: 76.7794, state: "Chandigarh" },
    { name: "Guwahati", lat: 26.1445, lon: 91.7362, state: "Assam" },
    { name: "Solapur", lat: 17.6599, lon: 75.9064, state: "Maharashtra" },
    { name: "Hubli-Dharwad", lat: 15.3647, lon: 75.1240, state: "Karnataka" },
    { name: "Mysuru", lat: 12.2958, lon: 76.6394, state: "Karnataka" },
    { name: "Mysore", lat: 12.2958, lon: 76.6394, state: "Karnataka" },
    { name: "Tiruchirappalli", lat: 10.7905, lon: 78.7047, state: "Tamil Nadu" },
    { name: "Bareilly", lat: 28.3670, lon: 79.4304, state: "Uttar Pradesh" },
    { name: "Aligarh", lat: 27.8974, lon: 78.0880, state: "Uttar Pradesh" },
    { name: "Tiruppur", lat: 11.1085, lon: 77.3411, state: "Tamil Nadu" },
    { name: "Moradabad", lat: 28.8389, lon: 78.7378, state: "Uttar Pradesh" },
    { name: "Jalandhar", lat: 31.3260, lon: 75.5762, state: "Punjab" },
    { name: "Bhubaneswar", lat: 20.2961, lon: 85.8245, state: "Odisha" },
    { name: "Salem", lat: 11.6643, lon: 78.1460, state: "Tamil Nadu" },
    { name: "Warangal", lat: 17.9689, lon: 79.5941, state: "Telangana" },
    { name: "Guntur", lat: 16.3067, lon: 80.4365, state: "Andhra Pradesh" },
    { name: "Thiruvananthapuram", lat: 8.5241, lon: 76.9366, state: "Kerala" },
    { name: "Trivandrum", lat: 8.5241, lon: 76.9366, state: "Kerala" },
    { name: "Kochi", lat: 9.9312, lon: 76.2673, state: "Kerala" },
    { name: "Cochin", lat: 9.9312, lon: 76.2673, state: "Kerala" },
    { name: "Dehradun", lat: 30.3165, lon: 78.0322, state: "Uttarakhand" },
    { name: "Udaipur", lat: 24.5854, lon: 73.7125, state: "Rajasthan" },
    { name: "Noida", lat: 28.5355, lon: 77.3910, state: "Uttar Pradesh" },
    { name: "Greater Noida", lat: 28.4744, lon: 77.5040, state: "Uttar Pradesh" },
    { name: "Gurugram", lat: 28.4595, lon: 77.0266, state: "Haryana" },
    { name: "Gurgaon", lat: 28.4595, lon: 77.0266, state: "Haryana" },
    { name: "Shimla", lat: 31.1048, lon: 77.1734, state: "Himachal Pradesh" },
    { name: "Nellore", lat: 14.4426, lon: 79.9865, state: "Andhra Pradesh" },
    { name: "Mangaluru", lat: 12.9141, lon: 74.8560, state: "Karnataka" },
    { name: "Mangalore", lat: 12.9141, lon: 74.8560, state: "Karnataka" },
    { name: "Kurnool", lat: 15.8281, lon: 78.0373, state: "Andhra Pradesh" },
    { name: "Ajmer", lat: 26.4499, lon: 74.6399, state: "Rajasthan" },
    { name: "Jamnagar", lat: 22.4707, lon: 70.0577, state: "Gujarat" },
    { name: "Ujjain", lat: 23.1765, lon: 75.7885, state: "Madhya Pradesh" },
    { name: "Bikaner", lat: 28.0229, lon: 73.3119, state: "Rajasthan" },
    { name: "Bhavnagar", lat: 21.7645, lon: 72.1519, state: "Gujarat" },
    { name: "Panipat", lat: 29.3909, lon: 76.9635, state: "Haryana" },
];

/**
 * Calculate distance between two coordinates using Haversine formula
 */
function calculateDistance(lat1: number, lon1: number, lat2: number, lon2: number): number {
    const R = 6371; // Earth's radius in km
    const dLat = (lat2 - lat1) * Math.PI / 180;
    const dLon = (lon2 - lon1) * Math.PI / 180;
    const a =
        Math.sin(dLat / 2) * Math.sin(dLat / 2) +
        Math.cos(lat1 * Math.PI / 180) * Math.cos(lat2 * Math.PI / 180) *
        Math.sin(dLon / 2) * Math.sin(dLon / 2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    return R * c;
}

/**
 * Find the nearest Indian city to given coordinates
 */
export function findNearestCity(lat: number, lon: number): { name: string; state: string; distance: number } | null {
    let nearest = null;
    let minDistance = Infinity;

    for (const city of INDIAN_CITIES) {
        const distance = calculateDistance(lat, lon, city.lat, city.lon);
        if (distance < minDistance) {
            minDistance = distance;
            nearest = { name: city.name, state: city.state, distance };
        }
    }

    return nearest;
}

/**
 * Convert coordinates string to city name
 * Handles formats like "27.2440, 75.6584" or coordinates
 */
export function coordinatesToCityName(location: string): string {
    // Check if it's a coordinate format (contains comma and numbers)
    const coordPattern = /^(-?\d+\.?\d*)\s*,\s*(-?\d+\.?\d*)$/;
    const match = location.match(coordPattern);

    if (match) {
        const lat = parseFloat(match[1]);
        const lon = parseFloat(match[2]);

        const nearest = findNearestCity(lat, lon);

        if (nearest && nearest.distance < 50) { // Within 50km
            return `${nearest.name}, ${nearest.state}`;
        }
    }

    // If not coordinates or no nearby city found, return as-is
    return location;
}

/**
 * Format location for display (handles both city names and coordinates)
 */
export function formatLocation(location: string | undefined | null): string {
    if (!location) return 'Location not specified';

    // Try to convert coordinates to city name
    const formatted = coordinatesToCityName(location);
    return formatted || 'Location not specified';
}

/**
 * Enhanced reverse geocoding with fallback to nearest city
 */
export async function reverseGeocode(lat: number, lon: number): Promise<string> {
    try {
        // First try OpenStreetMap Nominatim
        const response = await fetch(
            `https://nominatim.openstreetmap.org/reverse?format=json&lat=${lat}&lon=${lon}&zoom=10`,
            {
                headers: {
                    'User-Agent': 'ComeOnDost/1.0' // Required by Nominatim
                }
            }
        );

        if (response.ok) {
            const data = await response.json();
            const address = data.address || {};

            // Try to get city name from various address components
            const cityName = address.city ||
                address.town ||
                address.village ||
                address.county ||
                address.state_district;

            if (cityName) {
                const state = address.state;
                return state ? `${cityName}, ${state}` : cityName;
            }
        }
    } catch (error) {
        console.log('Reverse geocoding failed, using nearest city:', error);
    }

    // Fallback to nearest city from our database
    const nearest = findNearestCity(lat, lon);
    if (nearest) {
        return `${nearest.name}, ${nearest.state}`;
    }

    // Last resort: return coordinates
    return `${lat.toFixed(4)}, ${lon.toFixed(4)}`;
}
