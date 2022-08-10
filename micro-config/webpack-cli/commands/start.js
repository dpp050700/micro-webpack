const webpack = require('webpack')
const webpackDevServer = require('webpack-dev-server')

const webpackConfig = require('../webpack/webpack.dev.js')

const start = function(options, cmd) {
  console.log(options)

  const webpackCompiler = webpack(webpackConfig)

  const serverOptions = webpackConfig.devServer
  new webpackDevServer(webpackCompiler, serverOptions)
    .listen(serverOptions.port)
}

module.exports = start