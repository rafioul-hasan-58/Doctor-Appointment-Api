import { NextFunction, Request, Response } from "express"
import catchAsync from "../utils/catchAsync"
import jwt, { JwtPayload } from "jsonwebtoken"
import httpStatus from "http-status"
import AppError from "../errors/AppError"
import config from "../config"
import { User } from "../modules/User/user.model"
const auth = (requiredRole: string[]) => {
    return catchAsync(async (req: Request & { user?: any }, res: Response, next: NextFunction) => {
        const token = req.headers.authorization;
        // console.log(token,'token');
        if (!token) {
            throw new AppError(httpStatus.NOT_FOUND, "Token is not found")
        }

        const decoded = jwt.verify(token, config.jwt_access_secret as string) as JwtPayload;

        const { email, role } = decoded;
        // check if the user exists in the db
        const user = await User.findOne({ email })
        // console.log(user);
        if (!user) {
            throw new AppError(httpStatus.NOT_FOUND, 'User not found!');
        }
        // check if the user role is allowed to access the route
        if (requiredRole && !requiredRole.includes(role)) {
            throw new AppError(httpStatus.FORBIDDEN, 'You are not authorized!');
        }
        req.user = decoded as JwtPayload;
        next()
    })
}


export default auth;