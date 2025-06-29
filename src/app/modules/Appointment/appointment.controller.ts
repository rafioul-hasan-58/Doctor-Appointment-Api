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
const getSingleAppointment = catchAsync(async (req: Request, res: Response) => {
    console.log(req.params.id);
    const result = await appointmentServices.getSingleAppointment(req.params.id);
    res.status(httpStatus.OK).json({
        success: true,
        message: 'Appointment retrived successfully',
        statusCode: 201,
        data: result
    })
})
const changeAppointmentStatus = catchAsync(async (req: Request, res: Response) => {
    const result = await appointmentServices.changeAppointmentStatus(req.params.id, req.body.status);
    res.status(httpStatus.OK).json({
        success: true,
        message: 'Appointment status changed',
        statusCode: 201,
        data: result
    })
})
const getPatientAppointments = catchAsync(async (req: Request & { user?: IAuthUser }, res: Response) => {
    const result = await appointmentServices.getPatientAppointments(req.user as IAuthUser);
    res.status(httpStatus.OK).json({
        success: true,
        message: 'Patient appointment retrived',
        statusCode: 201,
        data: result
    })
})
export const appointmentController = {
    makeAppointment,
    getAllAppointments,
    getSingleAppointment,
    changeAppointmentStatus,
    getPatientAppointments
}