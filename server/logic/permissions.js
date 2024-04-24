import {DB_ROOMS, DB_ROOMS_HOLDERS, DB_ROOMS_PERMISSIONS} from "../db.js"
import { fioToNewCase } from "./functions.js"
import {findInBaseByKey} from "./fb.js"

export const addPermission = (obj, callback) => {
    DB_ROOMS_HOLDERS.findOne({user_key: obj.user_key}).then(async res =>{
        if (!res){
            findInBaseByKey(obj.user_key, async (in_base) =>{
                if (!in_base || in_base =='error'){
                    return callback({
                        state: 0
                    })
                }
                let user = new DB_ROOMS_HOLDERS({
                    fio: fioToNewCase(in_base.FIO),
                    department: in_base.DEPARTMENT,
                    position: in_base.DOLJNOST,
                    user_key: obj.user_key,
                    tab_number: in_base.TABELNOMER
                })
                await user.save()
            })
        }
        let data = {
            room_id: obj.room_id,
            key: obj.user_key
        }
        
        let permiss = new DB_ROOMS_PERMISSIONS(data)
        await permiss.save()   
        let room = await DB_ROOMS.findById(obj.room_id)
        // fs.appendFileSync('./logs/permission_logs.txt', (new Date()) + JSON.stringify({user_key: obj.user_key, room: room.building + '-' + room.room}))

        return callback({
            state:1,
        })

    })
}
export const addPermissionByKey = (obj, callback) => {
    DB_ROOMS_HOLDERS.findOne({user_key: obj.user_key}).then(async res =>{
        if (!res){
            findInBaseByKey(obj.user_key, async (in_base) =>{
                if (!in_base || in_base =='error'){
                    return callback({
                        state: 0
                    })
                }
                let user = new DB_ROOMS_HOLDERS({
                    fio: fioToNewCase(in_base.FIO),
                    department: in_base.DEPARTMENT,
                    position: in_base.DOLJNOST,
                    user_key: obj.user_key,
                    tab_number: in_base.TABELNOMER
                })
                await user.save()
            })
        }
        let data = []
        obj.rooms_list.forEach(e => {
            data.push({
                room_id: e.room_id,
                key: obj.user_key
            })
        })
        let permiss = await DB_ROOMS_PERMISSIONS.insertMany(data)
        // fs.appendFileSync('./logs/permission_logs.txt', (new Date()) + JSON.stringify(permiss));

        return callback({
            state:1
        })

    })
}

export const getRoomPermissions = async (obj, callback) => {
    let res = await DB_ROOMS_PERMISSIONS.find({room_id: obj.room_id})
    if (!res || !obj.room_id){
        return callback({
            state: 0
        })
    }
    let result = []
    for (let i = 0; i < res.length; i++){
        let user = await DB_ROOMS_HOLDERS.findOne({user_key: res[i].key})
        if (!user)
            continue
        
        result.push({
            user_key: res[i].key,
            fio: user.fio,
        })
        
    }
    return callback({
        state: 1,
        body: {
            room_id: obj.room_id,
            result
        }
    })
}

export const deletePermission = (obj, callback) => {
    DB_ROOMS_PERMISSIONS.find({room_id: obj.room_id, key: obj.user_key}).then(async res =>{
        if (!res){
            return callback({
                state: 0
            })
        }
        let result = await DB_ROOMS_PERMISSIONS.deleteOne({room_id: obj.room_id, key: obj.user_key})
        if (!result){
            return callback({
                state: 0
            })
        }
        return callback({
            state: 1
        })
    })
}

