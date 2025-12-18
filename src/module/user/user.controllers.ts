import { Request, Response } from "express";
import { userServices } from "./user.services";
import { pool } from "../../config/db";

const getUser = async (req: Request, res: Response) => {
    try {
        const result = await userServices.getUser();

        res.status(200).json({
            success: true,
            message: "Users retrieved successfully",

            data: result.rows.map((item) => {
                return {
                    id: item.id,
                    name: item.name,
                    email: item.email,
                    phone: item.phone,
                    role: item.role
                }

            })
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Something went wrong",
        });
    }
};

const getOne = async (req: Request, res: Response) => {

    try {
        const result = await userServices.getOne(req.params.id);

        res.status(200).json({
            success: true,
            message: "Users retrieved successfully",
            data: result.rows,
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Something went wrong",
        });
    }
}

const UpdateUser = async (req: Request, res: Response) => {

    try {
        const id = req.params.id
        const { name, email, role, phone } = req.body
        const allPara = {
            name: name,
            email: email,
            role: role,
            phone: phone,
            id: id
        }


        if (req.user?.id === Number(id) && req.user?.role === "customer" || req.user?.role === "admin") {

            const result = await userServices.UpdateUser(allPara)

            if (result.rows.length === 0) {
                res.status(404).json({
                    message: 'error',
                })
            }
            else {
                res.status(200).json({
                    success: true,
                    message: "User updated successfully",
                    data: {
                        id: result.rows[0].id,
                        name: result.rows[0].name,
                        email: result.rows[0].email,
                        phone: result.rows[0].phone,
                        role: result.rows[0].role
                    }
                })
            }
        } else {
            res.status(404).json({
                message: 'Id not match please chack your id',
            })
        }


    } catch (err) {
        res.status(400).json({
            message: err
        })
    }
}

const DeleteUser = async (req: Request, res: Response) => {
    try {
        const result = await userServices.DeleteUser(req.params.id)
        res.status(200).json({
            success: true,
            message: "User deleted successfully"
        })
    } catch (error) {
        res.status(404).json({
            message: error
        })
    }
}



export const userControllers = {
    getUser,
    getOne,
    UpdateUser,
    DeleteUser
};
