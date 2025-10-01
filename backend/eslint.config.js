// Shared backend ESLint flat config
import js from '@eslint/js';
import globals from 'globals';
import tseslint from 'typescript-eslint';

export default [
  {
    files: ['services/**/*.ts'],
    ignores: ['**/dist/**', 'legacy/**'],
    languageOptions: {
      ecmaVersion: 2020,
      sourceType: 'module',
      globals: {
        ...globals.node,
        ...globals.es2021
      },
      parserOptions: {
        project: ['./tsconfig.json'],
      }
    },
    plugins: {},
    rules: {
      ...js.configs.recommended.rules,
      // TypeScript recommended (without type-aware heavy rules by default)
      ...tseslint.configs.recommended[0].rules,
      // Custom backend rules
      'no-console': 'warn',
      'prefer-const': 'error',
      'eqeqeq': ['error', 'always'],
    }
  },
  // Type aware additions (optional) could be appended later with parserOptions.project enabled
];
