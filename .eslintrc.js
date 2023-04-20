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
    plugins: ['@babel', 'react', 'prettier', 'unused-imports', 'jsx-a11y'],
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
        'prettier/prettier': 0,
        'eol-last': ['error', 'always'],
        'react/prop-types': 'warn',
        camelcase: [
            0,
            {
                properties: 'never',
            },
        ],
        'react/require-default-props': 'off',
        'react/function-component-definition': [
            'error',
            {
                namedComponents: 'arrow-function',
                unnamedComponents: 'arrow-function',
            },
        ],
        'class-methods-use-this': 'off',
        'import/prefer-default-export': [0],
        'no-shadow': 'off',
        'import/no-named-as-default': 0,
        'import/extensions': 'off',
        'react/jsx-filename-extension': [0],
        'no-unused-vars': 'warn',
        'unused-imports/no-unused-imports': 'error',
        indent: [2, 4, {SwitchCase: 1}],
        'key-spacing': [
            2,
            {
                singleLine: {
                    beforeColon: false,
                    afterColon: true,
                },
            },
        ],
        '@typescript-eslint/member-delimiter-style': 2,
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
            settings: {react: {version: 'detect'}},
            rules: {
                'prettier/prettier': [0],
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
