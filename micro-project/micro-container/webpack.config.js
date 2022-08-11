const webpack = require('webpack')
// const { generateDefaultMFExposes } = require('./scripts/createExposes')

// const globby = require('globby')
// // const fs = require('fs-extra')
const path = require('path')
// const { CWD } = require('../../micro-config/webpack-cli/webpack/constant/path')
// const slash = require('slash')

const { resolve } = path
const CWD = process.cwd()

// function getExposeModules() {
//   const modules = ['components', 'utils']
//   modules.reduce((prev, current) => {
//     const currentValue = {}

//     globby.sync([resolve(__dirname, `../src/${current}/*/index.*`)]).forEach((currentGroup) => {
//       const matched = slash(currentGroup).match(/([\dA-Za-z]+)\/([\dA-Za-z]+)\/(index\.[\dA-Za-z]+)$/)
//       const type = matched && matched[1]
//       const group = matched && matched[2]

//       if (type && group) {
//         const key = `./${type}/${group}`
//         currentValue[key] = currentGroup
//       }
//     })

//     return { ...prev, ...currentValue }
//   }, {})
// }

// const generateDefaultMFExposes = () => {
//   const exposes = getExposeModules()
//   return exposes
// }

// module.exports = (data, mergeMFConfig, webpack) => {
//   const { ModuleFederationPlugin } = webpack.container
//   return {
//     plugins: [
//       new ModuleFederationPlugin(
//         mergeMFConfig({
//           exposes: generateDefaultMFExposes()
//         })
//       )
//     ]
//   }
// }

const { ModuleFederationPlugin } = webpack.container

// console.log(resolve(CWD, 'src/components/button/index.tsx'))

module.exports = {
  plugins: [
    new ModuleFederationPlugin({
      filename: 'container.js',
      name: 'container',
      exposes: {
        './button': resolve(CWD, 'src/components/Button/index.tsx')
      }
    })
  ]
}
