import login from './login'

export default {
    async login (username, password) {
        try {
            const loginResponse = await login.login(username, password)
            return loginResponse
        } catch (err) {
            console.error(err)
        }
    },
    async getUserInfo () {
        try {
            const loginResponse = await login.getUserInfo()
            return loginResponse
        } catch (err) {
            console.error(err)
        }
    }
}