import axios from 'axios'

export default {
    async login (uid, password) {
        try {
            return await axios.post('/api/authenticate', {
                'username': uid,
                'password': password
            }).then(response => {
                console.log(response)
                if (!response.data.token) {
                    return 'noAuth'
                }

                axios.defaults.headers.common['Authorization'] = response.data.token // Json Web Token을 request header에 넣는다

                return response
            }).catch(error => {
                console.log(error)
                return 'noAuth'
            })
        } catch (err) {
            console.error(err)
        }
    }
}