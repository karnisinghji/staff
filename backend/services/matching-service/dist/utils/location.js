"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.isWithinRadius = exports.calculateDistance = exports.geocodeLocation = void 0;
// Simple geocoding approximation for major US cities
const cityCoordinates = {
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
    'new orleans': { latitude: 29.9511, longitude: -90.0715 }
};
const geocodeLocation = async (location) => {
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
    // Default to approximate center of US if not found
    return { latitude: 39.8283, longitude: -98.5795 };
};
exports.geocodeLocation = geocodeLocation;
const calculateDistance = (point1, point2) => {
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
exports.calculateDistance = calculateDistance;
const isWithinRadius = (point1, point2, radiusKm) => {
    const distance = (0, exports.calculateDistance)(point1, point2);
    return distance <= radiusKm;
};
exports.isWithinRadius = isWithinRadius;
//# sourceMappingURL=location.js.map