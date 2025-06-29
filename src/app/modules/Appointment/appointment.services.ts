import AppError from "../../errors/AppError";
import { IAuthUser } from "../Auth/auth.interface";
import { Doctor } from "../Doctor/doctor.model";
import { Service } from "../Service Management/service.model";
import { IAppointment } from "./appointment.interface"
import { Appointment } from "./appointment.model"
import httpStatus from 'http-status'

const makeAppointment = async (payload: IAppointment, patient: IAuthUser) => {
    const { doctorId, serviceId, selectedDate, timeSlot } = payload;

    const service = await Service.findById(serviceId);
    if (!service) {
        throw new AppError(httpStatus.NOT_FOUND, 'Service not found!');
    }
    const doctor = await Doctor.findById(doctorId);
    if (!doctor) {
        throw new AppError(httpStatus.NOT_FOUND, 'Doctor not found!');
    }
    const dayOfWeek = new Date(selectedDate).toLocaleDateString('en-US', { weekday: 'long' });

    const availableSlots = service.availability?.[dayOfWeek] || [];
    if (!availableSlots.includes(timeSlot)) {
        throw new AppError(400, `Selected time slot is not available on ${dayOfWeek}`);
    }
    console.log(availableSlots);

    const existingAppoitment = await Appointment.findOne({
        doctorId,
        serviceId,
        selectedDate,
        timeSlot,
        status: { $in: ['pending', 'accepted'] }
    });

    if (existingAppoitment) {
        throw new AppError(httpStatus.NOT_ACCEPTABLE, 'Time slot already booked')
    }

    const newAppointment = await Appointment.create({ ...payload, status: 'pending', patientId: patient.userId })
    return newAppointment
}
const getAllAppointmets = async (filters?: { status?: string }) => {
    const query: { [key: string]: any } = {};
    if (filters?.status) {
        query.status = filters.status;
    }
    const result = await Appointment.find(query);
    return result;
}

export const appointmentServices = {
    makeAppointment,
    getAllAppointmets

}