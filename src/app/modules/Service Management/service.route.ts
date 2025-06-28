import { Router } from "express";
import { serviceController } from "./service.controller";
import auth from "../../middleware/auth";

const router = Router();

router.post('/', auth(['doctor']), serviceController.createDoctorService);

export const serviceRouter = router;