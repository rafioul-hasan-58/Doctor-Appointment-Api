"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.appointmentServices = void 0;
const AppError_1 = __importDefault(require("../../errors/AppError"));
const doctor_model_1 = require("../Doctor/doctor.model");
const service_model_1 = require("../Doctor Services/service.model");
const appointment_model_1 = require("./appointment.model");
const http_status_1 = __importDefault(require("http-status"));
const bookAppointment = (payload, patient) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    const { doctorId, serviceId, selectedDate, timeSlot } = payload;
    const service = yield service_model_1.Service.findById(serviceId);
    if (!service) {
        throw new AppError_1.default(http_status_1.default.NOT_FOUND, 'Service not found!');
    }
    const doctor = yield doctor_model_1.Doctor.findById(doctorId);
    if (!doctor) {
        throw new AppError_1.default(http_status_1.default.NOT_FOUND, 'Doctor not found!');
    }
    const dayOfWeek = new Date(selectedDate).toLocaleDateString('en-US', { weekday: 'long' });
    const availableSlots = ((_a = service.availability) === null || _a === void 0 ? void 0 : _a[dayOfWeek]) || [];
    if (!availableSlots.includes(timeSlot)) {
        throw new AppError_1.default(400, `Selected time slot is not available on ${dayOfWeek}`);
    }
    console.log(availableSlots);
    const existingAppoitment = yield appointment_model_1.Appointment.findOne({
        doctorId,
        serviceId,
        selectedDate,
        timeSlot,
        status: { $in: ['pending', 'accepted'] }
    });
    if (existingAppoitment) {
        throw new AppError_1.default(http_status_1.default.NOT_ACCEPTABLE, 'Time slot already booked');
    }
    const newAppointment = yield appointment_model_1.Appointment.create(Object.assign(Object.assign({}, payload), { status: 'pending', patientId: patient.userId }));
    return newAppointment;
});
const getDoctorAppointments = (filters, user) => __awaiter(void 0, void 0, void 0, function* () {
    const query = {};
    if (filters === null || filters === void 0 ? void 0 : filters.status) {
        query.status = filters.status;
    }
    const result = yield appointment_model_1.Appointment.find(query);
    return result;
});
const getSingleAppointment = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield appointment_model_1.Appointment.findById(id);
    return result;
});
const changeAppointmentStatus = (id, newStatus) => __awaiter(void 0, void 0, void 0, function* () {
    const allowedTransitions = {
        pending: ['accepted', 'cancelled'],
        accepted: ['completed'],
        cancelled: [],
        completed: []
    };
    const appointment = yield appointment_model_1.Appointment.findById(id);
    if (!appointment) {
        throw new AppError_1.default(http_status_1.default.NOT_FOUND, 'Appointment not found!');
    }
    const currentStatus = appointment.status;
    // 1. If same status → skip
    if (currentStatus === newStatus) {
        throw new AppError_1.default(http_status_1.default.BAD_REQUEST, `Appointment is already in '${newStatus}' status.`);
    }
    // 2. Check valid statuses
    const validStatuses = ['pending', 'accepted', 'cancelled', 'completed'];
    if (!validStatuses.includes(newStatus)) {
        throw new AppError_1.default(http_status_1.default.BAD_REQUEST, 'Invalid appointment status');
    }
    // 3. Validate transition
    const allowedNextStatuses = allowedTransitions[currentStatus];
    if (!allowedNextStatuses.includes(newStatus)) {
        throw new AppError_1.default(http_status_1.default.BAD_REQUEST, `Cannot change status from '${currentStatus}' to '${newStatus}'`);
    }
    // 4. Update status
    const result = yield appointment_model_1.Appointment.findByIdAndUpdate(id, { status: newStatus }, { new: true });
    return result;
});
const getPatientAppointments = (user) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield appointment_model_1.Appointment.find({ patientId: user.userId });
    return result;
});
exports.appointmentServices = {
    bookAppointment,
    getDoctorAppointments,
    getSingleAppointment,
    changeAppointmentStatus,
    getPatientAppointments
};
