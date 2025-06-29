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
exports.serviceController = void 0;
const catchAsync_1 = __importDefault(require("../../utils/catchAsync"));
const http_status_1 = __importDefault(require("http-status"));
const service_service_1 = require("./service.service");
const addDoctorService = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield service_service_1.serviceManagementServices.addDoctorService(req.body, req.user);
    res.status(http_status_1.default.OK).json({
        success: true,
        message: 'Service added successfully',
        statusCode: 201,
        data: result
    });
}));
const editDoctorService = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield service_service_1.serviceManagementServices.editDoctorService(req.params.id, req.body);
    res.status(http_status_1.default.OK).json({
        success: true,
        message: 'Service updated successfully',
        statusCode: 201,
        data: result
    });
}));
const setServiceAvailability = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield service_service_1.serviceManagementServices.setServiceAvailability(req.params.id, req.body.availability);
    res.status(http_status_1.default.OK).json({
        success: true,
        message: 'Availability updated successfully.',
        statusCode: 201,
        data: result
    });
}));
const deleteDoctorService = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield service_service_1.serviceManagementServices.deleteDoctorService(req.params.id);
    res.status(http_status_1.default.OK).json({
        success: true,
        message: 'Service deleted successfully',
        statusCode: 201,
        data: result
    });
}));
const getAllServices = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield service_service_1.serviceManagementServices.getAllServices();
    res.status(http_status_1.default.OK).json({
        success: true,
        message: 'All services fetched successfully',
        statusCode: 201,
        data: result
    });
}));
exports.serviceController = {
    addDoctorService,
    editDoctorService,
    deleteDoctorService,
    getAllServices,
    setServiceAvailability
};
