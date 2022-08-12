#!/usr/bin/env node

const { Command } = require('commander')

const start = require('../commands/start')

const program = new Command()

program.version(`mfp-cli ${require('../package').version}`).usage('<command> [options]')

program
  .command('start')
  .description('启动本地服务')
  .option('-f, --config [config]', '指定自定义webpack配置文件')
  .option('-p, --port [port]', '设置server启动端口')
  .action(start)

program.parse(process.argv)