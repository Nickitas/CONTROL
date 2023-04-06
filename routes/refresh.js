import { refreshToken } from "../controllers/refresh_controller.js";

export default async function auth(fastify) {

    fastify.get("/", async (request, reply) => {
        await refreshToken(request, reply)
    })
}