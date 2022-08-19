const {
  entryFile,
  buildOutPath,
  globalLessPath,
  resolve,
  srcPath,
  CWD,
  getCurrentServiceAddress
} = require('./constant/path')
const { __DEV__ } = require('./constant/index')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const path = require('path')
const getCssLoaders = require('./getCssLoaders')
const GenerateDtsPlugin = require('./plugins/generateDtsPlugin')
const FileUpdateNotifyPlugin = require('./plugins/fileUpdateNotifyPlugin')
const { bigCamel, pkg } = require('./helper/index')

const notifyServiceList = []

module.exports = {
  mode: 'development',
  devtool: 'inline-source-map',
  entry: entryFile,
  output: {
    path: buildOutPath,
    filename: 'js/[name].js',
    publicPath: __DEV__ ? getCurrentServiceAddress() : '/'
  },
  devServer: {
    host: '0.0.0.0',
    open: true,
    hot: true,
    port: process.env.MICRO_CLI_PORT,
    historyApiFallback: true,
    static: {
      directory: buildOutPath
    },
    compress: true,
    hot: 'only',
    client: {
      overlay: {
        warnings: true,
        errors: true
      }
    },
    liveReload: false,
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Headers': '*',
      'Access-Control-Allow-Methods': '*'
    },
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
      },
      {
        test: /\.(gif|png|jpg|jpeg|webp)$/i,
        type: 'asset',
        generator: {
          filename: 'assets/[name].[contenthash:6][ext][query]'
        },
        parser: {
          dataUrlCondition: {
            maxSize: 10 * 1024
          }
        }
      }
    ]
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: resolve(__dirname, './templates/index.html'),
      filename: 'index.html'
    }),
    new GenerateDtsPlugin({
      entry: srcPath,
      root: resolve(CWD),
      output: `dist/${bigCamel(pkg.name)}.d.ts`,
      replaceList: [[pkg.name, bigCamel(pkg.name)]]
    }),
    new FileUpdateNotifyPlugin({ serviceList: notifyServiceList })
  ],
  resolve: {
    extensions: ['.ts', '.tsx', '.js'],
    alias: {
      '@': srcPath
    }
  }
}
