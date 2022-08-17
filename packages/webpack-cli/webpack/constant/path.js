const fs = require('fs-extra')
const path = require('path')

const resolve = path.resolve

const CWD = process.cwd()

const entryFile = resolve(CWD, 'src/index.tsx')

const srcPath = resolve(CWD, 'src')

const buildOutPath = resolve(CWD, 'dist')

const globalLessPath = resolve(CWD, 'src/assets/style/global.less')

const ENV_DEPENDENCIES_LIST = resolve(CWD, 'micro.dependencies_list.env')

const ENV_DEPENDENCIES_CONFIG = resolve(CWD, 'micro.dependencies_config.env')

const pkgPath = resolve(CWD, 'package.json')

const dependenciesServiceDts = resolve(CWD, '@types/services')

module.exports = {
  resolve,
  CWD,
  entryFile,
  buildOutPath,
  globalLessPath,
  pkgPath,
  srcPath,
  dependenciesServiceDts,
  ENV_DEPENDENCIES_LIST,
  ENV_DEPENDENCIES_CONFIG
}
