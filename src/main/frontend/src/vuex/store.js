import Vue from 'vue'
import Vuex from 'vuex'
import createPersistedState from 'vuex-persistedstate'
import User from './user'

Vue.use(Vuex)

export default new Vuex.Store({
    modules: {
        user: User
    },
    plugins: [
        createPersistedState({
            paths: ["user"]
        })
    ]
})