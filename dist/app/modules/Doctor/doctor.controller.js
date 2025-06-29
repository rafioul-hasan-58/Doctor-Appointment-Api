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
exports.doctorController = void 0;
const catchAsync_1 = __importDefault(require("../../utils/catchAsync"));
const doctor_service_1 = require("./doctor.service");
const http_status_1 = __importDefault(require("http-status"));
const getAllDoctors = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield doctor_service_1.doctorServices.getAllDoctors(req.query);
    res.status(http_status_1.default.OK).json({
        success: true,
        message: 'Doctors fetched successfully.',
        statusCode: 201,
        data: result
    });
}));
const getSingleDoctor = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield doctor_service_1.doctorServices.getSingleDoctor(req.params.id);
    res.status(http_status_1.default.OK).json({
        success: true,
        message: 'Doctor profile fetched.',
        statusCode: 201,
        data: result
    });
}));
exports.doctorController = {
    getAllDoctors,
    getSingleDoctor
};
