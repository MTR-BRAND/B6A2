import { Request, Response } from "express"
import { pool } from "../../config/db"
import { vehicleServices } from "./vehicles.services"

const createVehicles = async (req: Request, res: Response) => {

    try {

        if (req.user?.role !== "admin") {
            return res.status(404).json({
                message: "you are not admin"
            })
        }

        if (req.body.daily_rent_price <= -1) {
            return res.status(404).json({
                message: "number is not valid"
            })
        }
        const result = await vehicleServices.createVehicles(req.body)

        res.status(201).json({
            success: true,
            message: "Vehicle created successfully",
            data: result.rows[0]
        })
    } catch (error) {
        res.status(404).json({
            message: "error",
            data: error
        })
    }
}


const getAllVehicles = async (req: Request, res: Response) => {
    try {
        const result = await vehicleServices.getAllVehicles()

        if (result.rows.length) {
            res.status(200).json({
                success: true,
                data: result.rows
            })
        }

        res.status(201).json({
            success: true,
            message: "No vehicles found",
            data: result.rows
        })

    } catch (error) {
        res.status(404).json({
            message: "something wrong",
            data: error
        })
    }
}


const getOneVehicles = async (req: Request, res: Response) => {

    try {
        const result = await vehicleServices.getOneVehicles(req.params.id);

        res.status(200).json({
            success: true,
            message: "vehicle retrieved successfully",
            data: result.rows[0],
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Something went wrong",
        });
    }
}



const UpdateVehicles = async (req: Request, res: Response) => {
    try {
        const result = await vehicleServices.UpdateVehicles(req.body, req.params.id)
        res.status(200).json({
            success: true,
            message: "Vehicle updated successfully",
            data: result.rows[0],
        });


    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Something went wrong",
        });
    }
}


const DeleteVehicles = async (req: Request, res: Response) => {
    try {
        const result1 = await vehicleServices.getOneVehicles(req.params.id)
        const { availability_status } = result1.rows[0]
        if (availability_status === 'booked') {
            res.status(404).json({
                message: "vehicles booked"
            })
        }
        else if (availability_status === "available") {
            const result2 = await vehicleServices.DeleteVehicles(req.params.id)

            res.status(200).json({
                success: true,
                message: "Vehicle deleted successfully"
            })
        }

    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Something went wrong",
        });
    }
}





export const vehiclesControllers = {
    createVehicles,
    getAllVehicles,
    getOneVehicles,
    UpdateVehicles,
    DeleteVehicles,
}