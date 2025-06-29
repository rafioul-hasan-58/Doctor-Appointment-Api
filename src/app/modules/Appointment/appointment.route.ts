import { Router } from "express";
import { appointmentController } from "./appointment.controller";
import auth from "../../middleware/auth";
import validateRequest from "../../middleware/validateRequest";
import { appointmentValidationSchema } from "./appointment.validation";

const router=Router();


router.post('/',auth(['patient']),validateRequest(appointmentValidationSchema),appointmentController.bookAppointment);
export const appointmentRouter=router;