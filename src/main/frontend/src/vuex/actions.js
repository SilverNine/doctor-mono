import api from '../service'

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

export default {
    async login (store, {username, password}) {
        let loginResponse = await api.login(username, password)
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

        // let userInfo = await api.getUserInfo();
        // console.log(userInfo);

        return store.getters.getIsAuth  // 로그인 결과를 리턴한다
    },
    async logout(store) {
        // let userInfo = await api.getUserInfo();
        // console.log(userInfo);

        setUsername(store, '')
        setToken(store, '')
        setErrorState(store, '')
        setIsAuth(store, false)
        localStorage.removeItem('vuex');
    }
}