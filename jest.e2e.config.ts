import { type Config } from '@jest/types';

const config: Config.InitialOptions = {
  verbose: true,
  transform: {},
  preset: 'ts-jest/presets/default-esm',
  rootDir: './tests',
  testRegex: '.e2e-spec.ts$',
  extensionsToTreatAsEsm: ['.ts'],
  globals: {
    'ts-jest': {
      useESM: true,
    },
  },
  moduleNameMapper: {
    '^(\\.{1,2}/.*)\\.js$': '$1',
  },
};

export default config;
