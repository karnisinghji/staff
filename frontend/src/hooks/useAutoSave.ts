import { useState, useEffect, useCallback, useRef } from 'react';

type AutoSaveStatus = 'idle' | 'saving' | 'saved' | 'error';

interface UseAutoSaveOptions<T> {
    data: T;
    saveFunction: (data: T) => Promise<void>;
    delay?: number; // Debounce delay in milliseconds
    enabled?: boolean;
}

export function useAutoSave<T>({
    data,
    saveFunction,
    delay = 2000,
    enabled = true
}: UseAutoSaveOptions<T>) {
    const [status, setStatus] = useState<AutoSaveStatus>('idle');
    const [lastSaved, setLastSaved] = useState<T | null>(null);
    const timeoutRef = useRef<NodeJS.Timeout | null>(null);
    const savePromiseRef = useRef<Promise<void> | null>(null);

    // Check if data has changed
    const hasChanged = useCallback(() => {
        if (!lastSaved) return false;
        return JSON.stringify(data) !== JSON.stringify(lastSaved);
    }, [data, lastSaved]);

    // Save function with error handling
    const performSave = useCallback(async () => {
        if (!enabled || !hasChanged()) return;

        try {
            setStatus('saving');
            savePromiseRef.current = saveFunction(data);
            await savePromiseRef.current;
            setStatus('saved');
            setLastSaved(data);

            // Reset to idle after showing success
            setTimeout(() => {
                setStatus('idle');
            }, 2000);
        } catch (error) {
            setStatus('error');
            console.error('Auto-save failed:', error);

            // Reset to idle after showing error
            setTimeout(() => {
                setStatus('idle');
            }, 3000);
        } finally {
            savePromiseRef.current = null;
        }
    }, [data, saveFunction, enabled, hasChanged]);

    // Debounced save effect
    useEffect(() => {
        if (!enabled || !hasChanged()) return;

        // Clear existing timeout
        if (timeoutRef.current) {
            clearTimeout(timeoutRef.current);
        }

        // Set new timeout
        timeoutRef.current = setTimeout(() => {
            performSave();
        }, delay);

        return () => {
            if (timeoutRef.current) {
                clearTimeout(timeoutRef.current);
            }
        };
    }, [data, delay, enabled, performSave, hasChanged]);

    // Manual save function
    const saveNow = useCallback(async () => {
        if (timeoutRef.current) {
            clearTimeout(timeoutRef.current);
        }
        await performSave();
    }, [performSave]);

    // Initialize lastSaved
    useEffect(() => {
        if (lastSaved === null) {
            setLastSaved(data);
        }
    }, [data, lastSaved]);

    return {
        status,
        saveNow,
        hasUnsavedChanges: hasChanged()
    };
}