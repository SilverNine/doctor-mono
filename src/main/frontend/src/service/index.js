import login from './login'

export default {
    async login (uid, password) {
        try {
            const loginResponse = await login.login(uid, password)
            return loginResponse
        } catch (err) {
            console.error(err)
        }
    }
}