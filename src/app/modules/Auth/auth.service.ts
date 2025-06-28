import config from "../../config";
import { IDoctor } from "../Doctor/doctor.interface"
import { Doctor } from "../Doctor/doctor.model"
import bcrypt from 'bcrypt';

const registerDoctor = async (payload: IDoctor) => {
    const hashedPassword = await bcrypt.hash(payload.password, 10);
    const result = await Doctor.create({ ...payload, password: hashedPassword });
    return result
}


export const authService = {
    registerDoctor
}