module.exports = {
  parser: '@typescript-eslint/parser',
  extends: [
    'plugin:react/recommended',
    'plugin:@typescript-eslint/recommended',
    'prettier',
    'plugin:prettier/recommended',
  ],
  parserOptions: {
    ecmaVersion: 2024,
    sourceType: 'module',
    ecmaFeatures: {
      jsx: true,
    },
  },
  settings: {
    react: {
      version: 'detect',
    },
  },
  rules: {
    'prettier/prettier': 'error',

    // Turn off unnecessary TypeScript rules
    '@typescript-eslint/explicit-function-return-type': 'off', // Allow omitting return types on functions
    '@typescript-eslint/interface-name-prefix': 'off', // Allow interface names to start with "I"
    '@typescript-eslint/no-var-requires': 'off', // Allow using require for imports
    '@typescript-eslint/no-namespace': 'off', // Allow using namespaces
    '@typescript-eslint/explicit-module-boundary-types': 'off', // Allow implicit return types for exported functions
  },
};