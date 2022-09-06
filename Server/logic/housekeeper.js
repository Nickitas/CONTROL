import mongoose from "mongoose"
import { DB_ROOMS, DB_SUBUNITS, DB_ROOMS_HOLDERS, DB_ROOMS_PERMISSIONS, DB_ROOMS_LOGS } from "../db.js"
import fs from 'fs'


export const getRoomsList = (callback) => {
    DB_ROOMS.find().then(e => {
        return callback({
            state: 1,
            body: e
        })
    })
}


export const getElJournal = async (callback) => {
    let logs = []
    
    let logsdata = await DB_ROOMS_LOGS.find()

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
            room: logsdata[i].room,
            status: status,
            date: logsdata[i].date_from.toLocaleDateString(),
            time: logsdata[i].date_from.getHours() + ':' + logsdata[i].date_from.getMinutes() + ':' + logsdata[i].date_from.getSeconds(),
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
                room: logsdata[i].room,
                status: status,
                date: logsdata[i].date_to.toLocaleDateString(),
                time: logsdata[i].date_to.getHours() + ':' + logsdata[i].date_to.getMinutes() + ':' + logsdata[i].date_to.getSeconds(),
                type: logsdata[i].type
            })
        }
    }
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

function layoutFix(str, reverse) {
    let replacer = {
      "Ф": "A", "И": "B", "С": "C", "В": "D", "У": "E", "А": "F"
    };
   
    reverse && Object.keys(replacer).forEach(key => {
      let v = replacer[key]
      delete (replacer[key])
      replacer[v] = key
    })
      
    for (let i = 0; i < str.length; i++) {
        if (replacer[str[i].toUpperCase()] != undefined) {
            let replace = replacer[str[i].toUpperCase()];
            str = str.replace(str[i], replace);
      }
    }
    return str;
}

export const getUserKeyList = async(obj, callback) => {
    var rooms=[]
    let key = layoutFix(obj.id)
    
    DB_ROOMS_HOLDERS.findOne({user_key:key}).then(async e => {

        if (!e){
            return callback({
                state: 0
            })
        }
        const person = e.toJSON() 
        const items = await DB_ROOMS_PERMISSIONS.find({key:key})
        for(let i = 0;i<items.length;i++){
            let elem = items[i]
            let res = await  DB_ROOMS.findById({_id:elem.room_id})
            let user = null
            if (res.key_status){
                user = 1
            }
            res.user = user
            rooms.push(res)
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
        let all_rooms =[]
        const check = rooms.find(e=>e.room=="БП")
        if(check){
            all_rooms = await DB_ROOMS.find()
        }
        person.avatar = img
        rooms.sort(function(a, b) {
            return a.room.substr(0, 2) - b.room.substr(0, 2)
        })

        return callback({
            state:1,
            body: {
                rooms,
                person,
                all_rooms
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

        DB_ROOMS_PERMISSIONS.findOne({key:e.user_key, room_id:mongoose.Types.ObjectId(obj.id)}).then(async ee => {
            if (!ee){
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
                if (status){
                    let data = new DB_ROOMS_LOGS({
                        fio: e.fio,
                        position: e.position, 
                        department: e.department,
                        responsible_fio: info?.responsible_fio,
                        responsible_phone: info?.responsible_phone,
                        room: res.building + '-' + res.room,
                        key_status: status,
                        date_from: new Date(),
                        type: "Ключ",
                        active: false
                    })
                    data.save()
                }
                else{
                    DB_ROOMS_LOGS.findOneAndUpdate({fio: e.fio, active: false, room: res.building + '-' + res.room}, {active: true,  key_status: status, date_to: new Date()}).then(res =>{
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
    })
}

export const updateSignalStatus = async(obj, callback) => {
        
    DB_ROOMS_HOLDERS.findById({_id:obj.userId._id}).then(async e => {

        if (!e){
            return callback({
                state: 0
            })
        }

        DB_ROOMS_PERMISSIONS.findOne({key:e.user_key, room_id:mongoose.Types.ObjectId(obj.id)}).then(async ee => {
            if (!ee){
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
                        responsible_fio: e.responsible_fio,
                        responsible_phone: info.responsible_phone,
                        room: res.building + '-' + res.room,
                        signal_status: status,
                        type: "Сигнализация",
                        date_from: new Date(),
                        active: false
                    })
                    data.save()
                }
                else{
                    DB_ROOMS_LOGS.findOneAndUpdate({fio: e.fio, active: false, room: res.building + '-' + res.room}, {active: true,  signal_status: status, date_to: new Date()}).then(res =>{
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
