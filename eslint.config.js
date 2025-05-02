const { defineConfig } = require('eslint/config');

const prettier = require('eslint-plugin-prettier');
const tsParser = require('@typescript-eslint/parser');
const parser = require('jsonc-eslint-parser');
const js = require('@eslint/js');

const { FlatCompat } = require('@eslint/eslintrc');

const compat = new FlatCompat({
  baseDirectory: __dirname,
  recommendedConfig: js.configs.recommended,
  allConfig: js.configs.all,
});
const fs = require('fs');
const path = require('path');
const prettierOptions = JSON.parse(fs.readFileSync(path.resolve(__dirname, '.prettierrc'), 'utf8'));

module.exports = defineConfig([
  {
    extends: compat.extends('next/core-web-vitals', 'plugin:storybook/recommended', 'prettier', 'plugin:prettier/recommended'),

    plugins: {
      prettier,
    },

    rules: {
      'prettier/prettier': ['error', prettierOptions],
    },

    languageOptions: {
      parser: tsParser,
    },
  },
  {
    files: ['**/*.ts?(x)'],

    rules: {
      'prettier/prettier': ['warn', prettierOptions],
      'react-hooks/exhaustive-deps': ['off'],
    },
  },
  {
    files: ['**/*.json'],

    languageOptions: {
      parser: parser,
    },

    rules: {},
  },
]);
