module.exports = {
    env: {browser: true, es6: true, node: true},
    extends: [
        'airbnb',
        'airbnb/hooks',
        'eslint:recommended',
        'plugin:react/recommended',
        'plugin:jsx-a11y/recommended',
        'prettier',
    ],
    parser: '@babel/eslint-parser',
    parserOptions: {
        ecmaVersion: 2020,
        sourceType: 'module',
        ecmaFeatures: {
            jsx: true,
        },
    },
    plugins: ['@babel', 'react', 'prettier', 'unused-imports'],
    settings: {
        react: {version: 'detect'},
        'import/resolver': {
            'babel-module': {},
        },
        node: {
            extensions: ['.js', '.jsx', '.ts', '.tsx', '.json'],
        },
    },
    rules: {
        'prettier/prettier': ['error'],
        'eol-last': ['error', 'always'],
        'react/prop-types': 'warn',
        camelcase: [
            0,
            {
                properties: 'never',
            },
        ],
        'import/prefer-default-export': [0],
        'react/jsx-filename-extension': [0],
        'import/extensions': 'off',
        'no-unused-vars': 'warn',
        'unused-imports/no-unused-imports': 'error',
        'import/order': [
            2,
            {
                groups: ['builtin', 'external', 'parent', 'sibling', 'index', 'type'],
                'newlines-between': 'always',
                pathGroups: [
                    {
                        pattern:
                            '{@(@app|@components|@constants|@database|@hooks|@initialize|@managers|@screens|@utils)/**,@(@constants|@i18n|@notifications)}',
                        group: 'external',
                        position: 'after',
                    },
                    {
                        pattern: 'app/**',
                        group: 'parent',
                        position: 'before',
                    },
                ],
                alphabetize: {
                    order: 'asc',
                    caseInsensitive: true,
                },
                pathGroupsExcludedImportTypes: ['type'],
            },
        ],
    },
    overrides: [
        {
            files: ['**/*.ts', '**/*.tsx'],
            env: {browser: true, es6: true, node: true},
            extends: [
                'airbnb-typescript',
                'airbnb/hooks',
                'prettier',
                'plugin:prettier/recommended',
                'plugin:react/recommended',
                'plugin:jsx-a11y/recommended',
                'plugin:@typescript-eslint/eslint-recommended',
                'plugin:@typescript-eslint/recommended',
                'plugin:rxjs/recommended',
            ],
            parser: '@typescript-eslint/parser',
            parserOptions: {
                ecmaFeatures: {jsx: true},
                ecmaVersion: 2020,
                sourceType: 'module',
                project: './tsconfig.json',
            },
            plugins: ['react', '@typescript-eslint', 'prettier', 'jest', 'rxjs', 'unused-imports'],
            indent: [2, 4, {SwitchCase: 1}],
            settings: {react: {version: 'detect'}},
            rules: {
                'prettier/prettier': ['error'],
                'react/prop-types': 'warn',
                'import/prefer-default-export': [0],
                '@typescript-eslint/prefer-optional-chain': ['error'],
                'react-hooks/exhaustive-deps': [
                    'error',
                    {
                        additionalHooks: '(useMemoizedCallback)',
                    },
                ],
                '@typescript-eslint/no-unused-vars': 'off',
                '@typescript-eslint/no-unused-vars-experimental': 'off',
                'no-unused-vars': 'off',
                'react/jsx-props-no-spreading': ['off'],
                'unused-imports/no-unused-imports': 'error',
            },
        },
    ],
    ignorePatterns: ['**/node_modules/**'],
};
