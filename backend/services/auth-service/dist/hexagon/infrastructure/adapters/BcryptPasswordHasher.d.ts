import { PasswordHasherPort } from '../../application/ports/PasswordHasherPort';
export declare class BcryptPasswordHasher implements PasswordHasherPort {
    private rounds;
    constructor(rounds?: number);
    hash(plain: string): Promise<string>;
    compare(plain: string, hash: string): Promise<boolean>;
}
