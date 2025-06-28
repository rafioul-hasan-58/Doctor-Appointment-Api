import { Types } from "mongoose";

export interface IDoctor {
  name: string;
  email: string;
  phone: string;
  password: string;
  specialization: string;
  hospitalName: string;
  hospitalFloor: number;
  user: Types.ObjectId;
}
