"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.doctorRouter = void 0;
const express_1 = require("express");
const doctor_controller_1 = require("./doctor.controller");
const auth_1 = __importDefault(require("../../middleware/auth"));
const router = (0, express_1.Router)();
router.get('/', (0, auth_1.default)(['patient']), doctor_controller_1.doctorController.getAllDoctors);
router.get('/:id', (0, auth_1.default)(['patient']), doctor_controller_1.doctorController.getSingleDoctor);
exports.doctorRouter = router;
