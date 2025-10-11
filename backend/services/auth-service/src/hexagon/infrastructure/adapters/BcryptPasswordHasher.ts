// Use bcrypt (native) instead of bcryptjs
let bcrypt: any;
try {
    // eslint-disable-next-line @typescript-eslint/no-var-requires
    bcrypt = require('bcrypt');
} catch (e) {
    // minimal fallback shim (NON-SECURE) for emergency startup only.
    bcrypt = {
        async hash(p: string) { return 'sha256:' + require('crypto').createHash('sha256').update(p).digest('hex'); },
        async compare(p: string, h: string) { return h === 'sha256:' + require('crypto').createHash('sha256').update(p).digest('hex'); }
    };
    console.error('[ERROR] bcrypt not available, using INSECURE fallback!');
}
import { PasswordHasherPort } from '../../application/ports/PasswordHasherPort';

export class BcryptPasswordHasher implements PasswordHasherPort {
    constructor(private rounds = 10) { }
    async hash(plain: string): Promise<string> { return bcrypt.hash(plain, this.rounds); }
    async compare(plain: string, hash: string): Promise<boolean> { return bcrypt.compare(plain, hash); }
}
