import AppError from "../../errors/AppError";
import { IAuthUser } from "../Auth/auth.interface";
import { IAvailability, IService } from "./service.interface";
import { Service } from "./service.model";
import httpStatus from 'http-status'

const isOverlapOrDuplicate = (existingSlots: string[], newSlots: string[]): boolean => {
    return newSlots.some(slot => existingSlots.includes(slot));
}
const createDoctorService = async (payload: IService, user: IAuthUser) => {
    const result = await Service.create({ ...payload, doctor: user.userId });
    return result
}

const editDoctorService = async (id: string, payload: Partial<IService>) => {
    const result = await Service.findByIdAndUpdate(id, payload, { new: true });
    return result
}
const addDoctorAvailability = async (
    id: string,
    newAvailability: IAvailability
) => {
    const service = await Service.findById(id);
    if (!service) throw new Error('Service not found');

    const currentAvailability: IAvailability = service.availability || {};

    for (const day of Object.keys(newAvailability)) {
        const newSlots = newAvailability[day];
        const existingSlots = currentAvailability[day] || [];

        console.log("Day:", day);
        console.log("Existing Slots:", currentAvailability[day]);
        console.log("New Slots:", newSlots);

        if (isOverlapOrDuplicate(existingSlots, newSlots)) {
            throw new AppError(
                httpStatus.NOT_ACCEPTABLE,
                `Time slot(s) already exist for ${day}`
            );
        }

        // Merge new slots into existing ones
        currentAvailability[day] = [...existingSlots, ...newSlots]
    }
    service.availability = currentAvailability;
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
    createDoctorService,
    editDoctorService,
    deleteDoctorService,
    getAllServices,
    addDoctorAvailability
}