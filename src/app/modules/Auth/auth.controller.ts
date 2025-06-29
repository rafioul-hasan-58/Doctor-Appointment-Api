import { Request, Response } from "express"
import catchAsync from "../../utils/catchAsync"
import { authService } from "./auth.service"
import httpStatus from 'http-status'
import config from "../../config"

const registerDoctor = catchAsync(async (req: Request, res: Response) => {
    const result = await authService.registerDoctor(req.body);
    res.status(httpStatus.OK).json({
        success: true,
        message: 'Doctor registered successfully',
        statusCode: 201,
        data: result
    })
})
const registerPatient = catchAsync(async (req: Request, res: Response) => {
    const result = await authService.registerPatient(req.body);
    res.status(httpStatus.OK).json({
        success: true,
        message: 'Patient registered successfully',
        statusCode: 201,
        data: result
    })
})
const loginUser = catchAsync(async (req: Request, res: Response) => {
    const user = await authService.loginUser(req.body)
    const { refreshToken, accessToken } = user;
    res.cookie('refreshToken', refreshToken, {
        secure: config.NODE_ENV === 'production',
        httpOnly: true,
        sameSite: true,
        maxAge: 1000 * 60 * 60 * 24 * 365,
    });
    res.status(httpStatus.OK).json({
        success: true,
        statusCode: 200,
        message: "Login successful",
        data: {
            accessToken
        }
    })
})
export const authController = {
    registerDoctor,
    registerPatient,
    loginUser
}