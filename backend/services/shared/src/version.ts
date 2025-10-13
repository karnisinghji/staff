import { readFileSync } from 'fs';
import { join } from 'path';

/**
 * Get the version from package.json
 * Works in both development and production environments
 */
export function getVersion(): string {
    try {
        // Try to read package.json from multiple locations
        const possiblePaths = [
            join(__dirname, '..', 'package.json'),        // From dist/
            join(__dirname, '..', '..', 'package.json'),  // From dist/src/
            join(process.cwd(), 'package.json'),          // From working directory
        ];

        for (const pkgPath of possiblePaths) {
            try {
                const pkgJson = JSON.parse(readFileSync(pkgPath, 'utf-8'));
                if (pkgJson.version) {
                    return pkgJson.version;
                }
            } catch {
                // Try next path
                continue;
            }
        }

        // Fallback to environment variable
        return process.env.npm_package_version || '1.0.0';
    } catch (error) {
        return '1.0.0';
    }
}
