const Generator = require('npm-dts').Generator
const { resolve } = require('path')
const CWD = process.cwd()
const { bigCamel, pkg } = require('../../../helpers/utils')
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
        _options.finish && _options.finish()
      })

      cb()
    })
  }
}

module.exports = GenerateDtsPlugin
