import { pool } from "../../config/db";


const createVehicles = async (paylod: Record<string, unknown>) => {
    const { vehicle_name, type, registration_number, daily_rent_price, availability_status } = paylod;
    const result = await pool.query(`INSERT INTO vehicle(vehicle_name, type, registration_number, daily_rent_price , availability_status) VALUES($1, $2, $3, $4 , $5) RETURNING *`, [vehicle_name, type, registration_number, daily_rent_price as number, availability_status])
    return result;
}

const getAllVehicles = async () => {
    const result = await pool.query(`SELECT * FROM vehicle`)
    return result;

}

const getOneVehicles = async (id: any) => {
    const result = await pool.query(`SELECT * FROM vehicle WHERE id=$1`, [id])
    return result;
}


const UpdateVehicles = async (paylod: Record<string, unknown>, id: any) => {
    const { vehicle_name, type, registration_number, daily_rent_price, availability_status } = paylod;
    const result = await pool.query(`UPDATE vehicle SET 
            vehicle_name=$1 , 
            type=$2,
            registration_number=$3,
            daily_rent_price=$4 , 
            availability_status=$5 WHERE id=$6 RETURNING *`,
        [vehicle_name, type, registration_number, daily_rent_price, availability_status, id])
    return result;
}


const DeleteVehicles = async (id : any) => {
    const result = await pool.query(`DELETE FROM vehicle WHERE id = $1`, [id])
    return result;
}


const BookedUpdate = async (id : any)=>{
    const reslut = await pool.query(`UPDATE vehicle SET availability_status=$1 WHERE id=$2 RETURNING *`, [ 'booked' ,id])
    return reslut;
}


const AvailableUpdate = async (id : any)=>{
    const reslut = await pool.query(`UPDATE vehicle SET availability_status=$1 WHERE id=$2 RETURNING *`,['available',id])
    return reslut;
}




export const vehicleServices = {
    createVehicles,
    getAllVehicles,
    getOneVehicles,
    UpdateVehicles,
    DeleteVehicles,
    BookedUpdate,
    AvailableUpdate

}