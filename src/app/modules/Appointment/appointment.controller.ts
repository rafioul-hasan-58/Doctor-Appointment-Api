import { Request, Response } from "express";
import catchAsync from "../../utils/catchAsync";
import { appointmentServices } from "./appointment.services";
import httpStatus from 'http-status'
import { IAuthUser } from "../Auth/auth.interface";




const makeAppointment = catchAsync(async (req: Request & { user?: IAuthUser }, res: Response) => {
    const result = await appointmentServices.makeAppointment(req.body, req.user as IAuthUser);
    res.status(httpStatus.OK).json({
        success: true,
        message: 'Appointment created successfully',
        statusCode: 201,
        data: result
    })
})
const getAllAppointments = catchAsync(async (req: Request & { user?: IAuthUser }, res: Response) => {
    const result = await appointmentServices.getAllAppointmets(req.query);
    res.status(httpStatus.OK).json({
        success: true,
        message: 'Appointments retrived successfully',
        statusCode: 201,
        data: result
    })
})
export const appointmentController = {
    makeAppointment,
    getAllAppointments
}