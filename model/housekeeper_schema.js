import mongoose from "mongoose"

const Schema = mongoose.Schema

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
    subunit:{
        type: String,
        maxLength: 200,
        default: ''
    },
    head:{
        type: String,
        maxLength: 70,
        default: ''
    },
    phone:{
        type: String,
        maxLength: 50,
        default: ''
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
    },
    photo: {
        type: String,
        maxLength: 50
    }
}


export const rooms_permissions = {
    
    key: {
        type: String,
        maxLength: 20
    },
    room_id: {
        type: Schema.ObjectId
    },
    kit: {
        type: Array
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