export const url = 'http://10.37.0.22/api'
// export const url = 'http://localhost:3003/api'

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
}).then(e => e.json())


// Authorization
export const authUser = (login, password) => method('authUser', { login, password })
export const checkAuth = () => method('checkAuth')

export const getUser = (token) => method('getUser', { token })
export const getRules = () => method('getRules')
export const getUsers = () => method('getUsers')

// Users
export const addUser = (body) => method('addUser', body)
export const edditUser = (body) => method('editUser', body)
export const deleteUser = (id) => method('deleteUser', id)

// Общежития

// Опереатор
export const getAllBobers = () => method('getAllBobers')
export const getBober = (id) => method('getBober', {id})


// Отчеты

// Прочее

// Housekeeper
export const getUserKeyList = (id) => method('getUserKeyList', { id })
export const updateKeyStatus = (id, key_status, signal_status, userId) => method('updateKeyStatus', { id, key_status, signal_status, userId })
export const updateSignalStatus = (id, signal, userId) => method('updateSignalStatus', { id, signal, userId })
export const getKitKeys = (id) => method('getKitKeys', id)

export const getElJournal = (id) => method('getElJournal', { id })

export const getSubunit = () => method('getSubunits')

export const getRoomsList = () => method('getRoomsList')
export const addRoom = (type, name, building, department, signaling) => method('addRoom', { type, name, building, department, signaling })
export const getRoomPermissions = (id) => method('getRoomPermissions', { room_id: id })
export const addPermission = (room_id, user_key) => method('addPermission', { room_id, user_key })
export const deletePermission = (room_id, user_key) => method('deletePermission', { room_id, user_key })
export const getRoomEdit = (room_id) => method('getRoomEdit', { room_id })
export const editRoom = (room_id, room, building, subunit, signaling, type, head, phone) => method('editRoom', { room_id, data: {room, building, subunit, signaling, type, head, phone} })
export const removeRoom = (id) => method('removeRoom', { id })

export const getDisturbers = () => method('getDisturbers')