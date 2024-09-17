//jest.config.js
module.exports = {
    setupFilesAfterEnv: ['<rootDir>/src/setupTests.js'],
    testEnvironment: 'jsdom',
    transformIgnorePatterns: [
      '/node_modules/(?!axios)/', // Transform axios and ignore other node_modules
    ],
    transform: {
      '^.+\\.(js|jsx|ts|tsx)$': 'babel-jest', // Use babel-jest to transform files
    },
    moduleNameMapper: {
      '^react-owl-carousel$': '<rootDir>/src/__mocks__/react-owl-carousel.js',
      '\\.(css|less|scss|sass)$': 'identity-obj-proxy', // Mock CSS imports
    },
  };
  
  
  
  
  
    