import express, { Request, Response } from 'express'
import initDB from './config/db';
import { Auth_Register_Router } from './module/auth/register/register.router';
import { Auth_Login_Router } from './module/auth/login/login.router';
import { UserRouter } from './module/user/user.routes';
import auth from './middleware/auth';
import { VehiclesRouter } from './module/vehicles/vehicles.routes';
import { BookingRouter } from './module/bookings/booking.routes';
const app = express()
app.use(express.json())

initDB()

app.get("/", async (req: Request, res: Response) => {
  try {
    res.status(200).json({
      message: "WEB SERVER IS RUNNING....",
      status: 200
    })
  } catch (error) {
    res.status(404).json({
      message : error,
    })
  }
})



app.use("/api/v1/auth" , Auth_Register_Router)
app.use("/api/v1/auth" , Auth_Login_Router)
app.use("/api/v1/users" , UserRouter)
app.use('/api/v1/vehicles' ,VehiclesRouter)
app.use('/api/v1/bookings' , BookingRouter)




export default app;

