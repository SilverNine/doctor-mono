import userApi from '../api/user'

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
let setUsername = ({commit}, data) => {
    commit('USERNAME', data)
}

let setErrorState = ({commit}, data) => {
    commit('ERROR_STATE', data)
}

let setIsAuth = ({commit}, data) => {
    commit('IS_AUTH', data)
}

let setToken = ({commit}, data) => {
    commit('TOKEN', data)
}

const actions = {
    async login (store, {username, password}) {
        let loginResponse = await userApi.login(username, password)
        switch (loginResponse) {
            case 'noAuth':
                setErrorState(store, 'Wrong ID or Password')
                setIsAuth(store, false)
                break
            default:
                setUsername(store, loginResponse.username)
                setToken(store, loginResponse.token)
                setErrorState(store, '')
                setIsAuth(store, true)
        }

        return store.getters.getIsAuth  // 로그인 결과를 리턴한다
    },
    async logout(store) {
        setUsername(store, '')
        setToken(store, '')
        setErrorState(store, '')
        setIsAuth(store, false)
        localStorage.removeItem('vuex');
    },
    async getUserInfo() {
        return await userApi.getUserInfo();
    }
}

// initial mutation
const mutations = {
    USERNAME (state, username) {
        state.username = username
    },
    ERROR_STATE (state, errorState) {
        state.errorState = errorState
    },
    IS_AUTH (state, isAuth) {
        state.isAuth = isAuth
    },
    TOKEN (state, token) {
        state.token = token
    },
}

export default {
    state: state,
    mutations: mutations,
    actions: actions,
    getters: getters
}