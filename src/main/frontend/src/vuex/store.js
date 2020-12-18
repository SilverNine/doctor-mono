import Vue from 'vue'
import Vuex from 'vuex'
import createPersistedState from 'vuex-persistedstate'
import getters from './getters'
import actions from './actions'
import mutations from './mutations'

Vue.use(Vuex)

const state = {
    username: '',
    token: '',
    errorState: '',
    isAuth: false
}

export default new Vuex.Store({
    state,
    mutations,
    getters,
    actions,
    plugins:[createPersistedState()]
})