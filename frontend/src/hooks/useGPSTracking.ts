import { useEffect, useRef, useState, useCallback } from 'react';
import { API_CONFIG } from '../config/api';

interface GPSTrackingOptions {
    enabled?: boolean;
    updateInterval?: number; // milliseconds
    highAccuracy?: boolean;
    onLocationUpdate?: (position: GeolocationPosition) => void;
    onError?: (error: GeolocationPositionError) => void;
}

interface LocationStatus {
    isTracking: boolean;
    lastUpdate: Date | null;
    accuracy: number | null;
    error: string | null;
    updateCount: number;
}

/**
 * Real-time GPS tracking hook
 * 
 * Automatically sends GPS updates to backend at regular intervals
 * Handles battery efficiency, accuracy, and error states
 * 
 * @example
 * const { status, startTracking, stopTracking } = useGPSTracking({
 *   enabled: true,
 *   updateInterval: 30000, // 30 seconds
 *   highAccuracy: true
 * });
 */
export const useGPSTracking = (options: GPSTrackingOptions = {}) => {
    const {
        enabled = false,
        updateInterval = 30000, // 30 seconds default
        highAccuracy = true,
        onLocationUpdate,
        onError
    } = options;

    const [status, setStatus] = useState<LocationStatus>({
        isTracking: false,
        lastUpdate: null,
        accuracy: null,
        error: null,
        updateCount: 0
    });

    const watchIdRef = useRef<number | null>(null);
    const intervalRef = useRef<NodeJS.Timeout | null>(null);
    const isTrackingRef = useRef(false);
    const lastPositionRef = useRef<GeolocationPosition | null>(null);

    /**
     * Send location update to backend
     */
    const sendLocationUpdate = useCallback(async (position: GeolocationPosition) => {
        try {
            const token = localStorage.getItem('token');
            if (!token) {
                console.warn('[GPS Tracking] No auth token found, skipping update');
                return;
            }

            const { latitude, longitude, accuracy } = position.coords;

            const response = await fetch(`${API_CONFIG.MATCHING_SERVICE}/api/matching/update-location-live`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                },
                body: JSON.stringify({
                    latitude,
                    longitude,
                    accuracy,
                    source: 'gps'
                })
            });

            if (!response.ok) {
                const error = await response.json();
                throw new Error(error.message || 'Failed to update location');
            }

            const data = await response.json();

            setStatus(prev => ({
                ...prev,
                lastUpdate: new Date(),
                accuracy: accuracy,
                error: null,
                updateCount: prev.updateCount + 1
            }));

            console.log('[GPS Tracking] Location updated:', {
                lat: latitude.toFixed(6),
                lng: longitude.toFixed(6),
                accuracy: `${accuracy.toFixed(0)}m`,
                count: status.updateCount + 1
            });

            onLocationUpdate?.(position);

        } catch (error) {
            console.error('[GPS Tracking] Failed to send location update:', error);
            setStatus(prev => ({
                ...prev,
                error: error instanceof Error ? error.message : 'Failed to update location'
            }));
        }
    }, [onLocationUpdate, status.updateCount]);

    /**
     * Handle GPS position update
     */
    const handlePosition = useCallback((position: GeolocationPosition) => {
        lastPositionRef.current = position;

        // Only send if accuracy is reasonable (< 100m)
        if (position.coords.accuracy < 100) {
            sendLocationUpdate(position);
        } else {
            console.warn('[GPS Tracking] Low accuracy, skipping update:', position.coords.accuracy);
        }
    }, [sendLocationUpdate]);

    /**
     * Handle GPS error
     */
    const handleError = useCallback((error: GeolocationPositionError) => {
        let errorMessage = 'Unknown GPS error';

        switch (error.code) {
            case error.PERMISSION_DENIED:
                errorMessage = 'Location permission denied';
                break;
            case error.POSITION_UNAVAILABLE:
                errorMessage = 'Location unavailable';
                break;
            case error.TIMEOUT:
                errorMessage = 'Location request timeout';
                break;
        }

        console.error('[GPS Tracking] Error:', errorMessage, error);

        setStatus(prev => ({
            ...prev,
            error: errorMessage
        }));

        onError?.(error);
    }, [onError]);

    /**
     * Start GPS tracking
     */
    const startTracking = useCallback(() => {
        if (isTrackingRef.current) {
            console.log('[GPS Tracking] Already tracking');
            return;
        }

        if (!navigator.geolocation) {
            setStatus(prev => ({
                ...prev,
                error: 'Geolocation not supported'
            }));
            return;
        }

        console.log('[GPS Tracking] Starting...', {
            updateInterval: `${updateInterval / 1000}s`,
            highAccuracy
        });

        isTrackingRef.current = true;
        setStatus(prev => ({
            ...prev,
            isTracking: true,
            error: null
        }));

        // Start watching position
        watchIdRef.current = navigator.geolocation.watchPosition(
            handlePosition,
            handleError,
            {
                enableHighAccuracy: highAccuracy,
                timeout: 15000,
                maximumAge: 5000
            }
        );

        // Set up periodic updates (watchPosition can be slow sometimes)
        intervalRef.current = setInterval(() => {
            if (lastPositionRef.current) {
                console.log('[GPS Tracking] Periodic update check');
                sendLocationUpdate(lastPositionRef.current);
            }
        }, updateInterval);

    }, [updateInterval, highAccuracy, handlePosition, handleError, sendLocationUpdate]);

    /**
     * Stop GPS tracking
     */
    const stopTracking = useCallback(async () => {
        if (!isTrackingRef.current) {
            console.log('[GPS Tracking] Not currently tracking');
            return;
        }

        console.log('[GPS Tracking] Stopping...');

        isTrackingRef.current = false;

        // Clear watch
        if (watchIdRef.current !== null) {
            navigator.geolocation.clearWatch(watchIdRef.current);
            watchIdRef.current = null;
        }

        // Clear interval
        if (intervalRef.current !== null) {
            clearInterval(intervalRef.current);
            intervalRef.current = null;
        }

        // Notify backend
        try {
            const token = localStorage.getItem('token');
            if (token) {
                await fetch(`${API_CONFIG.MATCHING_SERVICE}/api/matching/stop-location-tracking`, {
                    method: 'POST',
                    headers: {
                        'Authorization': `Bearer ${token}`
                    }
                });
            }
        } catch (error) {
            console.error('[GPS Tracking] Failed to notify backend of stop:', error);
        }

        setStatus(prev => ({
            ...prev,
            isTracking: false
        }));

    }, []);

    /**
     * Handle visibility change (pause when app backgrounded)
     */
    useEffect(() => {
        const handleVisibilityChange = () => {
            if (document.hidden && isTrackingRef.current) {
                console.log('[GPS Tracking] App backgrounded, pausing updates');
                if (intervalRef.current) {
                    clearInterval(intervalRef.current);
                    intervalRef.current = null;
                }
            } else if (!document.hidden && isTrackingRef.current) {
                console.log('[GPS Tracking] App foregrounded, resuming updates');
                intervalRef.current = setInterval(() => {
                    if (lastPositionRef.current) {
                        sendLocationUpdate(lastPositionRef.current);
                    }
                }, updateInterval);
            }
        };

        document.addEventListener('visibilitychange', handleVisibilityChange);
        return () => document.removeEventListener('visibilitychange', handleVisibilityChange);
    }, [updateInterval, sendLocationUpdate]);

    /**
     * Auto-start/stop based on enabled prop
     */
    useEffect(() => {
        if (enabled) {
            startTracking();
        } else {
            stopTracking();
        }

        // Cleanup on unmount
        return () => {
            stopTracking();
        };
    }, [enabled]); // Only depend on enabled to avoid recreating on every render

    return {
        status,
        startTracking,
        stopTracking,
        isSupported: !!navigator.geolocation
    };
};
