import { pool } from "../../../config/db";
import bcrypt from "bcryptjs"
import jwt, { JwtPayload } from 'jsonwebtoken'
import config from "../../../config";


const LoginUser = async (emails: string, password: string) => {
    const result = await pool.query(`SELECT * FROM users WHERE email=$1`, [emails]);
    if (result.rows.length === 0) {
        return null;
    }

    const usersLoginData = result.rows[0]
    const user = {
        id : usersLoginData.id,
        name : usersLoginData.name,
        email : usersLoginData.email,
        phone: usersLoginData.phone,
        role : usersLoginData.role
    }

    const match = await bcrypt.compare(password, usersLoginData.password) 

    if (!match) {
        return false;
    }



    const token = jwt.sign({id : user.id , name: user.name, email: user.email, role: user.role, phone: user.phone }, config.jwtSecret as string, {
        expiresIn: '2d'
    })

    

    


    return {token ,user}
}

export const Auth_Login_Services = {
    LoginUser
}