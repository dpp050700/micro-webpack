module.exports = {
  extends: [
    "stylelint-config-standard",
    "stylelint-config-prettier",
    "stylelint-config-rational-order"
  ],
  plugins: [
    "stylelint-declaration-block-no-ignored-properties"
  ],
  rules: {
    "plugin/declaration-block-no-ignored-properties": true,
  },
  ignoreFiles: ['node_modules/**/*', 'build/**/*', 'dist/**/*'],
}