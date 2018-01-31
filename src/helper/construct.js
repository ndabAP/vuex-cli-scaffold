const fs = require('fs')
const chalk = require('chalk')
const _ = require('lodash')
const replace = require('./../helper/replace.js')
const write = require('./../helper/write.js')
const boilerplate = require('./../helper/boilerplate.js')

module.exports = construct = (modulesDirectory, entityBlueprint) => {
  const entityDirectory = `${modulesDirectory}/${entityBlueprint.path}/${entityBlueprint.entity}`

  if (fs.existsSync(entityDirectory)) {
    return console.log(chalk.hex('#ffc107!')(`Entity ${entityBlueprint.entity} already exists`))
  } else boilerplate(entityDirectory)

  fs.readFile(`${__dirname}/../../lib/module.js`, 'utf8', (error, module) => {
    if (error) throw new Error(error)
    
    module = replace('entity', entityBlueprint.entity, module, _.toLower)

    write(`${entityDirectory}/${entityBlueprint.entity}.module.js`, module)
    console.info(chalk.hex('#17a2b8')(`Created ${entityBlueprint.entity} module`))
  })

  fs.readFile(`${__dirname}/../../lib/state.js`, 'utf8', (error, state) => {
    if (error) throw new Error(error)

    write(`${entityDirectory}/${entityBlueprint.entity}.state.js`, state)
    console.info(chalk.hex('#17a2b8')(`Created ${entityBlueprint.entity} state`))
  })

  fs.readFile(`${__dirname}/../../lib/getters.js`, 'utf8', (error, getters) => {
    if (error) throw new Error(error)

    getters = replace('entity', entityBlueprint.entity, getters, _.toLower)

    write(`${entityDirectory}/${entityBlueprint.entity}.getters.js`, getters)
    console.info(chalk.hex('#17a2b8')(`Created ${entityBlueprint.entity} getters`))
  })

  fs.readFile(`${__dirname}/../../lib/mutations.js`, 'utf8', (error, mutations) => {
    if (error) throw new Error(error)

    mutations = replace('ENTITY', entityBlueprint.entity, mutations, _.toUpper)
    mutations = replace('entity', entityBlueprint.entity, mutations, _.toLower)

    write(`${entityDirectory}/${entityBlueprint.entity}.mutations.js`, mutations)
    console.info(chalk.hex('#17a2b8')(`Created ${entityBlueprint.entity} mutations`))
  })

  fs.readFile(`${__dirname}/../../lib/actions.js`, 'utf8', (error, actions) => {
    if (error) throw new Error(error)

    actions = replace('Entity', entityBlueprint.entity, actions, _.capitalize)

    write(`${entityDirectory}/${entityBlueprint.entity}.actions.js`, actions)
    console.info(chalk.hex('#17a2b8')(`Created ${entityBlueprint.entity} actions`))
  })
}
