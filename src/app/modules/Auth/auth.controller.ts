import { Request, Response } from "express"
import catchAsync from "../../utils/catchAsync"
import { authService } from "./auth.service"
import httpStatus from 'http-status'

const registerDoctor = catchAsync(async (req: Request, res: Response) => {
    const result = await authService.registerDoctor(req.body);
    res.status(httpStatus.OK).json({
        success: true,
        message: 'Doctor registered successfully',
        statusCode: 201,
        data: result
    })
})

export const authController = {
    registerDoctor
}