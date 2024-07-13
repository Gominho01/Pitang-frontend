export default {
    testEnvironment: 'jsdom',
    moduleNameMapper: {
      "^.+\\.svg$": "jest-svg-transformer",
      "^.+\\.(css|less|scss)$": "identity-obj-proxy"
    },
    setupFilesAfterEnv: ['<rootDir>/src/setupTests.js'],
    moduleFileExtensions: ['js', 'jsx', 'ts', 'tsx']
  };