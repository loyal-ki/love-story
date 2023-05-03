const {defaults: tsjPreset} = require('ts-jest/presets');

module.exports = {
    ...tsjPreset,
    preset: 'react-native',
    moduleFileExtensions: ['ts', 'tsx', 'android.js', 'ios.js', 'js', 'jsx', 'json', 'node'],
    setupFiles: ['./node_modules/react-native-gesture-handler/jestSetup.js', './jest/setup.js'],
    testPathIgnorePatterns: ['/node_modules/'],
    moduleNameMapper: {
        '^@app/(.*)': '<rootDir>/app/$1',
        '^@database/(.*)': '<rootDir>/app/database/$1',
        '^@components/(.*)': '<rootDir>/app/components/$1',
        '^@constants/(.*)': '<rootDir>/app/constants/$1',
        '^@context/(.*)': '<rootDir>/app/context/$1',
        '^@hooks/(.*)': '<rootDir>/app/hooks/$1',
        '^@initialize/(.*)': '<rootDir>/app/initialize/$1',
        '^@localization/(.*)': '<rootDir>/app/localization/$1',
        '^@managers/(.*)': '<rootDir>/app/managers/$1',
        '^@models/(.*)': '<rootDir>/app/models/$1',
        '^@navigation/(.*)': '<rootDir>/app/navigation/$1',
        '^@services/(.*)': '<rootDir>/app/services/$1',
        '^@utils/(.*)': '<rootDir>/app/utils/$1',
        '^@store/(.*)': '<rootDir>/app/store/$1',
        '^@screens/(.*)': '<rootDir>/app/screens/$1',
    },
    transform: {
        ...tsjPreset.transform,
        '\\.js$': '<rootDir>/node_modules/react-native/jest/preprocessor.js',
        '^.+\\.(ts|tsx)$': 'ts-jest',
    },
    moduleDirectories: ['typings', 'node_modules'],
    globals: {
        'ts-jest': {
            babelConfig: true,
            diagnostics: {
                warnOnly: true,
                pathRegex: '\\.(spec|test)\\.ts$',
            },
            tsconfig: 'tsconfig.json',
        },
        __DEV__: true,
    },
    transformIgnorePatterns: [
        'node_modules/(?!(jest-)?react-native|react-native-navigation|react-navigation-redux-helpers|@react-native-community|@react-native-navigation)',
    ],
    testRegex: '(/__tests__/hooks/.*|(\\.|/)(test|spec))\\.(jsx?|tsx?)$',
    cacheDirectory: '.jest/cache',
    testEnvironment: 'node',
};
