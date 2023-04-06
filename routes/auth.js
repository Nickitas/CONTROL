import { authUser } from "../controllers/auth_controller.js";

export default async function auth(fastify) {

    fastify.post("/", async (request, reply) => {
        await authUser(request, reply)
    })
}