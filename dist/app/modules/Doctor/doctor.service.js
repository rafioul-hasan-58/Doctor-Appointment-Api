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
exports.doctorServices = void 0;
const AppError_1 = __importDefault(require("../../errors/AppError"));
const service_model_1 = require("../Doctor Services/service.model");
const doctor_model_1 = require("./doctor.model");
const http_status_1 = __importDefault(require("http-status"));
const getAllDoctors = (filters) => __awaiter(void 0, void 0, void 0, function* () {
    const query = {};
    if (filters === null || filters === void 0 ? void 0 : filters.hospital) {
        query.hospitalName = filters.hospital;
    }
    if (filters === null || filters === void 0 ? void 0 : filters.specialization) {
        query.specialization = filters.specialization;
    }
    if (filters === null || filters === void 0 ? void 0 : filters.service) {
        const matchingServices = yield service_model_1.Service.find({
            title: { $regex: filters.service, $options: 'i' }
        }).select('doctor');
        const matchingDoctorIds = matchingServices.map(service => service.doctor);
        if (matchingDoctorIds.length === 0) {
            return [];
        }
        query._id = { $in: matchingDoctorIds };
    }
    const result = yield doctor_model_1.Doctor.find(query);
    return result;
});
const getSingleDoctor = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield doctor_model_1.Doctor.findById(id);
    if (!result) {
        throw new AppError_1.default(http_status_1.default.NOT_FOUND, 'Doctor not found');
    }
    return result;
});
exports.doctorServices = {
    getAllDoctors,
    getSingleDoctor
};
