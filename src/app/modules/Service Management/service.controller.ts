import { Request, Response } from "express";
import catchAsync from "../../utils/catchAsync";
import httpStatus from 'http-status'
import { serviceManagementServices } from "./service.service";
import { IAuthUser } from "../Auth/auth.interface";


const createDoctorService = catchAsync(async (req: Request & { user?: IAuthUser }, res: Response) => {
    const result = await serviceManagementServices.createDoctorService(req.body, req.user as IAuthUser);
    res.status(httpStatus.OK).json({
        success: true,
        message: 'Service added successfully',
        statusCode: 201,
        data: result
    })
})
const editDoctorService = catchAsync(async (req: Request, res: Response) => {
    const result = await serviceManagementServices.editDoctorService(req.params.id, req.body);
    res.status(httpStatus.OK).json({
        success: true,
        message: 'Service edited successfully',
        statusCode: 201,
        data: result
    })
})
const addDoctorAvailablity = catchAsync(async (req: Request, res: Response) => {
    const result = await serviceManagementServices.addDoctorAvailability(req.params.id, req.body.availability);
    res.status(httpStatus.OK).json({
        success: true,
        message: 'Availablity edited successfully',
        statusCode: 201,
        data: result
    })
})
const deleteDoctorService = catchAsync(async (req: Request, res: Response) => {
    const result = await serviceManagementServices.deleteDoctorService(req.params.id);
    res.status(httpStatus.OK).json({
        success: true,
        message: 'Service deleted successfully',
        statusCode: 201,
        data: result
    })
})
const getAllServices = catchAsync(async (req: Request, res: Response) => {
    const result = await serviceManagementServices.getAllServices();
    res.status(httpStatus.OK).json({
        success: true,
        message: 'All services fetched successfully',
        statusCode: 201,
        data: result
    })
})

export const serviceController = {
    createDoctorService,
    editDoctorService,
    deleteDoctorService,
    getAllServices,
    addDoctorAvailablity
}