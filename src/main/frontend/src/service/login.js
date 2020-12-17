import axios from 'axios'
import authHeader from './authHeader'

export default {
    async login (uid, password) {
        try {
            return await axios.post('/api/authenticate',{
                'username': uid,
                'password': password
            }).then(response => {
                console.log(response)
                if (!response.data.token) {
                    return 'noAuth'
                }

                localStorage.setItem('user', JSON.stringify(response.data));

                return response
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
                console.log(response)
                return response
            }).catch(error => {
                console.log(error)
            })
        } catch (err) {
            console.error(err)
        }
    }
}