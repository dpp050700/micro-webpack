const fs = require('fs-extra')
const path = require('path')

const resolve = path.resolve

const CWD = process.cwd()

const entryFile = resolve(CWD, 'src/index.tsx')

const buildOutPath = resolve(CWD, 'dist')

const globalLessPath = resolve(CWD, 'src/assets/style/global.less')

module.exports = {
  CWD,
  entryFile,
  buildOutPath,
  globalLessPath
}