import { Schema, model } from 'mongoose';
import { IPatient } from './patient.interface';

const patientSchema = new Schema<IPatient>(
    {
        name: {
            type: String,
            required: true,
            trim: true
        },
        email: {
            type: String,
            required: true,
            unique: true,
            lowercase: true
        },
        phone: {
            type: String,
            required: true,
            unique: true
        },
        password: {
            type: String,
            required: true
        },
        age: {
            type: Number,
            required: true,
            min: 0
        },
        gender: {
            type: String,
            enum: ['male', 'female', 'other'],
            required: true
        }
    },
    {
        timestamps: true
    }
);

export const Patient = model<IPatient>('Patient', patientSchema);
