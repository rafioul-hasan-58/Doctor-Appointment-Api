import { Router } from "express";
import { serviceController } from "./service.controller";
import auth from "../../middleware/auth";
import validateRequest from "../../middleware/validateRequest";
import { serviceValidationSchema } from "./service.validation";

const router = Router();

router.post('/', auth(['doctor']),validateRequest(serviceValidationSchema), serviceController.addDoctorService);
router.get('/', auth(['doctor']), serviceController.getAllServices);
router.patch('/:id', auth(['doctor']), serviceController.editDoctorService);
router.patch('/:id/set-availablity', auth(['doctor']), serviceController.setServiceAvailability);
router.delete('/:id', auth(['doctor']), serviceController.deleteDoctorService);

export const serviceRouter = router;