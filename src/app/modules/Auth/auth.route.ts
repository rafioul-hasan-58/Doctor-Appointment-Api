import { Router } from "express";
import { authController } from "./auth.controller";


const router = Router();

router.post('/register-doctor', authController.registerDoctor);
router.post('/register-patient', authController.registerPatient);
router.post('/login', authController.loginUser);

export const AuthRouter = router;