import type { Config } from 'jest';

const config: Config = {
    testEnvironment: 'node',
    transform: { '^.+\\.(t|j)sx?$': 'ts-jest' },
    roots: ['<rootDir>/src'],
    moduleFileExtensions: ['ts', 'js', 'json'],
    collectCoverageFrom: ['src/**/*.ts', '!src/index.ts'],
    coverageDirectory: 'coverage',
    maxWorkers: 1
};

export default config;
