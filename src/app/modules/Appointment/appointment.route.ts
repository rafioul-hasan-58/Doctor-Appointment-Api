import { Router } from "express";
import { appointmentController } from "./appointment.controller";
import auth from "../../middleware/auth";

const router=Router();


router.post('/',auth(['patient']),appointmentController.bookAppointment);
export const appointmentRouter=router;