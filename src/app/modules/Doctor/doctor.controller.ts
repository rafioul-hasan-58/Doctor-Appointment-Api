import { Request, Response } from "express";
import catchAsync from "../../utils/catchAsync";
import { doctorServices } from "./doctor.service";
import httpStatus from 'http-status'

const getAllDoctors = catchAsync(async (req: Request, res: Response) => {
    const result = await doctorServices.getAllDoctors(req.query);
    res.status(httpStatus.OK).json({
        success: true,
        message: 'Doctors fetched successfully.',
        statusCode: 201,
        data: result
    })
})
const getSingleDoctor = catchAsync(async (req: Request, res: Response) => {
    const result = await doctorServices.getSingleDoctor(req.params.id);
    res.status(httpStatus.OK).json({
        success: true,
        message: 'Doctor profile fetched.',
        statusCode: 201,
        data: result
    })
})

export const doctorController = {
    getAllDoctors,
    getSingleDoctor
}