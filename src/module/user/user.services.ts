import { pool } from "../../config/db";

const getUser = async () => {
    const result = pool.query(`SELECT * FROM users`)
    return result;
}

const getOne = async (id: any) => {
    const result = await pool.query(`SELECT * FROM users WHERE id = $1`, [id])
    return result
}

const UpdateUser = async (paylod : Record<string , unknown>) => {
    const {name , email ,role , phone , id} = paylod
    const result = await pool.query(`UPDATE users SET name=$1, email=$2 , role=$3 , phone=$4 WHERE id=$5 RETURNING *`, [name, email, role, phone, id])
    return result;
}


const DeleteUser = async (id : any)=>{
        const result = await pool.query(`DELETE FROM users WHERE id=$1`, [id])
        return result
}




export const userServices = {
    getUser,
    getOne,
    UpdateUser,
    DeleteUser,
}