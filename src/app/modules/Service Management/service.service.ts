import { IAuthUser } from "../Auth/auth.interface";
import { IService } from "./service.interface";
import { Service } from "./service.model";

const createDoctorService = async (payload: IService, user: IAuthUser) => {
    const result = await Service.create({ ...payload, doctor: user.userId });
    return result
}

const editDoctorService = async (id: string, payload: Partial<IService>) => {
    const result = await Service.findByIdAndUpdate(id, payload,{new:true});
    return result
}

export const serviceManagementServices = {
    createDoctorService,
    editDoctorService
}