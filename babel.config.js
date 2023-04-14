module.exports = {
    presets: [
        'module:metro-react-native-babel-preset',
        '@babel/preset-typescript',
        ['@babel/preset-env', {targets: {node: 'current'}}],
    ],
    plugins: [
        '@babel/plugin-transform-runtime',
        ['@babel/plugin-proposal-decorators', {legacy: true}],
        ['@babel/plugin-transform-flow-strip-types'],
        ['@babel/plugin-proposal-class-properties', {loose: true}],
        ['@babel/plugin-proposal-private-property-in-object', {loose: true}],
        [
            'module-resolver',
            {
                root: ['.'],
                alias: {
                    '@app': './app',
                    '@database': './app/database',
                    '@constants': './app/constants',
                    '@context': './app/context',
                    '@hooks': './app/hooks',
                    '@initialize': './app/initialize',
                    '@localization': './app/localization',
                    '@managers': './app/managers',
                    '@utils': './app/utils',
                    '@store': './app/store',
                    '@screens': './app/screens',
                    '@env': './env',
                    '@assets': './assets',
                    '@typings': './types',
                },
            },
        ],
        [
            'module:react-native-dotenv',
            {
                moduleName: 'react-native-dotenv',
                path: '.env',
                blacklist: null,
                whitelist: null,
                safe: false,
                allowUndefined: true,
            },
        ],
        'react-native-reanimated/plugin',
    ],
    exclude: ['**/*.png', '**/*.jpg', '**/*.gif'],
};
