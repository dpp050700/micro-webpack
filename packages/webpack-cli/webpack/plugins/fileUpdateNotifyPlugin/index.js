const plugin = {
  name: 'FileUpdateNotifyPlugin'
}

class FileUpdateNotifyPlugin {
  constructor({ finish }) {
    this.finish = finish
  }
  apply(compiler) {
    compiler.hooks.done.tapAsync(plugin, (status, cb) => {
      if (this.finish) {
        this.finish()
      }
      cb()
    })
  }
}

module.exports = FileUpdateNotifyPlugin
