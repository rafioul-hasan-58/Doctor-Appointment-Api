import { Router } from "express";
import { appointmentController } from "./appointment.controller";
import auth from "../../middleware/auth";

const router=Router();


router.post('/',auth(['patient']),appointmentController.makeAppointment);
export const appointmentRouter=router;