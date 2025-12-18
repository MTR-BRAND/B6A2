import { Pool } from "pg";
import config from ".";

export const pool = new Pool({
    connectionString: `${config.connection_str}`
})

const initDB = async () => {
    await pool.query(`
        CREATE TABLE IF NOT EXISTS users(
        id SERIAL PRIMARY KEY,
        name VARCHAR(100) NOT NULL,
        role VARCHAR(50) NOT NULL,
        email VARCHAR(150) UNIQUE NOT NULL,
        password TEXT NOT NULL,
        phone VARCHAR(15)
        )
        `);

    await pool.query(`
        CREATE TABLE IF NOT EXISTS vehicle(
        id SERIAL PRIMARY KEY,
        vehicle_name VARCHAR(100) NOT NULL,
        type TEXT NOT NULL,
        registration_number VARCHAR(100) UNIQUE NOT NULL,
        daily_rent_price INTEGER NOT NULL,
        availability_status TEXT NOT NULL
        )
        `);

    await pool.query(`
        CREATE TABLE IF NOT EXISTS Bookings(
        id SERIAL PRIMARY KEY,
        customer_id INT REFERENCES users(id) ON DELETE CASCADE,
        vehicle_id	INT REFERENCES vehicle(id) ON DELETE CASCADE,
        rent_start_date TEXT NOT NULL,
        rent_end_date TEXT NOT NULL,
        status TEXT NOT NULL CHECK (status IN ('active', 'cancelled', 'returned')) DEFAULT 'active',
        vehicle_name TEXT NOT NULL,
        daily_rent_price INT NOT NULL,
        name TEXT NOT NULL,
        email VARCHAR(150) NOT NULL,
        total INT NOT NULL,
        type TEXT NOT NULL
        )
        `);
}


export default initDB;