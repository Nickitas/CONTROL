import { addUser, getUsers, getUser, editUser, deleteUser, chageBlockUser } from "../controllers/user_controller.js";
import {ROLES_LIST} from "../config/roles_list.js"
import {verifyRoles} from "../middleware/verifyRoles.js"

export default async function user_routes(fastify) {

    fastify.post("/",{
        preHandler: fastify.verifyJWT
    }, async (request, reply) => {
        await verifyRoles(request, reply, [ROLES_LIST.Admin])
        await addUser(request, reply)
    })

    fastify.post("/:id",{
        preHandler: fastify.verifyJWT
    }, async (request, reply) => {
        await verifyRoles(request, reply, [ROLES_LIST.Admin])
        const id = request.params.id
        await editUser(request, reply, id)
    })

    fastify.post("/delete",{
        preHandler: fastify.verifyJWT
    }, async (request, reply) => {
        await verifyRoles(request, reply, [ROLES_LIST.Admin])
        await deleteUser(request, reply)
    })

    fastify.post("/block",{
        preHandler: fastify.verifyJWT
    }, async (request, reply) => {
        await verifyRoles(request, reply, [ROLES_LIST.Admin])
        await chageBlockUser(request, reply)
    })

    fastify.get("/", {
        preHandler: fastify.verifyJWT
    },  async (request, reply) => {
        await verifyRoles(request, reply, [ROLES_LIST.Admin])
        await getUsers(request, reply)
    })

    fastify.get("/:id",{
        preHandler: fastify.verifyJWT
    }, async (request, reply) => {
        await verifyRoles(request, reply, [ROLES_LIST.Admin])
        const id = request.params.id
        await getUser(request, reply, id)
    })
}