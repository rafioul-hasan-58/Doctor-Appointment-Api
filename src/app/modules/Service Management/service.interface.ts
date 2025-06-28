import { Types } from "mongoose";


export interface IService {
    title: string;
    description: string;
    price: number;
    duration: number; // in minutes
    doctor: Types.ObjectId;
}
