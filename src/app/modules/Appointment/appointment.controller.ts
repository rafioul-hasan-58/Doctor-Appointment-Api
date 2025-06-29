import { Request, Response } from "express";
import catchAsync from "../../utils/catchAsync";
import { appointmentServices } from "./appointment.services";
import httpStatus from 'http-status'
import { IAuthUser } from "../Auth/auth.interface";




const bookAppointment = catchAsync(async (req: Request & { user?: IAuthUser }, res: Response) => {
    const result = await appointmentServices.bookAppointment(req.body, req.user as IAuthUser);
    res.status(httpStatus.OK).json({
        success: true,
        message: 'Appointment booked successfully.',
        statusCode: 201,
        data: result
    })
})
const getDoctorAppointments= catchAsync(async (req: Request & { user?: IAuthUser }, res: Response) => {
    const result = await appointmentServices.getDoctorAppointments(req.user as IAuthUser,req.query);
    res.status(httpStatus.OK).json({
        success: true,
        message: 'Appointments fetched successfully.',
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
        message: 'Appointment status updated.',
        statusCode: 201,
        data: result
    })
})
const getPatientAppointments = catchAsync(async (req: Request & { user?: IAuthUser }, res: Response) => {
    const result = await appointmentServices.getPatientAppointments(req.user as IAuthUser);
    res.status(httpStatus.OK).json({
        success: true,
        message: 'Your appointments fetched successfully.',
        statusCode: 201,
        data: result
    })
})
export const appointmentController = {
    bookAppointment,
    getDoctorAppointments,
    getSingleAppointment,
    changeAppointmentStatus,
    getPatientAppointments
}