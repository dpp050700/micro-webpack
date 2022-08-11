const webpack = require('webpack')

const { ModuleFederationPlugin } = webpack.container

module.exports = {
  plugins: [
    new ModuleFederationPlugin({
      name: 'user',
      remotes: {
        container: 'container@http://localhost:4000/container.js'
      }
    })
  ]
}
