/** Root Jest Config aggregating workspace packages */
module.exports = {
  projects: [
    '<rootDir>/services/auth-service',
    '<rootDir>/services/user-service',
    '<rootDir>/services/communication-service',
    '<rootDir>/services/notification-service',
    '<rootDir>/services/matching-service'
  ],
  testEnvironment: 'node'
};