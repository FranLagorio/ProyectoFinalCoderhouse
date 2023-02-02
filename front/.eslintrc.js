const RULES = {
  OFF: 'off',
  WARN: 'warn',
  ERROR: 'error',
}
module.exports = {
  env: {
    browser: true,
    es2021: true,
    node: true,
  },
  extends: ['plugin:react/recommended', 'standard', 'prettier'],
  // poner prettier al final hace que no se pelee con eslint
  overrides: [],
  parserOptions: {
    ecmaFeatures: { jsx: true },
    ecmaVersion: 'latest',
    sourceType: 'module',
  },
  plugins: ['react'],
  rules: {
    'react/react-in-jsx-scope': RULES.OFF,
    'react/prop-types': RULES.OFF,
    'no-unused-vars': RULES.OFF,
  },
}
