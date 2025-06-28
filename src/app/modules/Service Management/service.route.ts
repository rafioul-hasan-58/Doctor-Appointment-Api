import { Router } from "express";
import { serviceController } from "./service.controller";
import auth from "../../middleware/auth";

const router = Router();

router.post('/', auth(['doctor']), serviceController.createDoctorService);
router.patch('/:id', auth(['doctor']), serviceController.editDoctorService);

export const serviceRouter = router;