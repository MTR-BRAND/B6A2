import { Request, Response } from "express";
import { pool } from "../../../config/db";
import { Auth_Login_Services } from "./login.services";

const LoginUser = async (req: Request, res: Response) => {
    const { email, password } = req.body
    try {
        const result = await Auth_Login_Services.LoginUser(email, password)
        if (!result) {
            res.status(400).json({
                message: "mybe you password or email not valide",
            })
        }

        
        res.status(200).json({
            success: true,
            message: "Login successful",
            data: result
        })



    } catch (err) {
        res.status(400).json({
            message: err
        })
    }
}

export const Auth_Login_Controller = {
    LoginUser
}