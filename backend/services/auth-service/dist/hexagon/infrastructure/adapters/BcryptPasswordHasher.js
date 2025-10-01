"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.BcryptPasswordHasher = void 0;
// bcryptjs sometimes ships without prebuilt dist in certain install states; fallback to src.
let bcrypt;
try {
    // eslint-disable-next-line @typescript-eslint/no-var-requires
    bcrypt = require('bcryptjs');
    if (!bcrypt?.hash && require.resolve('bcryptjs/src/bcrypt')) {
        // eslint-disable-next-line @typescript-eslint/no-var-requires
        bcrypt = require('bcryptjs/src/bcrypt');
    }
}
catch (e) {
    // minimal fallback shim (NON-SECURE) for emergency startup only.
    bcrypt = {
        async hash(p) { return 'sha256:' + require('crypto').createHash('sha256').update(p).digest('hex'); },
        async compare(p, h) { return h === 'sha256:' + require('crypto').createHash('sha256').update(p).digest('hex'); }
    };
}
class BcryptPasswordHasher {
    constructor(rounds = 10) {
        this.rounds = rounds;
    }
    async hash(plain) { return bcrypt.hash(plain, this.rounds); }
    async compare(plain, hash) { return bcrypt.compare(plain, hash); }
}
exports.BcryptPasswordHasher = BcryptPasswordHasher;
//# sourceMappingURL=BcryptPasswordHasher.js.map