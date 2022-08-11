const webpack = require('webpack')
const webpackDevServer = require('webpack-dev-server')
const { resolve } = require('path')
const { CWD } = require('../webpack/constant/path')
const webpackMerge = require('webpack-merge').merge

const webpackConfig = require('../webpack/webpack.dev.js')

const start = function (options, cmd) {
  const { port, config: customConfig } = options

  webpackConfig.devServer.port = port || webpackConfig.devServer.port

  if (customConfig) {
    const config = require(resolve(CWD, customConfig))
    if (typeof config == 'function') {
      console.log('方法还没实现')
      process.exit(1)
      // const configResult = await config(webpackConfig, mergeMFConfig, webpack)
      // compileConfig = webpackMerge(standardConfig, configResult)
    } else if (typeof config == 'object') {
      console.log(111112334)
      compileConfig = webpackMerge(webpackConfig, config)
      // process.exit(1)
    } else {
      console.log(customConfig + '不支持的数据格式')
      process.exit(1)
    }
  }

  const webpackCompiler = webpack(webpackConfig)

  const serverOptions = webpackConfig.devServer
  new webpackDevServer(webpackCompiler, serverOptions).listen(serverOptions.port)
}

module.exports = start
