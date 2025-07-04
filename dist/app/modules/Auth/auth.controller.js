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
exports.authController = void 0;
const catchAsync_1 = __importDefault(require("../../utils/catchAsync"));
const auth_service_1 = require("./auth.service");
const http_status_1 = __importDefault(require("http-status"));
const config_1 = __importDefault(require("../../config"));
const registerDoctor = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield auth_service_1.authService.registerDoctor(req.body);
    res.status(http_status_1.default.OK).json({
        success: true,
        message: 'Doctor registered successfully',
        statusCode: 201,
        data: result
    });
}));
const registerPatient = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield auth_service_1.authService.registerPatient(req.body);
    res.status(http_status_1.default.OK).json({
        success: true,
        message: 'Patient registered successfully',
        statusCode: 201,
        data: result
    });
}));
const loginUser = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const user = yield auth_service_1.authService.loginUser(req.body);
    const { refreshToken, accessToken } = user;
    res.cookie('refreshToken', refreshToken, {
        secure: config_1.default.NODE_ENV === 'production',
        httpOnly: true,
        sameSite: true,
        maxAge: 1000 * 60 * 60 * 24 * 365,
    });
    res.status(http_status_1.default.OK).json({
        success: true,
        statusCode: 200,
        message: "Login successful",
        data: {
            accessToken
        }
    });
}));
exports.authController = {
    registerDoctor,
    registerPatient,
    loginUser
};
