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
const cookie_parser_1 = __importDefault(require("cookie-parser"));
const express_1 = __importDefault(require("express"));
const globalErrorHandler_1 = __importDefault(require("./app/middleware/globalErrorHandler"));
const routes_1 = __importDefault(require("./app/routes"));
const appointment_controller_1 = require("./app/modules/Appointment/appointment.controller");
const auth_1 = __importDefault(require("./app/middleware/auth"));
const app = (0, express_1.default)();
// parser
app.use(express_1.default.json());
app.use((0, cookie_parser_1.default)());
// routes
app.use('/', routes_1.default);
app.get('/doctor/appointments', (0, auth_1.default)(['doctor']), appointment_controller_1.appointmentController.getDoctorAppointments);
app.get('/doctor/appointments/:id', appointment_controller_1.appointmentController.getSingleAppointment);
app.patch('/doctor/appointments/:id/status', (0, auth_1.default)(['doctor']), appointment_controller_1.appointmentController.changeAppointmentStatus);
app.get('/patient/appointments', (0, auth_1.default)(['patient']), appointment_controller_1.appointmentController.getPatientAppointments);
// testing
const test = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    res.send('Server Is Running!!!');
});
app.get('/', test);
app.use(globalErrorHandler_1.default);
// app.use('*', notFoundPage);
exports.default = app;
