import { pool } from "../../config/db";

const createBooking = async (paylod : Record<string , unknown> , name : string , email : string, vehicle_name : string, daily_rent_price : number ,  total : number , type : string)=>{
    const {customer_id , vehicle_id, rent_start_date ,  rent_end_date } = paylod
    const reslut = await pool.query(`INSERT INTO Bookings(customer_id , vehicle_id, rent_start_date ,  rent_end_date , vehicle_name, daily_rent_price , name , email , total , type) VALUES($1, $2, $3, $4 , $5, $6 , $7, $8 , $9 , $10) RETURNING *` , [customer_id , vehicle_id, rent_start_date , rent_end_date , vehicle_name, daily_rent_price , name , email  , total , type])
    return reslut;
}


const getAllBooking = async() =>{
    const result = await pool.query(`SELECT * FROM Bookings`)
    return result;
}

const StatusUpdate = async (status : string ,  id : any)=>{
    const result  = await pool.query(`UPDATE Bookings SET status=$1 WHERE id=$2 RETURNING *` , [status , id]);
    return result;
}


const getOne = async(id : any) =>{
    const reslut = await pool.query(`SELECT * FROM  Bookings WHERE id=$1`, [id])
    return reslut;
}



export const BookingServices = {
    createBooking,
    getAllBooking,
    StatusUpdate,
    getOne
}