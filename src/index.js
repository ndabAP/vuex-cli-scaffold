const fs = require('fs')
const chalk = require('chalk')
const _ = require('lodash')
const interpreter = require('./helper/interpreter.js')
const initialize = require('./helper/initialize.js')
const construct = require('./helper/construct.js')
const boilerplate = require('./helper/boilerplate.js')

const options = interpreter(process.env.npm_config_argv)
const modulesDirectory = `${process.env.PWD}/${options.modulesDirectory}`

if (!fs.existsSync(modulesDirectory)) boilerplate(modulesDirectory)
console.info(chalk.hex('#17a2b8')(`Modules directory is ${options.modulesDirectory}`))

try {
   if (options.isNew) initialize(modulesDirectory, options.entities)
} catch (error) {
   console.error(chalk.hex('#ffc107')(error))
}

try {
  _.each(options.entities, entity => {
    construct(modulesDirectory, entity)
  })
} catch (error) {
  console.error(chalk.hex('#ffc107')(error))
}
