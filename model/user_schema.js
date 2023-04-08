import mongoose from "mongoose"

const Schema = mongoose.Schema

export const schema_db_user = {
    surname: {
        type: String,
        maxLength: 60,
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
    email: {
        type: String,
        maxLength: 60
    },
    work_position: {
        type: String,
        maxLength: 60,
    },
    subunit: {
        type: String,
        maxLength: 130,
    },
    type: {
        type: String,
        maxLength: 30,
    },
    number_card: {
        type: String
    },
    room: {
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
    last_online: {
        type: String
    },
    block: {
        type: Boolean
    },
    refreshToken: {
        type: Array
    },
    role: {
        type: Object
    }
}