import type { Config } from 'jest';

const config: Config = {
    rootDir: 'src',
    testMatch: [
        "**/__tests__/**/*.test.ts",
        "**/*.int.test.ts",
        "**/*.integration.test.ts"
    ],
    transform: { '^.+\\.(ts|tsx)$': 'ts-jest' },
    moduleFileExtensions: ['ts', 'js', 'json'],
    testEnvironment: 'node',
    clearMocks: true,
    collectCoverageFrom: ['**/*.ts', '!**/index.ts'],
    coverageThreshold: {
        global: {
            lines: 60,
            statements: 60,
            functions: 55,
            branches: 45
        }
    }
};

export default config;