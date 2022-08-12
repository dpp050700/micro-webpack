const MiniCssExtractLoader = require('mini-css-extract-plugin')
const { __DEV__ } = require('./constant/index')

function getCssLoaders({ importLoaders }) {
  const cssRules = [
    __DEV__ ? 'style-loader' : MiniCssExtractLoader.loader,
    {
      loader: 'css-loader',
      options: {
        modules: {
          auto: /\.module\.\w+$/i,
          localIdentName: '_[local]-[hash:base64:6]'
        },
        sourceMap: __DEV__ ? true : false,
        importLoaders
      }
    }
  ]
  if (!__DEV__) {
    
    cssRules[1].options.importLoaders = importLoaders + 1

    cssRules.push({
      loader: 'postcss-loader',
      options: {
        sourceMap: true,
        postcssOptions: {
          plugins: [
            'postcss-preset-env'
          ]
        }
      }
    })
  }
  return cssRules
}

module.exports = getCssLoaders
