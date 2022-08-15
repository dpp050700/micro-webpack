const webpack = require('webpack')
const webpackDevServer = require('webpack-dev-server')
const { resolve } = require('path')
const { CWD, ENV_DEPENDENCIES_LIST, ENV_DEPENDENCIES_CONFIG } = require('../webpack/constant/path')
const { ENV_DEPENDENCIES_NAME } = require('../webpack/constant/index')
const webpackMerge = require('webpack-merge').merge
const fs = require('fs-extra')
const { formatDependenciesServiceName } = require('../webpack/helper/index')
const { ModuleFederationPlugin } = webpack.container

const portFinder = require('portfinder')
const dotenv = require('dotenv')

const { bigCamel } = require('../webpack/helper/index')

let compileConfig = null

function startFreePort(basePort) {
  return new Promise((resolve, reject) => {
    try {
      portFinder.setBasePort(basePort)
      portFinder
        .getPortPromise()
        .then((port) => {
          process.env.MICRO_CLI_PORT = port
          portFinder.basePort = port + 100
          portFinder
            .getPortPromise()
            .then((socketPort) => {
              process.env.MICRO_SOCKET_PORT = socketPort
              resolve()
            })
            .catch(() => {
              reject()
            })
        })
        .catch(() => {
          reject()
        })
    } catch (error) {
      reject()
    }
  })
}

function loadDependenciesList() {
  if (fs.pathExistsSync(ENV_DEPENDENCIES_LIST)) {
    const content = fs.readFileSync(ENV_DEPENDENCIES_LIST)
    const config = dotenv.parse(content)
    process.env[ENV_DEPENDENCIES_NAME] = config[ENV_DEPENDENCIES_NAME]
  } else {
    fs.writeFileSync(ENV_DEPENDENCIES_LIST, `# 依赖的服务\n${ENV_DEPENDENCIES_NAME}=`)
    process.env[ENV_DEPENDENCIES_NAME] = ''
  }
}

function loadDependenciesConfig() {
  if (fs.pathExistsSync(ENV_DEPENDENCIES_CONFIG)) {
    const content = fs.readFileSync(ENV_DEPENDENCIES_CONFIG)
    const config = dotenv.parse(content)
    for (const k in config) {
      process.env[k] = config[k]
    }
  } else {
    fs.writeFileSync(ENV_DEPENDENCIES_CONFIG, `# 微服务依赖配置\n#MICRO_CONTAINER_SERVICE=127.0.0.1:4000`)
  }
}

function loadEnv() {
  loadDependenciesList()
  loadDependenciesConfig()
}

function getServiceDependencies() {
  const dependencies = process.env[ENV_DEPENDENCIES_NAME] || ''
  const result = dependencies.split(',').filter((service) => service)
  return result
}

function microServiceSync() {
  const dependencies = getServiceDependencies()
  dependencies.forEach((dep) => {
    console.log(dep)
  })
}

/**
 * 根据 export 文件夹， 生成需要联邦的模块
 */
function generateDefaultMFPExposes() {
  return []
}

function initProvideMFPConfig() {}

function initDependentMFPConfig() {
  const dependencies = getServiceDependencies()

  return dependencies.reduce((prev, dep) => {
    const serviceName = formatDependenciesServiceName(dep)
    const serviceAddress = process.env[serviceName]
    return {
      ...prev,
      [bigCamel(dep)]: `${bigCamel(dep)}@${serviceAddress}/remoteEntry.js`
    }
  }, {})
}

function initMFPConfig(config) {
  const list = initDependentMFPConfig()
  console.log(list)
  config.plugins.push(
    new ModuleFederationPlugin({
      remotes: { ...list }
    })
  )
  return list
}

const start = async function (options, cmd) {
  const { port = 4000, config: customConfig } = options

  await startFreePort(port)

  await loadEnv()

  await microServiceSync()

  const webpackConfig = require('../webpack/webpack.dev.js')

  if (customConfig) {
    const config = require(resolve(CWD, customConfig))
    if (typeof config == 'function') {
      console.log('方法还没实现')
      process.exit(1)
    } else if (typeof config == 'object') {
      compileConfig = webpackMerge(webpackConfig, config)
    } else {
      console.log(customConfig + '不支持的数据格式')
      process.exit(1)
    }
  } else {
    compileConfig = webpackConfig
  }

  initMFPConfig(compileConfig)

  const webpackCompiler = webpack(compileConfig)

  const serverOptions = webpackConfig.devServer
  new webpackDevServer(webpackCompiler, serverOptions).listen(serverOptions.port)
}

module.exports = start
