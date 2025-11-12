import { useEffect, useRef, useState, useCallback } from 'react';
import { API_CONFIG } from '../config/api';

type TrackingMode = 'live' | 'shift';

interface GPSTrackingOptions {
    enabled?: boolean;
    mode?: TrackingMode; // 'live' = 30s updates, 'shift' = 5min updates
    updateInterval?: number; // milliseconds (overrides mode default)
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
        mode = 'shift', // Default to shift mode (5 min updates)
        updateInterval, // Optional override
        highAccuracy = true,
        onLocationUpdate,
        onError
    } = options;

    // Determine update interval based on mode
    const effectiveUpdateInterval = updateInterval || (mode === 'live' ? 30000 : 300000); // 30s or 5min

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
    const abortControllerRef = useRef<AbortController | null>(null);
    const isRequestInProgressRef = useRef(false); // Prevent concurrent requests

    /**
     * Send location update to backend
     */
    const sendLocationUpdate = useCallback(async (position: GeolocationPosition) => {
        // Prevent concurrent requests
        if (isRequestInProgressRef.current) {
            console.log('[GPS Tracking] Request already in progress, skipping...');
            return;
        }

        try {
            isRequestInProgressRef.current = true;

            const token = localStorage.getItem('token');
            if (!token) {
                console.warn('[GPS Tracking] No auth token found, skipping update');
                return;
            }

            const { latitude, longitude, accuracy } = position.coords;

            // Cancel previous request if still pending
            if (abortControllerRef.current) {
                abortControllerRef.current.abort();
            }

            // Create new abort controller for this request
            abortControllerRef.current = new AbortController();

            const response = await fetch(`${API_CONFIG.MATCHING_SERVICE}/update-location-live`, {
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
                }),
                signal: abortControllerRef.current.signal,
                // Add timeout using AbortSignal.timeout (for modern browsers)
                // For older browsers, the AbortController timeout will handle it
            });

            if (!response.ok) {
                // Handle JWT expiration specifically
                if (response.status === 401 || response.status === 403) {
                    console.warn('[GPS Tracking] Authentication failed - token may be expired');
                    setStatus(prev => ({
                        ...prev,
                        error: 'Session expired. Please log in again.',
                        isTracking: false
                    }));

                    // Stop tracking on auth failure
                    if (watchIdRef.current !== null) {
                        navigator.geolocation.clearWatch(watchIdRef.current);
                        watchIdRef.current = null;
                    }
                    if (intervalRef.current) {
                        clearInterval(intervalRef.current);
                        intervalRef.current = null;
                    }
                    isTrackingRef.current = false;

                    // Optionally redirect to login
                    if (typeof window !== 'undefined') {
                        window.location.href = '/login?reason=session_expired';
                    }
                    return;
                }

                const error = await response.json();
                throw new Error(error.message || 'Failed to update location');
            }

            await response.json(); // Consume response

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
            // Ignore abort errors (these are intentional cancellations)
            if (error instanceof Error && error.name === 'AbortError') {
                console.log('[GPS Tracking] Request aborted (replaced by newer request)');
                return;
            }

            // Ignore network errors caused by insufficient resources (will retry on next interval)
            if (error instanceof TypeError && error.message.includes('Failed to fetch')) {
                console.warn('[GPS Tracking] Network error, will retry on next update');
                // Don't show error to user, just log it
                return;
            }

            console.error('[GPS Tracking] Failed to send location update:', error);
            setStatus(prev => ({
                ...prev,
                error: error instanceof Error ? error.message : 'Failed to update location'
            }));
        } finally {
            // Always reset the lock, even if request failed
            isRequestInProgressRef.current = false;
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
        let shouldStopTracking = false;

        switch (error.code) {
            case error.PERMISSION_DENIED:
                errorMessage = 'Location permission denied. Please enable location access.';
                shouldStopTracking = true;
                console.error('[GPS Tracking] Permission denied:', error);
                break;
            case error.POSITION_UNAVAILABLE:
                errorMessage = 'GPS unavailable. Try mobile device or update manually.';
                // Don't stop tracking - might become available
                // Only log once, not repeatedly
                if (!isTrackingRef.current) {
                    console.info('[GPS Tracking] GPS unavailable (normal on desktop)');
                }
                break;
            case error.TIMEOUT:
                errorMessage = 'GPS timeout. Will retry automatically.';
                // Don't stop tracking - just retry
                // Suppress repeated timeout messages
                break;
        }

        setStatus(prev => ({
            ...prev,
            error: errorMessage
        }));

        // If permission denied, stop tracking
        if (shouldStopTracking && isTrackingRef.current) {
            console.log('[GPS Tracking] Stopping due to permission denial');
            stopTracking();
        }

        onError?.(error);
    }, [onError]);    /**
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
            mode,
            updateInterval: `${effectiveUpdateInterval / 1000}s`,
            highAccuracy
        });

        isTrackingRef.current = true;
        setStatus(prev => ({
            ...prev,
            isTracking: true,
            error: null
        }));

        // Start watching position with more lenient settings
        watchIdRef.current = navigator.geolocation.watchPosition(
            handlePosition,
            handleError,
            {
                enableHighAccuracy: highAccuracy,
                timeout: 30000, // Increased from 15s to 30s for slower GPS
                maximumAge: 10000 // Allow cached positions up to 10s old
            }
        );

        // Set up periodic updates (watchPosition can be slow sometimes)
        intervalRef.current = setInterval(() => {
            if (lastPositionRef.current) {
                console.log(`[GPS Tracking] Periodic update check (${mode} mode)`);
                sendLocationUpdate(lastPositionRef.current);
            }
        }, effectiveUpdateInterval);

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

        // Abort any pending location update requests
        if (abortControllerRef.current) {
            abortControllerRef.current.abort();
            abortControllerRef.current = null;
        }

        // Reset request lock
        isRequestInProgressRef.current = false;

        // Notify backend
        try {
            const token = localStorage.getItem('token');
            if (token) {
                await fetch(`${API_CONFIG.MATCHING_SERVICE}/stop-location-tracking`, {
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
        isSupported: !!navigator.geolocation,
        mode,
        updateInterval: effectiveUpdateInterval
    };
};
