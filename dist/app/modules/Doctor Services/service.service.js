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
exports.serviceManagementServices = void 0;
const AppError_1 = __importDefault(require("../../errors/AppError"));
const service_model_1 = require("./service.model");
const http_status_1 = __importDefault(require("http-status"));
const isOverlapOrDuplicate = (existingSlots, newSlots) => {
    return newSlots.some(slot => existingSlots.includes(slot));
};
const addDoctorService = (payload, user) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield service_model_1.Service.create(Object.assign(Object.assign({}, payload), { doctor: user.userId }));
    return result;
});
const editDoctorService = (id, payload) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield service_model_1.Service.findByIdAndUpdate(id, payload, { new: true });
    return result;
});
const setServiceAvailability = (id, newAvailability) => __awaiter(void 0, void 0, void 0, function* () {
    const service = yield service_model_1.Service.findById(id);
    if (!service)
        throw new Error('Service not found');
    const currentAvailability = service.availability || {};
    for (const day of Object.keys(newAvailability)) {
        const newSlots = newAvailability[day];
        const existingSlots = currentAvailability[day] || [];
        if (isOverlapOrDuplicate(existingSlots, newSlots)) {
            throw new AppError_1.default(http_status_1.default.NOT_ACCEPTABLE, `Time slot(s) already exist for ${day}`);
        }
        // Merge new slots into existing ones
        currentAvailability[day] = [...existingSlots, ...newSlots];
    }
    service.availability = currentAvailability;
    service.markModified('availability');
    const updatedService = yield service.save();
    return updatedService;
});
const deleteDoctorService = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield service_model_1.Service.findByIdAndDelete(id);
    return result;
});
const getAllServices = () => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield service_model_1.Service.find();
    return result;
});
exports.serviceManagementServices = {
    addDoctorService,
    editDoctorService,
    deleteDoctorService,
    getAllServices,
    setServiceAvailability
};
