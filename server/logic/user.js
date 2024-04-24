import { DB_RULES, DB_USER } from "../db.js"
import { schema_req_user, schema_req_auth_user, schema_req_check_auth } from "../schema/schema_req.js"
import Ajv from "ajv"
import crypto from "crypto"
import fs from 'fs'

const ajv = new Ajv()


const rand = () => Math.random().toString(36).substr(2);
var tokenGen = () => rand() + rand() + rand();


export const addUser = async(obj, callback) => {
    delete obj.token
    obj.password = crypto.createHash('sha256').update(obj.password).digest('base64')
    const validate = ajv.compile(schema_req_user)
    const valid = validate(obj)
    if (!valid) {
        return callback({ state: 0, error: validate.errors })
    }

    DB_USER.findOne({
        login: obj.login
    }).then(async e => {
        if (e) {
            return callback({
                state: 0,
                error: "the user exists"
            })
        }
        obj.reg = new Date()
 
        const user = new DB_USER({...obj, token: tokenGen() })
        await user.save()
        return callback({
            state: 1
        })

    })

}

export const getUsers = (callback) => {
    DB_USER.find().then(e => {
        callback({
            state: 1,
            body: e
        })
    })
}


export const getUser = (obj, callback) => {
    DB_USER.findOne({token: obj.token}).then(e => {
        if (e){
            delete e.token
            callback({
                state: 1,
                body: e
            })
        }
    })
}


export const editUser = (obj, callback) => {
    const validate = ajv.compile(schema_req_user)
    const valid = validate(obj)
    if (!valid) {
        return callback({ state: 0, error: "no valid" })
    }
    if (!obj.id) {
        return callback({ state: 0, error: "no user ID" })
    }
    let id = obj.id
    delete obj.id
    DB_USER.findByIdAndUpdate(id, obj)
        .then(e => {
            callback({
                state: 1
            })
        })
}


export const authUser = (obj, ip, callback) => {
    const validate = ajv.compile(schema_req_auth_user)
    const valid = validate(obj)
    if (!valid) {
        return callback({ state: 0, error: "no valid" })
    }
    let password = crypto.createHash('sha256').update(obj.password).digest('base64')
    DB_USER.findOne({ login: obj.login, password: password, block: false }).then(e => {
        if (!e) return callback({ state: 0, error: "invalid login or password" })
        let token = tokenGen()
        const last_ip = ip
        fs.appendFileSync('info.log', new Date().toLocaleString() + ' Авторизация с ip: ' + ip + ' Логин: ' + obj.login + "\n")
        DB_USER.findByIdAndUpdate(e._id, { token, last_ip }).then(ee => {
            return callback({ state: 1, body: token })
        })
    })

}


export const checkAuth = (obj, callback) => {
        const validate = ajv.compile(schema_req_check_auth)
        const valid = validate(obj)

        if (!valid) {
            return callback({ state: 0, error: "no valid" })
        }
        if (obj.token){
            DB_USER.findOne({ token: obj.token }, { _id: 1, surname: 1, lastname: 1, name: 1, rules: 1 }).then(e => {


                if (!e) return callback({ state: 0, error: "invalid token" })
                DB_RULES.findById(e.rules, { _id: 0, __v: 0 }).then(ee => {
    
                    callback({
                        state: 1,
                        body: {
                            ...e.toJSON(),
                            rules: ee ? ee.toJSON() : {}
                        }
                    })
                })
    
            })
        }
        else{
            return callback({ state: 0, error: "invalid token" })
        }
       
    }
    // https://www.youtube.com/watch?v=1p7JxaecNNg



export const isAuthF = async(token) => {
    let res = null
    if (token){
        res = await DB_USER.findOne({ token })
    }
    return res ? true : false
}



export const getRules = (callback) => {
    DB_RULES.find().then(e => {

        return callback({
            state: 1,
            items: e
        })
    })
}



export const deleteUser = (obj, callback) => {
    DB_USER.deleteOne({_id:obj.id}).then(e => {
        return callback({
            state: 1
        })
    })
}
