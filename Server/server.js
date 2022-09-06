import fastify from "fastify";
import cors from "fastify-cors"
import { addUser, getRules, getUsers, getUser, authUser, editUser, checkAuth, isAuthF, deleteUser } from "./logic/user.js";
import {getRoomsList, getElJournal, getSubunits, getUserKeyList, updateKeyStatus, updateSignalStatus, getDisturbers } from "./logic/housekeeper.js";
const app = fastify()
app.register(cors)


const isAuthMethod = async(res, type, body) => {
    if (type == "getRules") {
        return getRules((response) => {
            res.send(response)
        })
    } else if (type == "addUser") {
        return addUser(body, (response) => {
            res.send(response)
        })
    } else if (type == "getUsers") {
        return getUsers((response) => {
            res.send(response)
        })
    }else if (type == "getUser") {
        return getUser(body, (response) => {
            res.send(response)
        })
    } else if (type == "editUser") {
        return editUser((response) => {
            res.send(response)  
        })
    } else if (type == "getRoomsList") {
        return getRoomsList((response) => {
            res.send(response)
        })
    }else if (type == "getElJournal") {
        return getElJournal((response) => {
            res.send(response)
        })
    }else if (type == "deleteUser") {
        return deleteUser(body, (response) => {
            res.send(response)
        })
    }else if (type == "getDisturbers") {
        return getDisturbers((response) => {
            res.send(response)
        })
    }else if (type == "getUserKeyList") {
        return getUserKeyList(body, (response) => {
            res.send(response)
        })
    }else if (type == "updateKeyStatus") {
        return updateKeyStatus(body, (response) => {
            res.send(response)
        })
    }else if (type == "updateSignalStatus") {
        return updateSignalStatus(body, (response) => {
            res.send(response)
        })
    }else if (type == "getSubunits") {
        return getSubunits((response) => {
            res.send(response)
        })
    }
}

const notIsAuthMethod = async(res, type, body, ip) => {
    if (type == "authUser") {
        return authUser(body, ip, (response) => {
            res.send(response)
        })
    }
}


const request = async(res, type, body, ip) => {
    const isAuth = await isAuthF(body.token)
    // console.log(type, body, isAuth)
    if (type == "checkAuth") {
        return checkAuth(body, (response) => {
            res.send(response)
        })
    }
    // console.log(2, type, body, isAuth)

    if (isAuth) {
        isAuthMethod(res, type, body)
    } else {
        notIsAuthMethod(res, type, body, ip)
    }

}



app.post("/api", {
    schema: {
        body: {
            type: "object",
            required: ["type"],
            propertion: {
                type: {
                    type: "string",
                    minLength: 3,
                    maxLength: 20,
                    default: "error"
                },
                body: {
                    type: "object"
                }
            },
        }
    }
}, (req, res) => {
    const body = req.body
    const ip = (req.headers['x-forwarded-for'] || '').split(',')[0] || req.connection.remoteAddress
    if (body.type == "error") {
        return res.send({
            state: 0
        })
    }
    return request(res, body.type, body.body, ip)
})



app.listen(3000).then(e => {
    console.log(e)
})

