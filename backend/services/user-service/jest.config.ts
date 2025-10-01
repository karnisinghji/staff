import type { Config } from 'jest';

const config: Config = {
    rootDir: 'src',
    testMatch: [
        "**/__tests__/**/*.test.ts",
        "**/*.usecase.test.ts",
        "**/*.integration.test.ts",
        "**/*.int.test.ts"
    ],
    transform: {
        '^.+\\.(ts|tsx)$': 'ts-jest'
    },
    moduleFileExtensions: ['ts', 'js', 'json'],
    testEnvironment: 'node',
    clearMocks: true,
    coveragePathIgnorePatterns: ['/node_modules/', '/__tests__/', '/hexagon/application/use-cases/__tests__/fakes.ts'],
    collectCoverageFrom: ["**/*.ts", "!**/dist/**", "!**/node_modules/**", "!jest.config.ts"],
    setupFilesAfterEnv: [],
    coverageThreshold: {
        global: {
            statements: 70,
            branches: 60,
            functions: 70,
            lines: 70
        }
    }
};

export default config;
