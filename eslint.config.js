import js from '@eslint/js'
import globals from 'globals'
import reactHooks from 'eslint-plugin-react-hooks'
import reactRefresh from 'eslint-plugin-react-refresh'
import tseslint from 'typescript-eslint'
import react from 'eslint-plugin-react'
import prettier from 'eslint-plugin-prettier'
import prettierConfig from 'eslint-config-prettier'
import unusedImports from 'eslint-plugin-unused-imports'

export default tseslint.config(
  prettierConfig,
  {
    ignores: ['dist', 'node_modules', 'commitlint.config.js'],
  },
  js.configs.recommended,
  ...tseslint.configs.recommended,
  {
    files: ['**/*.{ts,tsx}'],
    languageOptions: {
      ecmaVersion: 2022,
      globals: globals.browser,
      sourceType: 'module',
      parserOptions: {
        ecmaFeatures: {
          jsx: true,
        },
      },
    },
    plugins: {
      react,
      'react-hooks': reactHooks,
      'react-refresh': reactRefresh,
      prettier,
      'unused-imports': unusedImports,
    },
    rules: {
      ...reactHooks.configs.recommended.rules,
      'react-refresh/only-export-components': [
        'warn',
        { allowConstantExport: true },
      ],
      eqeqeq: ['error', 'always'],
      curly: 'error',
      'no-console': 'warn',
      '@typescript-eslint/no-unused-vars': 'error',
      'react/react-in-jsx-scope': 'off',
      'react/jsx-uses-react': 'off',
      'react/jsx-uses-vars': 'error',
      'react/jsx-curly-brace-presence': [
        'error',
        { props: 'never', children: 'never' },
      ],
      semi: ['error', 'never'],
      'prettier/prettier': [
        'error',
        {
          endOfLine: 'auto',
          useTabs: false,
          tabWidth: 2,
          printWidth: 80,
          singleQuote: true,
          trailingComma: 'all',
          semi: false,
        },
      ],
    },
    settings: {
      react: {
        version: 'detect',
      },
    },
  },
)
