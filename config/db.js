import monngoose from "mongoose"
import { schema_db_user} from "../model/user_schema.js"
import {  schema_db_rooms, schema_db_subunits, schema_db_holders, rooms_permissions, rooms_logs } from "../model/housekeeper_schema.js"
import { fileURLToPath } from "url"
import dotenv from "dotenv"
import path from "path"

const __dirname = path.dirname(fileURLToPath(import.meta.url))
dotenv.config({path: path.resolve(__dirname, '../.env')})

monngoose.connect(process.env.DB_LINK, { useUnifiedTopology: true, useNewUrlParser: true });

export const DB_USER = monngoose.model("user", schema_db_user)
export const DB_ROOMS = monngoose.model("rooms", schema_db_rooms)
export const DB_SUBUNITS = monngoose.model("subunits", schema_db_subunits)
export const DB_ROOMS_HOLDERS = monngoose.model("rooms_holders", schema_db_holders)
export const DB_ROOMS_PERMISSIONS = monngoose.model("rooms_permissions", rooms_permissions)
export const DB_ROOMS_LOGS = monngoose.model("rooms_logs", rooms_logs)