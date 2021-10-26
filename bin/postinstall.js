const chalk = require('chalk')
const fs = require('fs')
const path = require('path')
const shell = require('shelljs')

const fileContent = fs.readFileSync(path.resolve(__dirname, './.config')).toString()
const decodeLibPath = fileContent.match(/decodeLibPath=[a-zA-Z0-9-\/\.]+/g).shift().split('=').pop()
const targetPath = path.resolve(__dirname, `../../../../${/^\//.test(decodeLibPath) ? decodeLibPath.slice(1) : decodeLibPath}`)

const isExist = fs.existsSync(targetPath)
if (!isExist) {
  shell.mkdir('-p', targetPath)
}
shell.cp('-r', path.resolve(__dirname, '../dist/lib/*'), targetPath)
console.log(chalk.green('-->H5player depended library was installed to '), decodeLibPath)
