import typescriptEslint from '@typescript-eslint/eslint-plugin';
import unusedImports from 'eslint-plugin-unused-imports';
import tsParser from '@typescript-eslint/parser';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import js from '@eslint/js';
import { FlatCompat } from '@eslint/eslintrc';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const compat = new FlatCompat({
  baseDirectory: __dirname,
  recommendedConfig: js.configs.recommended,
  allConfig: js.configs.all,
});

export default [{
  ignores: [
    'build',
    'index.ts',
    'webpack.dev.config.js',
    'eslint.config.mjs',
    'dist',
    'webpack.dev.config.js',
    'webpack.prod.config.js',
    'scripts'
  ],
}, ...compat.extends(
  'airbnb-base',
  'airbnb-typescript/base',
  'eslint:recommended',
  'plugin:@typescript-eslint/eslint-recommended',
  'plugin:@typescript-eslint/recommended',
), {
  plugins: {
    '@typescript-eslint': typescriptEslint,
    'unused-imports': unusedImports,
  },
  languageOptions: {
    parser: tsParser,
    ecmaVersion: 5,
    sourceType: 'script',

    parserOptions: {
      project: './tsconfig.json',
    },
  },

  rules: {
    semi: ['error', 'always'],
    quotes: ['error', 'single'],
    'no-console': 'off',
    'no-shadow': 'off',
    'prefer-promise-reject-errors': 'off',
    'guard-for-in': 'off',
    'no-continue': 'off',
    'prefer-const': 'warn',
    'unused-imports/no-unused-imports': 'warn',
    'space-before-function-paren': ['warn', 'never'],
    '@typescript-eslint/no-empty-function': 'off',
    '@typescript-eslint/no-explicit-any': 'off',
    '@typescript-eslint/ban-ts-comment': 'off',
    'no-async-promise-executor': 'warn',
    'no-case-declarations': 'warn',

    'max-len': ['warn', {
      code: 125,
    }],

    '@typescript-eslint/ban-types': ['error', {
      types: {
        Function: false,
      },
    }],

    '@typescript-eslint/indent': ['warn', 2, {
      SwitchCase: 1,
    }],

    '@typescript-eslint/naming-convention': ['error', {
      selector: ['variable', 'typeLike'],
      format: ['camelCase', 'PascalCase'],
    }],

    'no-underscore-dangle': ['error'],
    'class-methods-use-this': ['off'],
    'no-param-reassign': ['warn'],
    'default-case': ['warn'],
    'no-plusplus': ['off'],
    'import/no-cycle': ['warn'],
    'no-return-assign': ['warn'],
    '@typescript-eslint/no-unused-expressions': ['warn'],
    'prefer-destructuring': ['warn'],
    'import/prefer-default-export': ['off'],
    '@typescript-eslint/no-useless-constructor': ['warn'],
    'no-restricted-exports': ['warn'],
    'no-restricted-globals': 'off',
    '@typescript-eslint/prefer-namespace-keyword': 0,
    '@typescript-eslint/space-before-function-paren': ['off'],
    '@typescript-eslint/explicit-function-return-type': 'warn',
  },
}];
