import { Doctor } from "./doctor.model"

const getAllDoctors = async () => {
    const result = await Doctor.find();
    return result
}


export const doctorServices = {
    getAllDoctors
}