const { entryFile, buildOutPath, CWD } = require('./constant/path') 
const HtmlWebpackPlugin = require('html-webpack-plugin')
const path = require('path')

const resolve = path.resolve

console.log(resolve(__dirname, './templates/index.html'))

module.exports = {
  mode: 'development',
  devtool: 'inline-source-map',
  entry: entryFile,
  output: {
    path: buildOutPath,
    filename: 'js/[name].js'
  },
  devServer: {
    host: '0.0.0.0',
    open: true,
    hot: true,
    port: 3000,
  },
  module: {
    rules: [
      {
        test: /\.(ts|tsx|js|jsx)$/,
        use: "babel-loader",
      },
    ]
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: resolve(__dirname, './templates/index.html'),
      filename: "index.html",
    })
  ]
}