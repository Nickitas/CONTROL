import mongoose from "mongoose"

const Schema = mongoose.Schema;

export const schema_db_user = {
    surname: { //Фамилия
        type: String,
        maxLength: 60,
        minLength: 2
    },
    name: { //Имя
        type: String,
        maxLength: 60,
        minLength: 2
    },
    lastname: { //Отчество
        type: String,
        maxLength: 60
    },
    type: { //Тип подразделения
        type: String,
        maxLength: 30,
    },
    number_card: { //Номер карты
        type: String
    },
    number_room: { //Номер комнаты
        type: String,
        maxLength: 30,
    },
    login: { //Логин
        type: String,
        maxLength: 30,
        minLength: 3
    },
    password: { //Пароль
        type: String,
        maxLength: 60,
        minLength: 6
    },
    rules: { //Права доступа: true - Админ; false - Гость
        type: Schema.ObjectId
    },
    reg: {
        type: Date
    },
    phone: { //Телефон
        type: String,
        maxLength: 60,
    },
    last_ip: {
        type: String
    },
    block: {
        type: Boolean
    },
    token: {
        type: String
    }
}

export const schema_db_rules = {
    title: { //Название прав
        type: String,
        minLength: 3,
        maxLength: 30
    },
    lvl: { //Уроывень доступа
        type: Number,
        min: 0,
        max: 9
    }
}


export const schema_db_rooms = {
    type:{ //Корпус и комната
        type: String,
        maxLength: 50,
    },
    room:{ //Корпус и комната
        type: String,
        maxLength: 50,
    },
    building:{ //Корпус и комната
        type: String,
        maxLength: 50,
    },
    key_status:{ //Корпус и комната
        type: Boolean,
    },
    signal_status:{ //Корпус и комната
        type: Boolean,
    },
    signaling:{ //Корпус и комната
        type: Boolean,
    }
}

export const schema_db_subunits = {
    complete:{ //Подразделение
        type: String,
        maxLength: 200
    },
    shortcut:{ //Подразделение
        type: String,
        maxLength: 80
    },
    responsible_profile: { //Ответственный
        type: String,
        maxLength: 200
    },
    responsible_fio: { //Ответственный
        type: String,
        maxLength: 60
    },
    responsible_phone: { //Ответственный
        type: String,
        maxLength: 60
    },
    responsible_email: { //Ответственный
        type: String,
        maxLength: 60
    },
    economic_block: { //Ответственный
        type: String,
        maxLength: 60
    }
}



export const schema_db_holders = {
    
    fio: { //Подразделение
        type: String,
        maxLength: 60
    },
    department: { //Подразделение
        type: String,
        maxLength: 150
    },
    position: { //Подразделение
        type: String,
        maxLength: 150
    },
    user_key: { //Подразделение
        type: String,
        maxLength: 20
    },
    tab_number: {
        type: String,
        maxLength: 20
    },
    photo: {
        type: String,
        maxLength: 50
    }
}


export const rooms_permissions = {
    
    key: { //Подразделение
        type: String,
        maxLength: 20
    },
    room_id: { //Корпус и комната
        type: Schema.ObjectId
    },
    kit: { //Корпус и комната
        type: Array
    }
}


export const rooms_logs = {
    fio: { //Подразделение
        type: String,
        maxLength: 60
    },
    user_id:{
        type: String,
        maxLength: 60
    },
    department: { //Подразделение
        type: String,
        maxLength: 150
    },
    position: { //Подразделение
        type: String,
        maxLength: 150
    },
    responsible_fio: { //Ответственный
        type: String,
        maxLength: 60
    },
    responsible_phone: { //Ответственный
        type: String,
        maxLength: 60
    },
    room: { //Ответственный
        type: String,
        maxLength: 10
    },
    building: {
        type: String,
        maxLength: 2
    },
    key_status: {
        type: Boolean
    },
    signal_status: {
        type: Boolean
    },
    date_from: {
        type: Date
    },
    date_to: {
        type: Date
    },
    type: {
        type: String,
        minLength: 2,
        maxLength: 12
    },
    active:{
        type: Boolean
    }
}