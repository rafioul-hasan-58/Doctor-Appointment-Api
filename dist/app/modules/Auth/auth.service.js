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
exports.authService = void 0;
const doctor_model_1 = require("../Doctor/doctor.model");
const bcrypt_1 = __importDefault(require("bcrypt"));
const mongoose_1 = __importDefault(require("mongoose"));
const user_model_1 = require("../User/user.model");
const AppError_1 = __importDefault(require("../../errors/AppError"));
const http_status_1 = __importDefault(require("http-status"));
const config_1 = __importDefault(require("../../config"));
const createToken_1 = require("../../utils/createToken");
const patient_model_1 = require("../Patient/patient.model");
const registerDoctor = (payload) => __awaiter(void 0, void 0, void 0, function* () {
    const { name, email, phone, password } = payload;
    // hashed password
    const hashedPassword = yield bcrypt_1.default.hash(password, 10);
    // prepare userData
    const userData = {
        name,
        email,
        phone,
        password: hashedPassword,
        role: 'doctor'
    };
    // prepare doctorData
    const doctorData = Object.assign(Object.assign({}, payload), { password: hashedPassword });
    const session = yield mongoose_1.default.startSession();
    try {
        session.startTransaction();
        const createdUser = yield user_model_1.User.create([userData], { session });
        const createdDoctor = yield doctor_model_1.Doctor.create([Object.assign(Object.assign({}, doctorData), { user: createdUser[0]._id })], { session });
        yield session.commitTransaction();
        session.endSession();
        return {
            user: createdUser[0],
            doctor: createdDoctor[0]
        };
    }
    catch (err) {
        yield session.abortTransaction();
        session.endSession();
        throw err;
    }
});
const registerPatient = (payload) => __awaiter(void 0, void 0, void 0, function* () {
    const { name, email, phone, password } = payload;
    // hashed password
    const hashedPassword = yield bcrypt_1.default.hash(password, 10);
    // prepare userData
    const userData = {
        name,
        email,
        phone,
        password: hashedPassword,
        role: 'patient'
    };
    // prepare doctorData
    const patientData = Object.assign(Object.assign({}, payload), { password: hashedPassword });
    const session = yield mongoose_1.default.startSession();
    try {
        session.startTransaction();
        const createdUser = yield user_model_1.User.create([userData], { session });
        const createdPatient = yield patient_model_1.Patient.create([Object.assign(Object.assign({}, patientData), { user: createdUser[0]._id })], { session });
        yield session.commitTransaction();
        session.endSession();
        return {
            user: createdUser[0],
            doctor: createdPatient[0]
        };
    }
    catch (err) {
        yield session.abortTransaction();
        session.endSession();
        throw err;
    }
});
const loginUser = (payload) => __awaiter(void 0, void 0, void 0, function* () {
    const user = yield user_model_1.User.findOne({ email: payload.email });
    if (!user) {
        throw new AppError_1.default(http_status_1.default.NOT_FOUND, 'User not found');
    }
    const isPasswordMatched = yield bcrypt_1.default.compare(payload.password, user.password);
    if (!isPasswordMatched) {
        throw new AppError_1.default(http_status_1.default.FORBIDDEN, 'Password not matched');
    }
    const jwtPayload = {
        email: user.email,
        role: user.role,
        userId: user._id
    };
    const accessToken = (0, createToken_1.createToken)(jwtPayload, config_1.default.jwt_access_secret, config_1.default.jwt_access_expires_in);
    const refreshToken = (0, createToken_1.createToken)(jwtPayload, config_1.default.jwt_refresh_secret, config_1.default.jwt_refresh_expires_in);
    return {
        accessToken,
        refreshToken
    };
});
exports.authService = {
    registerDoctor,
    registerPatient,
    loginUser
};
