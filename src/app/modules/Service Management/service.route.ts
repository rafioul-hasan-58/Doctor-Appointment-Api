import { Router } from "express";
import { serviceController } from "./service.controller";
import auth from "../../middleware/auth";

const router = Router();

router.post('/', auth(['doctor']), serviceController.createDoctorService);
router.get('/', auth(['doctor']), serviceController.getAllServices);
router.patch('/:id', auth(['doctor']), serviceController.editDoctorService);
router.patch('/:id/set-availablity', auth(['doctor']), serviceController.addDoctorAvailablity);
router.delete('/:id', auth(['doctor']), serviceController.deleteDoctorService);

export const serviceRouter = router;