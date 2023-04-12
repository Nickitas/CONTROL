import { getAllStudents } from "../controllers/rsm_controller.js";
import {ROLES_LIST} from "../config/roles_list.js"
import {verifyRoles} from "../middleware/verifyRoles.js"

export default async function rsm_routes(fastify) {

    fastify.get("/",{
        // preHandler: fastify.verifyJWT
    }, async (request, reply) => {
        // await verifyRoles(request, reply, [ROLES_LIST.Admin])
        await getAllStudents(request, reply)
    })

}