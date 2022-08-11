const { entryFile, buildOutPath, globalLessPath } = require('./constant/path')
const { __DEV__ } = require('./constant/index')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const path = require('path')
const getCssLoaders = require('./getCssLoaders')

const resolve = path.resolve

module.exports = {
  mode: 'development',
  devtool: 'inline-source-map',
  entry: entryFile,
  output: {
    path: buildOutPath,
    filename: 'js/[name].js'
  },
  devServer: {
    // host: '0.0.0.0',
    open: true,
    hot: true,
    port: 3000
  },
  module: {
    rules: [
      {
        test: /\.(ts|tsx|js|jsx)$/,
        use: 'babel-loader'
      },
      {
        test: /\.css$/,
        use: getCssLoaders({ importLoaders: 0 })
      },
      {
        test: /\.less$/,
        use: [
          ...getCssLoaders({ importLoaders: 2 }),
          {
            loader: 'less-loader',
            options: { sourceMap: __DEV__ ? true : false, lessOptions: { javascriptEnabled: true } }
          },
          {
            loader: 'style-resources-loader',
            options: {
              patterns: [globalLessPath]
            }
          }
        ]
      }
    ]
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: resolve(__dirname, './templates/index.html'),
      filename: 'index.html'
    })
  ],
  resolve: {
    extensions: ['.ts', '.tsx', '.js']
  }
}
