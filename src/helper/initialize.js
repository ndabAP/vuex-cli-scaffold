const fs = require('fs')
const chalk = require('chalk')
const _ = require('lodash')
const handlebars = require('handlebars')
const replace = require('./../helper/replace.js')
const write = require('./../helper/write.js')

module.exports = initialize = (modulesDirectory, entities) => {
  if (fs.existsSync(`${modulesDirectory}/../index.js`)) return console.info(chalk.hex('#ffc107!')('Store already exists'))

  fs.readFile(`${__dirname}/../../lib/store.js`, 'utf8', (error, store) => {
    if (error) throw new Error(error)
    entities = _.reject(entities, ['isRoot', false])

    handlebars.registerHelper('capitalize', entity => _.capitalize(entity))

    let template = handlebars.compile(store)
    store = template({entities})

    write(`${modulesDirectory}/../index.js`, store)
    console.info(chalk.hex('#17a2b8')('Created new store'))
  })
}
