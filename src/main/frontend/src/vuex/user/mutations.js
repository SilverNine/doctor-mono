export default {
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