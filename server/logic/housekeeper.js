import mongoose from "mongoose"
import { DB_ROOMS, DB_SUBUNITS, DB_ROOMS_HOLDERS, DB_ROOMS_PERMISSIONS, DB_ROOMS_LOGS, DB_USER } from "../db.js"
import { layoutFix, fioToNewCase } from "./functions.js"
import fs from 'fs'


export const getRoomsList = (callback) => {
    DB_ROOMS.find().then(e => {
        e.sort(function(a, b) {
            return a.room - b.room
        })
        return callback({
            state: 1,
            body: e
        })
    })
}


export const getElJournal = async (obj, callback) => {
    let logs = []
    let user = await DB_USER.findOne({token: obj.token})
    
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

    return callback({
        state: 1,
        body: logs
    })
}

export const getSubunits = (callback) => {
    DB_SUBUNITS.find().then(e => {
        return callback({
            state: 1,
            body: e
        })
    })
}

export const getUserKeyList = async(obj, callback) => {
    var rooms=[]
    let key = layoutFix(obj.id)
    let building = '1'
    let user = await DB_USER.findOne({token: obj.token})
    if (user.type){
        if (user.type.includes('8'))
            building = '8'
    }

    
    DB_ROOMS_HOLDERS.findOne({user_key:key}).then(async e => {

        if (!e){
            return callback({
                state: 0
            })
        }
        const person = e.toJSON() 
        let kit = false
        const items = await DB_ROOMS_PERMISSIONS.find({key:key})
        for(let i = 0;i<items.length;i++){
            let elem = items[i]
            if (elem.room_id){
                let res = await  DB_ROOMS.findById({_id:elem.room_id})
                let user = null
                if (res.key_status){
                    user = 1
                }
                res.user = user
                if (res.building == building){
                    rooms.push(res)
                }
            }
            else if (elem.kit){
                kit = true
            }
        }
        let img = null
        // if (person.photo){
        //     img = 'http://10.37.0.20/List/photo.php/?name=' + person.photo
        // }
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
        return callback({
            state:1,
            body: {
                rooms,
                person,
                all_rooms,
                kit
            } 
        })
    })

}

export const updateKeyStatus = async(obj, callback) => {
        
    DB_ROOMS_HOLDERS.findById({_id:obj.userId._id}).then(async e => {

        if (!e){
            return callback({
                state: 0
            })
        }

        let status = obj.key_status?false:true
        let signal_status = await DB_ROOMS.findById(mongoose.Types.ObjectId(obj.id)).signal_status
        if (!status){
            signal_status = false
        }
        DB_ROOMS.findByIdAndUpdate(mongoose.Types.ObjectId(obj.id), {key_status: status, signal_status: signal_status})
        .then(async res => {
            let info = await DB_SUBUNITS.findOne({complete: e.department})
            if (!status){
            
                let data = new DB_ROOMS_LOGS({
                    fio: e.fio,
                    position: e.position, 
                    department: e.department,
                    responsible_fio: info?.responsible_fio,
                    responsible_phone: info?.responsible_phone,
                    room: res.room,
                    building: res.building,
                    key_status: status,
                    date_from: new Date(),
                    type: "Ключ",
                    active: false
                })
                data.save()
            }
            else{
                DB_ROOMS_LOGS.findOneAndUpdate({fio: e.fio, active: false, room:res.room, building: res.building}, {active: true,  key_status: status, date_to: new Date()}).then(res =>{
                    return callback({
                        state: 1
                    })
                })
            }
            return callback({
                state: 1
            })
        })
        
    })

}
 


export const updateSignalStatus = async(obj, callback) => {

        
    DB_ROOMS_HOLDERS.findById({_id:obj.userId._id}).then(async e => {

        if (!e){
            return callback({
                state: 0
            })
        }

        let status = obj.signal?false:true
        DB_ROOMS.findByIdAndUpdate(mongoose.Types.ObjectId(obj.id), {signal_status: status})
        .then(async res => {
            let info = await DB_SUBUNITS.findOne({complete: e.department})
            if (status){
            
                let data = new DB_ROOMS_LOGS({
                    fio: e.fio,
                    position: e.position,
                    department: e.department,
                    responsible_fio: info?.responsible_fio,
                    responsible_phone: info?.responsible_phone,
                    room: res.room,
                    building: res.building,
                    signal_status: status,
                    type: "Сигнализация",
                    date_from: new Date(),
                    active: false
                })
                data.save()
            }
            else{
                DB_ROOMS_LOGS.findOneAndUpdate({fio: e.fio, active: false, room: res.room, building: res.building}, {active: true,  signal_status: status, date_to: new Date()}).then(res =>{
                    return callback({
                        state: 1
                    })
                })
            }
            
            return callback({
                state: 1
            })
        })
        
    })
}


export const getDisturbers = async (callback) => {
    
    var disturbers=[]
    var ids = 0;
    const items = await DB_ROOMS_LOGS.find()
    for(let i = 0;i<items.length;i++){
        await DB_ROOMS_HOLDERS.findOne({fio:items[i].fio, department:items[i].department }).then(res => {
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
                        id: res.id,
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

    return callback({
        state:1,
        body: disturbers
    })
}


export const addRoom = async (obj, callback) => {
    
    let check = await DB_ROOMS.findOne({building: obj.building, room: obj.name})
    if (check){
        return callback({
            state:0,
            body: 'Аудитория уже существует'
        })
    }
    let room = new DB_ROOMS({
        type: obj.type,
        room: obj.name,
        building: obj.building,
        key_status: true,
        signal_status: false,
        signaling: obj.signaling=="есть"
    })
    await room.save()
    return callback({
        state: 1,
        body: room
    })
}

export const removeRoom = async (obj, callback) => {
    
    let check = await DB_ROOMS.findById({_id: obj.id})
    if (!check){
        return callback({
            state:0,
            body: 'Аудитория не существует'
        })
    }
    await DB_ROOMS.deleteOne({_id: obj.id})
    return callback({
        state: 1
    })
}
export const getRoomEdit = async (obj, callback) => {
    
    let room = await DB_ROOMS.findById({_id: obj.room_id})
    if (!room){
        return callback({
            state:0,
            body: 'Аудитория не найдена'
        })
    }
    return callback({
        state: 1,
        body: room
    })
}

export const editRoom = async (obj, callback) => {
    
    let check = await DB_ROOMS.findOne({_id: obj.room_id})
    if (!check){
        return callback({
            state:0,
            body: 'Аудитория не найдена'
        })
    }
    let room = await DB_ROOMS.findByIdAndUpdate({_id:  obj.room_id}, obj.data)
    return callback({
        state: 1
    })
}


export const getKitKeys = async (obj, callback) => {
    DB_ROOMS_HOLDERS.findById({_id:obj.id}).then(async e => {
        if (!e){
            return callback({
                state: 0
            })
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
        return callback({
            state: 1
        })
    })
}
