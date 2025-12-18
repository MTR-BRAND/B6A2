import { pool } from "../../../config/db";
import bcrypt from "bcryptjs"

const RegisterUser = async (name : string , email : string , role : string , phone : string , password : string) => {
    const hasPassword = await bcrypt.hash(password, 10)

    const result = await pool.query(`INSERT INTO users(name , email , role , phone , password) VALUES($1, LOWER($2), $3, $4, $5) RETURNING *`, [name , email , role , phone , hasPassword])
    return result;
}


export const Auth_Register_Services = {
    RegisterUser
}