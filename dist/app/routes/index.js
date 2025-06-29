"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const auth_route_1 = require("../modules/Auth/auth.route");
const service_route_1 = require("../modules/Doctor Services/service.route");
const appointment_route_1 = require("../modules/Appointment/appointment.route");
const doctor_route_1 = require("../modules/Doctor/doctor.route");
const router = (0, express_1.Router)();
const moduleRoutes = [
    {
        path: '/auth',
        route: auth_route_1.AuthRouter
    },
    {
        path: '/doctor/services',
        route: service_route_1.serviceRouter
    },
    {
        path: '/doctors',
        route: doctor_route_1.doctorRouter
    },
    {
        path: '/appointments',
        route: appointment_route_1.appointmentRouter
    }
];
moduleRoutes.forEach((route) => router.use(route.path, route.route));
exports.default = router;
