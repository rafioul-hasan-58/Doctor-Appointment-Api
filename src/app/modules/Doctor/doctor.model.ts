import mongoose, { model, Schema } from "mongoose";
import { IDoctor } from "./doctor.interface";

const doctorSchema = new Schema<IDoctor>({
    name: {
        type: String,
        required: [true, "Name is required"],
    },
    email: {
        type: String,
        required: [true, "Email is required"],
        unique: true,
        lowercase: true,
    },
    phone: {
        type: String,
        required: [true, "Phone is required"],
    },
    password: {
        type: String,
        required: [true, "Password is required"],
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    specialization: {
        type: String,
        required: [true, "Specialization is required"],
    },
    hospitalName: {
        type: String,
        required: [true, "Hospital name is required"],
    },
    hospitalFloor: {
        type: Number,
        required: [true, "Hospital floor is required"],
    },
}, {
    timestamps: true,
});

export const Doctor = model<IDoctor>("Doctor", doctorSchema);
