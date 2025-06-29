import AppError from "../../errors/AppError";
import { IAuthUser } from "../Auth/auth.interface";
import { Doctor } from "../Doctor/doctor.model";
import { Service } from "../Doctor Services/service.model";
import { IAppointment } from "./appointment.interface"
import { Appointment } from "./appointment.model"
import httpStatus from 'http-status'

const bookAppointment = async (payload: IAppointment, patient: IAuthUser) => {
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
const getDoctorAppointments = async (filters?: { status?: string },user:IAuthUser) => {
    const query: { [key: string]: any } = {};
    if (filters?.status) {
        query.status = filters.status;
    }
    const result = await Appointment.find(query);
    return result;
}
const getSingleAppointment = async (id: string) => {
    const result = await Appointment.findById(id);
    return result
}
const changeAppointmentStatus = async (id: string, newStatus: string) => {
    const allowedTransitions: Record<string, string[]> = {
        pending: ['accepted', 'cancelled'],
        accepted: ['completed'],
        cancelled: [],
        completed: []
    };
    const appointment = await Appointment.findById(id);
    if (!appointment) {
        throw new AppError(httpStatus.NOT_FOUND, 'Appointment not found!');
    }

    const currentStatus = appointment.status;

    // 1. If same status → skip
    if (currentStatus === newStatus) {
        throw new AppError(httpStatus.BAD_REQUEST, `Appointment is already in '${newStatus}' status.`);
    }

    // 2. Check valid statuses
    const validStatuses = ['pending', 'accepted', 'cancelled', 'completed'];
    if (!validStatuses.includes(newStatus)) {
        throw new AppError(httpStatus.BAD_REQUEST, 'Invalid appointment status');
    }

    // 3. Validate transition
    const allowedNextStatuses = allowedTransitions[currentStatus];
    if (!allowedNextStatuses.includes(newStatus)) {
        throw new AppError(
            httpStatus.BAD_REQUEST,
            `Cannot change status from '${currentStatus}' to '${newStatus}'`
        );
    }

    // 4. Update status
    const result = await Appointment.findByIdAndUpdate(id, { status: newStatus }, { new: true });
    return result;
};
const getPatientAppointments = async (user:IAuthUser) => {
    const result = await Appointment.find({ patientId:user.userId });
    return result
}
export const appointmentServices = {
    bookAppointment,
    getDoctorAppointments,
    getSingleAppointment,
    changeAppointmentStatus,
    getPatientAppointments

}