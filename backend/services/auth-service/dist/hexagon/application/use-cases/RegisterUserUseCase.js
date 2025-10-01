"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.RegisterUserUseCase = void 0;
const uuid_1 = require("uuid");
class RegisterUserUseCase {
    constructor(repo, hasher) {
        this.repo = repo;
        this.hasher = hasher;
    }
    async execute(input) {
        const identifier = input.email.toLowerCase();
        const existing = await this.repo.findByEmail(identifier);
        if (existing) {
            // Determine if identifier is phone or email for better error message
            const isPhone = /^[\+]?[0-9]{7,15}$/.test(identifier);
            if (isPhone) {
                throw new Error('USERNAME_TAKEN:phone number');
            }
            else {
                throw new Error('EMAIL_TAKEN');
            }
        }
        const passwordHash = await this.hasher.hash(input.password);
        const created = await this.repo.create({
            id: (0, uuid_1.v4)(),
            email: identifier,
            passwordHash,
            roles: input.roles && input.roles.length ? input.roles : ['user']
        });
        return { id: created.id, email: created.email, roles: created.roles };
    }
}
exports.RegisterUserUseCase = RegisterUserUseCase;
//# sourceMappingURL=RegisterUserUseCase.js.map