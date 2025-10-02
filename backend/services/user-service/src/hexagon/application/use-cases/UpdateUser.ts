import { UserRepositoryPort, UpdateUserFields } from '../ports/UserRepository';

export class UpdateUserUseCase {
    constructor(private users: UserRepositoryPort) { }

    async execute(userId: string, fields: UpdateUserFields) {
        if (!Object.keys(fields).length) throw new Error('No valid update fields provided');

        // Get current user to check if this is first completion
        const currentUser = await this.users.findById(userId);
        if (!currentUser) throw new Error('User not found');

        const current = currentUser.toPrimitives();

        // Handle registration field edge case: if user is trying to set phone/email to their username (registration identifier)
        // This is valid and should not trigger uniqueness validation errors
        if (fields.phone && fields.phone === current.username) {
            // This is the user setting their phone to their registration phone - allow it
        }
        if (fields.email && fields.email === current.username) {
            // This is the user setting their email to their registration email - allow it
        }

        // Check if critical profile fields are being completed for the first time
        const isCompletingEmail = !current.email && fields.email;
        const isCompletingPhone = !current.phone && fields.phone;
        const isCompletingLocation = !current.location && fields.location;
        const isCompletingAddress = !current.address && fields.address;

        const isCompletingProfile = isCompletingEmail || isCompletingPhone || isCompletingLocation || isCompletingAddress;

        // Check if all critical fields will be present after this update
        const willHaveEmail = current.email || fields.email;
        const willHavePhone = current.phone || fields.phone;
        const willHaveLocation = current.location || fields.location;
        const willHaveAddress = current.address || fields.address;

        const willBeComplete = willHaveEmail && willHavePhone && willHaveLocation && willHaveAddress;

        // If completing critical fields and no previous completion date, set profile completion date
        const shouldMarkComplete = isCompletingProfile &&
            !current.profileCompletedAt &&
            willBeComplete;

        // Add profile completion tracking
        if (shouldMarkComplete) {
            fields.profileCompletedAt = new Date().toISOString();

            // Also set lock date if critical fields are being locked
            if (willHaveEmail && willHavePhone) {
                fields.profileLockedAt = new Date().toISOString();
            }
        }

        const updated = await this.users.updateUser(userId, fields);
        return updated.toPrimitives();
    }
}
