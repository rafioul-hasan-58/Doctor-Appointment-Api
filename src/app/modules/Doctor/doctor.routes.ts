import { Router } from "express";
import { doctorController } from "./doctor.controller";
import auth from "../../middleware/auth";


const router = Router();

router.get('/', auth(['patient']), doctorController.getAllDoctors);
router.get('/:id', auth(['patient']), doctorController.getSingleDoctor);

export const doctorRouter = router;