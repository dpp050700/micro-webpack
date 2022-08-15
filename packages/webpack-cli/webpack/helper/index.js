const { pkgPath } = require('../constant/path')

const pkg = require(pkgPath)

function formatDependenciesServiceName(projectName) {
  return `${projectName.replace(/\-/g, '_').toUpperCase()}_SERVICE`
}

function smallCamel(str, separator = '-') {
  const reg = new RegExp(`${separator}([a-z])`, 'g')
  return str.replace(reg, (p, m) => m.toUpperCase())
}

function bigCamel(str, separator = '-') {
  const s = smallCamel(str, separator)
  return s.replace(s.charAt(0), s.charAt(0).toUpperCase())
}

module.exports = {
  formatDependenciesServiceName,
  smallCamel,
  bigCamel,
  pkg
}
