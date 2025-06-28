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

export const serviceController = {
    createDoctorService
}