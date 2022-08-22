#!/usr/bin/env node

const { Command } = require('commander')
const path = require('path')

const start = require('../commands/start')
const init = require('../commands/init')

const program = new Command()
const version = require(path.resolve(__dirname, '../package.json')).version

program.version(`mfpm-cli ${version}`).usage('<command> [options]')

program
  .command('start')
  .description('启动本地服务')
  .option('-f, --config [config]', '指定自定义webpack配置文件')
  .option('-p, --port [port]', '设置server启动端口')
  .option('-o, --open', '默认开启页面')
  .action(start)

program
  .command('init')
  .description('初始化微前端项目')
  .option('-n, --name [name]', '输入项目的名称')
  .option('-p, --port [port]', '设置项目默认启动端口号')
  .action(init)

program.parse(process.argv)
