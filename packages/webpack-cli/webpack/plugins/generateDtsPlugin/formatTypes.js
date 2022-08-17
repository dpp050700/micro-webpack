const { resolve } = require('../../constant/path')
const fs = require('fs-extra')

function defaultReplace(fileData) {
  let newFileData = fileData.replace(/\/index'/g, "'")
  newFileData = newFileData.replace(/\/index"/g, '"')

  return newFileData
}

const formatTypes = (options) => {
  const { root, output, replaceList } = options
  const filePath = resolve(root, output)
  let fileData = ''
  if (fs.pathExistsSync(filePath)) {
    fileData = fs.readFileSync(filePath, { encoding: 'utf-8' })
  }

  fileData = defaultReplace(fileData)

  replaceList.forEach((rule) => {
    fileData = fileData.replace(new RegExp(rule[0], 'g'), rule[1])
  })
  fs.writeFileSync(filePath, fileData, { encoding: 'utf-8' })
}

module.exports = {
  formatTypes
}
