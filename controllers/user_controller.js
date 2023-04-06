import { DB_USER } from "../config/db.js"
import { schema_req_user, schema_req_auth_user, schema_req_check_auth } from "../model/schema_req.js"
import Ajv from "ajv"
import crypto from "crypto"
import fs from 'fs'

const ajv = new Ajv()


const rand = () => Math.random().toString(36).substr(2);
var tokenGen = () => rand() + rand() + rand();


export const addUser = async(req, res) => {
    let obj = req.body
    obj.password = crypto.createHash('sha256').update(obj.password).digest('base64')
    const validate = ajv.compile(schema_req_user)
    const valid = validate(obj)
    if (!valid) {
        return res.code(205).send({'message': 'Validate error'})
    }

    await DB_USER.findOne({
        login: obj.login
    }).then(async e => {
        if (e) {
            return res.code(204).send({'message': 'User already exists'})
        }
        obj.reg = new Date()
 
        const user = new DB_USER({...obj, token: tokenGen() })
        await user.save()
        return res.send({"success": true})
    })
}

export const getUsers = async(req, res) => {
    await DB_USER.find().then(e => {
        return res.send(e)
    })
}


export const getUser = async(req, res, id) => {
    await DB_USER.findById(id).then(e => {
        delete e.refreshToken
        return res.send(e)
    })
}


export const editUser = async (req, res, id) => {
    let obj = req.body
    delete obj._id
    delete obj.__v
    // const validate = ajv.compile(schema_req_user)
    // const valid = validate(obj)
    // if (!valid) {
    //     return res.code(205).send({'message': 'Validate error'})
    // }
    let check = await DB_USER.findById(id)
    if (!check){
        return res.code(204).send({'message': 'User not found'})
    }
    let user = await DB_USER.findByIdAndUpdate(id, obj)
    let new_user = await DB_USER.findById(id)
    delete new_user.refreshToken
    return res.send({user: new_user})
}

export const deleteUser = (req, res) => {
    let obj = req.body
    DB_USER.deleteOne({_id:obj.id}).then(e => {
        return res.send(e)
    })
}

export const chageBlockUser = (req, res) => {
    let obj = req.body
    DB_USER.findOneAndUpdate({_id:obj.id}, {block: obj.block}).then(e => {
        if (e){
            return res.send({'success': true})
        }
        else{
            return res.code(204).send({'success': false})
        }
    })
}
