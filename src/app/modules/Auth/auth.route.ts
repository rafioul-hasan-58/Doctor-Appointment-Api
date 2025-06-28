import { Router } from "express";
import { authController } from "./auth.controller";


const router=Router();

router.post('/register-doctor',authController.registerDoctor);


export const AuthRouter=router;