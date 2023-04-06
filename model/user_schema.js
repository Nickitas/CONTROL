import mongoose from "mongoose"

const Schema = mongoose.Schema

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
    work_position: {
        type: String,
        maxLength: 30,
    },
    type: {
        type: String,
        maxLength: 30,
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
    refreshToken: {
        type: Array
    },
    role: {
        type: Object
    }
}
