import { IAuthUser } from "../Auth/auth.interface";
import { IService } from "./service.interface";
import { Service } from "./service.model";

const createDoctorService = async (payload: IService, user: IAuthUser) => {
    const result = await Service.create({ ...payload, doctor: user.userId });
    return result
}


export const serviceManagementServices = {
    createDoctorService
}