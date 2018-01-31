const chai = require('chai')
const assert = chai.assert
const replace = require('./../src/helper/replace')
const capitalize = require('lodash/capitalize')
const toLower = require('lodash/toLower')
const toUpper = require('lodash/toUpper')

describe('replace.js', function() {
  it('should return capitalized actions', function() {
    let actions = `const actions = {
        postEntity () {},

        getEntity () {},

        patchEntity () {},

        deleteEntity () {}
      }

      export default actions`
    let expectedAction = `const actions = {
        postProduct () {},

        getProduct () {},

        patchProduct () {},

        deleteProduct () {}
      }

      export default actions`

    let replaced = replace('Entity', 'product', actions, capitalize)
    assert.equal(replaced, expectedAction)
  })

  it('should return to lowered getters', function() {
    let getters = `const getters = {
        entity: state => state.entity
      }

      export default getters`
    let expectedGetters = `const getters = {
        product: state => state.product
      }

      export default getters`

    let replaced = replace('entity', 'product', getters, toLower)
    assert.equal(replaced, expectedGetters)
  })

  it('should return to lowered module', function() {
    let module = `import state from './entity.state'
      import mutations from './entity.mutations'
      import actions from './entity.actions'
      import getters from './entity.getters'

      export default {
        namespaced: true,
        state,
        getters,
        mutations,
        actions
      }`
    let expectedModule = `import state from './product.state'
      import mutations from './product.mutations'
      import actions from './product.actions'
      import getters from './product.getters'

      export default {
        namespaced: true,
        state,
        getters,
        mutations,
        actions
      }`

    let replaced = replace('entity', 'product', module, toLower)
    assert.equal(replaced, expectedModule)
  })

  it('should return to lowered, to uppered mutations', function() {
    let mutations = `const mutations = {
        SET_ENTITY (state, entity) {
          state.entity = entity
        }
      }

      export default mutations`
    let expectedMutations = `const mutations = {
        SET_PRODUCT (state, product) {
          state.product = product
        }
      }

      export default mutations`

    let replaced = replace('ENTITY', 'product', mutations, toUpper)
    replaced = replace('entity', 'product', replaced, toLower)

    assert.equal(replaced, expectedMutations)
  })
})
