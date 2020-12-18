import userApi from '../api/user'
import * as types from './mutation_types'

// initial state
const state = {
    username: '',
    token: '',
    errorState: '',
    isAuth: false
}

// initial getters
const getters = {
    getToken: state => state.token,
    getUsername: state => state.username,
    getErrorState: state => state.errorState,
    getIsAuth: state => state.isAuth
}

// initial actions
const actions = {
    async login (store, {username, password}) {
        let loginResponse = await userApi.login(username, password)
        switch (loginResponse) {
            case 'noAuth':
                store.commit(types.ERROR_STATE, 'Wrong ID or Password')
                store.commit(types.IS_AUTH, false)
                break
            default:
                store.commit(types.USERNAME, loginResponse.username)
                store.commit(types.TOKEN, loginResponse.token)
                store.commit(types.ERROR_STATE, '')
                store.commit(types.IS_AUTH, true)
        }

        return store.getters.getIsAuth  // 로그인 결과를 리턴한다
    },
    async logout(store) {
        store.commit(types.USERNAME, '')
        store.commit(types.TOKEN, '')
        store.commit(types.ERROR_STATE, '')
        store.commit(types.IS_AUTH, false)
        localStorage.removeItem('vuex');
    },
    async getUserInfo() {
        return await userApi.getUserInfo();
    },
    async getUsername(store) {
        return await store.getters.getUsername
    }
}

// initial mutation
const mutations = {
    [types.USERNAME] (state, username) {
        state.username = username
    },
    [types.ERROR_STATE] (state, errorState) {
        state.errorState = errorState
    },
    [types.IS_AUTH] (state, isAuth) {
        state.isAuth = isAuth
    },
    [types.TOKEN] (state, token) {
        state.token = token
    },
}

export default {
    state: state,
    mutations: mutations,
    actions: actions,
    getters: getters
}