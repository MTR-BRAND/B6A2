import express from "express"
import { Auth_Register_Controller } from "./register.controller"
const router = express.Router() 

router.post('/signup' , Auth_Register_Controller.RegisterUser)

export const Auth_Register_Router = router