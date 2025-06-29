import { Types } from "mongoose";
export interface IAvailability {
    [day: string]: string[];
}


export interface IService {
    title: string;
    description: string;
    price: number;
    duration: number; // in minutes
    doctor: Types.ObjectId;
    availability: IAvailability
}
