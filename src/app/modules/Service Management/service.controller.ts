import { Request, Response } from "express";
import catchAsync from "../../utils/catchAsync";
import httpStatus from 'http-status'
import { serviceManagementServices } from "./service.service";


const createDoctorService = catchAsync(async (req: Request, res: Response) => {
    const result = await serviceManagementServices.createDoctorService(req.body);
    res.status(httpStatus.OK).json({
        success: true,
        message: 'Service added successfully',
        statusCode: 201,
        data: result
    })
})

export const serviceController = {
    createDoctorService
}