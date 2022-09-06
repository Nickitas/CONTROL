import mongoose from "mongoose"

const Schema = mongoose.Schema;

export const schema_db_user = {
    surname: { 
        type: String,
        maxLength: 60,
        minLength: 2
    },
    name: { 
        type: String,
        maxLength: 60,
        minLength: 2
    },
    lastname: { 
        type: String,
        maxLength: 60
    },
    type: {
        type: String,
        maxLength: 30,
        minLength: 3
    },
    number_card: {
        type: String
    },
    number_room: {
        type: String,
        maxLength: 30,
    },
    login: {
        type: String,
        maxLength: 30,
        minLength: 3
    },
    password: {
        type: String,
        maxLength: 60,
        minLength: 6
    },
    rules: {
        type: Schema.ObjectId
    },
    reg: {
        type: Date
    },
    phone: {
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
    title: {
        type: String,
        minLength: 3,
        maxLength: 30
    },
    lvl: {
        type: Number,
        min: 0,
        max: 9
    }
}


export const schema_db_rooms = {
    type:{
        type: String,
        maxLength: 50,
    },
    room:{
        type: String,
        maxLength: 50,
    },
    building:{
        type: String,
        maxLength: 50,
    },
    key_status:{
        type: Boolean,
    },
    signal_status:{
        type: Boolean,
    },
    signaling:{
        type: Boolean,
    }
}

export const schema_db_subunits = {
    complete:{ 
        type: String,
        maxLength: 200
    },
    shortcut:{ 
        type: String,
        maxLength: 80
    },
    responsible_profile: {
        type: String,
        maxLength: 200
    },
    responsible_fio: {
        type: String,
        maxLength: 60
    },
    responsible_phone: {
        type: String,
        maxLength: 60
    },
    responsible_email: {
        type: String,
        maxLength: 60
    },
    economic_block: {
        type: String,
        maxLength: 60
    }
}



export const schema_db_holders = {
    
    fio: { 
        type: String,
        maxLength: 60
    },
    department: { 
        type: String,
        maxLength: 150
    },
    position: { 
        type: String,
        maxLength: 150
    },
    user_key: { 
        type: String,
        maxLength: 20
    },
    tab_number: {
        type: String,
        maxLength: 20
    }
}


export const rooms_permissions = {
    
    key: { 
        type: String,
        maxLength: 20
    },
    room_id: {
        type: Schema.ObjectId
    }
}


export const rooms_logs = {
    fio: { 
        type: String,
        maxLength: 60
    },
    user_id:{
        type: String,
        maxLength: 60
    },
    department: { 
        type: String,
        maxLength: 150
    },
    position: { 
        type: String,
        maxLength: 150
    },
    responsible_fio: {
        type: String,
        maxLength: 60
    },
    responsible_phone: {
        type: String,
        maxLength: 60
    },
    room: {
        type: String,
        maxLength: 10
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