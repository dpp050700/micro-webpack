const globby = require('globby')
// const fs = require('fs-extra')
const path = require('path')
const slash = require('slash')

const { resolve } = path
// const CWD = process.cwd()

function getExposeModules() {
  const modules = ['components', 'utils', 'styles']
  return modules.reduce((prev, current) => {
    const currentValue = {}

    globby.sync([resolve(__dirname, `../src/${current}/*/index.*`)]).forEach((currentGroup) => {
      const matched = slash(currentGroup).match(/([\dA-Za-z]+)\/([\dA-Za-z]+)\/(index\.[\dA-Za-z]+)$/)
      const type = matched && matched[1]
      const group = matched && matched[2]

      if (type && group) {
        const key = `./${type}/${group}`
        currentValue[key] = currentGroup
      }
    })

    return { ...prev, ...currentValue }
  }, {})
}

const generateDefaultMFExposes = () => {
  const exposes = getExposeModules()
  return exposes
}

module.exports = {
  generateDefaultMFExposes
}
