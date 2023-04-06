import { getRoomsList, getElJournal, getSubunits, getUserKeyList, getRoomPermissions, updateKeyStatus, updateSignalStatus, getDisturbers, addRoom, 
    getRoom, editRoom, deleteRoom, getKitKeys, addPermission, deletePermission, getSubunit, editSubunit, deleteSubunit  } from "../controllers/housekeeper_controller.js";
import {ROLES_LIST} from "../config/roles_list.js"
import {verifyRoles} from "../middleware/verifyRoles.js"

export default async function housekeeper_routes(fastify) {
    
    fastify.get("/rooms", {
        preHandler: fastify.verifyJWT
    },  async (request, reply) => {
        await verifyRoles(request, reply, [ROLES_LIST.Admin])
        await getRoomsList(request, reply)
    })

    fastify.post("/rooms", {
        preHandler: fastify.verifyJWT
    },  async (request, reply) => {
        await verifyRoles(request, reply, [ROLES_LIST.Admin])
        await addRoom(request, reply)
    })
    
    fastify.post("/rooms/:id", {
        preHandler: fastify.verifyJWT
    },  async (request, reply) => {
        await verifyRoles(request, reply, [ROLES_LIST.Admin])
        const id = request.params.id
        await editRoom(request, reply, id)
    })
    
    fastify.get("/rooms/:id", {
        preHandler: fastify.verifyJWT
    },  async (request, reply) => {
        await verifyRoles(request, reply, [ROLES_LIST.Admin])
        const id = request.params.id
        await getRoom(request, reply, id)
    })
    
    fastify.post("/rooms/delete", {
        preHandler: fastify.verifyJWT
    },  async (request, reply) => {
        await verifyRoles(request, reply, [ROLES_LIST.Admin])
        await deleteRoom(request, reply)
    })

    fastify.get("/rooms/:id/permissions", {
        preHandler: fastify.verifyJWT
    },  async (request, reply) => {
        await verifyRoles(request, reply, [ROLES_LIST.Admin])
        const id = request.params.id
        await getRoomPermissions(request, reply, id)
    })
    
    fastify.get("/el_journal", {
        preHandler: fastify.verifyJWT
    },  async (request, reply) => {
        await verifyRoles(request, reply, [ROLES_LIST.Admin])
        await getElJournal(request, reply)
    })
    
    fastify.get("/subunits", {
        preHandler: fastify.verifyJWT
    },  async (request, reply) => {
        await verifyRoles(request, reply, [ROLES_LIST.Admin])
        await getSubunits(request, reply)
    })
    
    fastify.get("/subunits/:id", {
        preHandler: fastify.verifyJWT
    },  async (request, reply) => {
        await verifyRoles(request, reply, [ROLES_LIST.Admin])
        const id = request.params.id
        await getSubunit(request, reply, id)
    })
    
    fastify.post("/subunits/delete", {
        preHandler: fastify.verifyJWT
    },  async (request, reply) => {
        await verifyRoles(request, reply, [ROLES_LIST.Admin])
        await deleteSubunit(request, reply)
    })
    
    fastify.post("/subunits/:id", {
        preHandler: fastify.verifyJWT
    },  async (request, reply) => {
        await verifyRoles(request, reply, [ROLES_LIST.Admin])
        const id = request.params.id
        await editSubunit(request, reply, id)
    })
    
    fastify.get("/user_keys/:key", {
        preHandler: fastify.verifyJWT
    },  async (request, reply) => {
        await verifyRoles(request, reply, [ROLES_LIST.Admin])
        const key = request.params.key
        await getUserKeyList(request, reply, key)
    })
    
    fastify.post("/update_key_status", {
        preHandler: fastify.verifyJWT
    },  async (request, reply) => {
        await verifyRoles(request, reply, [ROLES_LIST.Admin])
        await updateKeyStatus(request, reply)
    })
    
    fastify.post("/update_signal_status", {
        preHandler: fastify.verifyJWT
    },  async (request, reply) => {
        await verifyRoles(request, reply, [ROLES_LIST.Admin])
        await updateSignalStatus(request, reply)
    })
    
    fastify.get("/disturbers", {
        preHandler: fastify.verifyJWT
    },  async (request, reply) => {
        await verifyRoles(request, reply, [ROLES_LIST.Admin])
        await getDisturbers(request, reply)
    })
    
    fastify.post("/kit_keys", {
        preHandler: fastify.verifyJWT
    },  async (request, reply) => {
        await verifyRoles(request, reply, [ROLES_LIST.Admin])
        await getKitKeys(request, reply)
    })
    
    fastify.post("/permissions", {
        preHandler: fastify.verifyJWT
    },  async (request, reply) => {
        await verifyRoles(request, reply, [ROLES_LIST.Admin])
        await addPermission(request, reply)
    })
    
    fastify.post("/permissions/delete", {
        preHandler: fastify.verifyJWT
    },  async (request, reply) => {
        await verifyRoles(request, reply, [ROLES_LIST.Admin])
        await deletePermission(request, reply)
    })

}