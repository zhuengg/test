const inquirer = require('inquirer')
const chalk = require('chalk')
const fs = require('fs')
const path = require('path')

async function copyLib () {
  try {
    let answers = await inquirer.prompt([
      {
        type: 'confirm',
        name: 'dependInstall',
        message: chalk.blue('使用h5player需要安装依赖解码库到静态文件目录，是否安装？')
      }
    ])
  
    if (!answers['dependInstall']) {
      process.exit(1)
    }
  } catch(error) {
    process.exit()
  }

  try {
    let answers = await inquirer.prompt([
      {
        type: 'input',
        name: 'decodeLibPath',
        message: chalk.blue('请输入静态文件目录, 如: vue项目的默认静态文件目录为"public/"')
      }
    ])
    try {
      var decodeLibPath = 'public/'
      if (answers['decodeLibPath']) {
        decodeLibPath = answers['decodeLibPath']
      }
      decodeLibPath += /\/$/.test(decodeLibPath) ? 'lib' : '/lib'
      var fileContent = `decodeLibPath=${decodeLibPath}\r\n`
      fs.writeFileSync(path.resolve(__dirname, './.config'), fileContent, { encoding: 'utf-8' })
    } catch(error) {
      console.log(error)
    }
  } catch(error) {
    process.exit()
  }
}

copyLib()
