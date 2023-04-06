import Fastify from "fastify"
import middle from "@fastify/middie"
import cookie from "@fastify/cookie"
import cors from "@fastify/cors"
import user_routes from "./routes/user_routes.js"
import housekeeper_routes from "./routes/housekeeper_routes.js"
import verifyJWT from "./middleware/verifyJWT.js"
import auth from "./routes/auth.js"
import refresh from "./routes/refresh.js"
import dotenv from "dotenv"

const fastify = Fastify({
    logger: true
})
fastify.register(cors, (instance) => {
    return (req, callback) => {
      const corsOptions = {
        origin: true,
        credentials: true
      };
      callback(null, corsOptions)
    }
})

fastify.register(cookie, {
    secret: "l4mfnv2pinfpi0",
    hook: 'onRequest',
    parseOptions: {}
})
fastify.decorate('verifyJWT', verifyJWT)


fastify.register(middle)
fastify.register(refresh, {prefix: '/api/refresh'})
fastify.register(auth, {prefix: '/api/auth'})
fastify.register(user_routes, {prefix: '/api/users'})
fastify.register(housekeeper_routes, {prefix: '/api/housekeeper'})


fastify.listen({ port: process.env.PORT })

