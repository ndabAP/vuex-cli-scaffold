const _ = require('lodash')

module.exports = interpreter = arguments => {
  arguments = JSON.parse(arguments)

  let entities = []
  _.each(arguments.remain, argument => {
    if (!(/^(.*)\=(.*)$/).test(argument)) {
      let entity = _.last(argument.split('/'))
      let path = _.join(_.initial(argument.split('/')), '/')
      let isRoot = (path === '')

      let entityBlueprint = {
        entity,
        path,
        isRoot
      }

      entities.push(entityBlueprint)
    }
  })

  let isNew = false
  let modulesDirectory = 'src/store/modules'
  _.each(arguments.cooked, argument => {
    if (argument === '-new') isNew = true
    if (argument.match(/^modules\=(.*)$/)) {
      modulesDirectory = argument.match(/^modules\=(.*)$/)[1]
    }
  })

  return {
    isNew,
    entities,
    modulesDirectory
  }
}
