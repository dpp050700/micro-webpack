const { entryFile, buildOutPath, globalLessPath } = require('./constant/path')
const { __DEV__ } = require('./constant/index')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const path = require('path')
const getCssLoaders = require('./getCssLoaders')
const GenerateDtsPlugin = require('./plugins/generateDtsPlugin')
const FileUpdateNotifyPlugin = require('./plugins/fileUpdateNotifyPlugin')

const resolve = path.resolve

const notifyServiceList = []

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
    port: process.env.MICRO_CLI_PORT,
    onBeforeSetupMiddleware: function ({ app }) {
      app.get('/registerNotifyService', function (req, res) {
        res.send({
          name: '11123'
        })
      })
    }
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
    }),
    new GenerateDtsPlugin({}),
    new FileUpdateNotifyPlugin({ serviceList: notifyServiceList })
  ],
  resolve: {
    extensions: ['.ts', '.tsx', '.js']
  }
}
