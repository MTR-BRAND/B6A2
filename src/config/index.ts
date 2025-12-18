import dotenv from 'dotenv';
import path from 'path'


dotenv.config({path: path.join(process.cwd(), ".env")})


const config = {
    connection_str: process.env.DB_CONEECTION,
    port: process.env.PORT,
    jwtSecret : process.env.SECRET,
}

export default config;