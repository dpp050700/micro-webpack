const Generator = require('npm-dts').Generator
const { resolve } = require('path')
const CWD = process.cwd()
const { bigCamel, pkg } = require('../../helper/index')
// const {} = require('../../constant/path')

// console.log(pkg)

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
        entry: resolve(CWD, 'src'),
        root: resolve(CWD),
        output: `@types/${bigCamel(pkg.name)}.d.ts`,
        logLevel: 'verbose'
      })

      generator.generate().then((res) => {
        console.log(res)
      })

      cb()
    })
  }
}

module.exports = GenerateDtsPlugin
