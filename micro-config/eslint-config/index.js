const OFF = 0
const WARN = 1
const ERROR = 2


module.exports = {
  env: {
    browser: true,
    es2021: true,
    node: true
  },
  extends: [
    "airbnb",
    "plugin:react/recommended",
    'plugin:prettier/recommended'
  ],
  parser: "@typescript-eslint/parser",
  parserOptions: {
    ecmaFeatures: {
        "jsx": true
    },
    ecmaVersion: "latest",
    sourceType: "module"
  },
  plugins: [
    "react",
    "@typescript-eslint",
    "prettier"
  ],
  rules: {
    'import/no-extraneous-dependencies': OFF,
    'react/require-default-props': OFF,
    'unicorn/consistent-destructuring': OFF,
    'react/destructuring-assignment': OFF,
    'react/jsx-filename-extension': [ERROR, { extensions: ['.tsx', 'ts', '.jsx', 'js'] }],
  }
}
