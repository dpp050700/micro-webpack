const plugin = {
  name: 'FileUpdateNotifyPlugin'
}

class FileUpdateNotifyPlugin {
  constructor({ serviceList }) {
    this.serviceList = serviceList || []
  }
  apply(compiler) {
    compiler.hooks.done.tapAsync(plugin, (status, cb) => {
      this.serviceList.forEach((service) => {
        console.log(service)
      })
      cb()
    })
  }
}

module.exports = FileUpdateNotifyPlugin
