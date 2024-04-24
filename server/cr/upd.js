import { DB_ROOMS } from "../db.js"
import monngoose from "mongoose"

await DB_ROOMS.updateMany({key_status: true, signal_status: true})

monngoose.connection.close()