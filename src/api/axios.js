import axios from 'axios'

// const URL = 'http://10.37.0.22/api'
// const URL = 'http://10.37.0.22:3007/api'
const URL = 'http://localhost:3000/api'

export default axios.create({
    baseURL: URL
})

export const axiosPrivate = axios.create({
    baseURL: URL,
    headers: { 'Content-Type': 'application/json' },
    withCredentials: true,
    credentials: 'include',
    sameSite: 'strict'
})