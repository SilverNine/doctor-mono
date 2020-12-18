export default function authHeader() {
    let store = JSON.parse(localStorage.getItem('vuex'));

    if (store && store.token) {
        return { Authorization: 'Bearer ' + store.token };
    } else {
        return {};
    }
}