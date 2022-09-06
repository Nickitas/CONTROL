const url = 'http://10.37.0.22/api'
// const url = 'http://localhost:3000/api'

const method = (type, body={}) => fetch(url, {
    method:'post',
    headers: {
        'content-type':'application/json; charset=utf-8'
    },
    body:JSON.stringify({
        type,
        body:{
            ...body,
            token:localStorage.getItem('token')
        }
    })
})
.then(e => e.json())

export const getUser = (token) => method('getUser', {token})
export const getRules = () => method('getRules')
export const getUsers = () => method('getUsers')

// Пользователи
export const addUser = (body) => method('addUser', body)
export const edditUser = (body) => method('editUser', body)
export const deleteUser = (id) => method('deleteUser', id)

// Общежития

// Опереатор

// Отчеты

// Прочее

// Ключница
export const getElJournal = (id) => method('getElJournal', {id})
export const getSubunit = () => method('getSubunits')
export const getRoomsList = () => method('getRoomsList')
export const GetUserKeyList = (id) => method('getUserKeyList',{id})
export const UpdateKeyStatus = (id, key_status, signal_status, userId) => method('updateKeyStatus', {id, key_status, signal_status, userId})
export const UpdateSignalStatus = (id, signal, userId) => method('updateSignalStatus', {id, signal, userId})
export const GetDisturbers = () => method('getDisturbers')


export const authUser = (login, password) => method('authUser', {
    login,
    password
})
export const checkAuth = () => method('checkAuth')