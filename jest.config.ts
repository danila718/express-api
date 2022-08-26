import { type Config } from '@jest/types';

const config: Config.InitialOptions = {
  verbose: true,
  preset: 'ts-jest',
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

// import { type InitialOptionsTsJest } from 'ts-jest';
// import { defaults as tsjPreset } from 'ts-jest/presets';

// const config: InitialOptionsTsJest = {
//   verbose: true,
//   preset: 'ts-jest',
// };

// export default config;
