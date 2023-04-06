import { DB_USER } from "../config/db.js"
import { schema_req_user, schema_req_auth_user, schema_req_check_auth } from "../model/schema_req.js"
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import { fileURLToPath } from "url"
import dotenv from "dotenv"
import path from "path"

const __dirname = path.dirname(fileURLToPath(import.meta.url))
dotenv.config({path: path.resolve(__dirname, '../.env')})


export const authUser = async (req, res) => {
    const cookies = req.cookies

    const { user, pwd } = req.body
    if (!user || !pwd) return res.status(400).send({ 'message': 'Username and password are required.' })

    const foundUser = await DB_USER.findOne({ login: user }).exec()

    if (!foundUser) return res.sendStatus(401); //Unauthorized 
    const match = await bcrypt.compare(pwd, foundUser.password);
    if (match) {
        const roles = Object.values(foundUser.role).filter(Boolean)

        const accessToken = jwt.sign(
            {
                "UserInfo": {
                    "login": foundUser.login,
                    "name": foundUser.name,
                    "work_position": foundUser.work_position,
                    "roles": roles
                }
            },
            process.env.ACCESS_TOKEN_SECRET,
            { expiresIn: '365d' }
        );
        const newRefreshToken = jwt.sign(
            { "login": foundUser.login },
            process.env.REFRESH_TOKEN_SECRET,
            { expiresIn: '365d' }
        );

        let newRefreshTokenArray =
            !cookies?.jwt
                ? foundUser.refreshToken
                : foundUser.refreshToken.filter(rt => rt !== cookies.jwt);

        if (cookies?.jwt) {

            const refreshToken = cookies.jwt;
            const foundToken = await DB_USER.findOne({ refreshToken }).exec();

            if (!foundToken) {
                newRefreshTokenArray = [];
            }

            res.clearCookie('jwt', { httpOnly: true, sameSite: 'None', secure: true });
        }

        foundUser.refreshToken = [...newRefreshTokenArray, newRefreshToken];
        const result = await foundUser.save();

        res.cookie('jwt', newRefreshToken, { httpOnly: true, secure: true, sameSite: 'None', maxAge: 24 * 60 * 60 * 1000 });

        res.send({ accessToken });

    } else {
        res.code(401).send()
    }
}
