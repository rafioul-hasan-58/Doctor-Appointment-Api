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
exports.appointmentController = void 0;
const catchAsync_1 = __importDefault(require("../../utils/catchAsync"));
const appointment_services_1 = require("./appointment.services");
const http_status_1 = __importDefault(require("http-status"));
const bookAppointment = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield appointment_services_1.appointmentServices.bookAppointment(req.body, req.user);
    res.status(http_status_1.default.OK).json({
        success: true,
        message: 'Appointment booked successfully.',
        statusCode: 201,
        data: result
    });
}));
const getDoctorAppointments = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield appointment_services_1.appointmentServices.getDoctorAppointments(req.user, req.query);
    res.status(http_status_1.default.OK).json({
        success: true,
        message: 'Appointments fetched successfully.',
        statusCode: 201,
        data: result
    });
}));
const getSingleAppointment = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    console.log(req.params.id);
    const result = yield appointment_services_1.appointmentServices.getSingleAppointment(req.params.id);
    res.status(http_status_1.default.OK).json({
        success: true,
        message: 'Appointment retrived successfully',
        statusCode: 201,
        data: result
    });
}));
const changeAppointmentStatus = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield appointment_services_1.appointmentServices.changeAppointmentStatus(req.params.id, req.body.status);
    res.status(http_status_1.default.OK).json({
        success: true,
        message: 'Appointment status updated.',
        statusCode: 201,
        data: result
    });
}));
const getPatientAppointments = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield appointment_services_1.appointmentServices.getPatientAppointments(req.user);
    res.status(http_status_1.default.OK).json({
        success: true,
        message: 'Your appointments fetched successfully.',
        statusCode: 201,
        data: result
    });
}));
exports.appointmentController = {
    bookAppointment,
    getDoctorAppointments,
    getSingleAppointment,
    changeAppointmentStatus,
    getPatientAppointments
};
