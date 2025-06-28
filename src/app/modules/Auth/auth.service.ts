import { IDoctor } from "../Doctor/doctor.interface"
import { Doctor } from "../Doctor/doctor.model"
import bcrypt from 'bcrypt';
import { IAuthData } from "./auth.interface";
import mongoose from "mongoose";
import { User } from "../User/user.model";

const registerDoctor = async (payload: IDoctor) => {
    const { name, email, phone, password } = payload;
    // hashed password
    const hashedPassword = await bcrypt.hash(password, 10);
    // prepare userData
    const userData = {
        name,
        email,
        phone,
        password: hashedPassword,
        role: 'doctor'
    }
    // prepare doctorData
    const doctorData = { ...payload, password: hashedPassword };
    const session = await mongoose.startSession();
    try {
        session.startTransaction();
        const createdUser = await User.create([userData], { session });
        const createdDoctor = await Doctor.create([{ ...doctorData, user: createdUser[0]._id }], { session });

        await session.commitTransaction();
        session.endSession();
        return {
            user: createdUser[0],
            doctor: createdDoctor[0]
        }
    }
    catch (err) {
        await session.abortTransaction();
        session.endSession();
        throw err
    }
}

// const login = async (payload: IAuthData) => {
//     const user = await User.isUserExistsByEmail(payload.email)

//     // console.log((user._id).toString());
//     if (!user) {
//         throw new AppError(httpStatus.NOT_FOUND, 'User not found')
//     }
//     if (user?.isBlocked) {
//         throw new AppError(httpStatus.FORBIDDEN, 'User is blocked')
//     }

//     if (!(await User.isPasswordMatched(payload?.password, user?.password))) {
//         throw new AppError(httpStatus.FORBIDDEN, 'Password not matched')
//     }

//     const jwtPayload = {
//         email: user.email,
//         role: user.role,
//     }
//     const accessToken = createToken(
//         jwtPayload,
//         config.jwt_access_secret as string,
//         config.jwt_access_expires_in as `${number}s` | `${number}m` | `${number}h` | `${number}d`
//     );



//     return {
//         accessToken,
//         refreshToken
//     }


// }

export const authService = {
    registerDoctor,
}