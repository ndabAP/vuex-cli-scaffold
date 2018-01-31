const chai = require('chai')
const assert = chai.assert
const intepreter = require('./../src/helper/interpreter')

describe('interpreter.js', function () {
  it('should return is not new', function () {
    let arguments = {
      remain: ['entity'],
      cooked: ['run', 'vuex-cli-scaffold', 'entity'],
      original: ['run', 'vuex-cli-scaffold', 'entity']
    }
    let interpreted = intepreter(JSON.stringify(arguments))
    let {isNew} = interpreted

    let expectedIsNew = false

    assert.equal(isNew, expectedIsNew)
  })

  it('should return is not root', function () {
    let arguments = {
      remain: ['firstEntity/secondEntity'],
      cooked: ['run', 'vuex-cli-scaffold', 'firstEntity/secondEntity'],
      original: ['run', 'vuex-cli-scaffold', 'firstEntity/secondEntity']
    }
    let interpreted = intepreter(JSON.stringify(arguments))
    let {entities} = interpreted

    let expectedIsRoot = false

    assert.equal(entities[0].isRoot, expectedIsRoot)
  })

  it('should return one entity named entity', function () {
    let arguments = {
      remain: ['entity'],
      cooked: ['run', 'vuex-cli-scaffold', 'entity'],
      original: ['run', 'vuex-cli-scaffold', 'entity']
    }
    let interpreted = intepreter(JSON.stringify(arguments))
    let {entities} = interpreted

    let expectedEntities = [{entity: 'entity', path: '', isRoot: true}]

    assert.deepEqual(entities, expectedEntities)
  })

  it('should return one entity and a nested entity', function () {
    let arguments = {
      remain: ['firstEntity', 'secondEntity/thirdEntity'],
      cooked: ['run', 'vuex-cli-scaffold', 'firstEntity', 'secondEntity/thirdEntity'],
      original: ['run', 'vuex-cli-scaffold', 'firstEntity', 'secondEntity/thirdEntity']
    }
    let interpreted = intepreter(JSON.stringify(arguments))
    let {entities} = interpreted

    let expectedEntities = [{
      entity: 'firstEntity', path: '', isRoot: true
    }, {
      entity: 'thirdEntity', path: 'secondEntity', isRoot: false
    }]

    assert.deepEqual(entities, expectedEntities)
  })

  it('should return two entities', function () {
    let arguments = {
      remain: ['firstEntity', 'secondEntity'],
      cooked: ['run', 'vuex-cli-scaffold', 'firstEntity', 'secondEntity'],
      original: ['run', 'vuex-cli-scaffold', 'firstEntity', 'secondEntity']
    }
    let interpreted = intepreter(JSON.stringify(arguments))
    let {entities} = interpreted

    let expectedEntities = [{
      entity: 'firstEntity', path: '', isRoot: true
    }, {
      entity: 'secondEntity', path: '', isRoot: true
    }]

    assert.deepEqual(entities, expectedEntities)
  })

  it('should return default modules directory', function () {
    let arguments = {
      remain: ['entity'],
      cooked: ['run', 'vuex-cli-scaffold', 'entity'],
      original: ['run', 'vuex-cli-scaffold', 'entity']
    }
    let interpreted = intepreter(JSON.stringify(arguments))
    let {modulesDirectory} = interpreted

    let expectedModulesDirectory = 'src/store/modules'

    assert.equal(modulesDirectory, expectedModulesDirectory)
  })

  it('should return path modules directory', function () {
    let arguments = {
      remain: ['entity', 'modules=path'],
      cooked: ['run', 'vuex-cli-scaffold', 'entity', 'modules=path'],
      original: ['run', 'vuex-cli-scaffold', 'entity', 'modules=path']
    }
    let interpreted = intepreter(JSON.stringify(arguments))
    let {modulesDirectory} = interpreted

    let expectedModulesDirectory = 'path'

    assert.equal(modulesDirectory, expectedModulesDirectory)
  })
})
