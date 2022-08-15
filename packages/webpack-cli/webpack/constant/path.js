const fs = require('fs-extra')
const path = require('path')

const resolve = path.resolve

const CWD = process.cwd()

const entryFile = resolve(CWD, 'src/index.tsx')

const buildOutPath = resolve(CWD, 'dist')

const globalLessPath = resolve(CWD, 'src/assets/style/global.less')

const ENV_DEPENDENCIES_LIST = resolve(CWD, 'micro.dependencies_list.env')

const ENV_DEPENDENCIES_CONFIG = resolve(CWD, 'micro.dependencies_config.env')

const pkgPath = resolve(CWD, 'package.json')

module.exports = {
  CWD,
  entryFile,
  buildOutPath,
  globalLessPath,
  pkgPath,
  ENV_DEPENDENCIES_LIST,
  ENV_DEPENDENCIES_CONFIG
}
