import AppError from "../../errors/AppError";
import { Appointment } from "../Appointment/appointment.model";
import { Service } from "../Doctor Services/service.model";
import { Doctor } from "./doctor.model"
import httpStatus from 'http-status'

const getAllDoctors = async (filters?: { hospital?: string, specialization?: string, service?: string }) => {
    const query: any = {};
    if (filters?.hospital) {
        query.hospitalName = filters.hospital
    }
    if (filters?.specialization) {
        query.specialization = filters.specialization
    }
    if (filters?.service) {
        const matchingServices = await Service.find({
            title: { $regex: filters.service, $options: 'i' }
        }).select('doctor');
        const matchingDoctorIds = matchingServices.map(service => service.doctor);

        if (matchingDoctorIds.length === 0) {
            return [];
        }

        query._id = { $in: matchingDoctorIds };
    }

    const result = await Doctor.find(query);
    console.log(query);
    return result
}

const getSingleDoctor = async (id: string) => {
    const result = await Doctor.findById(id);
    if (!result) {
        throw new AppError(httpStatus.NOT_FOUND, 'Doctor not found')
    }
    return result
}


export const doctorServices = {
    getAllDoctors,
    getSingleDoctor
}