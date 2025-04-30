const fs = require('fs');
const path = require('path');

const prettierOptions = JSON.parse(fs.readFileSync(path.resolve(__dirname, '.prettierrc'), 'utf8'));

module.exports = {
  extends: ['next/core-web-vitals', 'plugin:storybook/recommended', 'prettier', 'plugin:prettier/recommended'],
  plugins: ['prettier'],
  rules: {
    'prettier/prettier': ['error', prettierOptions],
  },
  parser: '@typescript-eslint/parser',
  overrides: [
    {
      files: ['**/*.ts?(x)'],
      rules: {
        'prettier/prettier': ['warn', prettierOptions],
        'react-hooks/exhaustive-deps': ['off'],
      },
    },
    {
      files: ['*.json'],
      parser: 'jsonc-eslint-parser',
      rules: {},
    },
  ],
};
