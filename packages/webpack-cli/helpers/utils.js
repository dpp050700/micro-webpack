const http = require('http')
const fs = require('fs-extra')

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

function downloadFile(url, dest) {
  console.log(url, dest)
  return new Promise((resolve, reject) => {
    const file = fs.createWriteStream(dest)
    const requestUrl = url.replace(/^((https)|(\/\/))/, 'http')

    fs.ensureFile(dest)
      .then(() => {
        const httpRequest = http.get(requestUrl, (response) => {
          response.pipe(file)
          file.on('finish', function () {
            file.close(resolve)
          })
        })

        httpRequest.setTimeout(6000, () => {
          fs.unlink(dest)
          reject(`请求${url}超时`)
        })

        httpRequest.on('error', (err) => {
          fs.unlink(dest)
          reject(err)
        })
      })
      .catch((err) => {
        reject(err)
      })
  })
}

module.exports = {
  formatDependenciesServiceName,
  smallCamel,
  bigCamel,
  downloadFile
}
