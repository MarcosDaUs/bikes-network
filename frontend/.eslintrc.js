module.exports = {
  env: {
    browser: true,
    es2021: true,
  },
  settings: {
    react: {
      version: 'detect',
    },
  },
  extends: [
    'plugin:react/recommended',
    'plugin:react/jsx-runtime',
    'plugin:react-hooks/recommended',
    'standard-with-typescript',
    'prettier',
  ],
  parser: '@typescript-eslint/parser',
  overrides: [],
  parserOptions: {
    tsconfigRootDir: __dirname,
    project: ['./tsconfig.eslint.json'],
    ecmaVersion: 'latest',
    sourceType: 'module',
  },
  plugins: ['react', '@typescript-eslint'],
  root: true,
  rules: {
    '@typescript-eslint/strict-boolean-expressions': 'warn',
  },
};
