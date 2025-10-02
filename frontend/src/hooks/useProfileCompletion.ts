import { useState, useEffect } from 'react';

interface ProfileCompletionStatus {
    isComplete: boolean;
    isFirstLogin: boolean;
    missingFields: string[];
    completionPercentage: number;
    isLocked: boolean; // Fields are locked after first save
}

interface UserProfile {
    id?: string;
    name?: string | null;
    email?: string | null;
    phone?: string | null;
    location?: string | null;
    address?: string | null;
    skillType?: string | null;
    role?: 'worker' | 'contractor';
    profileCompletedAt?: string | null; // Date when profile was first completed
    profileLockedAt?: string | null; // Date when critical fields were locked
}

export function useProfileCompletion(profile: UserProfile | null, user: any) {
    const [completionStatus, setCompletionStatus] = useState<ProfileCompletionStatus>({
        isComplete: false,
        isFirstLogin: false,
        missingFields: [],
        completionPercentage: 0,
        isLocked: false
    });

    useEffect(() => {
        if (!profile || !user) {
            setCompletionStatus({
                isComplete: false,
                isFirstLogin: false,
                missingFields: [],
                completionPercentage: 0,
                isLocked: false
            });
            return;
        }

        // Determine registration type to exclude from mandatory fields
        const registrationType = getRegistrationType(user.username || '');

        // Check mandatory fields (exclude the field user registered with)
        const allFields = [
            { key: 'email', label: 'Email', value: profile.email, required: registrationType !== 'email' },
            { key: 'phone', label: 'Phone Number', value: profile.phone, required: registrationType !== 'phone' },
            { key: 'location', label: 'Location', value: profile.location, required: true },
            { key: 'address', label: 'Address', value: profile.address, required: true },
            { key: 'skillType', label: 'Primary Skill', value: profile.skillType, required: true },
            { key: 'name', label: 'Display Name', value: profile.name, required: true }
        ];

        const mandatoryFields = allFields.filter(field => field.required);

        // Find missing mandatory fields
        const missingFields = mandatoryFields
            .filter(field => !field.value || field.value.toString().trim() === '')
            .map(field => field.label);

        // Calculate completion percentage
        const completedCount = mandatoryFields.length - missingFields.length;
        const completionPercentage = Math.round((completedCount / mandatoryFields.length) * 100);

        // Check if profile is complete
        const isComplete = missingFields.length === 0;

        // Check if this is first login (no profile completion date and missing critical fields)
        // Don't require the field they registered with
        const requiresEmail = registrationType !== 'email';
        const requiresPhone = registrationType !== 'phone';

        const isFirstLogin = !profile.profileCompletedAt && (
            (requiresEmail && !profile.email) ||
            (requiresPhone && !profile.phone) ||
            !profile.location || !profile.skillType
        );

        // Check if critical fields should be locked
        const isLocked = !!profile.profileLockedAt || (
            isComplete && !!profile.profileCompletedAt
        );

        setCompletionStatus({
            isComplete,
            isFirstLogin,
            missingFields,
            completionPercentage,
            isLocked
        });

    }, [profile, user]);

    return completionStatus;
}

// Helper function to determine registration type
function getRegistrationType(username: string): 'email' | 'phone' | 'unknown' {
    if (!username) return 'unknown';
    // Trim whitespace and check patterns
    const trimmedUsername = username.trim();
    if (/^\+?\d{7,15}$/.test(trimmedUsername)) return 'phone';
    if (/^\S+@\S+\.\S+$/.test(trimmedUsername)) return 'email';
    // Default to email if it looks like it could be an email
    if (trimmedUsername.includes('@')) return 'email';
    return 'unknown';
}

// Function to auto-fill registration data
export function getAutoFillData(user: any): { email?: string; phone?: string; registrationType: 'email' | 'phone' | 'unknown' } {
    if (!user || !user.username) {
        return { registrationType: 'unknown' };
    }

    const registrationType = getRegistrationType(user.username);

    if (registrationType === 'email') {
        return {
            email: user.username,
            registrationType: 'email'
        };
    } else if (registrationType === 'phone') {
        return {
            phone: user.username,
            registrationType: 'phone'
        };
    }

    return { registrationType: 'unknown' };
}

// Function to check if fields should be locked
export function getFieldLockStatus(profile: UserProfile | null, fieldName: string): boolean {
    if (!profile) return false;

    // Critical fields that get locked after first save
    const criticalFields = ['email', 'phone']; if (!criticalFields.includes(fieldName)) {
        return false; // Non-critical fields are never locked
    }

    // Lock if profile has been completed and locked
    return !!profile.profileLockedAt || (
        !!profile.profileCompletedAt &&
        !!profile.email &&
        !!profile.phone
    );
}

// Function to generate completion tips
export function getCompletionTips(missingFields: string[]): string[] {
    const tips: string[] = [];

    if (missingFields.includes('Email')) {
        tips.push('📧 Add your email to receive important notifications');
    }

    if (missingFields.includes('Phone Number')) {
        tips.push('📱 Add your phone number for quick contact by clients');
    }

    if (missingFields.includes('Location')) {
        tips.push('📍 Add your location to find work opportunities nearby');
    }

    if (missingFields.includes('Primary Skill')) {
        tips.push('🔧 Select your primary skill to match with relevant jobs');
    }

    if (missingFields.includes('Address')) {
        tips.push('🏠 Add your address for accurate service area mapping');
    }

    return tips;
}