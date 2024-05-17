// jest.config.mjs
import { defaults } from 'jest-config';

export default {
  transform: {
    '^.+\\.jsx?$': 'babel-jest',
  },
  moduleFileExtensions: [...defaults.moduleFileExtensions, 'js', 'jsx'],
  testEnvironment: 'jest-environment-jsdom',
};
