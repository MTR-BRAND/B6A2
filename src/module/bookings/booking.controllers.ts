import { Request, Response } from "express";
import { vehicleServices } from "../vehicles/vehicles.services";
import { pool } from "../../config/db";
import { BookingServices } from "./booking.services";
import { userServices } from "../user/user.services";

const createBooking = async (req: Request, res: Response) => {
    try {
        const { customer_id, vehicle_id, rent_start_date, rent_end_date, status } = req.body
        const users = await userServices.getOne(customer_id)
        const { name, email } = users.rows[0]
        const vehicleData = await vehicleServices.getOneVehicles(vehicle_id)
        const { vehicle_name, daily_rent_price, type } = vehicleData.rows[0]
        const Availability_status = vehicleData.rows[0].availability_status



        if (Availability_status === "booked") {
            res.status(404).json({
                message: "vehicles are booked"
            })
        }

        if (new Date(rent_start_date) > new Date(rent_end_date)) {
            return res.status(404).json({
                message: "your date is not valided"
            })
        }

        if (req.user?.id === customer_id && req.user?.role === "customer" || req.user?.role === "admin") {


            const startDate = new Date(rent_start_date)
            const EndDate = new Date(rent_end_date)
            const MS = EndDate.getTime() - startDate.getTime();
            const Day = MS / (1000 * 60 * 60 * 24);
            const total = Day * daily_rent_price
            const reslut = await BookingServices.createBooking(req.body, name, email, vehicle_name, daily_rent_price, total, type)


            const alldata = {
                id: reslut.rows[0].id,
                customer_id: reslut.rows[0].customer_id,
                vehicle_id: reslut.rows[0].vehicle_id,
                rent_start_date: reslut.rows[0].rent_start_date,
                rent_end_date: reslut.rows[0].rent_end_date,
                total: Day * reslut.rows[0].daily_rent_price,
                status: reslut.rows[0].status,
                vehicle: {
                    vehicle_name: reslut.rows[0].vehicle_name,
                    daily_rent_price: reslut.rows[0].daily_rent_price,
                    type: reslut.rows[0].type
                }
            }



            if (alldata.status === "active") {
                const result = await vehicleServices.BookedUpdate(vehicle_id)
            }


            res.status(200).json({
                success: true,
                message: "Booking created successfully",
                data: alldata
            })


        } else {
            res.status(400).json({
                message: "you id not match plz chack you id"
            })
        }


    } catch (error) {
        res.status(404).json({
            message: "please chack your id and chack vehicles id"
        })
    }
}


const getAllBooking = async (req: Request, res: Response) => {
    try {
        const result = await BookingServices.getAllBooking()


        if (req.user?.role === "admin") {
            res.status(200).json({
                success: true,
                message: "Bookings retrieved successfully",
                data: result.rows.map((item) => {
                    return {
                        id : item.id,
                        customer_id: item.customer_id,
                        vehicle_id: item.vehicle_id,
                        rent_start_date: item.rent_start_date,
                        rent_end_date: item.rent_end_date,
                        total: item.total,
                        status: item.status,
                        customer: {
                            name: item.name,
                            email: item.email
                        },
                        vehicle: {
                            vehicle_name: item.vehicle_name,
                            daily_rent_price: item.daily_rent_price,
                        }
                    }

                })
            })
        }
        else if (req.user?.role === "customer") {
            const filteredBookings = result.rows.filter(item => item.customer_id === req.user?.id).map(item => {
                return {
                    id : item.id,
                    customer_id: item.customer_id,
                    vehicle_id: item.vehicle_id,
                    rent_start_date: item.rent_start_date,
                    rent_end_date: item.rent_end_date,
                    total: item.total,
                    status: item.status,
                    vehicle: {
                        vehicle_name: item.vehicle_name,
                        daily_rent_price: item.daily_rent_price,
                        type: item.type
                    }
                }
            })



            res.status(200).json({
                success: true,
                message: "Your bookings retrieved successfully",
                data: filteredBookings
            })
        }


    } catch (error) {
        res.status(404).json({
            success: true,
            data: error
        })
    }
}


const StatusUpdate = async (req: Request, res: Response) => {
    try {

        const bookingData = await BookingServices.getOne(req.params.id)


        // customer

        if (new Date() < new Date(bookingData.rows[0].rent_start_date)) {

            if (req.user?.role === "customer" && req.body.status === "cancelled" && bookingData.rows[0].customer_id === req.user?.id) {
                const reslut = await BookingServices.StatusUpdate(req.body.status, req.params.id)
                res.status(200).json({
                    success: true,
                    message: "Booking cancelled successfully",
                    data: {
                        id: reslut.rows[0].id,
                        customer_id: reslut.rows[0].customer_id,
                        vehicle_id: reslut.rows[0].vehicle_id,
                        rent_start_date: reslut.rows[0].rent_start_date,
                        rent_end_date: reslut.rows[0].rent_end_date,
                        total_price: reslut.rows[0].total,
                        status: reslut.rows[0].status
                    }
                })

            }

        }





        if (req.user?.role === "admin" && req.body.status === "returned") {
            const bookingData = await BookingServices.getOne(req.params.id)

            const vehicleStatus = await vehicleServices.AvailableUpdate(bookingData.rows[0].vehicle_id)
            const reslut = await BookingServices.StatusUpdate(req.body.status, req.params.id)
            res.status(200).json({
                success: true,
                message: "Booking returned successfully",
                data: {
                    id: reslut.rows[0].id,
                    customer_id: reslut.rows[0].customer_id,
                    vehicle_id: reslut.rows[0].vehicle_id,
                    rent_start_date: reslut.rows[0].rent_start_date,
                    rent_end_date: reslut.rows[0].rent_end_date,
                    total_price: reslut.rows[0].total,
                    status: reslut.rows[0].status,
                    vehicle: {
                        availability_status: vehicleStatus.rows[0].availability_status
                    }
                }
            })
        }
        else {
            res.status(404).json({
                message: `You are not change others booking status. please chack your Id and booking list or status type And check --(Date)--`,
            })
        }





    } catch (error) {
        res.status(404).json({
            message: error
        })
    }
}





export const BookingControllers = {
    createBooking,
    getAllBooking,
    StatusUpdate

}