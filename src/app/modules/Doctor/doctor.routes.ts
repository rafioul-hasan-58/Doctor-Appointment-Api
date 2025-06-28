import { Router } from "express";
import { doctorController } from "./doctor.controller";


const router = Router();

router.get('/',doctorController.getAllDoctors);
router.get('/:id',doctorController.getSingleDoctor);

export const doctorRouter = router;