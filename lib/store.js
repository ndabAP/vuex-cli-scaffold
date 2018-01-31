import Vue from 'vue'
import Vuex from 'vuex'
{{#each entities}}
{{#unless path}}
import {{entity}} from './modules/{{path}}{{entity}}/{{entity}}.module'
{{/unless}}
{{/each}}

Vue.use(Vuex)

export default new Vuex.Store({
  modules: {
    {{#each entities}}
    {{capitalize entity}}: {{entity}}{{#unless @last}},{{/unless}}
    {{/each}}
  }
})
