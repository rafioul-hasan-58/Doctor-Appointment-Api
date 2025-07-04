"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.appointmentRouter = void 0;
const express_1 = require("express");
const appointment_controller_1 = require("./appointment.controller");
const auth_1 = __importDefault(require("../../middleware/auth"));
const validateRequest_1 = __importDefault(require("../../middleware/validateRequest"));
const appointment_validation_1 = require("./appointment.validation");
const router = (0, express_1.Router)();
router.post('/', (0, auth_1.default)(['patient']), (0, validateRequest_1.default)(appointment_validation_1.appointmentValidationSchema), appointment_controller_1.appointmentController.bookAppointment);
exports.appointmentRouter = router;
