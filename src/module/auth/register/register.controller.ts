import { Request, Response } from "express";
// import { pool } from "../../../config/db";
import { Auth_Register_Services } from "./register.services";

const RegisterUser = async (req: Request, res: Response) => {
    const { name, role, email, password, phone } = req.body;

    try {
        if (email !== email.toLowerCase()) {
            return res.status(400).json({
                message : "chack you email"
            })
        }
        const result = await Auth_Register_Services.RegisterUser(name, email, role, phone, password)
        res.status(201).json({
            success: true,
            message: "User registered successfully",
            data: {
                id: result.rows[0].id,
                name: result.rows[0].name,
                email: result.rows[0].email,
                phone: result.rows[0].phone,
                role: result.rows[0].role
            }
        })
    } catch (err) {
        res.status(400).json({
            message: err
        })
    }
}

export const Auth_Register_Controller = {
    RegisterUser
}