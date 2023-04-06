import { DB_USER } from "../config/db.js"
import jwt from 'jsonwebtoken'
import { fileURLToPath } from "url"
import dotenv from "dotenv"
import path from "path"


const __dirname = path.dirname(fileURLToPath(import.meta.url))
dotenv.config({path: path.resolve(__dirname, '../.env')})

export const refreshToken = async (req, res) => {

    const cookies = req.cookies
    if (!cookies?.jwt) return res.code(401).send()

    const refreshToken = cookies.jwt
    res.clearCookie('jwt', { httpOnly: true, sameSite: 'None', secure: true });

    const foundUser = await DB_USER.findOne({ refreshToken }).exec()

    if (!foundUser) {
        jwt.verify(
            refreshToken,
            process.env.REFRESH_TOKEN_SECRET,
            async (err, decoded) => {
                if (err) return res.code(403).send() 
                const hackedUser = await DB_USER.findOne({ login: decoded.login }).exec()
                hackedUser.refreshToken = []
                const result = await hackedUser.save()
            }
        )
        return res.code(403).send()
    }

    const newRefreshTokenArray = foundUser.refreshToken.filter(rt => rt !== refreshToken);

    await  jwt.verify(
        refreshToken,
        process.env.REFRESH_TOKEN_SECRET,
        async (err, decoded) => {
            if (err) {
                foundUser.refreshToken = [...newRefreshTokenArray]
                const result = await foundUser.save()
            }
            if (err || foundUser.login !== decoded.login) return res.code(403).send() 

            const roles = Object.values(foundUser.role).filter(Boolean)
            const accessToken = jwt.sign(
                {
                    "UserInfo": {
                        "login": decoded.login,
                        "name": foundUser.name,
                        "work_position": foundUser.work_position,
                        "roles": roles
                    }
                },
                process.env.ACCESS_TOKEN_SECRET,
                { expiresIn: '365d' }
            )

            const newRefreshToken = jwt.sign(
                { "login": foundUser.login },
                process.env.REFRESH_TOKEN_SECRET,
                { expiresIn: '365d' }
            )
            foundUser.refreshToken = [...newRefreshTokenArray, newRefreshToken]
            const result = await foundUser.save()

            res.setCookie('jwt', newRefreshToken, { httpOnly: true, secure: true, sameSite: 'None', maxAge: 24 * 60 * 60 * 1000 });
            res.send({ accessToken })
        }
    )
}