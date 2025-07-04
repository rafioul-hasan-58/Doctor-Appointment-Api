import { Router } from "express";
import { AuthRouter } from "../modules/Auth/auth.route";
import { serviceRouter } from "../modules/Doctor Services/service.route";
import { appointmentRouter } from "../modules/Appointment/appointment.route";
import { doctorRouter } from "../modules/Doctor/doctor.route";


const router = Router()

const moduleRoutes = [
    {
        path: '/auth',
        route: AuthRouter
    },
    {
        path: '/doctor/services',
        route: serviceRouter
    },
    {
        path: '/doctors',
        route: doctorRouter
    },
    {
        path: '/appointments',
        route: appointmentRouter
    }
]

moduleRoutes.forEach((route) => router.use(route.path, route.route))

export default router