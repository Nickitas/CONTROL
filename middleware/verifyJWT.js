import jwt from "jsonwebtoken"

export default async function verifyJWT (req, res, next) {
    const authHeader = req.headers.authorization || req.headers.Authorization
    if (!authHeader?.startsWith('Bearer ')) return res.code(401).send()
    const token = authHeader.split(' ')[1]
    jwt.verify(
        token,
        process.env.ACCESS_TOKEN_SECRET,
        (err, decoded) => {
            if (err) return res.code(403).send({error: 'unauthorized'}) //invalid token
            req.user = decoded.UserInfo.login
            req.roles = decoded.UserInfo.roles
            next()
        }
    )
}
