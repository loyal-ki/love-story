const {defaults: tsjPreset} = require('ts-jest/presets');

module.exports = {
    ...tsjPreset,
    preset: 'react-native',
    verbose: true,
    globals: {
        'ts-jest': {
            babelConfig: true,
            diagnostics: {
                warnOnly: true,
                pathRegex: '\\.(spec|test)\\.ts$',
            },
            tsconfig: 'tsconfig.json',
            tsConfigFile: 'tsconfig.test.json',
        },
        __DEV__: true,
    },
    moduleFileExtensions: ['ts', 'tsx', 'android.js', 'ios.js', 'js', 'jsx', 'json', 'node'],
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
    moduleDirectories: ['typings', 'node_modules'],
    clearMocks: true,
    setupFilesAfterEnv: ['<rootDir>/test/setup.js'],
    collectCoverageFrom: ['app/**/*.{js,jsx,ts,tsx}'],
    coverageReporters: ['lcov', 'text-summary'],
    testPathIgnorePatterns: ['/node_modules/'],
    transform: {
        ...tsjPreset.transform,
        '^.+\\.(ts|tsx)$': 'ts-jest',
        '\\.(jpg|jpeg|png|gif|eot|otf|webp|svg|ttf|woff|woff2|mp4|webm|wav|mp3|m4a|aac|oga)$':
            '<rootDir>/test/file_transformer.js',
    },
    transformIgnorePatterns: [
        'node_modules/(?!(@react-native|react-native)|@sentry/react-native|react-clone-referenced-element|@react-native-community|react-navigation|@react-navigation/.*|validator|react-syntax-highlighter/.*|hast-util-from-selector|hastscript|property-information|hast-util-parse-selector|space-separated-tokens|comma-separated-tokens)',
    ],
    testRegex: '(/__tests__/hooks/.*|(\\.|/)(test|spec))\\.(jsx?|tsx?)$',
    testEnvironment: 'node',
};
