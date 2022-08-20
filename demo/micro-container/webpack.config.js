const webpack = require('webpack')

const { generateDefaultMFExposes } = require('./scripts/createExposes')

const { ModuleFederationPlugin } = webpack.container

module.exports = {
  plugins: [
    new ModuleFederationPlugin({
      filename: 'remoteEntry.js',
      name: 'MicroContainer',
      exposes: generateDefaultMFExposes()
    })
  ]
}
