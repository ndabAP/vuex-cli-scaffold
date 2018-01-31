import state from './entity.state'
import mutations from './entity.mutations'
import actions from './entity.actions'
import getters from './entity.getters'

export default {
  namespaced: true,
  state,
  getters,
  mutations,
  actions
}
