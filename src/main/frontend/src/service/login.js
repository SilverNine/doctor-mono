import axios from 'axios'
import authHeader from './authHeader'

export default {
    async login (username, password) {
        try {
            return await axios.post('/api/authenticate',{
                'username': username,
                'password': password
            }).then(response => {
                if (!response.data.token) {
                    return 'noAuth'
                }

                return response.data
            }).catch(error => {
                console.log(error)
                return 'noAuth'
            })
        } catch (err) {
            console.error(err)
        }
    },
    async getUserInfo() {
        try {
            return await axios.get('/api/person',{headers: authHeader()})
                .then(response => {
                return response.data
            }).catch(error => {
                console.log(error)
            })
        } catch (err) {
            console.error(err)
        }
    }
}