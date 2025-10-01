import { LocationCoordinates } from '../types';

// Simple geocoding approximation for major US cities
const cityCoordinates: Record<string, LocationCoordinates> = {
    'new york': { latitude: 40.7128, longitude: -74.0060 },
    'los angeles': { latitude: 34.0522, longitude: -118.2437 },
    'chicago': { latitude: 41.8781, longitude: -87.6298 },
    'houston': { latitude: 29.7604, longitude: -95.3698 },
    'phoenix': { latitude: 33.4484, longitude: -112.0740 },
    'philadelphia': { latitude: 39.9526, longitude: -75.1652 },
    'san antonio': { latitude: 29.4241, longitude: -98.4936 },
    'san diego': { latitude: 32.7157, longitude: -117.1611 },
    'dallas': { latitude: 32.7767, longitude: -96.7970 },
    'san jose': { latitude: 37.3382, longitude: -121.8863 },
    'austin': { latitude: 30.2672, longitude: -97.7431 },
    'jacksonville': { latitude: 30.3322, longitude: -81.6557 },
    'fort worth': { latitude: 32.7555, longitude: -97.3308 },
    'columbus': { latitude: 39.9612, longitude: -82.9988 },
    'charlotte': { latitude: 35.2271, longitude: -80.8431 },
    'san francisco': { latitude: 37.7749, longitude: -122.4194 },
    'indianapolis': { latitude: 39.7684, longitude: -86.1581 },
    'seattle': { latitude: 47.6062, longitude: -122.3321 },
    'denver': { latitude: 39.7392, longitude: -104.9903 },
    'washington': { latitude: 38.9072, longitude: -77.0369 },
    'boston': { latitude: 42.3601, longitude: -71.0589 },
    'el paso': { latitude: 31.7619, longitude: -106.4850 },
    'detroit': { latitude: 42.3314, longitude: -83.0458 },
    'nashville': { latitude: 36.1627, longitude: -86.7816 },
    'memphis': { latitude: 35.1495, longitude: -90.0490 },
    'portland': { latitude: 45.5152, longitude: -122.6784 },
    'oklahoma city': { latitude: 35.4676, longitude: -97.5164 },
    'las vegas': { latitude: 36.1699, longitude: -115.1398 },
    'louisville': { latitude: 38.2527, longitude: -85.7585 },
    'baltimore': { latitude: 39.2904, longitude: -76.6122 },
    'milwaukee': { latitude: 43.0389, longitude: -87.9065 },
    'albuquerque': { latitude: 35.0844, longitude: -106.6504 },
    'tucson': { latitude: 32.2226, longitude: -110.9747 },
    'fresno': { latitude: 36.7378, longitude: -119.7871 },
    'sacramento': { latitude: 38.5816, longitude: -121.4944 },
    'kansas city': { latitude: 39.0997, longitude: -94.5786 },
    'mesa': { latitude: 33.4152, longitude: -111.8315 },
    'atlanta': { latitude: 33.7490, longitude: -84.3880 },
    'colorado springs': { latitude: 38.8339, longitude: -104.8214 },
    'omaha': { latitude: 41.2565, longitude: -95.9345 },
    'raleigh': { latitude: 35.7796, longitude: -78.6382 },
    'miami': { latitude: 25.7617, longitude: -80.1918 },
    'long beach': { latitude: 33.7701, longitude: -118.1937 },
    'virginia beach': { latitude: 36.8529, longitude: -76.0852 },
    'oakland': { latitude: 37.8044, longitude: -122.2712 },
    'minneapolis': { latitude: 44.9778, longitude: -93.2650 },
    'tulsa': { latitude: 36.1540, longitude: -95.9928 },
    'tampa': { latitude: 27.9506, longitude: -82.4572 },
    'arlington': { latitude: 32.7357, longitude: -97.1081 },
    'new orleans': { latitude: 29.9511, longitude: -90.0715 },
    // Canadian cities
    'toronto': { latitude: 43.6532, longitude: -79.3832 },
    'toronto, on': { latitude: 43.6532, longitude: -79.3832 },
    'vancouver': { latitude: 49.2827, longitude: -123.1207 },
    'vancouver, bc': { latitude: 49.2827, longitude: -123.1207 },
    'montreal': { latitude: 45.5017, longitude: -73.5673 },
    'montreal, qc': { latitude: 45.5017, longitude: -73.5673 },
    'calgary': { latitude: 51.0447, longitude: -114.0719 },
    'calgary, ab': { latitude: 51.0447, longitude: -114.0719 },
    'ottawa': { latitude: 45.4215, longitude: -75.6972 },
    'ottawa, on': { latitude: 45.4215, longitude: -75.6972 },
    'mississauga': { latitude: 43.5890, longitude: -79.6441 },
    'mississauga, on': { latitude: 43.5890, longitude: -79.6441 },
    'brampton': { latitude: 43.7315, longitude: -79.7624 },
    'brampton, on': { latitude: 43.7315, longitude: -79.7624 },
    'hamilton': { latitude: 43.2557, longitude: -79.8711 },
    'hamilton, on': { latitude: 43.2557, longitude: -79.8711 },
    // Indian cities
    'jaipur': { latitude: 26.9124, longitude: 75.7873 },
    'delhi': { latitude: 28.7041, longitude: 77.1025 },
    'mumbai': { latitude: 19.0760, longitude: 72.8777 },
    'bangalore': { latitude: 12.9716, longitude: 77.5946 },
    'bengaluru': { latitude: 12.9716, longitude: 77.5946 },
    'chennai': { latitude: 13.0827, longitude: 80.2707 },
    'kolkata': { latitude: 22.5726, longitude: 88.3639 },
    'hyderabad': { latitude: 17.3850, longitude: 78.4867 },
    'pune': { latitude: 18.5204, longitude: 73.8567 },
    'ahmedabad': { latitude: 23.0225, longitude: 72.5714 },
    'surat': { latitude: 21.1702, longitude: 72.8311 },
    'lucknow': { latitude: 26.8467, longitude: 80.9462 },
    'kanpur': { latitude: 26.4499, longitude: 80.3319 },
    'nagpur': { latitude: 21.1458, longitude: 79.0882 },
    'indore': { latitude: 22.7196, longitude: 75.8577 },
    'thane': { latitude: 19.2183, longitude: 72.9781 },
    'bhopal': { latitude: 23.2599, longitude: 77.4126 },
    'visakhapatnam': { latitude: 17.6868, longitude: 83.2185 },
    'pimpri chinchwad': { latitude: 18.6298, longitude: 73.7997 }
};

export const geocodeLocation = async (location: string): Promise<LocationCoordinates | null> => {
    const normalizedLocation = location.toLowerCase().trim();

    // Check if it's in our predefined list
    if (cityCoordinates[normalizedLocation]) {
        return cityCoordinates[normalizedLocation];
    }

    // Check for partial matches
    for (const [city, coords] of Object.entries(cityCoordinates)) {
        if (city.includes(normalizedLocation) || normalizedLocation.includes(city)) {
            return coords;
        }
    }

    // Default to Toronto, Canada since our contractors are primarily Canadian
    return { latitude: 43.6532, longitude: -79.3832 };
};

export const calculateDistance = (
    point1: LocationCoordinates,
    point2: LocationCoordinates
): number => {
    // Haversine formula to calculate distance between two points
    const R = 6371; // Earth's radius in kilometers
    const dLat = (point2.latitude - point1.latitude) * Math.PI / 180;
    const dLon = (point2.longitude - point1.longitude) * Math.PI / 180;

    const a = Math.sin(dLat / 2) * Math.sin(dLat / 2) +
        Math.cos(point1.latitude * Math.PI / 180) * Math.cos(point2.latitude * Math.PI / 180) *
        Math.sin(dLon / 2) * Math.sin(dLon / 2);

    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    const distance = R * c;

    return Math.round(distance * 100) / 100; // Round to 2 decimal places
};

export const isWithinRadius = (
    point1: LocationCoordinates,
    point2: LocationCoordinates,
    radiusKm: number
): boolean => {
    const distance = calculateDistance(point1, point2);
    return distance <= radiusKm;
};