const webpack = require('webpack')
const webpackDevServer = require('webpack-dev-server')
const { resolve } = require('path')
const {
  CWD,
  ENV_DEPENDENCIES_LIST,
  ENV_DEPENDENCIES_CONFIG,
  dependenciesServiceDts,
  buildOutPath
} = require('../webpack/constant/path')
const { ENV_DEPENDENCIES_NAME } = require('../webpack/constant/index')
const webpackMerge = require('webpack-merge').merge
const fs = require('fs-extra')
const { formatDependenciesServiceName, downloadFile, bigCamel } = require('../webpack/helper/index')
const { ModuleFederationPlugin } = webpack.container

const portFinder = require('portfinder')
const dotenv = require('dotenv')
const slash = require('slash')
const globby = require('globby')

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
  const absPath = slash(resolve(CWD, 'src/exports'))
  const relativePath = resolve(absPath, '*.*')
  const files = globby.sync([relativePath], {
    deep: 1
  })

  const exposes = files.reduce((preVal, module) => {
    const suffix = module.match(/\.[A-Za-z]+$/)
    const key = `.${(module || '').replace(absPath, '').replace(suffix, '')}`
    if (key && key.length > 0) {
      preVal[slash(key)] = module
    }
    return preVal
  }, {})
  console.log(exposes)
  return exposes
}

function initProvideMFPConfig(config) {
  // const defaultProvide = generateDefaultMFPExposes()
}

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

async function downloadDependentDts() {
  const dependencies = getServiceDependencies()
  const promiseList = dependencies.reduce((prev, dep) => {
    const serviceName = formatDependenciesServiceName(dep)
    const serviceAddress = process.env[serviceName]
    console.log(serviceAddress, 111)
    return [
      ...prev,
      downloadFile(`${serviceAddress}/${bigCamel(dep)}.d.ts`, resolve(dependenciesServiceDts, `${bigCamel(dep)}.d.ts`))
    ]
  }, [])
  await Promise.all(promiseList)
}

function initMFPConfig(config) {
  console.log('模块联邦配置文件')

  const pkg = require(resolve(CWD, 'package.json'))

  const list = initDependentMFPConfig()

  const defaultProvide = generateDefaultMFPExposes()

  const currentDeps = require(resolve(__dirname, '../package.json')).dependencies

  config.plugins.push(
    new ModuleFederationPlugin({
      name: bigCamel(pkg.name),
      filename: 'remoteEntry.js',
      exposes: defaultProvide,
      remotes: { ...list },
      shared: {
        react: {
          eager: true,
          singleton: true,
          requiredVersion: currentDeps['react']
        },
        'react-dom': {
          eager: true,
          singleton: true,
          requiredVersion: currentDeps['react-dom']
        },
        'react-router': {
          eager: true,
          singleton: true,
          requiredVersion: currentDeps['react-router']
        },
        'react-router-dom': {
          eager: true,
          singleton: true,
          requiredVersion: currentDeps['react-router-dom']
        }
      }
    })
  )
  return list
}

function checkDirExists() {
  fs.ensureDirSync(dependenciesServiceDts)
  fs.ensureDirSync(buildOutPath)
}

const start = async function (options, cmd) {
  const { port = 4000, config: customConfig, open = false } = options

  checkDirExists()

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
  // initProvideMFPConfig(compileConfig)

  downloadDependentDts()

  const webpackCompiler = webpack(compileConfig)

  const serverOptions = webpackConfig.devServer
  serverOptions.open = open
  new webpackDevServer(webpackCompiler, serverOptions).listen(serverOptions.port)
}

module.exports = start
