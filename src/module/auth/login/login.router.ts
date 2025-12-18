import express from "express"
import { Auth_Login_Controller } from "./login.controller";
const router = express.Router()



router.post('/signin' , Auth_Login_Controller.LoginUser)

export const Auth_Login_Router = router;