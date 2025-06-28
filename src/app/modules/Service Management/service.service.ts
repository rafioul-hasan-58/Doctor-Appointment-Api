import { IService } from "./service.interface";
import { Service } from "./service.model";

const createDoctorService = async (payload: IService) => {
    const result = await Service.create(payload);
    return result
}


export const serviceManagementServices = {
    createDoctorService
}