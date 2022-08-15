const __DEV__ = process.env.NODE_ENV !== 'production'

const ENV_DEPENDENCIES_NAME = 'DEPENDENCIES_SERVICES'

module.exports = {
  __DEV__,
  ENV_DEPENDENCIES_NAME
}
