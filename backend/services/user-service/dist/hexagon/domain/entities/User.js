"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserEntity = void 0;
class UserEntity {
    constructor(props) {
        this.props = Object.freeze({ ...props });
    }
    get id() { return this.props.id; }
    get username() { return this.props.username; }
    get role() { return this.props.role; }
    get name() { return this.props.name ?? null; }
    get location() { return this.props.location ?? null; }
    get phone() { return this.props.phone ?? null; }
    get createdAt() { return this.props.createdAt; }
    hasBaseProfile() { return !!this.name && !!this.location; }
    toPrimitives() {
        return { ...this.props };
    }
}
exports.UserEntity = UserEntity;
//# sourceMappingURL=User.js.map