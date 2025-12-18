module.exports = {
  env: { es2021: true, browser: true, node: true },
  extends: ['eslint:recommended', 'plugin:react/recommended'],
  parserOptions: { ecmaVersion: 12, sourceType: 'module' },
  settings: { react: { version: 'detect' } },
  rules: {}
}
