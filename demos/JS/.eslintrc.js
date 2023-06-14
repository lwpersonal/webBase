module.exports = {
  env: {
    node: true,
    es6: true,
    browser: true,
  },
  root: true,
  parser: '@typescript-eslint/parser',
  plugins: ['@typescript-eslint', 'prettier'],
  extends: [
    'eslint:recommended',
    'plugin:@typescript-eslint/recommended',
    'prettier',
  ],
  rules: {
    'prettier/prettier': 'warn',
    'no-console': 'off',
    // 'no-unused-vars': 'off',
    'no-use-before-define': 'warn',
    '@typescript-eslint/no-unused-vars': ['error', { args: 'after-used' }],
    '@typescript-eslint/no-explicit-any': 'off',
  },
};
