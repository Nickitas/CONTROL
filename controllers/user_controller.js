import { DB_USER } from "../config/db.js"
import { schema_req_user } from "../model/schema_req.js"
import {ROLES_LIST} from "../config/roles_list.js"
import Ajv from "ajv"
import bcrypt from "bcrypt"
import fs from 'fs'

const ajv = new Ajv()

export const addUser = async(req, res) => {
    let obj = req.body.obj
    const validate = ajv.compile(schema_req_user)
    const valid = validate(obj)
    if (!valid) {
        console.log(validate.errors)
        return res.code(205).send({'message': 'Validate error'})
    }

    await DB_USER.findOne({
        login: obj.login
    }).then(async e => {
        if (e) {
            return res.code(204).send({'message': 'User already exists'})
        }
        let ava = ''
        if (obj.ava){
            ava = obj.ava
        }
        delete obj.ava
        const salt = await bcrypt.genSaltSync(10)
        obj.password = await bcrypt.hashSync(obj.password, salt)
        obj.reg = new Date()
        obj.role = Object.keys(ROLES_LIST).find(key => ROLES_LIST[key] === obj.role)
 
        const user = new DB_USER({...obj, refreshToken: [] })
        await user.save()
        if (ava){
            fs.stat('./avatars', async function(error) {
                if (error) {
                    fs.mkdir('./avatars', err => {
                        if(err) throw err;
                    })
                }
                fs.writeFileSync('./avatars/' + user._id + '.txt', ava)
            })
        }
        return res.send({"success": true})
    })
}

export const getUsers = async(req, res) => {
    await DB_USER.find().then(async e => {
        let data = []
        e.map(async el => {
            let img = './avatars/'  + el._id + '.txt'
            let ava = ''
            if (fs.existsSync(img)){
                const stream = await fs.readFileSync(img)
                ava = await "data:image/jpg;base64,"+stream.toString("base64")
            }

            
            data.push({
                _id: el._id,
                login: el.login,
                name: el.surname,
                lastname: el.lastname,
                post: el.post,
                subunit: el.subunit,
                room: el.number_room,
                role: el.role,
                status: el.status,
                phone: el.phone,
                email: el.email,
                telegram: el.telegram,
                reg: el.reg,
                last_online: el.last_online,
                last_ip: el.last_ip,
                password: el.password,
                block: el.block,
                ava: ava
            })
        })
        console.log(data)
        return res.send(data)
    })
}


export const getUser = async(req, res, id) => {
    await DB_USER.findById(id).then(e => {
        delete e.refreshToken
        return res.send(e)
    })
}


export const editUser = async (req, res, id) => {
    let obj = req.body.obj
    delete obj._id
    delete obj.__v
    delete obj.refreshToken
    delete obj.password
    delete obj.rules
    delete obj.token
    delete obj.role
    const validate = ajv.compile(schema_req_user)
    const valid = validate(obj)
    if (!valid) {
        return res.code(205).send({'message': 'Validate error'})
    }
    let check = await DB_USER.findById(id)
    if (!check){
        return res.code(204).send({'message': 'User not found'})
    }
    await DB_USER.findByIdAndUpdate(id, obj)
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
