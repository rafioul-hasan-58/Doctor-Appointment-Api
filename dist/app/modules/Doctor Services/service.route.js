"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.serviceRouter = void 0;
const express_1 = require("express");
const service_controller_1 = require("./service.controller");
const auth_1 = __importDefault(require("../../middleware/auth"));
const router = (0, express_1.Router)();
router.post('/', (0, auth_1.default)(['doctor']), service_controller_1.serviceController.addDoctorService);
router.get('/', (0, auth_1.default)(['doctor']), service_controller_1.serviceController.getAllServices);
router.patch('/:id', (0, auth_1.default)(['doctor']), service_controller_1.serviceController.editDoctorService);
router.patch('/:id/set-availablity', (0, auth_1.default)(['doctor']), service_controller_1.serviceController.setServiceAvailability);
router.delete('/:id', (0, auth_1.default)(['doctor']), service_controller_1.serviceController.deleteDoctorService);
exports.serviceRouter = router;
