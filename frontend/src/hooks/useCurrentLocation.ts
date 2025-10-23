import { useState, useEffect, useCallback } from 'react';

export interface LocationCoordinates {
    latitude: number;
    longitude: number;
    accuracy?: number;
}

export interface LocationError {
    code: number;
    message: string;
}

export interface UseCurrentLocationReturn {
    location: LocationCoordinates | null;
    error: LocationError | null;
    loading: boolean;
    getCurrentLocation: () => Promise<LocationCoordinates | null>;
}

/**
 * Custom hook to get user's current GPS location using browser Geolocation API
 * Automatically requests location on mount and provides manual refresh function
 */
export const useCurrentLocation = (autoDetect: boolean = false): UseCurrentLocationReturn => {
    const [location, setLocation] = useState<LocationCoordinates | null>(null);
    const [error, setError] = useState<LocationError | null>(null);
    const [loading, setLoading] = useState<boolean>(false);

    const getCurrentLocation = useCallback(async (): Promise<LocationCoordinates | null> => {
        // Check if geolocation is supported
        if (!navigator.geolocation) {
            const err = {
                code: 0,
                message: 'Geolocation is not supported by your browser'
            };
            setError(err);
            return null;
        }

        setLoading(true);
        setError(null);

        return new Promise((resolve) => {
            navigator.geolocation.getCurrentPosition(
                (position) => {
                    const coords: LocationCoordinates = {
                        latitude: position.coords.latitude,
                        longitude: position.coords.longitude,
                        accuracy: position.coords.accuracy
                    };
                    setLocation(coords);
                    setLoading(false);
                    resolve(coords);
                },
                (err) => {
                    let errorMessage = 'Unable to retrieve your location';

                    switch (err.code) {
                        case err.PERMISSION_DENIED:
                            errorMessage = 'Location permission denied. Please enable location access in your browser settings.';
                            break;
                        case err.POSITION_UNAVAILABLE:
                            errorMessage = 'Location information is unavailable. Please try again.';
                            break;
                        case err.TIMEOUT:
                            errorMessage = 'Location request timed out. Please try again.';
                            break;
                    }

                    const locationError: LocationError = {
                        code: err.code,
                        message: errorMessage
                    };

                    setError(locationError);
                    setLoading(false);
                    resolve(null);
                },
                {
                    enableHighAccuracy: true, // Use GPS for better accuracy
                    timeout: 10000, // 10 second timeout
                    maximumAge: 0 // Don't use cached position
                }
            );
        });
    }, []);

    // Auto-detect location on mount if enabled
    useEffect(() => {
        if (autoDetect) {
            getCurrentLocation();
        }
    }, [autoDetect, getCurrentLocation]);

    return {
        location,
        error,
        loading,
        getCurrentLocation
    };
};
