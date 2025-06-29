import AppError from "../../errors/AppError";
import { IAuthUser } from "../Auth/auth.interface";
import { Doctor } from "../Doctor/doctor.model";
import { IAvailability, IService } from "./service.interface";
import { Service } from "./service.model";
import httpStatus from 'http-status'

const isOverlapOrDuplicate = (existingSlots: string[], newSlots: string[]): boolean => {
    return newSlots.some(slot => existingSlots.includes(slot));
}
const addDoctorService = async (payload: IService, user: IAuthUser) => {
    // Find the doctor by the userId
    const doctor = await Doctor.findOne({ user: user.userId });
    if (!doctor) {
        throw new Error('Doctor profile not found for this user');
    }
    const result = await Service.create({ ...payload, doctor: doctor._id });
    return result
}

const editDoctorService = async (id: string, payload: Partial<IService>) => {
    const result = await Service.findByIdAndUpdate(id, payload, { new: true });
    return result
}
const setServiceAvailability = async (
    id: string,
    newAvailability: IAvailability
) => {
    const service = await Service.findById(id);
    if (!service) throw new Error('Service not found');

    const currentAvailability: IAvailability = service.availability || {};

    for (const day of Object.keys(newAvailability)) {
        const newSlots = newAvailability[day];
        const existingSlots = currentAvailability[day] || [];

        if (isOverlapOrDuplicate(existingSlots, newSlots)) {
            throw new AppError(
                httpStatus.NOT_ACCEPTABLE,
                `Time slot(s) already exist for ${day}`
            );
        }

        // Merge new slots into existing ones
        currentAvailability[day] = [...existingSlots, ...newSlots];
    }
    service.availability = currentAvailability;
    service.markModified('availability');
    const updatedService = await service.save();
    return updatedService

};

const deleteDoctorService = async (id: string) => {
    const result = await Service.findByIdAndDelete(id);
    return result
}
const getAllServices = async () => {
    const result = await Service.find();
    return result
}
export const serviceManagementServices = {
    addDoctorService,
    editDoctorService,
    deleteDoctorService,
    getAllServices,
    setServiceAvailability
}