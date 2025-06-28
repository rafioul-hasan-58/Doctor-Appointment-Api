import AppError from "../../errors/AppError";
import { Doctor } from "./doctor.model"
import httpStatus from 'http-status'

const getAllDoctors = async () => {
    const result = await Doctor.find();
    return result
}

const getSingleDoctor=async(id:string)=>{
    const result=await Doctor.findById(id);
    if(!result){
        throw new AppError(httpStatus.NOT_FOUND,'Doctor not found')
    }
    return result
}


export const doctorServices = {
    getAllDoctors,
    getSingleDoctor
}