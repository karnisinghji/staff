import { LocationCoordinates } from '../types';

// Geocoding for major Indian cities
const cityCoordinates: Record<string, LocationCoordinates> = {
    // Tier 1 Cities (Metro Cities)
    'delhi': { latitude: 28.7041, longitude: 77.1025 },
    'new delhi': { latitude: 28.6139, longitude: 77.2090 },
    'mumbai': { latitude: 19.0760, longitude: 72.8777 },
    'bangalore': { latitude: 12.9716, longitude: 77.5946 },
    'bengaluru': { latitude: 12.9716, longitude: 77.5946 },
    'kolkata': { latitude: 22.5726, longitude: 88.3639 },
    'chennai': { latitude: 13.0827, longitude: 80.2707 },
    'hyderabad': { latitude: 17.3850, longitude: 78.4867 },

    // Tier 2 Cities (Major Urban Centers)
    'pune': { latitude: 18.5204, longitude: 73.8567 },
    'ahmedabad': { latitude: 23.0225, longitude: 72.5714 },
    'jaipur': { latitude: 26.9124, longitude: 75.7873 },
    'surat': { latitude: 21.1702, longitude: 72.8311 },
    'lucknow': { latitude: 26.8467, longitude: 80.9462 },
    'kanpur': { latitude: 26.4499, longitude: 80.3319 },
    'nagpur': { latitude: 21.1458, longitude: 79.0882 },
    'indore': { latitude: 22.7196, longitude: 75.8577 },
    'thane': { latitude: 19.2183, longitude: 72.9781 },
    'bhopal': { latitude: 23.2599, longitude: 77.4126 },
    'visakhapatnam': { latitude: 17.6868, longitude: 83.2185 },
    'pimpri chinchwad': { latitude: 18.6298, longitude: 73.7997 },
    'patna': { latitude: 25.5941, longitude: 85.1376 },
    'vadodara': { latitude: 22.3072, longitude: 73.1812 },
    'ghaziabad': { latitude: 28.6692, longitude: 77.4538 },
    'ludhiana': { latitude: 30.9010, longitude: 75.8573 },
    'agra': { latitude: 27.1767, longitude: 78.0081 },
    'nashik': { latitude: 19.9975, longitude: 73.7898 },
    'faridabad': { latitude: 28.4089, longitude: 77.3178 },
    'meerut': { latitude: 28.9845, longitude: 77.7064 },
    'rajkot': { latitude: 22.3039, longitude: 70.8022 },

    // State Capitals & Important Cities
    'chandigarh': { latitude: 30.7333, longitude: 76.7794 },
    'guwahati': { latitude: 26.1445, longitude: 91.7362 },
    'thiruvananthapuram': { latitude: 8.5241, longitude: 76.9366 },
    'trivandrum': { latitude: 8.5241, longitude: 76.9366 },
    'bhubaneswar': { latitude: 20.2961, longitude: 85.8245 },
    'ranchi': { latitude: 23.3441, longitude: 85.3096 },
    'kochi': { latitude: 9.9312, longitude: 76.2673 },
    'cochin': { latitude: 9.9312, longitude: 76.2673 },
    'coimbatore': { latitude: 11.0168, longitude: 76.9558 },
    'vijayawada': { latitude: 16.5062, longitude: 80.6480 },
    'madurai': { latitude: 9.9252, longitude: 78.1198 },
    'gwalior': { latitude: 26.2183, longitude: 78.1828 },
    'jabalpur': { latitude: 23.1815, longitude: 79.9864 },
    'jodhpur': { latitude: 26.2389, longitude: 73.0243 },
    'raipur': { latitude: 21.2514, longitude: 81.6296 },
    'kota': { latitude: 25.2138, longitude: 75.8648 },
    'amritsar': { latitude: 31.6340, longitude: 74.8723 },
    'allahabad': { latitude: 25.4358, longitude: 81.8463 },
    'prayagraj': { latitude: 25.4358, longitude: 81.8463 },
    'varanasi': { latitude: 25.3176, longitude: 82.9739 },
    'srinagar': { latitude: 34.0837, longitude: 74.7973 },
    'aurangabad': { latitude: 19.8762, longitude: 75.3433 },
    'dhanbad': { latitude: 23.7957, longitude: 86.4304 },
    'amravati': { latitude: 20.9374, longitude: 77.7796 },
    'aligarh': { latitude: 27.8974, longitude: 78.0880 },
    'gurgaon': { latitude: 28.4595, longitude: 77.0266 },
    'gurugram': { latitude: 28.4595, longitude: 77.0266 },
    'noida': { latitude: 28.5355, longitude: 77.3910 },
    'jalandhar': { latitude: 31.3260, longitude: 75.5762 },
    'tiruchirappalli': { latitude: 10.7905, longitude: 78.7047 },
    'tiruchirapalli': { latitude: 10.7905, longitude: 78.7047 },
    'trichy': { latitude: 10.7905, longitude: 78.7047 },
    'mysore': { latitude: 12.2958, longitude: 76.6394 },
    'mysuru': { latitude: 12.2958, longitude: 76.6394 },
    'bareilly': { latitude: 28.3670, longitude: 79.4304 },
    'goa': { latitude: 15.2993, longitude: 74.1240 },
    'panaji': { latitude: 15.4909, longitude: 73.8278 },
    'mangalore': { latitude: 12.9141, longitude: 74.8560 },
    'mangaluru': { latitude: 12.9141, longitude: 74.8560 },
    'hubli': { latitude: 15.3647, longitude: 75.1240 },
    'belgaum': { latitude: 15.8497, longitude: 74.4977 },
    'belagavi': { latitude: 15.8497, longitude: 74.4977 },
    'gulbarga': { latitude: 17.3297, longitude: 76.8343 },
    'kalaburagi': { latitude: 17.3297, longitude: 76.8343 },
    'warangal': { latitude: 17.9689, longitude: 79.5941 },
    'nellore': { latitude: 14.4426, longitude: 79.9865 },
    'guntur': { latitude: 16.3067, longitude: 80.4365 },
    'durgapur': { latitude: 23.5204, longitude: 87.3119 },
    'siliguri': { latitude: 26.7271, longitude: 88.3953 },
    'jammu': { latitude: 32.7266, longitude: 74.8570 },
    'udaipur': { latitude: 24.5854, longitude: 73.7125 },
    'bikaner': { latitude: 28.0229, longitude: 73.3119 },
    'ajmer': { latitude: 26.4499, longitude: 74.6399 },
    'bhilai': { latitude: 21.2095, longitude: 81.3784 },
    'jamshedpur': { latitude: 22.8046, longitude: 86.2029 },
    'imphal': { latitude: 24.8170, longitude: 93.9368 },
    'cuttack': { latitude: 20.5645, longitude: 85.8830 },
    'dehradun': { latitude: 30.3165, longitude: 78.0322 },
    'shimla': { latitude: 31.1048, longitude: 77.1734 },
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

    // Default to Jaipur, India if no match found
    return { latitude: 26.9124, longitude: 75.7873 };
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