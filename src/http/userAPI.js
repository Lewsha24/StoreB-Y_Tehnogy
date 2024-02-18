import {$host, $authHost} from "./index";

export const registration = async (email, password) => {
    const {data} = await $host.post('/api/user/registration', {email, password, role: 'USER'})
    localStorage.setItem("token", data.token)
    return data.token
}
// было $host стало $authHost
export const login = async (email, password) => {
    const {data} = await $authHost.post('/api/user/login', {email, password, role: 'USER'})
    localStorage.setItem("token", data.token)
    return data.token
}
export const chek = async () => {
    const {data} = await $host.get('/api/user/auth')
    localStorage.setItem("token", data.token)
    return data.token
}
