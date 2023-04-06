import mongoose from "mongoose"
import { DB_ROOMS, DB_SUBUNITS, DB_ROOMS_HOLDERS, DB_ROOMS_PERMISSIONS, DB_ROOMS_LOGS, DB_USER } from "../config/db.js"
import { layoutFix, fioToNewCase } from "../middleware/functions.js"
import { findInBaseByKey } from "../middleware/fb.js"
import fs from 'fs'


export const getRoomsList = async (req, res) => {
    await DB_ROOMS.find().then(e => {
        res.send(e)
    })
}


export const getElJournal = async (req, res) => {
    let logs = []
    const login = req.user
    let user = await DB_USER.findOne({login})
    let full_date = new Date(Date.now() - 5 * 86400000)

    let date = full_date.getFullYear() + '-' + ('0' + (full_date.getMonth() + 1)).slice(-2) + '-' + ('0' + full_date.getDate()).slice(-2)

    let logsdata = await DB_ROOMS_LOGS.find({date_from: {$gte: date}})
    if (user.type == '1'){
        logsdata = await DB_ROOMS_LOGS.find({building: user.type, date_from: {$gte: date}})
    }else if (user.type == '8'){
        logsdata = await DB_ROOMS_LOGS.find({building: user.type, date_from: {$gte: date}})
    }

    for(let i = 0; i<logsdata.length;i++){
        let info = await DB_SUBUNITS.findOne({complete: logsdata[i].department})
        let status
        if (logsdata[i].key_status != null){
            status = 'Взял'
        }
        else{
            status = 'Поставил'
        }
        logs.push({
            fio: logsdata[i].fio,
            position: logsdata[i].position,
            department: logsdata[i].department,
            responsible_fio: info?.responsible_fio,
            responsible_phone: info?.responsible_phone,
            room: logsdata[i].building + '-' + logsdata[i].room,
            status: status,
            date: logsdata[i].date_from.toLocaleDateString(),
            time: logsdata[i].date_from.toLocaleTimeString(),
            type: logsdata[i].type
        })
        if (logsdata[i].active){
            if (logsdata[i].key_status != null){
                status = 'Вернул'
            }
            else{
                status = 'Снял'
            }
            logs.push({
                fio: logsdata[i].fio,
                position: logsdata[i].position,
                department: logsdata[i].department,
                responsible_fio: info?.responsible_fio,
                responsible_phone: info?.responsible_phone,
                room: logsdata[i].building + '-' + logsdata[i].room,
                status: status,
                date: logsdata[i].date_to.toLocaleDateString(),
                time: logsdata[i].date_to.toLocaleTimeString(),
                type: logsdata[i].type
            })
        }
         
    }
    

    logs = logs.reverse()      

    return res.send({logs})
}

export const getSubunits = async (req, res) => {
    await DB_SUBUNITS.find().then(e => {
        res.send(e)
    })
}

export const getSubunit = async (req, res, id) => {
    let subunit = await DB_SUBUNITS.findById(id)
    if (!subunit){
        return res.code(204).send({'message': 'Room not found'})
    }

    return res.send({subunit})
}

export const editSubunit = async (req, res, id) => {
    let obj = req.body.obj
    delete obj._id
    delete obj.__v
    
    let check = await DB_SUBUNITS.findById(id)
    if (!check){
        return res.code(204).send({'message': 'Room not found'})
    }
    let subunit = await DB_SUBUNITS.findByIdAndUpdate(id, obj)
    let new_subunit = await DB_SUBUNITS.findById(id)
    return res.send({subunit: new_subunit})
}

export const deleteSubunit = async (req, res) => {
    let obj = req.body
    
    let check = await DB_SUBUNITS.findById(obj.id)
    if (!check){
        return res.code(204).send({'message': 'Subunit not found'})
    }
    await DB_SUBUNITS.deleteOne({_id: obj.id})
    let result = await DB_SUBUNITS.find()
    return res.send({result})
}

export const getUserKeyList = async(req, res, user_key) => {
    var rooms=[]
    let key = layoutFix(user_key)
    
    await DB_ROOMS_HOLDERS.findOne({user_key:key}).then(async e => {
        if (!e){
            return res.code(204).send({'message': 'User not found'})
        }
        const person = e.toJSON() 
        let kit = false
        const items = await DB_ROOMS_PERMISSIONS.find({key:key})
        for(let i = 0;i<items.length;i++){
            let elem = items[i]
            if (elem.room_id){
                let result = await  DB_ROOMS.findById(elem.room_id)
                let user = null
                if (result.key_status){
                    user = 1
                }
                result.user = user
                rooms.push(result)
            }
            else if (elem.kit){
                kit = true
            }
        }
        let img = null
        if (person.tab_number){
            
            img = './img/'  + e.tab_number + '.jpg'
            if (fs.existsSync(img)){
                const stream = fs.readFileSync(img)
                img = "data:image/jpg;base64,"+stream.toString("base64")
            }
            else{
                img = null
            }
        }
        person.avatar = img

        let all_rooms = []
        const check = rooms.find(e=>e.room=='БП')
        if (check){
            all_rooms = await DB_ROOMS.find()
        }
        if (rooms.length){
            rooms.sort(function(a, b) {
                return a.room.substr(0, 2) - b.room.substr(0, 2)
            })
        }
        if (all_rooms.length){
            all_rooms.sort(function(a, b) {
                if (a.room && b.room)
                    return a.room.substr(0, 2) - b.room.substr(0, 2)
            })
        }
        res.send( {
            rooms,
            person,
            all_rooms,
            kit
        })
    })

}

export const updateKeyStatus = async(req, res) => {
    let obj = req.body
    await DB_ROOMS_HOLDERS.findById(mongoose.Types.ObjectId(obj.userId._id)).then(async e => {

        if (!e){
            return res.code(204).send({'message': 'User not found'})
        }

        let status = obj.key_status?false:true
        let signal_status = await DB_ROOMS.findById(mongoose.Types.ObjectId(obj.id)).signal_status
        if (!status){
            signal_status = false
        }
        await DB_ROOMS.findByIdAndUpdate(mongoose.Types.ObjectId(obj.id), {key_status: status, signal_status: signal_status})
        .then(async result => {
            let info = await DB_SUBUNITS.findOne({complete: e.department})
            if (!status){
            
                let data = new DB_ROOMS_LOGS({
                    fio: e.fio,
                    position: e.position, 
                    department: e.department,
                    responsible_fio: info?.responsible_fio,
                    responsible_phone: info?.responsible_phone,
                    room: result.room,
                    building: result.building,
                    key_status: status,
                    date_from: new Date(),
                    type: "Ключ",
                    active: false
                })
                await data.save()
            }
            else{
                DB_ROOMS_LOGS.findOneAndUpdate({fio: e.fio, active: false, room:result.room, building: result.building}, {active: true,  key_status: status, date_to: new Date()}).then(ee =>{
                    res.send({'success': true})
                })
            }
            return res.send({'success': true})

        })
        
    })

}
 


export const updateSignalStatus = async(req, res) => {
    let obj = req.body
        
    await DB_ROOMS_HOLDERS.findById({_id:obj.userId._id}).then(async e => {

        if (!e){
            return res.code(204).send({'message': 'User not found'})
        }

        let status = obj.signal?false:true
        DB_ROOMS.findByIdAndUpdate(mongoose.Types.ObjectId(obj.id), {signal_status: status})
        .then(async result => {
            let info = await DB_SUBUNITS.findOne({complete: e.department})
            if (status){
            
                let data = new DB_ROOMS_LOGS({
                    fio: e.fio,
                    position: e.position,
                    department: e.department,
                    responsible_fio: info?.responsible_fio,
                    responsible_phone: info?.responsible_phone,
                    room: result.room,
                    building: result.building,
                    signal_status: status,
                    type: "Сигнализация",
                    date_from: new Date(),
                    active: false
                })
                data.save()
            }
            else{
                DB_ROOMS_LOGS.findOneAndUpdate({fio: e.fio, active: false, room: result.room, building: result.building}, {active: true,  signal_status: status, date_to: new Date()}).then(ee =>{
                   return res.send({'success': true})
                })
            }
            
            return res.send({'success': true})
        })
    })
}


export const getDisturbers = async (req, res) => {
    
    var disturbers=[]
    var ids = 0;
    const items = await DB_ROOMS_LOGS.find()
    for(let i = 0;i<items.length;i++){
        await DB_ROOMS_HOLDERS.findOne({fio:items[i].fio, department:items[i].department }).then(result => {
            if (items[i].date_from.getMonth() != items[i].date_to?.getMonth() || items[i].date_from.getDate() != items[i].date_to?.getDate() || !items[i].active){
            
                var сс = disturbers.filter(function(val) {
                    return (val.fio == items[i].fio);
                })[0]?.num_id;

                if (сс != null){
                    disturbers[сс].dist_count++
                }
                else{
                    disturbers.push({
                        num_id: ids,
                        fio: items[i].fio,
                        id: result.id,
                        room:items[i].room,
                        date: items[i].date_from.getDate() + '.' +items[i].date_from.getMonth()  +  '.' + items[i].date_from.getFullYear(),
                        position: items[i].position,
                        department: items[i].department,
                        type: items[i].type,
                        dist_count: 0
                    })
                    ids++
                }
            }
        }) 
    }
    
    let disturbers_res = disturbers.filter(function(val) {
        return (val.dist_count > 0);
    });

    res.send({disturbers: disturbers_res})

}


export const addRoom = async (req, res) => {
    let obj = req.body
    let check = await DB_ROOMS.findOne({building: obj.building, room: obj.room})
    if (check){
        return res.code(204).send({'message': 'Room already exist'})
    }
    let room = new DB_ROOMS({
        type: obj.type,
        room: obj.room,
        building: obj.building,
        key_status: true,
        signal_status: false,
        signaling: obj.signaling
    })
    await room.save()
    let result = await DB_ROOMS.find()
    return res.send({result})
}

export const deleteRoom = async (req, res) => {
    let obj = req.body
    
    let check = await DB_ROOMS.findById(obj.id)
    if (!check){
        return res.code(204).send({'message': 'Room not found'})
    }
    await DB_ROOMS.deleteOne({_id: obj.id})
    let result = await DB_ROOMS.find()
    return res.send({result})
}
export const getRoom = async (req, res, id) => {
    
    let room = await DB_ROOMS.findById(id)
    if (!room){
        return res.code(204).send({'message': 'Room not found'})
    }

    return res.send({room})
}

export const editRoom = async (req, res, id) => {
    let obj = req.body.obj
    delete obj._id
    delete obj.__v
    
    let check = await DB_ROOMS.findById(id)
    if (!check){
        return res.code(204).send({'message': 'Room not found'})
    }
    let room = await DB_ROOMS.findByIdAndUpdate(id, obj)
    let new_room = await DB_ROOMS.findById(id)
    return res.send({room: new_room})
}


export const getKitKeys = async (req, res) => {
    let obj = req.body
    DB_ROOMS_HOLDERS.findById(obj.id).then(async e => {
        if (!e){
            return res.code(204).send({'message': 'User not found'})
        }

        let rooms_perm = await DB_ROOMS_PERMISSIONS.findOne({key:e.user_key, kit: { $exists: true, $not: {$size: 0} }})
        let data = rooms_perm.kit
        for (let i = 0; i < data.length; i++){
            let send_data = {
                id: data[i].id,
                userId: {
                    _id : obj.id
                },
                key_status: true
            }
            updateKeyStatus(send_data, (response) => {
               return 1
            })
        }
        return res.send({'success': true})
    })
}


export const getRoomPermissions = async (req, res, room_id) => {
    let data = await DB_ROOMS_PERMISSIONS.find({room_id})
    if (!data || !room_id){
        res.send([])
    }
    let result = []
    for (let i = 0; i < data.length; i++){
        let user = await DB_ROOMS_HOLDERS.findOne({user_key: data[i].key})
        if (!user)
            continue
        
        result.push({
            user_key: data[i].key,
            fio: user.fio,
        })
    }
    
    res.send({
        room_id: room_id,
        result
    })
}

export const addPermission = async (req, res) => {
    let obj = req.body
    await DB_ROOMS_HOLDERS.findOne({user_key: obj.user_key}).then(async result =>{
        let check = true
        let in_data = true
        if (!result){
            check = await findInBaseByKey(obj.user_key, async (in_base) =>{
                if (!in_base || in_base == 'error'){
                    in_data = false
                    // return res.code(205).send({'message': 'User not in bases'})
                    return false
                }else{
                    let user = new DB_ROOMS_HOLDERS({
                        fio: fioToNewCase(in_base.FIO),
                        department: in_base.DEPARTMENT,
                        position: in_base.DOLJNOST,
                        user_key: obj.user_key,
                        tab_number: in_base.TABELNOMER
                    })
                    await user.save()
                }
            })
        }
        if (in_data){
            
            let data = {
                room_id: obj.room_id,
                key: obj.user_key
            }
            let permiss = new DB_ROOMS_PERMISSIONS(data)
            await permiss.save()   
    
            return res.send({'success': true})
        }
        else{
            return res.code(205).send({'message': 'User not in bases'})
        }
    })
}

export const deletePermission = async(req, res) => {
    let obj = req.body
    await DB_ROOMS_PERMISSIONS.findOne({room_id: obj.room_id, key: obj.user_key}).then(async result =>{
        if (!result){
            return res.code(204).send({'message': 'Permission not found'})
        }
        let info = await DB_ROOMS_PERMISSIONS.findByIdAndDelete(result.id)
        return res.send({'success': true})
    })
}