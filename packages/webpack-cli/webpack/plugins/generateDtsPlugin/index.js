const Generator = require('npm-dts').Generator
const { resolve } = require('path')
const CWD = process.cwd()
const { bigCamel, pkg } = require('../../helper/index')
const { formatTypes } = require('./formatTypes')

const plugin = {
  name: 'GenerateDtsPlugin'
}

class GenerateDtsPlugin {
  constructor(options) {
    this.options = options || {}
  }

  apply(compiler) {
    const _options = this.options

    compiler.hooks.done.tapAsync(plugin, (status, cb) => {
      const generator = new Generator({
        ..._options,
        logLevel: 'debug'
      })

      generator.generate().then((res) => {
        formatTypes(this.options)
      })

      cb()
    })
  }
}

module.exports = GenerateDtsPlugin
