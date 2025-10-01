import type { Config } from 'jest';

const config: Config = {
    testEnvironment: 'node',
    roots: ['<rootDir>/src'],
    transform: {
        '^.+\\.(t|j)sx?$': 'ts-jest'
    },
    testRegex: '(/__tests__/.*|(\\.|/)(test|spec))\\.(t|j)sx?$',
    moduleFileExtensions: ['ts', 'js', 'json'],
    collectCoverageFrom: ['src/**/*.ts', '!src/index.ts'],
    coverageDirectory: 'coverage',
    maxWorkers: 1,
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
