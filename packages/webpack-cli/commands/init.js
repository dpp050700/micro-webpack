const request = require('../helpers/request')
const inquirer = require('inquirer')
const npminstall = require('npminstall')
const { resolve } = require('path')
const fs = require('fs-extra')
const glob = require('globby')
const ejs = require('ejs')
const path = require('path')
const { formatDependenciesServiceName } = require('../helpers/utils')

async function selectProjectTemplate(templates) {
  const choices = templates.map((template) => {
    return {
      value: template.packageName,
      name: template.name
    }
  })
  const { projectTemplate } = await inquirer.prompt([
    {
      type: 'list',
      name: 'projectTemplate',
      message: '请选择项目模板',
      choices: choices
    }
  ])
  return templates.find((item) => item.packageName === projectTemplate)
}

async function inputProjectName(name) {
  function validProjectName(v) {
    return /^[a-zA-Z]+([-][a-zA-Z][a-zA-Z0-9]*|[_][a-zA-Z][a-zA-Z0-9]*|[a-zA-Z0-9])*$/.test(v)
  }

  // TODO 区分 window 和 Mac 路径的区别
  const cwdDirPath = process.cwd().split('/')
  const defaultName = cwdDirPath[cwdDirPath.length - 1]

  if (name && validProjectName(name)) return name

  let { projectName } = await inquirer.prompt([
    {
      type: 'input',
      name: 'projectName',
      message: '请输入项目的名称',
      default: defaultName,
      validate(v) {
        const done = this.async()
        setTimeout(() => {
          if (!validProjectName(v)) {
            done('项目名称格式不正确')
            return
          }
          done(null, true)
        }, 0)
      }
    }
  ])
  return projectName
}

async function setServicePort(port) {
  function validProjectName(v) {
    return /^([0-9]|[1-9]\d{1,3}|[1-5]\d{4}|6[0-4]\d{4}|65[0-4]\d{2}|655[0-2]\d|6553[0-5])$/.test(v)
  }

  if (port && validProjectName(port)) return port

  let { servicePort } = await inquirer.prompt([
    {
      type: 'input',
      name: 'servicePort',
      message: '请输入项目启动端口号',
      default: '',
      validate(v) {
        const done = this.async()
        setTimeout(() => {
          if (!validProjectName(v)) {
            done('端口号格式不正确')
            return
          }
          done(null, true)
        }, 0)
      }
    }
  ])
  return servicePort
}

async function downLoadTemplate(template) {
  const { packageName, version } = template
  await npminstall({
    root: process.cwd(),
    storeDir: resolve(process.cwd(), 'node_modules'),
    registry: 'https://registry.npmjs.org',
    pkgs: [{ name: packageName, version: version }]
  })
  // copy template
  const cacheFilePathPrefix = packageName.replace('/', '_')
  const templatePath = resolve(
    process.cwd(),
    'node_modules',
    `_${cacheFilePathPrefix}@${version}@${packageName}/template`
  )
  fs.ensureDirSync(templatePath)
  fs.copySync(templatePath, process.cwd())

  fs.removeSync(resolve(process.cwd(), 'node_modules'))

  console.log(templatePath)
}

async function ejsRender(params = {}) {
  const files = await glob('**', { gitignore: true, ignoreFiles: ['node_modules/**', 'public/**'] })
  const task = files.map((file) => {
    const filePath = path.join(process.cwd(), file)
    return new Promise((resolve, reject) => {
      ejs.renderFile(filePath, params, {}, (err, result) => {
        if (err) {
          reject(err)
        } else {
          fs.writeFileSync(filePath, result)
          resolve(result)
        }
      })
    })
  })
  await Promise.all(task)
}

async function getProjectTemplates() {
  let { data = [] } = await request.get('https://mock.presstime.cn/mock/6302e664870a85006347d036/micro/templates')
  return data.map((item) => ({ ...item, packageName: `@${item.packageName}` }))
}

async function getProjects() {
  let { data = [] } = await request.get('/projects')
  return data
}

async function selectDepService() {
  const projects = await getProjects()
  const choices = projects.map((template) => {
    return {
      value: template.name,
      name: template.name
    }
  })
  const { depService } = await inquirer.prompt([
    {
      type: 'checkbox',
      name: 'depService',
      message: '请选择依赖的服务',
      choices: [{ name: 'None of these', value: '' }, ...choices]
    }
  ])
  return depService
    .map((item) => {
      const service = projects.find((project) => project.name === item)
      return { ...service, serviceName: formatDependenciesServiceName(service.name) }
    })
    .filter((item) => item)
}

const init = async function (options, cmd) {
  const { port, name } = options
  // 检测当前文件夹是否已是项目工程
  const templates = await getProjectTemplates()

  const selectTemplate = await selectProjectTemplate(templates)

  const projectName = await inputProjectName(name)

  const servicePort = await setServicePort(port)

  await downLoadTemplate(selectTemplate)

  const deps = await selectDepService()

  await ejsRender({ projectName, servicePort, depService: deps })

  console.log('项目初始化成功')

  // 项目创建完成之后可以请求 api 入库项目数据
}

module.exports = init
