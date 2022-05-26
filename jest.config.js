const nextJest = require('next/jest')

const createJestConfig = nextJest({
  dir: './'
})
const customJestConfig = {
  setupFilesAfterEnv: ['<rootDir>/jest.setup.js'],
  moduleDirectories: ['node_modules', '<rootDir>/'],
  testPathIgnorePatterns: ["<rootDir>/cypress/"],
  testEnvironment: 'jest-environment-jsdom',
  modulePathIgnorePatterns: ['cypress'],
}
module.exports = createJestConfig(customJestConfig)
